import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Background Gradient Animation
 * Recolored for "Une Semaine Sur Deux" — bright, soft, premium.
 * Palette: off-white, mineral white, pearl, soft silver, muted sage.
 * Defaults are intentionally subtle — this should never dominate the hero.
 */
interface Props {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}

export const BackgroundGradientAnimation = ({
  // Soft mineral wash behind the orbs
  gradientBackgroundStart = "rgb(250, 250, 247)", // off-white
  gradientBackgroundEnd = "rgb(242, 241, 236)", // pearl
  // Recolored orbs — sage / silver / ivory tones
  firstColor = "182, 198, 186", // muted sage
  secondColor = "215, 220, 213", // soft silver-sage
  thirdColor = "230, 232, 226", // pearl grey
  fourthColor = "200, 212, 196", // eucalyptus light
  fifthColor = "168, 188, 172", // cool olive
  pointerColor = "190, 206, 192", // sage hover
  size = "80%",
  blendingValue = "multiply",
  children,
  className,
  interactive = true,
  containerClassName,
}: Props) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);
  const [isSafari, setIsSafari] = useState(false);

  useEffect(() => {
    document.body.style.setProperty("--bga-gradient-bg-start", gradientBackgroundStart);
    document.body.style.setProperty("--bga-gradient-bg-end", gradientBackgroundEnd);
    document.body.style.setProperty("--bga-first-color", firstColor);
    document.body.style.setProperty("--bga-second-color", secondColor);
    document.body.style.setProperty("--bga-third-color", thirdColor);
    document.body.style.setProperty("--bga-fourth-color", fourthColor);
    document.body.style.setProperty("--bga-fifth-color", fifthColor);
    document.body.style.setProperty("--bga-pointer-color", pointerColor);
    document.body.style.setProperty("--bga-size", size);
    document.body.style.setProperty("--bga-blending-value", blendingValue);
  }, [
    gradientBackgroundStart,
    gradientBackgroundEnd,
    firstColor,
    secondColor,
    thirdColor,
    fourthColor,
    fifthColor,
    pointerColor,
    size,
    blendingValue,
  ]);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) return;
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }
    move();
  }, [tgX, tgY, curX, curY]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left);
      setTgY(event.clientY - rect.top);
    }
  };

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  return (
    <div
      className={cn(
        "h-full w-full absolute inset-0 overflow-hidden top-0 left-0",
        containerClassName,
      )}
      style={{
        background:
          "linear-gradient(40deg, rgb(var(--bga-gradient-bg-start)), rgb(var(--bga-gradient-bg-end)))",
      }}
    >
      <svg className="hidden">
        <defs>
          <filter id="bga-blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className={cn("", className)}>{children}</div>
      <div
        className={cn(
          "gradients-container h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#bga-blurMe)_blur(40px)]",
        )}
      >
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--bga-first-color),_0.55)_0,_rgba(var(--bga-first-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--bga-blending-value)] w-[var(--bga-size)] h-[var(--bga-size)] top-[calc(50%-var(--bga-size)/2)] left-[calc(50%-var(--bga-size)/2)]",
            "[transform-origin:center_center] animate-first opacity-80",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--bga-second-color),_0.5)_0,_rgba(var(--bga-second-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--bga-blending-value)] w-[var(--bga-size)] h-[var(--bga-size)] top-[calc(50%-var(--bga-size)/2)] left-[calc(50%-var(--bga-size)/2)]",
            "[transform-origin:calc(50%-400px)] animate-second opacity-80",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--bga-third-color),_0.55)_0,_rgba(var(--bga-third-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--bga-blending-value)] w-[var(--bga-size)] h-[var(--bga-size)] top-[calc(50%-var(--bga-size)/2)] left-[calc(50%-var(--bga-size)/2)]",
            "[transform-origin:calc(50%+400px)] animate-third opacity-80",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--bga-fourth-color),_0.45)_0,_rgba(var(--bga-fourth-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--bga-blending-value)] w-[var(--bga-size)] h-[var(--bga-size)] top-[calc(50%-var(--bga-size)/2)] left-[calc(50%-var(--bga-size)/2)]",
            "[transform-origin:calc(50%-200px)] animate-fourth opacity-60",
          )}
        />
        <div
          className={cn(
            "absolute [background:radial-gradient(circle_at_center,_rgba(var(--bga-fifth-color),_0.5)_0,_rgba(var(--bga-fifth-color),_0)_50%)_no-repeat]",
            "[mix-blend-mode:var(--bga-blending-value)] w-[var(--bga-size)] h-[var(--bga-size)] top-[calc(50%-var(--bga-size)/2)] left-[calc(50%-var(--bga-size)/2)]",
            "[transform-origin:calc(50%-800px)_calc(50%+800px)] animate-fifth opacity-80",
          )}
        />

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className={cn(
              "absolute [background:radial-gradient(circle_at_center,_rgba(var(--bga-pointer-color),_0.5)_0,_rgba(var(--bga-pointer-color),_0)_50%)_no-repeat]",
              "[mix-blend-mode:var(--bga-blending-value)] w-full h-full -top-1/2 -left-1/2 opacity-60",
            )}
          />
        )}
      </div>
    </div>
  );
};
