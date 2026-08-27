import Image from "next/image";
import { type TeamMember, initials } from "@/content/team";
import { cn } from "@/lib/cn";

/**
 * Compact roster row: small portrait, name, title.
 *
 * This was a 4:5 portrait tile in a four-column grid, which suited a larger
 * team with photography. With six people in three groups of two it left half
 * of every row empty at 1440, and four of the six had no photograph, so they
 * rendered as 266x332 empty navy rectangles. A row is honest about the content
 * that exists: it fills its cell, it does not turn a missing headshot into a
 * large void, and it improves quietly as photographs arrive.
 *
 * Bios open in a modal (see TeamGrid). Pass `interactive` when the row opens
 * one, so it gains hover and focus affordances.
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
    <div className="flex items-center gap-4 border-t-2 border-bronze pt-4">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-border bg-navy sm:h-20 sm:w-20">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name || member.title}
            fill
            sizes="80px"
            className={cn(
              "object-cover object-top",
              interactive &&
                "transition-transform duration-300 ease-out-strong motion-safe:group-hover:scale-[1.06]"
            )}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            {monogram ? (
              <span className="font-heading text-lg font-bold tracking-wide text-white/85">
                {monogram}
              </span>
            ) : (
              <span aria-hidden className="block h-6 w-6 border-2 border-bronze" />
            )}
          </div>
        )}
      </div>

      <div className="min-w-0">
        <p className="font-heading text-body font-bold leading-tight text-navy">
          {member.name ? (
            <>
              {member.honorific && (
                <span className="font-body text-small font-medium text-graphite">
                  {member.honorific}{" "}
                </span>
              )}
              <span
                className={cn(
                  interactive && "transition-colors group-hover:text-bronze"
                )}
              >
                {member.name}
              </span>
            </>
          ) : (
            <span className="font-body font-medium italic text-graphite">
              Name to confirm
            </span>
          )}
        </p>
        <p className="mt-1 text-sm font-medium text-bronze">{member.title}</p>
        {interactive && (
          <span className="mt-1.5 inline-flex items-center gap-1 text-sm font-semibold text-navy transition-colors group-hover:text-bronze">
            View profile
            <span
              aria-hidden
              className="transition-transform motion-safe:group-hover:translate-x-0.5"
            >
              &rarr;
            </span>
          </span>
        )}
      </div>
    </div>
  );
}
