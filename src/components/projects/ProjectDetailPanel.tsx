import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROJECTS, PROJECT_COLORS } from "../../constants/projects";
import DetailScreenshots from "./DetailScreenshots";

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
          {/* ── 백드롭 ── */}
          <motion.div
            key="backdrop"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={BACKDROP_TRANSITION}
            className="fixed inset-0 z-[200] bg-black/30 backdrop-blur-[2px]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── 슬라이드 패널 ── */}
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
            className="fixed top-0 right-0 bottom-0 z-[201] w-[min(540px,100%)] flex flex-col bg-[var(--p-bg-card)] border-l border-[var(--p-border)]"
          >
            {/* ── 상단 바 ── */}
            <div className="h-[52px] border-b border-[var(--p-border)] flex items-center px-5 gap-3 flex-shrink-0 bg-[var(--p-bg-card)]">
              <button
                onClick={onClose}
                className="flex items-center gap-1 text-[12px] font-medium text-[var(--p-accent)] hover:opacity-70 transition-opacity"
                aria-label="닫기"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M9 2L4 7l5 5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                뒤로
              </button>
              <span className="text-[14px] font-bold text-[var(--p-ink)] flex-1 truncate">
                {project.title}
              </span>
            </div>

            {/* ── 스크롤 바디 ── */}
            <div
              ref={bodyRef}
              className="flex-1 overflow-y-auto overflow-x-hidden pb-[68px]"
            >
              {/* LinkedIn 스타일 배너 */}
              <div className="h-[90px] relative flex-shrink-0">
                <div
                  className="absolute inset-0 opacity-[.18]"
                  style={{ background: colors.bg }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />
              </div>

              {/* 프로필 영역 */}
              <div className="px-5 pb-[14px] border-b border-[var(--p-border)]">
                <div
                  className="w-[52px] h-[52px] rounded-full border-[3px] border-[var(--p-bg-card)] flex items-center justify-center text-[18px] font-bold text-white -mt-7 mb-[10px]"
                  style={{ background: colors.bg }}
                >
                  이
                </div>
                <p className="text-[17px] font-bold text-[var(--p-ink)] mb-[3px]">
                  {project.title}
                </p>
                <p className="text-[11.5px] text-[var(--p-ink3)] mb-[10px] leading-[1.5]">
                  {project.period} · {project.role}
                </p>

                <div className="flex flex-wrap gap-[5px] mb-3">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="px-[10px] py-[3px] rounded-full text-[10.5px] border border-[var(--p-border-med)] text-[var(--p-ink2)] bg-[var(--p-bg-sub)]"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-[7px]">
                  {project.links.notion && (
                    <LinkButton href={project.links.notion}>
                      Notion ↗
                    </LinkButton>
                  )}
                  {project.links.github && (
                    <LinkButton href={project.links.github}>
                      GitHub ↗
                    </LinkButton>
                  )}
                  {project.links.live && (
                    <LinkButton href={project.links.live} primary>
                      Live ↗
                    </LinkButton>
                  )}
                </div>
              </div>

              {/* 트위터 스타일 설명 */}
              <div className="px-5 py-4 border-b border-[var(--p-border)]">
                <div className="flex gap-[10px] items-center mb-[10px]">
                  <div
                    className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0"
                    style={{ background: colors.bg }}
                  >
                    이
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[var(--p-ink)]">
                      이서림
                    </p>
                    <p className="text-[11px] text-[var(--p-ink3)]">
                      @seorim · Frontend Developer
                    </p>
                  </div>
                </div>
                <p className="text-[13.5px] text-[var(--p-ink)] leading-[1.75] mb-3 break-keep">
                  {project.summary}
                </p>
                <div className="flex flex-wrap gap-[5px]">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[12px] font-medium"
                      style={{ color: colors.bg }}
                    >
                      #{s.replace(/[.\s/]/g, "")}
                    </span>
                  ))}
                </div>
              </div>

              {/* 스크린샷 */}
              <DetailScreenshots
                screenshots={project.screenshots}
                accentColor={colors.bg}
                lightColor={colors.light}
                title={project.title}
              />

              {/* 주요 작업 */}
              <section className="px-5 py-4 border-b border-[var(--p-border)]">
                <p className="text-[10px] font-bold text-[var(--p-ink3)] tracking-[.08em] mb-3">
                  주요 작업
                </p>
                <div className="flex flex-col gap-4">
                  {project.works.map((w) => (
                    <div key={w.num} className="flex gap-3">
                      <div
                        className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0 mt-0.5"
                        style={{ background: colors.bg }}
                      >
                        {w.num}
                      </div>
                      <div className="flex-1">
                        <p className="text-[13px] font-bold text-[var(--p-ink)] mb-[5px]">
                          {w.summary}
                        </p>
                        <p className="text-[12px] text-[var(--p-ink2)] leading-[1.8]">
                          {w.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 기술 선택 이유 탭 */}
              <section className="px-5 py-4">
                <p className="text-[10px] font-bold text-[var(--p-ink3)] tracking-[.08em] mb-3">
                  기술 선택 이유
                </p>
                <div className="flex flex-wrap gap-[5px] mb-3">
                  {project.skills.map((sk, i) => (
                    <button
                      key={sk.name}
                      onClick={() => setActiveSkillIdx(i)}
                      className={[
                        "px-[13px] py-[5px] rounded-full text-[11px] border transition-all duration-[220ms]",
                        activeSkillIdx === i
                          ? "text-white border-transparent"
                          : "text-[var(--p-ink2)] border-[var(--p-border-med)] bg-transparent hover:bg-[var(--p-bg-sub)]",
                      ].join(" ")}
                      style={
                        activeSkillIdx === i
                          ? { background: colors.bg, borderColor: colors.bg }
                          : {}
                      }
                    >
                      {sk.name}
                    </button>
                  ))}
                </div>

                {/* 탭 내용 — 탭 전환 시 fade + 살짝 올라오는 효과 */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSkillIdx}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    className="bg-[var(--p-bg-sub)] rounded-[8px] px-[15px] py-[13px] text-[12.5px] text-[var(--p-ink2)] leading-[1.75] min-h-[64px]"
                  >
                    {project.skills[activeSkillIdx]?.reason}
                  </motion.div>
                </AnimatePresence>
              </section>
            </div>

            {/* ── 하단 링크바 (고정) ── */}
            <div className="absolute bottom-0 left-0 right-0 h-[60px] bg-[var(--p-bg-card)] border-t border-[var(--p-border)] flex items-center px-[18px] gap-2">
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
        "inline-flex items-center gap-1 px-[14px] py-[6px] rounded-[8px] text-[12px] font-medium transition-all duration-[220ms] no-underline",
        primary
          ? "bg-[var(--p-accent)] text-white border border-[var(--p-accent)] hover:opacity-[.88]"
          : "border border-[var(--p-border-med)] text-[var(--p-ink2)] hover:bg-[var(--p-bg-sub)]",
      ].join(" ")}
    >
      {children}
    </a>
  );
}
