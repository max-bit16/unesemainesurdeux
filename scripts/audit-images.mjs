#!/usr/bin/env node
/**
 * Audit doublons d'images du site.
 *
 * Scanne src/routes/*.tsx + src/components/*.tsx, extrait toutes les
 * références d'images (imports @/assets/photos/* + URLs http(s) directes),
 * puis rapporte les doublons inter-pages.
 *
 * Usage : node scripts/audit-images.mjs
 *         npm run audit:images
 *
 * Code de sortie :
 *   0 = aucun doublon non autorisé
 *   1 = doublons détectés (utile en CI)
 */

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(fileURLToPath(import.meta.url), "../..");
const SCAN_DIRS = ["src/routes", "src/components"];

// Pages couvertes par la règle "pas de doublon avec la galerie".
const PAGE_FILES = {
  home:     "src/routes/index.tsx",
  menu:     "src/routes/menu.tsx",
  chef:     "src/routes/chef.tsx",
  reserver: "src/routes/reserver.tsx",
  galerie:  "src/routes/galerie.tsx",
};

// Patterns à ignorer : balises OG (méta sociales), pas affichées visuellement.
const META_LINE = /(og:image|twitter:image|og:image:width|og:image:height)/;

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx|ts)$/.test(entry)) out.push(full);
  }
  return out;
}

/** Normalise une URL Pexels en retirant les query params. */
function normalize(src) {
  if (src.startsWith("http")) {
    try {
      const u = new URL(src);
      return `${u.origin}${u.pathname}`;
    } catch {
      return src;
    }
  }
  // Asset local : on normalise sur le basename du fichier.
  return src.replace(/^@\//, "src/").replace(/^.*\//, "");
}

/** Extrait toutes les images d'un fichier source. */
function resolveModule(importPath) {
  if (!importPath.startsWith("@/")) return null;
  const base = join(ROOT, "src", importPath.slice(2));
  for (const ext of [".ts", ".tsx", "/index.ts", "/index.tsx"]) {
    try {
      const p = base + ext;
      statSync(p);
      return p;
    } catch {}
  }
  return null;
}

function extractImages(filePath, _depth = 0) {
  const text = readFileSync(filePath, "utf8");
  const lines = text.split("\n");
  const refs = new Map();
  const localImports = new Map();
  const moduleImports = [];

  for (const line of lines) {
    const m = line.match(/^\s*import\s+(\w+)\s+from\s+["']([^"']+\.(?:jpe?g|png|webp|avif|svg))["']/i);
    if (m) localImports.set(m[1], m[2]);
  }

  const namedImportRe = /import\s*(?:type\s+)?\{([^}]+)\}\s*from\s*["'](@\/[^"']+)["']/g;
  let im;
  while ((im = namedImportRe.exec(text))) {
    const names = im[1].split(",").map((s) => s.trim().split(/\s+as\s+/)[0]).filter(Boolean);
    moduleImports.push({ names, path: im[2] });
  }

  const urlRe = /https?:\/\/[^\s"'`)]+\.(?:jpe?g|png|webp|avif|svg)(?:\?[^\s"'`)]*)?/gi;
  let match;
  while ((match = urlRe.exec(text))) {
    const lineIdx = text.slice(0, match.index).split("\n").length - 1;
    const line = lines[lineIdx] ?? "";
    if (META_LINE.test(line)) continue;
    const norm = normalize(match[0]);
    if (!refs.has(norm)) refs.set(norm, { raw: match[0], kind: "url", line: lineIdx + 1 });
  }

  for (const [varName, path] of localImports) {
    const re = new RegExp(`(?:src=\\{|src:\\s*)${varName}\\b`);
    const visible = lines.some((line) => re.test(line) && !META_LINE.test(line));
    if (!visible) continue;
    const norm = normalize(path);
    if (!refs.has(norm)) refs.set(norm, { raw: path, kind: "asset", line: 0 });
  }

  // Suivi des modules locaux (ex: GALLERY_ONLY.saintJacques)
  if (_depth < 2) {
    for (const { names, path } of moduleImports) {
      const resolved = resolveModule(path);
      if (!resolved) continue;
      const subText = readFileSync(resolved, "utf8");
      const subImports = new Map();
      for (const line of subText.split("\n")) {
        const im2 = line.match(/^\s*import\s+(\w+)\s+from\s+["']([^"']+\.(?:jpe?g|png|webp|avif|svg))["']/i);
        if (im2) subImports.set(im2[1], im2[2]);
      }

      for (const name of names) {
        // Quels membres sont utilisés ? "GALLERY_ONLY.saintJacques", "PEXELS.poulpe"
        const memberRe = new RegExp(`\\b${name}\\.(\\w+)`, "g");
        const usedKeys = new Set();
        let mm;
        while ((mm = memberRe.exec(text))) usedKeys.add(mm[1]);
        if (usedKeys.size === 0) continue;

        // Cherche l'objet exporté
        const objRe = new RegExp(`(?:export\\s+const|const)\\s+${name}\\b[^=]*?=\\s*\\{([\\s\\S]*?)\\}\\s*(?:as\\s+const)?\\s*;`);
        const objMatch = subText.match(objRe);
        if (!objMatch) continue;
        const body = objMatch[1];
        const propRe = /(\w+)\s*:\s*(?:(\w+)|"([^"]+)"|`([^`]+)`)/g;
        let pm;
        while ((pm = propRe.exec(body))) {
          const key = pm[1];
          if (!usedKeys.has(key)) continue;
          const ident = pm[2];
          const literal = pm[3] || pm[4];
          const imgPath = literal || (ident && subImports.get(ident));
          if (!imgPath) continue;
          const norm = normalize(imgPath);
          if (!refs.has(norm)) refs.set(norm, { raw: imgPath, kind: "via-module", line: 0 });
        }
      }
    }
  }

  return refs;
}

// Construire la map page -> Set<normalized image>
const pageImages = {};
for (const [page, rel] of Object.entries(PAGE_FILES)) {
  const full = join(ROOT, rel);
  pageImages[page] = extractImages(full);
}

// Fichiers complémentaires (composants partagés) — agrégés sous "shared"
const sharedFiles = SCAN_DIRS
  .flatMap((d) => walk(join(ROOT, d)))
  .filter((f) => !Object.values(PAGE_FILES).some((p) => f === join(ROOT, p)));
const sharedRefs = new Map();
for (const f of sharedFiles) {
  for (const [k, v] of extractImages(f)) {
    if (!sharedRefs.has(k)) sharedRefs.set(k, { ...v, file: relative(ROOT, f) });
  }
}

// ─── Détection doublons ───────────────────────────────────────────
const allRefs = new Map(); // normalized -> Set<page>
for (const [page, refs] of Object.entries(pageImages)) {
  for (const norm of refs.keys()) {
    if (!allRefs.has(norm)) allRefs.set(norm, new Set());
    allRefs.get(norm).add(page);
  }
}

const duplicates = [...allRefs.entries()]
  .filter(([, pages]) => pages.size > 1)
  .map(([img, pages]) => ({ img, pages: [...pages] }));

// Doublons interdits : galerie + une autre page
const galleryViolations = duplicates.filter((d) => d.pages.includes("galerie"));
const interPageDups = duplicates.filter((d) => !d.pages.includes("galerie"));

// ─── Rapport ──────────────────────────────────────────────────────
const C = { red: "\x1b[31m", green: "\x1b[32m", yellow: "\x1b[33m", dim: "\x1b[2m", bold: "\x1b[1m", reset: "\x1b[0m" };

function bar() { console.log(C.dim + "─".repeat(64) + C.reset); }

console.log(`\n${C.bold}🖼  Audit images — Une Semaine Sur Deux${C.reset}\n`);

bar();
console.log(`${C.bold}Pages scannées :${C.reset}`);
for (const [page, refs] of Object.entries(pageImages)) {
  console.log(`  ${page.padEnd(10)} ${refs.size} image(s)`);
}

bar();
console.log(`${C.bold}🚫 Règle galerie : aucun doublon avec /, /menu, /chef, /reserver${C.reset}`);
if (galleryViolations.length === 0) {
  console.log(`  ${C.green}✓ OK — la galerie ne réutilise aucune image des autres pages${C.reset}`);
} else {
  console.log(`  ${C.yellow}⚠ ${galleryViolations.length} entrée(s) déclarée(s) en doublon dans le pool galerie :${C.reset}`);
  for (const d of galleryViolations) {
    console.log(`    • ${d.img}`);
    console.log(`      ${C.dim}vu sur :${C.reset} ${d.pages.join(", ")}`);
  }
  console.log(`  ${C.dim}Ces entrées sont automatiquement filtrées au render par galleryPool()${C.reset}`);
  console.log(`  ${C.dim}— elles n'apparaissent PAS sur /galerie côté utilisateur.${C.reset}`);
}

bar();
console.log(`${C.bold}↔  Doublons inter-pages (hors galerie) :${C.reset}`);
if (interPageDups.length === 0) {
  console.log(`  ${C.green}✓ Aucun${C.reset}`);
} else {
  for (const d of interPageDups) {
    console.log(`  ${C.yellow}⚠${C.reset}  ${d.img}`);
    console.log(`      ${C.dim}vu sur :${C.reset} ${d.pages.join(", ")}`);
  }
}

bar();
console.log(`${C.bold}Total :${C.reset} ${allRefs.size} image(s) unique(s) · ${duplicates.length} doublon(s) total`);
bar();

process.exit(galleryViolations.length > 0 ? 1 : 0);
