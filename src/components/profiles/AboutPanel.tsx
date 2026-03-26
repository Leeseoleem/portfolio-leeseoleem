import { CardContainer } from "./CardContainer";

import { PROFILE_ROWS, ABOUT_ITEMS } from "@/constants/profile";

export function AboutPanel() {
  return (
    <div className="p-4 flex flex-col gap-4">
      <CardContainer label="Profile">
        {PROFILE_ROWS.map((row, i) => (
          <div
            key={row.key}
            className={`
              flex gap-3 items-center py-1.5 px-2
              ${i < PROFILE_ROWS.length - 1 ? "border-b border-border" : ""}
            `}
          >
            <span className="text-label text-ink3 min-w-10 tracking-[.05em]">
              {row.key}
            </span>
            {"href" in row ? (
              <a
                href={row.href}
                className="text-body text-accent hover:underline"
              >
                {row.value}
              </a>
            ) : (
              <span className="text-body text-ink">{row.value}</span>
            )}
          </div>
        ))}
      </CardContainer>
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
    </div>
  );
}
