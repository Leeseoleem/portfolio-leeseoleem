import type { ProjectFilter, ProjectColor, Project } from "../types/projects";

export const FILTER_LABEL: { type: ProjectFilter; label: string }[] = [
  { type: "all", label: "전체" },
  { type: "personal", label: "개인" },
  { type: "team", label: "팀" },
];

export const getLabel = (type: ProjectFilter): string => {
  return FILTER_LABEL.find((item) => item.type === type)?.label ?? "";
};

// 포인트 컬러 상수
export const PROJECT_COLORS: Record<
  ProjectColor,
  {
    bg: string; // 배너 배경 / 번호 배지
    light: string; // 아바타 배경 / 뱃지 배경
    text: string; // 어두운 텍스트용
  }
> = {
  blue: { bg: "#4F7EF7", light: "#EEF3FE", text: "#3560D4" },
  green: { bg: "#1D9E75", light: "#E1F5EE", text: "#0F6E56" },
  pink: { bg: "#D4537E", light: "#FBEAF0", text: "#993556" },
  amber: { bg: "#BA7517", light: "#FAEEDA", text: "#8A5510" },
};

export const PROJECTS: Project[] = [
  {
    id: "birthday-card",
    title: "인터랙티브 생일 카드",
    summary:
      "생일 축하 메시지를 인터랙티브한 이벤트로 전달하는 웹 서비스. Supabase 익명 인증 + RPC 기반 접근 제어 직접 설계.",
    type: "personal",
    period: "2026.01 — 2026.03",
    role: "Frontend Developer & UX/UI Designer",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "TanStack Router",
      "Supabase",
      "Vercel",
    ],
    color: "blue",
    tags: ["개인 프로젝트", "Supabase", "접근 제어 설계", "애니메이션"],
    skills: [
      {
        name: "Supabase",
        reason:
          "익명 인증과 RPC 함수를 동시에 지원해, 별도 백엔드 없이 접근 제어 구조 구현이 가능했어요. 수신자에게 회원가입을 요구하지 않으면서도 발신자가 지정한 수신자만 열람 가능한 구조가 필요했기 때문에 선택했습니다.",
      },
      {
        name: "TanStack Router",
        reason:
          "파일 기반 라우팅과 타입 안전한 라우트 관리를 위해 선택했어요. TypeScript와의 긴밀한 통합으로 라우트 파라미터까지 타입 추론이 가능해 개발 안정성이 높아졌습니다.",
      },
      {
        name: "Framer Motion",
        reason:
          "인터랙티브한 카드 연출에 필요한 애니메이션 제어를 선언형으로 구현할 수 있어 선택했어요. CSS 애니메이션 대비 복잡한 시퀀스 제어가 훨씬 직관적이었습니다.",
      },
    ],

    screenshots: [],
    works: [
      {
        num: "1",
        summary: "Supabase 익명 인증 기반 접근 제어 설계",
        detail:
          "초대 링크로 카드를 확인하는 서비스 특성상 수신자에게 회원가입을 요구하면 핵심 UX가 끊깁니다. Supabase 익명 인증을 도입하고 RPC 함수 기반 PIN 인증을 추가해, 발신자가 지정한 수신자만 열람 가능한 접근 제어를 구현했습니다.",
      },
      {
        num: "2",
        summary: "좌표 기반 레이아웃 뷰포트 대응 문제 해결",
        detail:
          "테스트 중 화면 크기 변경 시 좌표 기반 컴포넌트 배치가 틀어지는 문제를 발견했습니다. 미디어 쿼리 조건을 조합한 @custom-variant 커스텀 반응형 구조를 도입해 화면 크기 변화에 관계없이 컴포넌트 배치 일관성을 확보했습니다.",
      },
      {
        num: "3",
        summary: "OG 태그 분리 설계 및 카카오톡 공유 연동",
        detail:
          "공개 서비스 페이지와 수신자 전용 초대 링크는 공유 시 전달해야 하는 맥락이 다릅니다. 페이지 유형별 OG 태그를 분리 설계해 링크 성격에 맞는 미리보기가 노출되도록 했고, 카카오톡 공유와 URL 직접 전달 두 가지 경로를 모두 지원했습니다.",
      },
    ],
    // 아직 이미지 없으면 빈 배열 유지 → 플레이스홀더 표시
    links: {
      notion: "#",
      github: "#",
      live: "#",
    },
  },

  {
    id: "barogagi",
    title: "바로가기",
    summary:
      "키워드 선택만으로 AI가 일정을 자동 구성하는 스마트 일정 플래너. 동시성 처리, 입력값 유지 UX 등 사용자 경험 중심 구현.",
    type: "team",
    period: "2025.05 — 진행 중",
    role: "Frontend Developer & UX/UI Designer",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "TanStack Router",
      "Storybook",
    ],
    color: "green",
    tags: ["팀 프로젝트", "UX/UI 설계", "상태 관리", "진행 중"],
    skills: [
      {
        name: "Zustand",
        reason:
          "전역 상태가 일정 생성 데이터로 한정적이어서 Redux 대비 설정 비용이 낮아 선택했어요. persist 미들웨어를 활용해 sessionStorage 기반 상태 유지 구조도 간단하게 구현할 수 있었습니다.",
      },
      {
        name: "TanStack Router",
        reason:
          "파일 기반 라우팅과 타입 안전한 라우트 관리를 위해 선택했어요. 멀티 스텝 플로우에서 각 단계별 라우트를 타입 안전하게 관리할 수 있어 적합했습니다.",
      },
      {
        name: "Storybook",
        reason:
          "팀원 간 컴포넌트 단위 협업을 위해 도입했어요. UI 컴포넌트를 독립적으로 개발·문서화해 디자인과 구현 사이의 간격을 줄였습니다.",
      },
    ],
    screenshots: [],
    works: [
      {
        num: "1",
        summary: "검색 결과 동시성 문제 처리",
        detail:
          "빠른 입력 시 이전 응답이 최신 결과를 덮어쓸 수 있음을 인지했습니다. 요청마다 ignore 플래그를 생성해 이전 응답이 상태를 덮어쓰지 않도록 차단하고, 항상 최신 입력에 대한 결과만 표시되도록 검색 안정성을 확보했습니다.",
      },
      {
        num: "2",
        summary: "일정 생성 플로우 이탈 시 입력값 유지",
        detail:
          "테스트 중 4단계 일정 생성 플로우 이탈 시 처음부터 다시 입력해야 하는 문제를 발견했습니다. Zustand persist로 sessionStorage에 상태를 보존해 재진입 시 이어서 작성 가능한 UX를 구현했어요. 탭을 닫으면 초기화되어야 하는 데이터 성격을 고려해 localStorage 대신 sessionStorage를 선택했습니다.",
      },
      {
        num: "3",
        summary: "회원가입 오류 UX 개선",
        detail:
          "최종 단계에서 가입 실패로만 표시되던 오류를 항목별로 세분화했습니다. 오류 발생 항목의 입력 단계로 즉시 이동해 사용자가 해당 위치에서 바로 수정 가능하도록 구현했습니다.",
      },
      {
        num: "4",
        summary: "Yup 스키마 기반 유효성 검증 구조 설계",
        detail:
          "인증 화면마다 유효성 로직이 중복 작성되는 구조를 개선했습니다. Yup 스키마로 유효성 로직을 분리해 인증 화면 전반에서 재사용 가능한 구조를 설계했습니다.",
      },
    ],
    links: {
      github: "#",
    },
    inProgress: true,
  },

  {
    id: "chaesung-eodi",
    title: "채식어디",
    summary:
      "채식 유형별 섭취 가능 여부를 안내하는 라이프스타일 앱. 팀장으로 7개월 프로젝트 완수, 권한 처리·중첩 네비게이션·협업 구조 설계.",
    type: "team",
    period: "2024.03 — 2024.10",
    role: "Team Lead · Frontend Developer · UX/UI Designer",
    stack: [
      "Expo",
      "JavaScript",
      "StyleSheet",
      "Context API",
      "React Navigation",
    ],
    color: "pink",
    tags: ["팀장", "졸업 프로젝트", "Expo", "앱 출시"],
    skills: [
      {
        name: "Expo",
        reason:
          "팀원 전원이 웹 개발 배경이었어요. 네이티브 빌드 없이 실기기 테스트가 가능해 모바일 진입 비용을 절감할 수 있었고, JavaScript 기반이라 팀 전체가 빠르게 적응할 수 있었습니다.",
      },
      {
        name: "Context API",
        reason:
          "공유 상태가 채식 유형·스캔 기록으로 한정적이어서 Redux 대비 설정 비용이 낮아 선택했어요. 작은 규모의 앱에서 Context만으로도 충분한 전역 상태 관리가 가능했습니다.",
      },
      {
        name: "React Navigation",
        reason:
          "5개 탭과 중첩 스택 구조에 적합하고, Expo와의 공식 호환성이 보장되어 선택했어요. listeners API로 탭 이벤트를 직접 감지해 중첩 네비게이션 문제도 해결했습니다.",
      },
    ],
    screenshots: [],
    works: [
      {
        num: "1",
        summary: "카메라 접근 권한 상태별 분기 처리",
        detail:
          "Expo 실기기 테스트 중 권한 거부 후 앱이 강제 종료되는 문제를 발견했습니다. useCameraPermissions의 canAskAgain 값을 기준으로 두 단계로 분기해, 강제 종료 없이 권한 재설정 후 서비스를 재개할 수 있는 UX를 구현했고 갤러리 접근 권한에도 동일하게 적용해 일관된 권한 UX 구조를 확립했습니다.",
      },
      {
        num: "2",
        summary: "중첩 네비게이션 하단탭 이벤트 처리",
        detail:
          "다른 탭으로 이동 후 기존 탭으로 돌아올 때 화면이 초기화되지 않는 문제를 발견했습니다. useFocusEffect를 시도했으나 포커스 상태 변화가 없는 탭 재클릭 시 트리거되지 않음을 확인하고, listeners의 tabPress로 클릭 시점에 원하는 로직을 실행했습니다.",
      },
      {
        num: "3",
        summary: "협업 구조 설계 — Notion 기반 문서화",
        detail:
          "팀원마다 구현 방식이 달라 작업 합산 시 기준을 맞추는 데 시간이 소요됐습니다. 화면 구조·디자인 기준·기능 명세를 Notion에 문서화해 팀 전체 판단 기준을 단일화했고, 이후 팀원이 문서를 기준으로 스스로 판단 가능해져 불필요한 확인 비용이 감소했습니다.",
      },
    ],
    links: {
      notion: "#",
      github: "#",
      live: "#",
    },
  },
];
