import { ContactHeroSection } from "@/components/contact/ContactHeroSection";
import { EmailButton } from "@/components/contact/EmailButton";
import { CardContainer } from "@/components/profiles/CardContainer";
import { ContactLinkRow } from "@/components/contact/ContactLinkRow";

import { CONTACT_LINKS } from "@/constants/contact";

export default function ContactPage() {
  return (
    <div className="flex flex-col p-5 gap-3">
      <ContactHeroSection />
      <EmailButton />
      <CardContainer label="Contact">
        {CONTACT_LINKS.map((link) => (
          <ContactLinkRow key={link.id} link={link} />
        ))}
      </CardContainer>
    </div>
  );
}
