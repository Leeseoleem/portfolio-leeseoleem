import { useState, useMemo } from "react";
// === component ===
import ProjectFilterTab from "@/components/projects/ProjectFilterTab";
import ProjectCard from "@/components/projects/ProjectCard";
import ProjectDetailPanel from "@/components/projects/ProjectDetailPanel";
// === type ===
import type { ProjectFilter } from "@/types/projects";
// === etc ===
import { PROJECTS } from "@/constants/projects";
import { useScroll } from "@/contexts/useScroll";

export default function ProjectsPage() {
  const { scrollToTop, scrollRef } = useScroll();

  const [filter, setFilter] = useState<ProjectFilter>("all");
  const [openId, setOpenId] = useState<string | null>(null);

  const handleFilterChange = (type: ProjectFilter) => {
    setFilter(type);
    scrollToTop();
  };

  // 필터된 프로젝트 목록
  const filtered = useMemo(
    () =>
      filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.type === filter),
    [filter],
  );

  // 탭별 카운트
  const counts = useMemo<Record<ProjectFilter, number>>(
    () => ({
      all: PROJECTS.length,
      personal: PROJECTS.filter((p) => p.type === "personal").length,
      team: PROJECTS.filter((p) => p.type === "team").length,
    }),
    [],
  );

  return (
    <div className="flex flex-col h-full">
      <ProjectFilterTab
        active={filter}
        counts={counts}
        onChange={handleFilterChange}
      />
      <div
        ref={scrollRef as React.RefObject<HTMLDivElement>}
        className="bg-bg-card flex-1 overflow-y-auto min-h-0"
      >
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} onOpen={setOpenId} />
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-feed text-ink3 py-16">
            해당하는 프로젝트가 없어요.
          </p>
        )}
      </div>
      <ProjectDetailPanel
        key={openId ?? "closed"}
        projectId={openId}
        onClose={() => setOpenId(null)}
      />
    </div>
  );
}
