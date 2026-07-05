import Image from "next/image";
import Link from "next/link";
import type { Industry } from "@/content/industries";
import { cn } from "@/lib/cn";

export function IndustryCard({
  industry,
  className,
}: {
  industry: Industry;
  className?: string;
}) {
  return (
    <Link
      href={`/industries#${industry.slug}`}
      className={cn(
        "group relative flex min-h-[21rem] flex-col justify-end overflow-hidden border border-border-dark bg-navy focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2",
        className
      )}
    >
      <Image
        src={industry.image}
        alt=""
        fill
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 240px"
        className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-[1.06]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/45 to-navy-900/5" />
      <div className="relative p-6">
        <h3 className="text-[1.25rem] font-bold text-white">{industry.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/70">
          {industry.blurb}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-bronze-soft opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
          Explore sector
          <span aria-hidden>→</span>
        </span>
      </div>
      <span className="absolute left-0 top-0 h-1 w-0 bg-bronze transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
