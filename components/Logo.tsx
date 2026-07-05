import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * Weltek lockup: the hexagon "W" mark (extracted from the brand logo) paired
 * with the wordmark. Tone-aware — the colour mark on light surfaces, a white
 * mark on dark (navy) surfaces.
 */
export function Logo({
  tone = "onLight",
  tagline = true,
  className,
}: {
  tone?: "onLight" | "onDark";
  tagline?: boolean;
  className?: string;
}) {
  const dark = tone === "onDark";
  const word = dark ? "text-white" : "text-navy";
  const sub = dark ? "text-white/55" : "text-graphite";

  return (
    <Link
      href="/"
      aria-label="Weltek Limited home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <Image
        src={dark ? "/images/brand/weltek-mark-white.png" : "/images/brand/weltek-mark.png"}
        alt=""
        width={34}
        height={41}
        priority
        className="h-10 w-auto shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5"
      />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-[1.5rem] font-bold tracking-[0.03em]",
            word
          )}
        >
          WELTEK
        </span>
        {tagline && (
          <span
            className={cn(
              "overline mt-1 hidden whitespace-nowrap text-[0.58rem] tracking-[0.22em] sm:block",
              sub
            )}
          >
            Engineering · Procurement · Construction
          </span>
        )}
      </span>
    </Link>
  );
}
