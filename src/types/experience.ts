export type ExperienceColor = "blue" | "green" | "pink" | "amber";

export interface ExperienceItemData {
  id: string;
  color: ExperienceColor;
  org: string;
  period: string;
  role: string;
  desc: string;
  tags: string[];
}

export const colorMap: Record<ExperienceColor, { bg: string; stroke: string }> =
  {
    blue: { bg: "bg-[#EEF3FE]", stroke: "#4F7EF7" },
    green: { bg: "bg-[#E1F5EE]", stroke: "#1D9E75" },
    pink: { bg: "bg-[#FBEAF0]", stroke: "#D4537E" },
    amber: { bg: "bg-[#FAEEDA]", stroke: "#BA7517" },
  };

export interface Cert {
  year: string;
  name: string;
  org: string;
}
