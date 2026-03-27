import { useState } from "react";
import { motion } from "framer-motion";
import { useScroll } from "@/contexts/useScroll";

import { AboutPanel } from "./AboutPanel";
import { ProfilePanel } from "./ProfilePanel";

const TABS = [
  { id: "about", label: "About me" },
  { id: "profile", label: "Profile" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export function ProfileInnerTabs() {
  const { scrollRef } = useScroll();

  const [activeTab, setActiveTab] = useState<TabId>("about");

  return (
    <div className="flex flex-col flex-1 min-h-0">
      {/* 탭 바 */}
      <div className="flex">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              type="button"
              aria-pressed={isActive}
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex-1 pt-3 pb-2 
                text-feed
                border-none bg-bg-card cursor-pointer
                transition-colors duration-200
                ${isActive ? "text-accent" : "text-ink3"}
              `}
            >
              {tab.label}

              {isActive && (
                <motion.span
                  layoutId="profile-tab-indicator"
                  className="absolute -bottom-px left-0 right-0 h-0.5 rounded-[1px] bg-accent"
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 35,
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* 탭 콘텐츠 */}
      <motion.div
        ref={scrollRef as React.RefObject<HTMLDivElement>}
        key={activeTab}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="flex-1 overflow-y-auto min-h-0"
      >
        {activeTab === "about" ? <AboutPanel /> : <ProfilePanel />}
      </motion.div>
    </div>
  );
}
