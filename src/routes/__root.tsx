// src/routes/__root.tsx
import { createRootRoute, Outlet } from "@tanstack/react-router";
import Topbar from "../components/layout/Topbar";
import Sidebar from "../components/layout/Sidebar";
import BottomTabBar from "../components/layout/BottomTabBar";

export const Route = createRootRoute({
  component: () => (
    <div className="flex h-dvh overflow-hidden">
      {/* 사이드바 — 모바일에서 숨김 */}
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto pb-[60px] md:pb-0">
          <Outlet />
        </main>

        {/* 하단 탭바 — 데스크탑에서 숨김 */}
        <BottomTabBar />
      </div>
    </div>
  ),
});
