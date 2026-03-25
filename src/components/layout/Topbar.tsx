import { useLocation } from "@tanstack/react-router";
import clsx from "clsx";
import { PAGE_TITLES } from "../../constants/navigation";

export default function Topbar() {
  const { pathname } = useLocation();
  const title = PAGE_TITLES[pathname] ?? "이서림";

  function copyLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  const baseBtn =
    "flex items-center justify-center px-3 py-1 rounded-sm cursor-pointer text-body font-semibold";

  return (
    <header className="flex flex-row items-center px-5 h-13 bg-bg-card border-b border-border">
      <p className="flex-1 text-section-title text-ink">{title}</p>
      <div className="flex flex-row items-center gap-2.5">
        <button
          onClick={copyLink}
          className={clsx(
            baseBtn,
            "border border-border-med text-ink2 bg-transparent hover:bg-bg-sub",
          )}
        >
          공유
        </button>
        <a
          href="/resume.pdf"
          download
          className={clsx(baseBtn, "bg-accent text-white hover:opacity-85")}
        >
          PDF
        </a>
      </div>
    </header>
  );
}
