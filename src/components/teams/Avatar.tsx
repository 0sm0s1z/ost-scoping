import type { PersonaId } from "@/lib/canon";

type AvatarVariant = PersonaId | "user" | "neutral";

type AvatarProps = {
  name: string;
  initials: string;
  variant?: AvatarVariant;
  size?: "sm" | "md" | "lg";
  presence?: "online" | "away" | "busy" | "offline" | null;
  className?: string;
};

const sizeClass = {
  sm: "t-avatar-sm",
  md: "t-avatar-md",
  lg: "t-avatar-lg",
};

const variantClass: Record<AvatarVariant, string> = {
  murphy: "t-avatar-murphy",
  belford: "t-avatar-belford",
  libby: "t-avatar-libby",
  cook: "t-avatar-cook",
  user: "t-avatar-user",
  neutral: "t-avatar-neutral",
};

export function Avatar({
  name,
  initials,
  variant = "neutral",
  size = "md",
  presence = null,
  className = "",
}: AvatarProps) {
  return (
    <div className={`t-avatar-wrap ${sizeClass[size]} ${className}`} title={name}>
      <div
        className={`t-avatar ${sizeClass[size]} ${variantClass[variant]}`}
        aria-hidden
      >
        {initials}
      </div>
      {presence && (
        <span className={`t-presence t-presence-${presence}`} aria-hidden />
      )}
    </div>
  );
}
