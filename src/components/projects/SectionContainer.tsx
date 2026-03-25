import type { ReactNode } from "react";

export default function SectionContainer({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col px-5 py-4 border-b border-border gap-3">
      <p className="text-label text-ink3">{label}</p>
      {children}
    </section>
  );
}
