import Image from "next/image";
import { type TeamMember, initials } from "@/content/team";
import { cn } from "@/lib/cn";

/**
 * Presentational team tile: portrait (photo or initials) + name + title.
 * Bios are shown in a modal (see TeamGrid), not inline. Pass `interactive`
 * when the tile opens a profile so it gains hover/focus affordances.
 */
export function TeamMemberCard({
  member,
  interactive = false,
}: {
  member: TeamMember;
  interactive?: boolean;
}) {
  const monogram = initials(member.name);

  return (
    <figure className="flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden border border-border bg-navy">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name || member.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            className={cn(
              "object-cover",
              interactive &&
                "transition-transform duration-300 ease-out-strong motion-safe:group-hover:scale-[1.03]"
            )}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="absolute inset-x-0 top-0 h-[3px] bg-bronze" />
            {monogram ? (
              <span className="font-heading text-4xl font-bold tracking-wide text-white/85">
                {monogram}
              </span>
            ) : (
              <span aria-hidden className="relative block h-10 w-10">
                <span className="absolute inset-0 border-2 border-bronze" />
                <span className="absolute inset-x-1 top-1 h-[3px] bg-bronze" />
              </span>
            )}
          </div>
        )}

        {member.photo && <span className="absolute inset-x-0 top-0 h-[3px] bg-bronze" />}

        {interactive && (
          <span className="pointer-events-none absolute inset-0 flex items-end bg-gradient-to-t from-navy/75 via-navy/10 to-transparent opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
            <span className="p-3 text-micro font-semibold uppercase tracking-[0.14em] text-white">
              View profile
            </span>
          </span>
        )}
      </div>

      <figcaption className="mt-4 text-left">
        <p className="font-heading text-body font-bold leading-tight text-navy">
          {member.name ? (
            <>
              {member.honorific && (
                <span className="font-body text-small font-medium text-graphite">
                  {member.honorific}{" "}
                </span>
              )}
              {member.name}
            </>
          ) : (
            <span className="font-body font-medium italic text-graphite">
              Name to confirm
            </span>
          )}
        </p>
        <p className="mt-0.5 text-sm font-medium text-bronze">{member.title}</p>
        {interactive && (
          <span className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors group-hover:text-bronze">
            View profile
            <span aria-hidden className="transition-transform motion-safe:group-hover:translate-x-0.5">
              →
            </span>
          </span>
        )}
      </figcaption>
    </figure>
  );
}
