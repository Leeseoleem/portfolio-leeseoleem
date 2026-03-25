// src/routes/__root.tsx
import { createRootRoute } from "@tanstack/react-router";
import { ScrollProvider } from "../contexts/ScrollProvider";
import RootLayout from "../components/layout/RootLayout";

export const Route = createRootRoute({
  component: () => (
    <ScrollProvider>
      <RootLayout />
    </ScrollProvider>
  ),
});
