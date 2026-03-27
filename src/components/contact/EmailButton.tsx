import clsx from "clsx";
import { Mail } from "lucide-react";
import { PROFILE_ROWS } from "@/constants/profile";

export function EmailButton() {
  const mailRow = PROFILE_ROWS.find((row) => row.key === "MAIL");
  return (
    <a
      className={clsx(
        "flex items-center justify-center gap-2 w-full p-3 rounded-lg bg-accent",
        "hover:bg-accent/80 ",
        "text-feed text-white",
      )}
      href={mailRow?.href}
    >
      <Mail size={16} color="#ffffff" />
      이메일 보내기 — {mailRow?.value}
    </a>
  );
}
