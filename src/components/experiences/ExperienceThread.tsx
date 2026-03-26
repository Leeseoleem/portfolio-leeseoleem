import { Users } from "lucide-react";

import { ExperienceContainer } from "./ExperienceContainer";
import { ExperienceItem } from "./ExperienceItem";

import { ITEMS } from "@/constants/experience";

export function ExperienceThread() {
  return (
    <ExperienceContainer icon={Users} label="Experience">
      {ITEMS.map((item, i) => (
        <ExperienceItem
          key={item.id}
          {...item}
          isLast={i === ITEMS.length - 1}
        />
      ))}
    </ExperienceContainer>
  );
}
