import Link from "next/link";
import { cn } from "@/lib/cn";

export function Breadcrumb({
  items,
  tone = "onLight",
}: {
  items: { label: string; href?: string }[];
  tone?: "onLight" | "onDark";
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-2 text-xs">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          const muted = tone === "onDark" ? "text-white/55" : "text-graphite";
          const active = tone === "onDark" ? "text-white" : "text-navy";
          return (
            <li key={i} className="flex items-center gap-2">
              {item.href && !last ? (
                <Link href={item.href} className={cn(muted, "hover:text-bronze")}>
                  {item.label}
                </Link>
              ) : (
                <span className={cn(last ? active : muted, "font-medium")}>
                  {item.label}
                </span>
              )}
              {!last && <span className={muted} aria-hidden>/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
