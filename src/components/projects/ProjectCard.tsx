import { type Project } from "../../types/projects";
import { PROJECT_COLORS, getLabel } from "../../constants/projects";

interface ProjectCardProps {
  project: Project;
  onOpen: (id: string) => void;
}

export default function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const { bg, light } = PROJECT_COLORS[project.color];

  return (
    <article
      className="flex gap-3 px-5 py-4 border-b border-border cursor-pointer transition-colors duration-220 hover:bg-bg-sub"
      onClick={() => onOpen(project.id)}
    >
      {/* 아바타 */}
      <div
        className="w-9 h-9 rounded-full border border-border flex items-center justify-center text-feed shrink-0"
        style={{ background: light, color: bg }}
      >
        이
      </div>

      {/* === 바디 === */}
      <div className="flex-1 flex flex-col min-w-0 gap-2">
        <div className="flex flex-col gap-1">
          {/* 헤더 */}

          <div className="flex items-baseline gap-2">
            <span className="text-feed font-bold text-ink">이서림</span>
            <span className="text-meta text-ink3">
              {project.period}
              {project.inProgress && (
                <span
                  className="ml-1.5 px-1.5 py-0.5 rounded text-chip"
                  style={{ background: light, color: bg }}
                >
                  진행 중
                </span>
              )}
            </span>
          </div>

          {/* 요약 */}
          <p className="text-feed text-ink2">{project.summary}</p>
        </div>
        {/* 프리뷰 카드 */}
        <div className="border border-border rounded-sm overflow-hidden">
          {/* 이미지 영역 */}
          <ProjectCardImage project={project} />

          {/* 메타 */}
          <div className="px-3 py-2 bg-bg-card">
            <p className="text-body font-semibold text-ink mb-0.5">
              {project.title}
            </p>
            <p className="text-meta text-ink3 truncate">
              {project.stack.join(" · ")}
            </p>
          </div>
        </div>
        {/* 태그 */}
        <div className="flex gap-1 flex-wrap">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 rounded-xl border border-border text-chip text-ink2"
            >
              {tag}
            </span>
          ))}
        </div>
        {/* 액션 */}
        <div className="flex gap-3">
          <button
            className="text-meta text-ink3 flex items-center gap-1 hover:text-accent transition-colors duration-200"
            onClick={(e) => {
              e.stopPropagation();
              onOpen(project.id);
            }}
          >
            ↗ 상세 보기
          </button>
        </div>
      </div>
    </article>
  );
}

// === 카드 내 이미지 영역 ===
// 스크린샷이 있으면 첫 번째 이미지를 커버로 표시
// 없으면 프로젝트 색상의 플레이스홀더 표시
function ProjectCardImage({ project }: { project: Project }) {
  const { bg, light } = PROJECT_COLORS[project.color];
  const firstShot = project.screenshots[0];

  if (firstShot) {
    return (
      <div className="h-21 border-b border-border overflow-hidden">
        <img
          src={firstShot.src}
          alt={firstShot.alt}
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className="h-21 border-b border-border flex items-center justify-center text-feed"
      style={{ background: light, color: bg }}
    >
      <span className="opacity-60 text-center">
        {project.title} — {getLabel(project.type)}
      </span>
    </div>
  );
}
