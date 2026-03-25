import type { ProjectFilter } from "../../../types/projects";
import { FILTER_LABEL } from "../../../constants/projects";

interface ProjectFilterTabProps {
  active: ProjectFilter;
  counts: Record<ProjectFilter, number>;
  onChange: (type: ProjectFilter) => void;
}

export default function ProjectFilterTab({
  active,
  counts,
  onChange,
}: ProjectFilterTabProps) {
  return (
    <div className="flex items-center justify-between px-5 py-3 bg-bg-card">
      {/* 탭 */}
      <div className="flex gap-1">
        {FILTER_LABEL.map(({ type, label }) => (
          <button
            key={type}
            onClick={() => onChange(type)}
            className={[
              "flex items-center gap-1.5 px-3 py-1 rounded-full text-body transition-all duration-200",
              active === type
                ? "bg-accent text-white"
                : "bg-bg-sub text-ink2 hover:bg-border-med",
            ].join(" ")}
          >
            {label}
            <span
              className={[
                "text-label tabular-nums",
                active === type ? "text-white/80" : "text-ink3",
              ].join(" ")}
            >
              {counts[type]}
            </span>
          </button>
        ))}
      </div>

      {/* 카운트 */}
      <span className="text-[12px] text-ink3">
        {counts[active]}개의 프로젝트
      </span>
    </div>
  );
}
