import type { ExperienceItemData, Cert } from "@/types/experience";

export const ITEMS: ExperienceItemData[] = [
  {
    id: "hotgama",
    color: "blue" as const,
    org: "팀 푸른핫가마",
    period: "2025.05 — 현재",
    role: "Frontend Developer · UX/UI Designer",
    desc: "팀 사이드 프로젝트 그룹.\nglassbottle · 바로가기 등 서비스 기획·개발 진행 중.",
    tags: ["TeamProject", "SideProject"],
  },
  {
    id: "velog",
    color: "green" as const,
    org: "Velog 기술 블로그",
    period: "2024.06 — 현재",
    role: "개인 운영",
    desc: "프로젝트 트러블슈팅 경험과 기술 학습 내용을 꾸준히 기록·공유. 단일 게시물 최대 500+ 조회수 달성, 클래스101로부터 강의 제안 수령.",
    tags: ["TechnicalWriting"],
  },
  {
    id: "chaesik",
    color: "pink" as const,
    org: "졸업 프로젝트 — 채식어디",
    period: "2024.03 — 2024.10",
    role: "Team Lead · Frontend Developer · UX/UI Designer",
    desc: "4인 팀장으로 7개월 프로젝트 완수. 전체 화면 UX/UI 설계, 협업 구조 설계, 트러블슈팅 문서화.",
    tags: ["TeamLead", "Expo", "ReactNavigation"],
  },
  {
    id: "boostcourse",
    color: "amber" as const,
    org: "네이버 부스트코스",
    period: "2024.05 — 2024.06",
    role: "Let's AI 2024 코칭스터디 수료",
    desc: "AI 머신러닝 학습 프로그램 참여. 4주간 챕터별 과제를 매주 완수하고 팀 채널에 공유.",
    tags: ["AIStudy", "수료"],
  },
] as const;

export const CERTS: Cert[] = [
  { year: "2025", name: "정보처리기사 필기", org: "한국산업인력공단" },
  { year: "2023", name: "SQL개발자 (SQLD)", org: "한국데이터베이스진흥센터" },
];
