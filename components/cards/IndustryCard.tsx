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
        "group relative flex min-h-[19rem] flex-col justify-end overflow-hidden border border-border-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze",
        className
      )}
    >
      <Image
        src={industry.image}
        alt=""
        fill
        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 40vw, 240px"
        className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/55 to-navy/5" />
      <div className="relative p-6">
        <h3 className="text-[1.2rem] text-white">{industry.name}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/75">{industry.blurb}</p>
      </div>
      <span className="absolute left-0 top-0 h-1 w-0 bg-bronze transition-all duration-300 group-hover:w-full" />
    </Link>
  );
}
