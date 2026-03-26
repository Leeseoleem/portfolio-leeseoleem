import type { ReactNode } from "react";

export function CardContainer({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col rounded-xl border border-border bg-bg-card p-4 gap-3">
      <p className="text-label tracking-[.08em] text-ink3">{label}</p>
      {children}
    </div>
  );
}
