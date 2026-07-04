"use client";

import { useState } from "react";
import { ProjectCard } from "@/components/cards/ProjectCard";
import type { Project, ProjectFilter } from "@/content/projects";
import { cn } from "@/lib/cn";

export function ProjectsExplorer({
  projects,
  filters,
}: {
  projects: Project[];
  filters: ProjectFilter[];
}) {
  const [active, setActive] = useState<ProjectFilter | "All">("All");

  const shown =
    active === "All"
      ? projects
      : projects.filter((p) => p.filters.includes(active));

  const options: (ProjectFilter | "All")[] = ["All", ...filters];

  return (
    <div>
      {/* Filter chips — horizontal scroll on mobile, wrap on desktop */}
      <div
        role="group"
        aria-label="Filter projects"
        className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
      >
        {options.map((opt) => {
          const isActive = active === opt;
          return (
            <button
              key={opt}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(opt)}
              className={cn(
                "min-h-[44px] shrink-0 whitespace-nowrap border px-4 text-sm font-medium transition-colors",
                isActive
                  ? "border-navy bg-navy text-white"
                  : "border-border bg-surface text-steel hover:border-navy hover:text-navy"
              )}
            >
              {opt}
            </button>
          );
        })}
      </div>

      <p className="mt-6 text-sm text-graphite" aria-live="polite">
        Showing {shown.length} {shown.length === 1 ? "project" : "projects"}
        {active !== "All" && ` in ${active}`}.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </div>
  );
}
