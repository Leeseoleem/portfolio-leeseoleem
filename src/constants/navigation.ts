export const NAV_ITEMS = [
  { path: "/", label: "프로필" },
  { path: "/projects", label: "프로젝트" },
  { path: "/experience", label: "경력 / 자격" },
  { path: "/contact", label: "연락하기" },
];

export const PAGE_TITLES = Object.fromEntries(
  NAV_ITEMS.map(({ path, label }) => [path, label]),
);
