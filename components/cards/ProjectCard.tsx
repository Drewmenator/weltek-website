import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/content/projects";
import { cn } from "@/lib/cn";

export function ProjectCard({
  project,
  className,
}: {
  project: Project;
  className?: string;
}) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={cn(
        "group flex flex-col overflow-hidden border border-border bg-surface transition-colors hover:border-bronze focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze",
        className
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 380px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-4 top-4 bg-navy/90 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-white">
          {project.client}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="overline text-bronze">{project.serviceType}</p>
        <h3 className="mt-2 text-[1.15rem] leading-snug text-navy">{project.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-steel">
          {project.scope}
        </p>
        <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-navy transition-colors group-hover:text-bronze">
          View project
          <span aria-hidden className="transition-transform group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
