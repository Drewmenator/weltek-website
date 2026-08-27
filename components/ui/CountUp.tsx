"use client";

import { useEffect, useRef } from "react";

/**
 * Counts a numeric figure up when it first scrolls into view.
 *
 * React always renders the real value. The count is a purely visual effect
 * layered on top by mutating textContent directly, which matters for three
 * reasons:
 *
 * 1. The server-rendered HTML contains the true figure. This component
 *    previously seeded state with `0${suffix}`, so the headline credibility
 *    numbers shipped as "0+ Projects delivered" to anything that does not run
 *    JavaScript, and to a screen reader reading before hydration.
 * 2. There is no hydration mismatch, because the markup React produces on the
 *    server and the client is identical.
 * 3. If the animation never runs (rAF throttled in a background tab, JS fails,
 *    reduced motion), the figure is simply correct rather than stuck at zero.
 *
 * Mutating DOM that React owns is normally a smell. It is the right call here
 * precisely because the animated value is decoration and the rendered value is
 * the truth: React stays the source of the number, the effect only borrows the
 * pixels. `value` is stable, so React never fights the mutation.
 *
 * Non-numeric values ("HSE") render as-is and are never animated.
 */
export function CountUp({
  value,
  className,
  duration = 1200,
}: {
  value: string;
  className?: string;
  duration?: number;
}) {
  const match = value.match(/^(\d[\d,]*)(.*)$/);
  const target = match ? parseInt(match[1].replace(/,/g, ""), 10) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    // Reduced motion: leave the real figure alone. Nothing to restore.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    let started = false;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting || started) continue;
          started = true;
          io.disconnect();

          const begin = performance.now();
          const step = (now: number) => {
            const p = Math.min(1, (now - begin) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            // The first frame lands on ~0 naturally, so the figure is never
            // zeroed outside an actually-running animation.
            el.textContent = p >= 1 ? value : `${Math.round(eased * target)}${suffix}`;
            if (p < 1) raf = requestAnimationFrame(step);
          };
          raf = requestAnimationFrame(step);
        }
      },
      { threshold: 0.4 }
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
      // Restore the truth if we unmount mid-count.
      if (el.textContent !== value) el.textContent = value;
    };
  }, [target, suffix, value, duration]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
