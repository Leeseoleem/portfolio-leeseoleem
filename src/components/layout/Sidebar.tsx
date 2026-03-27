import { Link, useLocation } from "@tanstack/react-router";
import { User, LayoutGrid, FileText, Mail } from "lucide-react";
import clsx from "clsx";

import { useScroll } from "@/contexts/useScroll";
import { NAV_ITEMS } from "@/constants/navigation";

const ICONS = {
  "/": User,
  "/projects": LayoutGrid,
  "/experience": FileText,
  "/contact": Mail,
};

export default function Sidebar() {
  const { pathname } = useLocation();
  const { scrollToTop } = useScroll();

  return (
    <aside className="hidden md:flex flex-col h-full w-[60px] hover:w-[220px] bg-bg-card border-r border-border overflow-hidden transition-all duration-200 ease-[cubic-bezier(.4,0,.2,1)] group">
      {/* 브랜드 */}
      <div className="flex items-center gap-4 px-3 py-5">
        <img
          src="/favicon.svg"
          alt="프로필 로고"
          className="w-8 h-8 shrink-0"
        />
        <span className="text-section-title text-ink text-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
          이서림
        </span>
      </div>

      {/* 구분선 */}
      <div className="h-px bg-border mx-3" />

      {/* 네비게이션 */}
      <nav className="flex flex-col gap-2 mt-1.5">
        {NAV_ITEMS.map(({ path, label }) => {
          const Icon = ICONS[path as keyof typeof ICONS];
          const isActive = pathname === path;

          return (
            <Link
              key={path}
              to={path}
              className={clsx(
                "flex items-center gap-3 px-3 py-2 transition-colors duration-200 whitespace-nowrap",
                isActive ? "text-accent" : "text-ink2 hover:bg-bg-sub",
              )}
              onClick={(e) => {
                if (isActive) {
                  e.preventDefault(); // 페이지 이동 방지 (이미 해당 위치이므로)
                  scrollToTop();
                }
              }}
            >
              <span
                className={clsx(
                  "w-8 h-8 rounded-[8px] flex items-center justify-center shrink-0 transition-colors duration-200",
                  isActive ? "bg-accent-light" : "bg-bg-sub",
                )}
              >
                <Icon size={16} />
              </span>
              <span
                className={clsx(
                  "text-feed opacity-0 group-hover:opacity-100 transition-opacity duration-200",
                  isActive && "font-semibold",
                )}
              >
                {label}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
