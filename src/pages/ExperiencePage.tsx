import { ExperienceThread } from "@/components/experiences/ExperienceThread";
import { CertificationThread } from "@/components/experiences/CertificationThread";

import { useScroll } from "@/contexts/useScroll";

export default function ExperiencePage() {
  const { scrollRef } = useScroll();
  return (
    <div className="flex flex-col h-full">
      <div
        ref={scrollRef as React.RefObject<HTMLDivElement>}
        className="flex-1 overflow-y-auto min-h-0"
      >
        <div className="flex flex-col gap-3 p-5">
          <ExperienceThread />
          <CertificationThread />
        </div>
      </div>
    </div>
  );
}
