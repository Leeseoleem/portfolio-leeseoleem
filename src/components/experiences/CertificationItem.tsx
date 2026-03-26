import type { Cert } from "@/types/experience";

export function CertificationItem({ cert }: { cert: Cert }) {
  return (
    <div className="flex items-baseline gap-3 px-4 py-2 border-b border-border last:border-b-0">
      <span className="text-chip text-ink2 min-w-8">{cert.year}</span>
      <div className="flex-1">
        <div className="text-body font-medium text-ink mb-px">{cert.name}</div>
        <div className="text-chip text-ink3">{cert.org}</div>
      </div>
    </div>
  );
}
