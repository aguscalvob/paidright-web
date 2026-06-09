type Props = {
  /** Pixel size of the SVG mark (square). */
  size?: number;
  className?: string;
};

/**
 * The PaidRight mark — a stylised "P" with an emerald tick. Same geometry as
 * the app's `assets/icon.svg` so the website and app logo are identical.
 * The "P" is white (it sits inside the navy `.logo` tile, mirroring the app
 * icon: navy background, white P, emerald tick).
 */
export function Logo({ size = 30, className }: Props) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 148 148"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path
        fill="#FFFFFF"
        fillRule="evenodd"
        d="M18 108 L18 40 L46 40 A22 22 0 0 1 46 84 L37 84 L37 108 Z M37 53 L46 53 A9 9 0 0 1 46 71 L37 71 Z"
      />
      <path
        d="M84 80 L98 96 L124 54"
        fill="none"
        stroke="#10B981"
        strokeWidth={18}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
