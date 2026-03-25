/**
 * 프로젝트 데이터 타입
 */

export type ProjectCategory = "personal" | "team";
export type ProjectFilter = "all" | ProjectCategory;
export type ProjectColor = "blue" | "green" | "pink" | "amber";

export interface SkillItem {
  name: string;
  reason: string;
}

export interface WorkItem {
  num: string;
  summary: string;
  detail: string;
}

/**
 * screenshot 배열 사용법:
 *  - 로컬 이미지: import한 뒤 경로 문자열로 넣기
 *    예) import thumb from '@/assets/projects/birthday-card/thumb.webp'
 *        screenshots: [thumb, ...]
 *  - public 폴더 정적 이미지: '/images/projects/xxx.webp'
 *  - 아직 없으면: null 또는 빈 배열 → DetailScreenshots가 플레이스홀더 표시
 *
 * 권장 이미지 사이즈: 9:16 비율, 최소 450×800px, webp 권장
 */
export interface ProjectScreenshot {
  src: string;
  alt: string;
}

export interface Project {
  id: string;
  title: string;
  summary: string; // 피드 카드에 표시되는 한 줄 설명
  type: ProjectCategory;
  period: string;
  role: string;
  stack: string[];
  color: ProjectColor;
  tags: string[]; // 피드 카드 하단 pill
  skills: SkillItem[];
  works: WorkItem[];
  screenshots: ProjectScreenshot[];
  links: {
    notion?: string;
    github?: string;
    live?: string;
  };
  inProgress?: boolean;
}
