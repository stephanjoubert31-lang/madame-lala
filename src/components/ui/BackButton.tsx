import Link from "next/link";

interface BackButtonProps {
  href?: string;
  label?: string;
}

export default function BackButton({ href = "/", label = "Accueil" }: BackButtonProps) {
  return (
    <div className="mb-8">
      <Link
        href={href}
        className="inline-flex items-center gap-2 hover:text-[#C9A84C] transition-colors duration-300"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "0.85rem",
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#3D1F0D",
          textDecoration: "none",
        }}
      >
        <span style={{ fontSize: "1rem" }}>←</span>
        {label}
      </Link>
    </div>
  );
}
