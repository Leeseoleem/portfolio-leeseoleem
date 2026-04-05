// src/constants/profile.ts

export const PROFILE = {
  name: "이서림",
  handle: "@seoLeem",
  role: "Frontend Developer & UX/UI Designer",
  bio: "디자이너의 눈으로 설계하고,\n개발자의 손으로 구현하는 프론트엔드 개발자",
  email: "leeseorim0029@gmail.com",
  tel: "010-6330-1844",
  edu: "신한대학교 컴퓨터공학과 / 행정학과 (2021-2025)",
  location: "서울",
  skills: ["React", "TypeScript", "Next.js", "Figma", "UX/UI Design"],
} as const;

export const PROFILE_ROWS = [
  { key: "NAME", value: "이서림" },
  { key: "ROLE", value: "Frontend Developer · UX/UI Designer" },
  { key: "EDU", value: "신한대학교 컴퓨터공학과 / 행정학과 (2021–2025)" },
  {
    key: "MAIL",
    value: "leeseorim0029@gmail.com",
    href: "mailto:leeseorim0029@gmail.com",
  },
  { key: "TEL", value: "010-6330-1844" },
] as const;

export const ABOUT_ITEMS = [
  {
    title: "설계부터 구현까지, 전 과정을 주도합니다.",
    desc: "UX/UI 설계와 프론트엔드 구현을 함께 담당해왔습니다.\n기획과 구현 사이에 다른 사람이 개입하지 않기 때문에, 설계 의도가 코드로 옮겨지는 과정에서 발생하는 해석 오차를 제거할 수 있습니다.",
  },
  {
    title: "기능 완성과 UX 완성을 같은 기준으로 봅니다.",
    desc: "기능이 동작하는 것과 사용자가 막히지 않는 것, 저는 이 둘을 같은 무게의 완성 기준으로 설계합니다.\n설계 단계부터 사용자가 마주할 수 있는 흐름 전체를 정의하고, 예외 상황마다 서비스가 사용자를 안내할 수 있도록 구현합니다.",
  },
  {
    title: "팀이 더 잘 돌아가도록 기여합니다.",
    desc: "협업에서 반복되는 비용은 대부분 기준이 없어서 생깁니다.\n판단 기준을 문서로 만들어 공유하면, 팀원이 매번 확인하지 않아도 스스로 결정할 수 있는 구조가 만들어집니다.\n같은 문제가 반복되지 않는 협업 환경을 만드는 것을 팀 기여의 방식으로 삼고 있습니다.",
  },
] as const;

export const SKILL_GROUPS = [
  {
    label: "FRONTEND",
    skills: ["React", "Next.js", "Expo", "TypeScript", "JavaScript"],
  },
  {
    label: "UI / DESIGN",
    skills: ["Tailwind CSS", "Framer Motion", "Storybook", "Figma"],
  },
  {
    label: "STATE / ROUTING",
    skills: ["Zustand", "TanStack Router", "TanStack Query", "Context API"],
  },
  {
    label: "BACKEND / INFRA",
    skills: ["Supabase", "Vercel"],
  },
  {
    label: "ETC",
    skills: ["Notion", "GitHub"],
  },
] as const;
