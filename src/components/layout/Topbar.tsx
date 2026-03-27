import { useLocation } from "@tanstack/react-router";
import clsx from "clsx";
import { Download } from "lucide-react";
import { PAGE_TITLES } from "@/constants/navigation";

export default function Topbar() {
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] ?? "이서림";

  const baseBtn =
    "flex items-center justify-center px-3 py-1 rounded-sm cursor-pointer text-body";

  return (
    <header className="flex flex-row items-center px-5 h-[52px] bg-bg-card border-b border-border">
      <p className="flex-1 text-section-title text-ink">{title}</p>
      <div className="flex flex-row items-center gap-2.5">
        <a
          href="/이서림_포트폴리오.pdf"
          download
          className={clsx(
            baseBtn,
            "flex items-center gap-2 bg-accent text-white hover:opacity-85",
          )}
        >
          <Download size={16} className="mb-1" />
          PDF로 보기
        </a>
      </div>
    </header>
  );
}
