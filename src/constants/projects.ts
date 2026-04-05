import type { ProjectFilter, ProjectColor, Project } from "@/types/projects";

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
    id: "garachato",
    title: "가라챠토",
    summary:
      "TJ 노래방 내 J-POP 인기 차트를 한국어 번역 및 YouTube 링크로 제공하는 서비스. 크롤러 설계부터 DB 구조, AI 챗봇까지 전담 구현.",
    type: "personal",
    period: "2026.02 — 진행 중",
    role: "Fullstack Developer",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
      "Supabase",
      "Gemini API",
      "YouTube Data API v3",
      "Storybook",
      "Vercel",
    ],
    color: "amber",
    tags: ["개인 프로젝트", "Fullstack", "크롤링", "AI", "진행 중"],
    skills: [
      {
        name: "Next.js",
        reason:
          "Route Handler로 외부 API 연동을 서버에서 처리해 별도 백엔드 없이 풀스택 구성이 가능했어요. TJ 크롤러와 YouTube API 호출을 모두 서버 사이드에서 관리할 수 있었습니다.",
      },
      {
        name: "Supabase",
        reason:
          "한국어 부분 일치 검색(pg_trgm)과 RLS 접근 제어를 동시에 지원해 선택했어요. 별도 백엔드 없이 검색·권한 제어를 모두 처리할 수 있었습니다.",
      },
      {
        name: "Gemini API",
        reason:
          "JSON 응답 모드(responseMimeType)로 구조화된 결과를 바로 수신할 수 있어 선택했어요. OpenAI 대비 무료 쿼터 내에서 운영 가능해 비용 부담 없이 AI 기능을 붙일 수 있었습니다.",
      },
    ],
    screenshots: [
      {
        src: "/images/projects/garachato/01.jpg",
        alt: "가라챠토 메인 화면",
      },
      {
        src: "/images/projects/garachato/02.jpg",
        alt: "가라챠토 곡 상세 정보 화면",
      },
      {
        src: "/images/projects/garachato/03.jpg",
        alt: "가라챠토 검색 결과 화면",
      },
      {
        src: "/images/projects/garachato/04.jpg",
        alt: "가라챠토 챗봇 화면",
      },
    ],
    works: [
      {
        num: "1",
        summary: "TJ 크롤러 구현",
        detail:
          "TJ API는 CSRF_TOKEN · JSESSIONID를 먼저 발급받아야 호출이 허용되는 구조였습니다. 브라우저 Network 탭으로 요청 흐름을 분석해 이 구조를 파악했고, 해당 토큰을 추출해 요청에 포함하는 방식으로 TOP 100 데이터를 안정적으로 수집했습니다.",
      },
      {
        num: "2",
        summary: "DB 설계 — 3계층 분리로 중복 번역 방지",
        detail:
          "단일 테이블 구조에서는 KY 차트 추가 시 동일 곡의 AI 번역이 중복 실행되는 문제가 있었습니다. songs → karaoke_tracks → rank_history 3계층으로 분리해 번역을 곡당 1회로 제한하여 처리 비용 중복을 방지했습니다. Supabase(PostgREST)가 서브쿼리를 지원하지 않아 조건 검색과 트랙 조회를 2단계로 분리하는 구조로 대응했습니다.",
      },
      {
        num: "3",
        summary: "YouTube API 쿼터 설계",
        detail:
          "파이프라인 테스트 중 40여 곡 처리 시점에 일일 쿼터 초과로 수집이 중단됐습니다. 처리 한도를 40곡으로 제한하고, 초과 시 처리되지 못한 데이터를 pending 상태로 유지해 익일 자동 재시도하는 구조로 API 비용 0원을 유지했습니다. 수집 지연 구간에서도 TJ 이미지를 먼저 표시하고 YouTube 연동 완료 시 자동 교체하는 방식으로 빈 상태 없이 점진적으로 품질이 개선되도록 했습니다.",
      },
      {
        num: "4",
        summary: "AI 챗봇 설계",
        detail:
          "사용자 입력 유형(곡 검색 · 아티스트 검색 · 추천 · 무관 질문)을 시스템 프롬프트에서 먼저 분류해, 처리 빈도가 높은 유형은 Gemini 호출 없이 즉시 응답하도록 했습니다. 실제 검색이 필요한 요청에만 쿼터를 소비하는 구조입니다.",
      },
      {
        num: "5",
        summary: "KY 크롤러 보류 결정",
        detail:
          "KY(금영) 차트 수집을 위해 크롤러 개발을 시도했습니다. TJ에서 헤더 조작으로 인증을 우회했던 방식을 동일하게 적용했으나, PowerShell에서는 정상 응답이 오는 반면 Node.js에서는 계속 차단됐습니다. Node.js의 요청 방식이 브라우저와 달라 서버가 봇으로 판단하고 있었고, 헤더 조작만으로는 이 차이를 극복할 수 없었습니다. 브라우저를 직접 실행하는 방식이 기술적 해결책이나 Vercel 배포 환경에서는 불가능하여 TJ 단독 운영을 유지하기로 결정했습니다.",
      },
    ],
    links: {
      github: "https://github.com/Leeseoleem/garachato-karaoke-chart",
      live: "https://garachato-karaoke-chart.vercel.app/",
    },
    inProgress: true,
  },

  {
    id: "birthday-card",
    title: "인터랙티브 생일 카드",
    summary:
      "생일 축하 메시지를 인터랙티브한 이벤트로 전달하는 웹 서비스. Supabase 익명 인증 + RPC 기반 접근 제어 설계.",
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
      "Storybook",
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
          "제작자(/creator)·수신자(/r) 영역을 파일 기반으로 명확히 분리하기 위해 선택했어요. beforeLoad 가드로 잘못된 접근을 차단하고, 배포·로컬 환경별 접근 페이지를 라우트 단에서 제어할 수 있었습니다.",
      },
      {
        name: "Framer Motion",
        reason:
          "인터랙티브한 카드 연출에 필요한 애니메이션 제어를 선언형으로 구현할 수 있어 선택했어요. CSS 애니메이션 대비 복잡한 시퀀스 제어가 훨씬 직관적이었습니다.",
      },
    ],
    screenshots: [
      {
        src: "/images/projects/birthday-card/01.jpg",
        alt: "생일 카드 메인 화면",
      },
      {
        src: "/images/projects/birthday-card/02.jpg",
        alt: "생일 카드 프로필 입력 화면",
      },
      {
        src: "/images/projects/birthday-card/03.jpg",
        alt: "생일 카드 초대장 화면",
      },
      {
        src: "/images/projects/birthday-card/04.jpg",
        alt: "생일 카드 링크 공유 화면",
      },
      {
        src: "/images/projects/birthday-card/05.jpg",
        alt: "생일 카드 경로 오류 화면",
      },
      {
        src: "/images/projects/birthday-card/06.jpg",
        alt: "생일 카드 수신자 인증 화면",
      },
      {
        src: "/images/projects/birthday-card/07.jpg",
        alt: "생일 카드 수신자 인증 실패 화면",
      },
      {
        src: "/images/projects/birthday-card/08.jpg",
        alt: "생일 카드 수신자 초대장 화면",
      },
      {
        src: "/images/projects/birthday-card/09.jpg",
        alt: "생일 카드 케이크 불기 화면",
      },
      {
        src: "/images/projects/birthday-card/10.jpg",
        alt: "생일 카드 편지 봉투 열기 화면",
      },
      {
        src: "/images/projects/birthday-card/11.jpg",
        alt: "생일 카드 편지지 꺼내기 화면",
      },
      {
        src: "/images/projects/birthday-card/12.jpg",
        alt: "생일 카드 완료 화면",
      },
    ],
    works: [
      {
        num: "1",
        summary: "Supabase 익명 인증 기반 접근 제어 설계",
        detail:
          "초대 링크로 카드를 확인하는 서비스 특성상 수신자에게 회원가입을 요구하면 핵심 UX가 끊깁니다. Supabase 익명 인증을 도입하고 RPC 함수 기반 PIN 인증을 추가해, 발신자가 지정한 수신자만 열람 가능한 접근 제어를 구현했습니다.",
      },
      {
        num: "2",
        summary: "좌표 기반 레이아웃 뷰포트 설계",
        detail:
          "테스트 중 좌표 기반 컴포넌트 배치 페이지에서 화면 크기 변경 시 배치가 틀어지는 문제를 발견했습니다. 표준 미디어 쿼리를 적용했으나 가로 조건만으로는 대응이 불완전했고, 세로 크기 변화도 레이아웃에 영향을 준다는 것을 확인했습니다. 가로·세로 조건을 함께 조합한 @custom-variant 커스텀 반응형 구조를 도입해 뷰포트 변화에 관계없이 컴포넌트 배치 일관성을 확보했습니다.",
      },
      {
        num: "3",
        summary: "OG 태그 분리 설계 및 카카오톡 공유 연동",
        detail:
          "공개 서비스 페이지와 수신자 전용 초대 링크는 공유 시 전달해야 하는 맥락이 다릅니다. 페이지 유형별 OG 태그를 분리 설계해 링크 성격에 맞는 미리보기가 노출되도록 했고, 카카오톡 공유와 URL 직접 전달 두 가지 경로로 초대 링크를 전달할 수 있도록 구현했습니다.",
      },
    ],
    links: {
      notion:
        "https://www.notion.so/My-Little-birthday-Party-2cc51f6a37ed80a6b99ffaed5681e063?source=copy_link",
      github: "https://github.com/Leeseoleem/my-little-birthday-party",
      live: "https://my-little-birthday-party.vercel.app/",
    },
  },

  {
    id: "barogagi",
    title: "바로가기",
    summary:
      "키워드 선택만으로 AI가 일정을 자동 구성하는 스마트 일정 플래너. 동시성 처리, 입력값 유지 UX, WebView 앱 래핑 구현.",
    type: "team",
    period: "2025.05 — 진행 중",
    role: "Frontend Developer & UX/UI Designer",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Zustand",
      "TanStack Query",
      "React Router DOM",
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
        name: "TanStack Query",
        reason:
          "서버 상태를 staleTime 기반으로 캐싱·재사용해 불필요한 재요청을 방지했어요. useEffect + fetch 대비 로딩·에러 상태를 선언적으로 관리할 수 있어 코드가 훨씬 간결해졌습니다.",
      },
      {
        name: "React Router DOM",
        reason:
          "팀원 전원이 기존에 사용해온 스택이라 온보딩 비용 없이 바로 적용 가능해 선택했어요. 진행 중인 프로젝트에서 새로운 라우터 학습 비용을 최소화하는 것이 우선이었습니다.",
      },
    ],
    screenshots: [
      {
        src: "/images/projects/barogagi/01.jpg",
        alt: "바로가기 기본 화면",
      },
      {
        src: "/images/projects/barogagi/02.jpg",
        alt: "바로가기 메인 화면",
      },
      {
        src: "/images/projects/barogagi/03.jpg",
        alt: "바로가기 일정 생성 로직 날짜 선택 화면",
      },
      {
        src: "/images/projects/barogagi/04.jpg",
        alt: "바로가기 일정 생성 로직 지역 선택 화면",
      },
      {
        src: "/images/projects/barogagi/05.jpg",
        alt: "바로가기 일정 생성 로직 계획 추가 화면",
      },
      {
        src: "/images/projects/barogagi/06.jpg",
        alt: "바로가기 일정 생성 로직 일정 완성 화면",
      },
      {
        src: "/images/projects/barogagi/07.jpg",
        alt: "바로가기 일정 생성 로직 일정 완성 토글 화면",
      },
      {
        src: "/images/projects/barogagi/08.jpg",
        alt: "바로가기 메인 활성화 화면",
      },
    ],
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
        summary: "React Native WebView 기반 네이티브 앱 래핑",
        detail:
          "화면 이동·상태 저장 등 복잡한 처리가 많은 서비스 특성상 Expo보다 웹 환경이 더 적합하다고 판단했습니다. 이전 프로젝트에서 Expo의 잦은 오류와 UI 표현 한계를 경험한 것도 근거가 됐습니다. 기존 웹 코드를 그대로 유지한 채 React Native WebView로 래핑 구조를 설계하고, window.sendToNative 브릿지를 추가해 공유·외부 링크 등 네이티브 기능을 웹에서 호출할 수 있도록 연동했습니다.",
      },
      {
        num: "4",
        summary: "회원가입 UX 개선 및 유효성 검증 구조 설계",
        detail:
          "최종 단계에서 가입 실패로만 표시되던 오류를 항목별로 세분화하고, 오류 발생 항목의 입력 단계로 즉시 이동해 사용자가 해당 위치에서 바로 수정 가능하도록 구현했습니다. 인증 화면마다 유효성 로직이 중복 작성되는 구조도 Yup 스키마로 분리해 인증 화면 전반에서 재사용 가능한 구조로 개선했습니다.",
      },
    ],
    links: {
      github: "https://github.com/T-BluePot/barogagi-front",
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
    screenshots: [
      {
        src: "/images/projects/chaesung-eodi/01.jpg",
        alt: "채식어디 메인 화면",
      },
      {
        src: "/images/projects/chaesung-eodi/02.jpg",
        alt: "채식어디 사전 탭 화면",
      },
      {
        src: "/images/projects/chaesung-eodi/03.jpg",
        alt: "채식어디 사전 상세 화면",
      },
      {
        src: "/images/projects/chaesung-eodi/04.jpg",
        alt: "채식어디 판독 탭 화면",
      },
      {
        src: "/images/projects/chaesung-eodi/05.jpg",
        alt: "채식어디 판독 확인 화면",
      },
      {
        src: "/images/projects/chaesung-eodi/06.jpg",
        alt: "채식어디 판독 결과 화면",
      },
      {
        src: "/images/projects/chaesung-eodi/07.jpg",
        alt: "채식어디 추천 탭 화면",
      },
      {
        src: "/images/projects/chaesung-eodi/08.jpg",
        alt: "채식어디 추천 선택 화면",
      },
      {
        src: "/images/projects/chaesung-eodi/09.jpg",
        alt: "채식어디 추천 결과 화면",
      },
      {
        src: "/images/projects/chaesung-eodi/10.jpg",
        alt: "채식어디 내 정보 탭 화면",
      },
    ],
    works: [
      {
        num: "1",
        summary: "카메라 접근 권한 상태별 분기 처리",
        detail:
          "Expo 실기기 테스트 중 권한 거부 후 앱이 강제 종료되는 문제를 발견했습니다. useCameraPermissions의 canAskAgain 값을 기준으로 두 단계로 분기해, 강제 종료 없이 권한 재설정 후 서비스를 재개할 수 있는 UX를 구현했습니다. 갤러리 접근 권한에도 동일하게 적용해 일관된 권한 UX 구조를 확립했습니다.",
      },
      {
        num: "2",
        summary: "중첩 네비게이션 하단탭 이벤트 처리",
        detail:
          "다른 탭으로 이동 후 기존 탭으로 돌아올 때 화면이 초기화되지 않는 문제를 발견했습니다. useFocusEffect를 시도했으나 포커스 상태 변화가 없는 탭 재클릭 시 트리거되지 않음을 확인했습니다. React Navigation 공식 문서에서 tabPress가 클릭 시점을 감지하는 이벤트 키임을 확인하고, listeners의 tabPress로 클릭 시점에 원하는 로직을 실행했습니다.",
      },
      {
        num: "3",
        summary: "협업 구조 설계 — Notion 기반 문서화",
        detail:
          "팀원마다 구현 방식이 달라 작업 진행 시 기준을 맞추는 데 시간이 소요됐습니다. 화면 구조·디자인 기준·기능 명세를 Notion에 문서화해 팀 전체 판단 기준을 통일하여, 불필요한 확인 비용이 감소했습니다.",
      },
    ],
    links: {
      notion:
        "https://www.notion.so/7db36a8398684b36b0bcf3d89c2be948?source=copy_link",
      github: "https://github.com/VRRS-Project-Team-GitPage",
      live: "https://youtu.be/PUEc9VYo3kM?si=mZLSoYFwAkyBrgSX",
    },
  },

  {
    id: "portfolio",
    title: "포트폴리오 웹사이트",
    summary:
      "SNS 감성 UI로 설계한 개인 포트폴리오. 탭 구조 기반 정보 설계 + 슬라이드 패널 상세 전환.",
    type: "personal",
    period: "2026.03",
    role: "Frontend Developer & UX/UI Designer",
    stack: [
      "React",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "TanStack Router",
    ],
    color: "blue",
    tags: ["개인 프로젝트", "UX/UI 설계", "정보 구조 설계"],
    skills: [
      {
        name: "Tailwind CSS",
        reason:
          "디자인 시스템을 한 곳에서 관리하고, 다크모드 설정을 CSS 변수 오버라이드만으로 처리 가능해 선택했어요.",
      },
      {
        name: "Framer Motion",
        reason:
          "마운트·언마운트 타이밍을 선언형으로 제어 가능해 선택했어요. 슬라이드 패널의 진입·이탈 애니메이션을 AnimatePresence로 직관적으로 구현할 수 있었습니다.",
      },
    ],
    screenshots: [],
    works: [
      {
        num: "1",
        summary: "SNS 탭 구조 기반 정보 설계",
        detail:
          "콘텐츠를 처음 접할 때 시선은 내용보다 구조에 먼저 닿습니다. SNS에서 이미 체화된 탭 구조를 적용해, 구조를 파악하는 과정 없이 원하는 섹션에 바로 진입할 수 있도록 설계했습니다.",
      },
      {
        num: "2",
        summary: "슬라이드 패널 기반 프로젝트 상세 전환",
        detail:
          "상세 페이지로 이동하면 목록 복귀 비용이 생기고 여러 프로젝트를 비교하는 흐름이 끊깁니다. 페이지 전환 대신 AnimatePresence 기반 슬라이드 패널로 전환해 목록 컨텍스트를 유지한 채 상세 정보를 전달할 수 있도록 구현했습니다.",
      },
    ],
    links: {
      notion:
        "https://www.notion.so/32171eb06984801aa2c5e15e3f7cd0bb?source=copy_link",
      github: "https://github.com/Leeseoleem/portfolio-leeseoleem",
      live: "https://portfolio-leeseoleem-front.vercel.app",
    },
  },
];
