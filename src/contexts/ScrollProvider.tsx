import { useRef } from "react";
import { ScrollContext, type ScrollContextValue } from "./ScrollContext";

export function ScrollProvider({ children }: { children: React.ReactNode }) {
  const scrollRef = useRef<HTMLElement | null>(null);

  const scrollToTop = (behavior: ScrollBehavior = "smooth") => {
    scrollRef.current?.scrollTo({ top: 0, behavior });
  };

  const value: ScrollContextValue = { scrollRef, scrollToTop };

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
}
