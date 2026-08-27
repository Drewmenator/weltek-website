"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

type Phase = "static" | "hidden" | "shown";

/**
 * Scroll reveal that degrades to plain visible content.
 *
 * This component used to render `opacity-0` and only become visible once
 * JavaScript ran. That put 37% of the homepage text, including the whole
 * "Who we are" section, every service card and every project card, behind a
 * successful hydration. With JS disabled, blocked, or simply failing to load,
 * the page was present in the DOM but invisible.
 *
 * Now the markup renders visible and the component opts *into* animating:
 *
 * - Server and no-JS: phase stays "static", which carries no opacity or
 *   transition classes at all. Content is just content.
 * - On mount, anything already on screen is marked "shown" and never animates.
 *   Hiding it first would produce a visible flash on exactly the elements the
 *   user is looking at, and an entrance animation that fires instantly is not
 *   an animation anyway.
 * - Anything below the fold is hidden and observed. That hide happens off
 *   screen, so it is never seen.
 * - Reduced motion skips the whole mechanism and leaves content visible.
 *
 * The failure mode is now "the animation did not play" rather than "the content
 * did not appear", which is the right way round.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>("static");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (typeof IntersectionObserver === "undefined") return;

    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      // Already visible. Leave it alone.
      setPhase("shown");
      return;
    }

    setPhase("hidden");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          setPhase("shown");
          io.unobserve(e.target);
        }
      },
      {
        // threshold 0, not a fraction: an element taller than the viewport can
        // never expose 12% of itself at once, which would leave it hidden
        // forever. The negative rootMargin already prevents firing on a
        // one-pixel peek, so the fraction was doing no work the margin was not.
        threshold: 0,
        rootMargin: "0px 0px -8% 0px",
      }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={phase === "shown" ? { transitionDelay: `${delay}ms` } : undefined}
      className={cn(
        phase !== "static" &&
          "transition-[opacity,translate] duration-400 ease-out-strong will-change-[opacity,transform]",
        phase === "hidden" && "opacity-0 motion-safe:translate-y-3",
        phase === "shown" && "opacity-100 motion-safe:translate-y-0",
        className
      )}
    >
      {children}
    </Tag>
  );
}
