type Props = {
  size?: number;
  className?: string;
};

/** Apple logo (solid). Inherits color via `currentColor`. */
export function AppleIcon({ size = 22, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
    </svg>
  );
}

/**
 * Google Play logo — the iconic 4-colour triangle. Geometry mirrors the
 * official mark closely enough to be instantly recognisable.
 */
export function GooglePlayIcon({ size = 22, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* left/blue */}
      <path d="M3.45 1.94c-.27.27-.45.71-.45 1.27v25.58c0 .56.18 1 .45 1.27l16.04-14.06L3.45 1.94z" fill="#00C3FF" />
      {/* top/green */}
      <path d="M3.45 1.94L19.49 16 24.7 11.41 6.04 1.18c-.57-.32-1.45-.35-2.03 0a3.5 3.5 0 0 0-.56.76z" fill="#00F076" />
      {/* right/yellow */}
      <path d="M24.7 11.41L19.49 16l5.21 4.59 4.69-2.57c1.45-.83 1.45-2.18 0-3.04l-4.69-2.57z" fill="#FFC50A" />
      {/* bottom/red */}
      <path d="M3.45 30.06c.58.55 1.45.66 2.59.05L24.7 20.59 19.49 16 3.45 30.06z" fill="#FF3D44" />
    </svg>
  );
}
