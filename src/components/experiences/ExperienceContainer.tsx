import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

interface ExperienceContainerProps {
  icon: LucideIcon;
  label: string;
  children: ReactNode;
}

export function ExperienceContainer({
  icon: Icon,
  label,
  children,
}: ExperienceContainerProps) {
  return (
    <div className="bg-bg-card border border-border rounded-(--radius-card) overflow-hidden">
      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
        <div className="w-7 h-7 rounded-sm bg-accent-light flex items-center justify-center shrink-0">
          <Icon size={14} className="text-accent" />
        </div>
        <span className="text-body font-semibold text-ink">{label}</span>
      </div>
      {children}
    </div>
  );
}
