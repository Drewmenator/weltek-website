"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts a numeric figure up from zero when it scrolls into view.
 * Preserves any non-numeric suffix/prefix (e.g. "30+", "850+").
 * Non-numeric values (e.g. "HSE") render as-is. Reduced-motion shows the
 * final value immediately.
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
  const [display, setDisplay] = useState(target === null ? value : `0${suffix}`);

  useEffect(() => {
    // Non-numeric values keep their initial render (no animation needed).
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      // Defer to a frame so this is not a synchronous set in the effect body.
      const id = requestAnimationFrame(() => setDisplay(`${target}${suffix}`));
      return () => cancelAnimationFrame(id);
    }

    let raf = 0;
    let started = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started) {
            started = true;
            io.disconnect();
            const start = performance.now();
            const step = (now: number) => {
              const p = Math.min(1, (now - start) / duration);
              const eased = 1 - Math.pow(1 - p, 3);
              setDisplay(`${Math.round(eased * target)}${suffix}`);
              if (p < 1) raf = requestAnimationFrame(step);
            };
            raf = requestAnimationFrame(step);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, suffix, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
