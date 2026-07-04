import Link from "next/link";
import { cn } from "@/lib/cn";

/**
 * Placeholder wordmark. Swap for the supplied Weltek logo file when provided.
 * Uses a restrained geometric mark (no gradient) plus the Archivo wordmark.
 */
export function Logo({
  tone = "onLight",
  className,
}: {
  tone?: "onLight" | "onDark";
  className?: string;
}) {
  const word = tone === "onDark" ? "text-white" : "text-navy";
  const sub = tone === "onDark" ? "text-white/60" : "text-graphite";
  return (
    <Link
      href="/"
      aria-label="Weltek Limited home"
      className={cn("group inline-flex items-center gap-3", className)}
    >
      <span aria-hidden className="relative block h-8 w-8 shrink-0">
        <span className="absolute inset-0 border-2 border-bronze" />
        <span className="absolute inset-x-1 top-1 h-[3px] bg-bronze" />
        <span className="absolute bottom-1 left-1 h-3 w-[3px] bg-bronze" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-heading text-[1.35rem] font-bold tracking-[0.02em]",
            word
          )}
        >
          WELTEK
        </span>
        <span
          className={cn(
            "overline mt-1 hidden text-[0.6rem] tracking-[0.28em] sm:block",
            sub
          )}
        >
          Engineering · Procurement · Construction
        </span>
      </span>
    </Link>
  );
}
