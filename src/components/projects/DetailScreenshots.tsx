import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import SectionContainer from "./SectionContainer";
import type { ProjectScreenshot } from "@/types/projects";

interface DetailScreenshotsProps {
  screenshots: ProjectScreenshot[];
  accentColor: string; // PROJECT_COLORS[color].bg
  lightColor: string; // PROJECT_COLORS[color].light
  title: string;
}

export default function DetailScreenshots({
  screenshots,
  accentColor,
  lightColor,
  title,
}: DetailScreenshotsProps) {
  // src가 비어 있거나 로드 실패한 항목을 추적
  const [failedSrcs, setFailedSrcs] = useState<Set<string>>(new Set());
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleError = (src: string) => {
    setFailedSrcs((prev) => new Set(prev).add(src));
  };

  // 유효한 스크린샷: src가 비어 있지 않고 실패하지 않은 것
  const validShots = (screenshots ?? []).filter(
    (s) => s.src.trim() !== "" && !failedSrcs.has(s.src),
  );
  const hasValidShots = validShots.length > 0;

  const closeLightbox = () => setSelectedIndex(null);
  const goPrev = () =>
    setSelectedIndex((i) =>
      i !== null ? (i - 1 + validShots.length) % validShots.length : null,
    );
  const goNext = () =>
    setSelectedIndex((i) =>
      i !== null ? (i + 1) % validShots.length : null,
    );

  return (
    <SectionContainer label="스크린샷">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {hasValidShots
          ? validShots.map((shot, idx) => (
              <ScreenshotItem
                key={shot.src}
                shot={shot}
                lightColor={lightColor}
                title={title}
                onError={() => handleError(shot.src)}
                onClick={() => setSelectedIndex(idx)}
              />
            ))
          : /* 유효한 이미지가 하나도 없으면 플레이스홀더 3개 */
            Array.from({ length: 3 }, (_, i) => (
              <Placeholder
                key={i}
                lightColor={lightColor}
                accentColor={accentColor}
                index={i + 1}
              />
            ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <Lightbox
            screenshots={validShots}
            selectedIndex={selectedIndex}
            onClose={closeLightbox}
            onPrev={goPrev}
            onNext={goNext}
            onSelect={setSelectedIndex}
          />
        )}
      </AnimatePresence>
    </SectionContainer>
  );
}

// === 개별 스크린샷 아이템 ===
interface ScreenshotItemProps {
  shot: ProjectScreenshot;
  lightColor: string;
  title: string;
  onError: () => void;
  onClick: () => void;
}

function ScreenshotItem({
  shot,
  lightColor,
  title,
  onError,
  onClick,
}: ScreenshotItemProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="shrink-0 h-55 aspect-9/16 rounded-[10px] border border-border-med overflow-hidden relative cursor-zoom-in"
      style={{ background: lightColor }}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={shot.alt || `${title} 스크린샷 확대 보기`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick();
      }}
    >
      <img
        src={shot.src}
        alt={shot.alt || title}
        onLoad={() => setLoaded(true)}
        onError={onError}
        loading="lazy"
        className={[
          "w-full h-full object-contain transition-opacity duration-300",
          loaded ? "opacity-100" : "opacity-0",
        ].join(" ")}
      />
    </div>
  );
}

// === 라이트박스 ===
interface LightboxProps {
  screenshots: ProjectScreenshot[];
  selectedIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onSelect: (index: number) => void;
}

function Lightbox({
  screenshots,
  selectedIndex,
  onClose,
  onPrev,
  onNext,
  onSelect,
}: LightboxProps) {
  const total = screenshots.length;
  const showArrows = total > 1;

  // ESC / 방향키 — capture 단계로 등록해 패널의 ESC 핸들러보다 먼저 처리
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.stopImmediatePropagation();
        onClose();
      }
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", handler, true);
    return () => document.removeEventListener("keydown", handler, true);
  }, [onClose, onPrev, onNext]);

  const content = (
    <motion.div
      className="fixed inset-0 z-300 flex items-center justify-center backdrop-blur-sm"
      style={{ background: "rgba(0,0,0,0.85)" }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* 닫기 버튼 */}
      <button
        className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="라이트박스 닫기"
      >
        ✕
      </button>

      {/* 이전 화살표 */}
      {showArrows && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white text-3xl leading-none transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="이전 이미지"
        >
          ‹
        </button>
      )}

      {/* 이미지 — 전환 시 fade */}
      <AnimatePresence mode="wait">
        <motion.img
          key={selectedIndex}
          src={screenshots[selectedIndex].src}
          alt={screenshots[selectedIndex].alt}
          className="max-h-[90vh] max-w-[90vw] object-contain select-none"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
          draggable={false}
        />
      </AnimatePresence>

      {/* 다음 화살표 */}
      {showArrows && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white text-3xl leading-none transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="다음 이미지"
        >
          ›
        </button>
      )}

      {/* 하단 dot 인디케이터 (2장 이상일 때) */}
      {total >= 2 && (
        <div
          className="absolute bottom-5 flex gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          {screenshots.map((_, i) => (
            <button
              key={i}
              className={[
                "w-2 h-2 rounded-full transition-colors",
                i === selectedIndex ? "bg-accent" : "bg-white/30",
              ].join(" ")}
              onClick={() => onSelect(i)}
              aria-label={`${i + 1}번째 이미지로 이동`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );

  return createPortal(content, document.body);
}

// === 플레이스홀더 ===
interface PlaceholderProps {
  lightColor: string;
  accentColor: string;
  index: number;
  label?: string;
}

function Placeholder({
  lightColor,
  accentColor,
  index,
  label,
}: PlaceholderProps) {
  return (
    <div
      className="shrink-0 h-55 aspect-9/16 rounded-[10px] border border-border-med flex flex-col items-center justify-center gap-1 text-center"
      style={{ background: lightColor }}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        style={{ color: accentColor, opacity: 0.4 }}
      >
        <path
          d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="13" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span
        className="text-[10px] leading-[1.6]"
        style={{ color: accentColor, opacity: 0.6 }}
      >
        {label ?? `스크린샷 ${index}`}
        <br />
        <span style={{ opacity: 0.7 }}>이미지를 교체해 주세요</span>
      </span>
    </div>
  );
}
