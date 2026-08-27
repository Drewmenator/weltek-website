import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";

export function Breadcrumb({
  items,
  tone = "onLight",
}: {
  items: { label: string; href?: string }[];
  tone?: "onLight" | "onDark";
}) {
  /**
   * BreadcrumbList for the trail that is actually on screen. Emitted here
   * rather than per page so the markup and the structured data can never drift
   * apart: they are generated from the same `items`.
   *
   * Only entries with an href get an `item` URL. Google expects the final
   * crumb, the current page, to have none.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `${site.url}${item.href === "/" ? "" : item.href}` } : {}),
    })),
  };

  return (
    <nav aria-label="Breadcrumb">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
