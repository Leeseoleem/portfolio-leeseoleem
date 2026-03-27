import profileImg from "@/assets/image.png";
import { PROFILE } from "@/constants/profile";

export function ProfileHeader() {
  return (
    <div className="flex gap-5 items-start py-6 bg-bg-card  px-5">
      <div className="w-20 h-20 rounded-full shrink-0 overflow-hidden border-2 border-border-med">
        <img
          src={profileImg}
          alt="이서림 프로필 사진"
          className="w-full h-full object-cover"
        />
      </div>

      {/* 텍스트 영역 */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex flex-col">
          <p className="text-profile-name font-bold text-ink mb-0.5">이서림</p>
          <p className="text-body text-ink3">
            {PROFILE.handle} · {PROFILE.role}
          </p>
        </div>
        <p className="text-tweet font-medium text-ink2 leading-[1.2] whitespace-pre-line">
          {PROFILE.bio}
        </p>
      </div>
    </div>
  );
}
