"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { team, teamGroups, initials, type TeamMember } from "@/content/team";
import { TeamMemberCard } from "@/components/team/TeamMemberCard";

export function TeamGrid() {
  const [selected, setSelected] = useState<TeamMember | null>(null);
  // Remember the tile that opened the modal so focus can return to it on close.
  const triggerRef = useRef<HTMLElement | null>(null);

  const open = useCallback((member: TeamMember, el: HTMLElement) => {
    triggerRef.current = el;
    setSelected(member);
  }, []);

  const close = useCallback(() => {
    setSelected(null);
    triggerRef.current?.focus();
  }, []);

  return (
    <>
      {teamGroups.map((group) => {
        const members = team.filter((m) => m.group === group);
        if (members.length === 0) return null;
        return (
          <div key={group} className="mt-12">
            <h3 className="eyebrow text-graphite">{group}</h3>
            <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
              {members.map((member, i) =>
                member.bio ? (
                  <button
                    key={`${group}-${i}`}
                    type="button"
                    onClick={(e) => open(member, e.currentTarget)}
                    aria-haspopup="dialog"
                    aria-label={`View profile of ${[member.honorific, member.name]
                      .filter(Boolean)
                      .join(" ")}`}
                    className="group block cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze focus-visible:ring-offset-2 focus-visible:ring-offset-surface-alt"
                  >
                    <TeamMemberCard member={member} interactive />
                  </button>
                ) : (
                  <div key={`${group}-${i}`} className="group">
                    <TeamMemberCard member={member} />
                  </div>
                )
              )}
            </div>
          </div>
        );
      })}

      {selected && <TeamProfileModal member={selected} onClose={close} />}
    </>
  );
}

function TeamProfileModal({
  member,
  onClose,
}: {
  member: TeamMember;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement | null>(null);
  const monogram = initials(member.name);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    // Move focus into the dialog.
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="team-profile-name"
      className="safe-px fixed inset-0 z-[60] flex items-end justify-center sm:items-center sm:p-6"
    >
      <div
        className="absolute inset-0 bg-navy/60"
        onClick={onClose}
        aria-hidden
      />
      <div className="relative z-10 max-h-[90dvh] w-full max-w-2xl overflow-y-auto bg-surface shadow-2xl">
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close profile"
          className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center bg-surface/80 text-navy transition-colors hover:bg-surface-alt focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze"
        >
          <span aria-hidden className="text-2xl leading-none">
            &times;
          </span>
        </button>

        <div className="grid sm:grid-cols-[220px_1fr]">
          <div className="relative h-64 w-full bg-navy sm:h-auto">
            {member.photo ? (
              <Image
                src={member.photo}
                alt={member.name || member.title}
                fill
                sizes="(max-width: 640px) 100vw, 220px"
                className="object-cover object-top"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <span className="absolute inset-x-0 top-0 h-[3px] bg-bronze" />
                <span className="font-heading text-5xl font-bold text-white/85">
                  {monogram}
                </span>
              </div>
            )}
          </div>

          <div className="p-6 sm:p-8">
            <p
              id="team-profile-name"
              className="font-heading text-subsection font-bold leading-tight text-navy"
            >
              {member.honorific && (
                <span className="font-body text-base font-medium text-graphite">
                  {member.honorific}{" "}
                </span>
              )}
              {member.name}
            </p>
            <p className="mt-1 text-sm font-semibold text-bronze">{member.title}</p>
            <p className="mt-5 text-small leading-relaxed text-steel">
              {member.bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
