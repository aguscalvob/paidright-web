type Props = {
  /** Pixel size of the SVG mark (square). */
  size?: number;
  className?: string;
};

/**
 * The PaidRight mark — identical geometry to the app's `assets/icon.svg`:
 * navy tile (the `.logo` background), white "P", emerald tick. The only
 * tweak vs the app icon is a slightly thinner tick (stroke 18 → 14),
 * vertically centered against the P.
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
        d="M78 80 L92 96 L118 54"
        fill="none"
        stroke="#10B981"
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
