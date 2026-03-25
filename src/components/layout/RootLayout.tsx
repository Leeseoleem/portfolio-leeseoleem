import { Outlet } from "@tanstack/react-router";
import { useScroll } from "@/contexts/useScroll";
// === component ===
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import BottomTabBar from "./BottomTabBar";

export default function RootLayout() {
  const { scrollRef } = useScroll();

  return (
    <div className="flex h-dvh overflow-hidden">
      {/* 사이드바 — 모바일에서 숨김 */}
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />
        <main
          ref={scrollRef}
          className="flex-1 overflow-y-auto pb-[60px] md:pb-0"
        >
          <Outlet />
        </main>

        {/* 하단 탭바 — 데스크탑에서 숨김 */}
        <BottomTabBar />
      </div>
    </div>
  );
}
