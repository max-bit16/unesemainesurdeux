import sharp from 'sharp'
import { readdirSync, statSync } from 'fs'
import { join, extname, basename } from 'path'

const PHOTOS_DIR = './src/assets/photos'
const QUALITY = 85

const files = readdirSync(PHOTOS_DIR).filter(f => {
  const ext = extname(f).toLowerCase()
  return ['.jpg', '.jpeg', '.png'].includes(ext)
})

console.log(`\n→ ${files.length} images à convertir\n`)

for (const file of files) {
  const input = join(PHOTOS_DIR, file)
  const outputName = basename(file, extname(file)) + '.webp'
  const output = join(PHOTOS_DIR, outputName)

  const { width, height } = await sharp(input).metadata()
  await sharp(input).webp({ quality: QUALITY, effort: 6 }).toFile(output)

  const inSize = statSync(input).size
  const outSize = statSync(output).size
  const saved = Math.round((1 - outSize / inSize) * 100)

  console.log(`✓ ${file} → ${outputName} (${saved}% plus léger, ${width}×${height})`)
}

console.log('\n✅ Conversion terminée')
