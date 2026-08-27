import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

export function ProjectCard({
  project,
  className,
  featured = false,
}: {
  project: Project;
  className?: string;
  /** Lead tile: spans two columns and lays out side by side from md up. */
  featured?: boolean;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden border border-border bg-surface shadow-card transition-all duration-200 hover:-translate-y-0.5 hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze",
        featured && "md:h-full",
        className
      )}
    >
      <div
        className={cn(
          "relative aspect-[16/11] overflow-hidden bg-navy",
          featured && "md:aspect-auto md:min-h-[16rem] md:flex-1"
        )}
      >
        <Image
          src={project.image}
          alt=""
          fill
          sizes={
            featured
              ? "(max-width: 768px) 92vw, 740px"
              : "(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 360px"
          }
          className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        <span className="absolute left-0 top-4 border-l-2 border-bronze bg-navy/90 py-1 pl-3 pr-4 text-micro font-semibold uppercase tracking-[0.1em] text-white">
          {project.client}
        </span>
      </div>
      <div
        className={cn(
          "flex flex-col p-6",
          featured ? "md:shrink-0 md:p-8" : "flex-1"
        )}
      >
        <p className="eyebrow text-bronze">{project.serviceType}</p>
        <h3
          className={cn(
            "mt-2 font-bold leading-snug text-navy",
            featured ? "text-subsection" : "text-card"
          )}
        >
          {project.title}
        </h3>
        <p
          className={cn(
            "mt-3 leading-relaxed text-steel",
            featured ? "text-body" : "line-clamp-2 text-sm"
          )}
        >
          {project.scope}
        </p>
        <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
          <span className="text-micro font-semibold uppercase tracking-[0.1em] text-graphite">
            {project.sector}
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy transition-colors group-hover:text-bronze">
            View project
            <span
              aria-hidden
              className="transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}
