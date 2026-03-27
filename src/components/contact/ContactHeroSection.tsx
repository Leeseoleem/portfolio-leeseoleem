import profileImg from "@/assets/image.png";

export function ContactHeroSection() {
  return (
    <div className="flex flex-col items-center gap-3">
      {/* 아이콘 영역 */}
      <div className="w-20 h-20 rounded-full shrink-0 overflow-hidden">
        <img
          src={profileImg}
          alt="이서림 프로필 사진"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-2">
        <p className="text-profile-name text-ink">
          새로운 기회나 협업에 항상 열려 있습니다
        </p>
        <p className="text-body text-ink2">
          궁금한 점이 있으시면 언제든 편하게 연락주세요.
          <br />
          메일 주시면 24시간 이내에 답장 드릴게요.
        </p>
      </div>
    </div>
  );
}
