import { Link, useLocation } from "@tanstack/react-router";
import clsx from "clsx";
import { User, LayoutGrid, FileText, Mail } from "lucide-react";

import { useScroll } from "@/contexts/useScroll";
import { NAV_ITEMS } from "@/constants/navigation";

const ICONS = {
  "/": User,
  "/projects": LayoutGrid,
  "/experience": FileText,
  "/contact": Mail,
};

export default function BottomTabBar() {
  const { pathname } = useLocation();
  const { scrollToTop } = useScroll();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-[60px] bg-bg-card border-t border-border flex items-center">
      {NAV_ITEMS.map(({ path, label }) => {
        const Icon = ICONS[path as keyof typeof ICONS];
        const isActive = pathname === path;

        return (
          <Link
            key={path}
            to={path}
            onClick={(e) => {
              if (isActive) {
                e.preventDefault(); // 페이지 이동 방지 (이미 해당 위치이므로)
                scrollToTop();
              }
            }}
            className={clsx(
              "flex-1 flex flex-col items-center justify-center gap-1 transition-colors duration-200",
              isActive ? "text-accent" : "text-ink3",
            )}
          >
            <span
              className={clsx(
                "w-6 h-6 rounded-md flex items-center justify-center transition-colors duration-200",
                isActive ? "bg-accent-light" : "bg-bg-sub",
              )}
            >
              <Icon size={16} />
            </span>
            <span
              className={clsx(
                "text-[10px] font-medium",
                isActive && "font-semibold",
              )}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
