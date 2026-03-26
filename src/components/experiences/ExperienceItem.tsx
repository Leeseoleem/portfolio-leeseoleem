import clsx from "clsx";
import { SquareChartGantt } from "lucide-react";
import { colorMap, type ExperienceColor } from "@/types/experience";

export interface ExperienceItemProps {
  color: ExperienceColor;
  org: string;
  period: string;
  role: string;
  desc: string;
  tags: string[];
  isLast?: boolean;
}

export function ExperienceItem({
  color,
  org,
  period,
  role,
  desc,
  tags,
  isLast = false,
}: ExperienceItemProps) {
  const { bg, stroke } = colorMap[color];

  return (
    <div
      className={clsx(
        "flex gap-0 px-4 py-4 border-b border-border",
        isLast && "border-b-0",
      )}
    >
      {/* 왼쪽: 아이콘 + 스레드 라인 */}
      <div className="flex flex-col items-center w-9 shrink-0 mr-3">
        <div
          className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${bg}`}
        >
          <SquareChartGantt color={stroke} size={16} />
        </div>
        {!isLast && (
          <div className="w-0.5 flex-1 bg-border mt-1.5 min-h-3.5 rounded-[1px]" />
        )}
      </div>

      {/* 오른쪽: 텍스트 */}
      <div className="flex-1 flex flex-col min-w-0 pt-0.5 gap-3">
        <div className="flex flex-col items-start">
          <div className="flex items-baseline gap-2 mb-1 flex-wrap">
            <span className="text-tweet font-bold text-ink">{org}</span>
            <span className="text-meta text-ink3">{period}</span>
          </div>
          <div className="text-role text-ink2">{role}</div>
        </div>
        <div className="text-body text-ink leading-[1.7] whitespace-pre-line">
          {desc}
        </div>
        <div className="flex gap-2 flex-wrap">
          {tags.map((tag) => (
            <span key={tag} className="text-role text-accent font-medium">
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
