import { MoveUpRight } from "lucide-react";
import { GitHubIcon, VelogIcon, LinkedInIcon } from "./ContactIcons";
import { type ContactLink } from "@/types/contact";

function renderIcon(type: ContactLink["iconType"]) {
  if (type === "github") return <GitHubIcon />;
  if (type === "linkedin") return <LinkedInIcon />;
  return <VelogIcon />;
}

interface Props {
  link: ContactLink;
}

export function ContactLinkRow({ link }: Props) {
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-between py-3 px-1 rounded-xl bg-bg-card hover:bg-bg-sub transition-colors duration-200"
    >
      <div className="flex items-center gap-4">
        {/* 아이콘 박스 */}
        <div
          className="flex items-center justify-center shrink-0 w-8 h-8 rounded-lg"
          style={{
            background: link.bgColor,
          }}
        >
          {renderIcon(link.iconType)}
        </div>

        {/* 텍스트 */}
        <div className="flex flex-col gap-0.5">
          <p className="text-label text-ink3">{link.label}</p>
          <p className="text-body text-ink">{link.value}</p>
        </div>
      </div>

      <MoveUpRight size={14} color="#999894" />
    </a>
  );
}
