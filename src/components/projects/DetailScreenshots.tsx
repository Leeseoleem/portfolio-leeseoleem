import { useState } from "react";
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

  const handleError = (src: string) => {
    setFailedSrcs((prev) => new Set(prev).add(src));
  };

  // 유효한 스크린샷: src가 비어 있지 않고 실패하지 않은 것
  const validShots = (screenshots ?? []).filter(
    (s) => s.src.trim() !== "" && !failedSrcs.has(s.src),
  );
  const hasValidShots = validShots.length > 0;

  return (
    <SectionContainer label="스크린샷">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {hasValidShots
          ? validShots.map((shot) => (
              <ScreenshotItem
                key={shot.src}
                shot={shot}
                lightColor={lightColor}
                title={title}
                onError={() => handleError(shot.src)}
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
    </SectionContainer>
  );
}

// === 개별 스크린샷 아이템 ===
interface ScreenshotItemProps {
  shot: ProjectScreenshot;
  lightColor: string;
  title: string;
  onError: () => void;
}

function ScreenshotItem({
  shot,
  lightColor,
  title,
  onError,
}: ScreenshotItemProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="shrink-0 h-55 aspect-9/16 rounded-[10px] border border-border-med overflow-hidden relative"
      // 남은 여백(letter-box)은 프로젝트 라이트 컬러로
      style={{ background: lightColor }}
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
