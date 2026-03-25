import { createContext, type RefObject } from "react";

export interface ScrollContextValue {
  scrollRef: RefObject<HTMLElement | null>;
  scrollToTop: (behavior?: ScrollBehavior) => void;
}

export const ScrollContext = createContext<ScrollContextValue | null>(null);
