import { useContext } from "react";
import { ScrollContext } from "./ScrollContext";

export function useScroll() {
  const ctx = useContext(ScrollContext);
  if (!ctx) throw new Error("useScroll must be used within ScrollProvider");
  return ctx;
}
