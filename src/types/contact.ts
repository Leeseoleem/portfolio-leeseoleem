export interface ContactLink {
  id: string;
  label: string;
  value: string;
  href: string;
  iconType: "github" | "linkedin" | "velog";
  bgColor: string;
}
