import { CardContainer } from "./CardContainer";
import { SkillsSection } from "./SkillsSection";

import { ABOUT_ITEMS } from "@/constants/profile";

export function AboutPanel() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <CardContainer label="About Me">
        {ABOUT_ITEMS.map((item, i) => (
          <div key={i} className="flex gap-3 py-1 items-start">
            <span className="w-2 h-2 rounded-full bg-accent/60 shrink-0 mt-2" />
            <span className="flex flex-col gap-1 text-feed">
              <span className="font-semibold text-ink">{item.title}</span>
              <span className="text-ink2">{item.desc}</span>
            </span>
          </div>
        ))}
      </CardContainer>

      <SkillsSection />
    </div>
  );
}
