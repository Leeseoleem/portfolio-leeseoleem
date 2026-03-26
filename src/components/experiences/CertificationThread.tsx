import { Award } from "lucide-react";

import { ExperienceContainer } from "./ExperienceContainer";
import { CertificationItem } from "./CertificationItem";
import { CERTS } from "@/constants/experience";

export function CertificationThread() {
  return (
    <ExperienceContainer icon={Award} label="Certifications">
      {CERTS.map((cert) => (
        <CertificationItem cert={cert} />
      ))}
    </ExperienceContainer>
  );
}
