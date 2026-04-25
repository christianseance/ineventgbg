import logoHorizontal from "@/assets/inevent-logo-horizontal.png";

export function LogoHorizontal({ className = "" }: { className?: string }) {
  return (
    <img
      src={logoHorizontal}
      alt="Inevent"
      className={`h-8 w-auto ${className}`}
    />
  );
}
