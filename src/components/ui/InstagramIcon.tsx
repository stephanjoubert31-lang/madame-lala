const INSTAGRAM_URL =
  "https://www.instagram.com/madamelala_raphia?igsh=MW1zaW9kajBhdnhxNg%3D%3D&utm_source=qr";

export function InstagramIcon({ size = 20, color = "#C9A84C" }: { size?: number; color?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="17.5" cy="6.5" r="1" fill={color} stroke="none" />
    </svg>
  );
}

export { INSTAGRAM_URL };
