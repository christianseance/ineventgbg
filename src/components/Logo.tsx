import logo from "@/assets/inevent-logo.png";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src={logo}
      alt="Inevent"
      className={`h-9 w-auto ${className}`}
    />
  );
}
