export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <path d="M16 3 L29 28 H3 Z" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round" />
        <path d="M16 12 L22 24 H10 Z" fill="currentColor" />
      </svg>
      <span className="font-display text-2xl tracking-wider leading-none">
        IN<span className="text-primary">EV</span>ENT
      </span>
    </div>
  );
}
