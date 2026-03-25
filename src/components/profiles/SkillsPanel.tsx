import { CardContainer } from "./CardContainer";
import { SKILL_GROUPS } from "@/constants/profile";

export function SkillsPanel() {
  return (
    <div className="p-4 flex flex-col gap-4">
      {SKILL_GROUPS.map((group) => (
        <CardContainer label={group.label}>
          <div className="flex flex-wrap gap-2 py-1">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="
                  px-3 py-1 rounded-full
                  text-body text-ink
                  border border-border-med bg-bg-sub
                  cursor-default transition-colors duration-200
                  hover:border-accent hover:text-accent hover:bg-accent-light
                "
              >
                {skill}
              </span>
            ))}
          </div>
        </CardContainer>
      ))}
    </div>
  );
}
