import { CardContainer } from "./CardContainer";
import { PROFILE_ROWS } from "@/constants/profile";

export function ProfilePanel() {
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
    </div>
  );
}
