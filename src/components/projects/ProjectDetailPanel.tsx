import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";

import DetailScreenshots from "./DetailScreenshots";
import SectionContainer from "./SectionContainer";

import { PROJECTS, PROJECT_COLORS } from "@/constants/projects";

import type { Project } from "@/types/projects";

interface ProjectDetailPanelProps {
  projectId: string | null;
  onClose: () => void;
}

// ── 애니메이션 variants ────────────────────────
//  패널: 오른쪽 밖(x: '100%')에서 제자리(x: 0)로
//  백드롭: 투명(opacity: 0)에서 불투명(opacity: 1)로
const panelVariants = {
  hidden: { x: "100%" },
  visible: { x: 0 },
  exit: { x: "100%" },
};

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

// spring 대신 ease curve로 HTML 프로토타입과 동일한 feel 유지
const TRANSITION = {
  type: "tween",
  ease: [0.4, 0, 0.2, 1], // cubic-bezier(.4,0,.2,1) — Material easing
  duration: 0.28,
} as const;

// 백드롭은 패널보다 약간 빠르게
const BACKDROP_TRANSITION = {
  type: "tween",
  ease: [0.4, 0, 0.2, 1],
  duration: 0.22,
} as const;

export default function ProjectDetailPanel({
  projectId,
  onClose,
}: ProjectDetailPanelProps) {
  const project = projectId
    ? (PROJECTS.find((p) => p.id === projectId) ?? null)
    : null;
  const isOpen = project !== null;

  const [activeSkillIdx, setActiveSkillIdx] = useState(0);

  // ESC 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // body 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // 패널 열릴 때마다 스크롤 상단 초기화
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isOpen) bodyRef.current?.scrollTo({ top: 0 });
  }, [projectId, isOpen]);

  const colors = project ? PROJECT_COLORS[project.color] : PROJECT_COLORS.blue;

  return (
    // AnimatePresence: isOpen이 false가 되면 exit 애니메이션 실행 후 DOM에서 제거
    <AnimatePresence>
      {isOpen && (
        <>
          {/* === 백드롭 === */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={BACKDROP_TRANSITION}
            className="fixed inset-0 z-200 bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* === 슬라이드 패널 === */}
          <motion.div
            key="panel"
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={TRANSITION}
            className="fixed top-0 right-0 bottom-0 z-201 w-[min(540px,100%)] flex flex-col bg-bg-card border-l border-border"
          >
            {/* ── 상단 바 ── */}
            <BackHeader title={project.title} onClose={onClose} />

            {/* ── 스크롤 바디 ── */}
            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto overflow-x-hidden pb-15"
            >
              {/* LinkedIn 스타일 배너 */}
              <div className="h-[90px] relative shrink-0">
                <div
                  className="absolute inset-0 opacity-[.18]"
                  style={{ background: colors.bg }}
                />
                <div className="absolute inset-0 bg-linear-to-b from-transparent via-transparent to-black/20" />
              </div>

              {/* 프로필 영역 */}
              <Profile background={colors.bg} project={project} />

              {/* 프로젝트 설명 */}
              <Info
                background={colors.bg}
                summary={project.summary}
                stack={project.stack}
              />

              {/* 스크린샷 */}
              {project.screenshots.length > 0 && (
                <DetailScreenshots
                  screenshots={project.screenshots}
                  accentColor={colors.bg}
                  lightColor={colors.light}
                  title={project.title}
                />
              )}

              {/* 주요 작업 */}
              <TaskSection background={colors.bg} project={project} />

              {/* 기술 선택 이유 탭 */}
              <TechSection
                project={project}
                background={colors.bg}
                activeSkillIdx={activeSkillIdx}
                setActiveSkillIdx={setActiveSkillIdx}
              />
            </div>

            {/* ── 하단 링크바 (고정) ── */}
            <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-bg-card border-t border-border flex items-center px-5 gap-2">
              {project.links.notion && (
                <LinkButton href={project.links.notion}>Notion ↗</LinkButton>
              )}
              {project.links.github && (
                <LinkButton href={project.links.github}>GitHub ↗</LinkButton>
              )}
              {project.links.live && (
                <LinkButton href={project.links.live} primary>
                  Live ↗
                </LinkButton>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ===== 내부 컴포넌트 =====
function BackHeader({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="h-[52px] border-b border-border flex items-center px-5 gap-3 shrink-0 bg-bg-card">
      <button
        onClick={onClose}
        className="flex items-center gap-1 hover:opacity-70 transition-opacity cursor-pointer"
        aria-label="닫기"
      >
        <ChevronLeft size={16} color="#3560d4" />
        <p className="text-role text-accent mt-0.5">뒤로</p>
      </button>
      <span className="text-section-title text-ink flex-1 truncate">
        {title}
      </span>
    </div>
  );
}

function Profile({
  background,
  project,
}: {
  background: string;
  project: Project;
}) {
  return (
    <div className="px-5 border-b border-border">
      <div
        className="w-12 h-12 rounded-full border-bg-card flex items-center justify-center text-profile-name text-white -mt-7"
        style={{ background: background }}
      >
        이
      </div>
      <div className="flex flex-col p-3 gap-4">
        <div className="flex flex-col gap-0.5">
          <p className="text-profile-name text-ink">{project.title}</p>
          <p className="text-role text-ink3 leading-normal">
            {project.period} · {project.role}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {project.stack.map((s) => (
            <span
              key={s}
              className="px-3 py-1 rounded-full text-chip border border-border-med text-ink2 bg-bg-sub"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Info({
  background,
  summary,
  stack,
}: {
  background: string;
  summary: string;
  stack: string[];
}) {
  return (
    <div className="flex flex-col px-5 py-4 border-b border-border gap-3">
      <div className="flex gap-3 items-center">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-body font-bold text-white shrink-0"
          style={{ background: background }}
        >
          이
        </div>
        <div>
          <p className="text-feed text-ink">이서림</p>
          <p className="text-meta text-ink3">@seoLeem · Frontend Developer</p>
        </div>
      </div>
      <p className="text-tweet text-ink break-keep">{summary}</p>
      <div className="flex flex-wrap gap-2">
        {stack.map((s) => (
          <span key={s} className="text-role" style={{ color: background }}>
            #{s.replace(/[.\s/]/g, "")}
          </span>
        ))}
      </div>
    </div>
  );
}

function TaskSection({
  background,
  project,
}: {
  background: string;
  project: Project;
}) {
  return (
    <SectionContainer label="주요 작업">
      <div className="flex flex-col gap-4">
        {project.works.map((w) => (
          <div key={w.num} className="flex gap-3 items-baseline">
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center text-label text-white shrink-0 mt-0.5"
              style={{ background: background }}
            >
              {w.num}
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className="text-feed font-semibold text-ink">{w.summary}</p>
              <p className="text-body text-ink2">{w.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionContainer>
  );
}

function TechSection({
  background,
  project,
  activeSkillIdx,
  setActiveSkillIdx,
}: {
  background: string;
  project: Project;
  activeSkillIdx: number;
  setActiveSkillIdx: (s: number) => void;
}) {
  return (
    <SectionContainer label="기술 선택 이유">
      <div>
        <div className="flex flex-wrap gap-1 mb-3">
          {project.skills.map((sk, i) => (
            <button
              key={sk.name}
              onClick={() => setActiveSkillIdx(i)}
              className={[
                "px-3 py-1.5 rounded-full text-meta border transition-all duration-200",
                activeSkillIdx === i
                  ? "text-white border-transparent"
                  : "text-ink2 border-border-med bg-transparent hover:bg-bg-sub",
              ].join(" ")}
              style={
                activeSkillIdx === i
                  ? { background: background, borderColor: background }
                  : {}
              }
            >
              {sk.name}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSkillIdx}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="bg-bg-sub rounded-lg px-4 py-3 text-body text-ink2 min-h-16"
          >
            {project.skills[activeSkillIdx]?.reason}
          </motion.div>
        </AnimatePresence>
      </div>
    </SectionContainer>
  );
}

function LinkButton({
  href,
  children,
  primary = false,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "inline-flex items-center gap-1 px-4 py-1.5 rounded-[8px] text-body transition-all duration-200 no-underline",
        primary
          ? "bg-accent text-white border border-accent hover:opacity-[.88]"
          : "border border-border-med text-ink2 hover:bg-bg-sub",
      ].join(" ")}
    >
      {children}
    </a>
  );
}
