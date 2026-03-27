import { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

import { useScroll } from "@/contexts/useScroll";
import { SKILL_GROUPS } from "@/constants/profile";

import { CardContainer } from "./CardContainer";

type SkillLabel = (typeof SKILL_GROUPS)[number]["label"];

const ALL_LABEL = "전체" as const;
type TabId = SkillLabel | typeof ALL_LABEL;

const TABS: { id: TabId; label: string }[] = [
  { id: ALL_LABEL, label: "전체" },
  ...SKILL_GROUPS.map((g) => ({ id: g.label as TabId, label: g.label })),
];

export function SkillsSection() {
  const { scrollRef } = useScroll();
  const [activeTab, setActiveTab] = useState<TabId>(ALL_LABEL);

  const handleTabChange = (id: TabId) => {
    setActiveTab(id);
    requestAnimationFrame(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    });
  };

  const visibleSkills =
    activeTab === ALL_LABEL
      ? SKILL_GROUPS.flatMap((g) => g.skills)
      : (SKILL_GROUPS.find((g) => g.label === activeTab)?.skills ?? []);

  return (
    <CardContainer label="SKILLS">
      {/* 탭 바 */}
      <div className="flex gap-4 border-b border-border -mx-3.75 px-4 mb-3">
        {TABS.map((tab) => {
          const isActive = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={clsx(
                "w-full relative pt-2 pb-1.5 text-role whitespace-nowrap border-none bg-transparent cursor-pointer transition-colors duration-200",
                isActive
                  ? "text-accent font-bold"
                  : "text-ink3 hover:text-ink font-medium",
              )}
            >
              {tab.label}
              {isActive && (
                <motion.span
                  layoutId="skill-tab-indicator"
                  className="absolute -bottom-px left-0 right-0 h-0.5 rounded-[1px] bg-accent"
                  transition={
                    { type: "spring", stiffness: 400, damping: 35 } as const
                  }
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 스킬 pill */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] as const }}
        className="flex flex-wrap gap-2"
      >
        {visibleSkills.map((skill) => (
          <span
            key={skill}
            className="
                px-3 py-1.5 rounded-full
                text-body text-ink
                border border-border-med bg-bg-sub
                cursor-default transition-colors duration-200
                hover:border-accent hover:text-accent hover:bg-accent-light
              "
          >
            {skill}
          </span>
        ))}
      </motion.div>
    </CardContainer>
  );
}
