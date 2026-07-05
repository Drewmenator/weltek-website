import Image from "next/image";
import { type TeamMember, initials } from "@/content/team";

export function TeamMemberCard({ member }: { member: TeamMember }) {
  const monogram = initials(member.name);

  return (
    <figure className="group flex flex-col">
      {/* Portrait — real headshot, or a squared placeholder (no circles, to match
          the industrial system). */}
      <div className="relative aspect-[4/5] overflow-hidden border border-border bg-navy">
        {member.photo ? (
          <Image
            src={member.photo}
            alt={member.name || member.title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 280px"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
      </div>

      <figcaption className="mt-4">
        <p className="font-heading text-[1.05rem] font-bold leading-tight text-navy">
          {member.name ? (
            <>
              {member.honorific && (
                <span className="font-body text-[0.95rem] font-medium text-graphite">
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
        {member.bio && (
          <p className="mt-2 text-sm leading-relaxed text-steel">{member.bio}</p>
        )}
      </figcaption>
    </figure>
  );
}
