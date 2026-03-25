import { ProfileHeader } from "@/components/profiles/ProfileHeader";
import { ProfileInnerTabs } from "@/components/profiles/ProfileInnerTabs";

export default function ProfilePage() {
  return (
    <div className="flex flex-col h-full">
      <ProfileHeader />
      <ProfileInnerTabs />
    </div>
  );
}
