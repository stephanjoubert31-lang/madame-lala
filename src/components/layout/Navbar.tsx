"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ShoppingBag } from "lucide-react";
import { InstagramIcon, INSTAGRAM_URL } from "@/components/ui/InstagramIcon";

const navLinks = [
  { label: "Collection", href: "/collection" },
  { label: "Savoir-faire", href: "/savoir-faire" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Mode sombre uniquement sur la page d'accueil non scrollée
  const isDark = pathname === "/" && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isDark
          ? "bg-transparent"
          : "bg-[#FAF7F0]/95 backdrop-blur-sm border-b border-[#3D1F0D]/10 shadow-sm"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        {/* Logo texte + signature */}
        <Link href="/" className="flex flex-col items-center gap-[4px]" style={{ textDecoration: "none", height: "45px", justifyContent: "center" }}>
          {/* MADAME LALA */}
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.15rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 400,
              lineHeight: 1,
              color: isDark ? "#C9A84C" : "#3D1F0D",
              transition: "color 0.5s",
            }}
          >
            Madame Lala
          </span>
          {/* Signature : ligne — baobab — ligne */}
          <span className="flex items-center gap-[5px]">
            <span style={{ display: "block", width: "20px", height: "1px", backgroundColor: isDark ? "#C9A84C" : "#3D1F0D", transition: "background-color 0.5s" }} />
            <svg viewBox="0 0 100 120" width="12" height="14" fill={isDark ? "#C9A84C" : "#3D1F0D"} style={{ transition: "fill 0.5s" }}>
              <path d="M38 110 Q35 80 30 60 Q25 40 35 30 Q50 22 65 30 Q75 40 70 60 Q65 80 62 110 Z" />
              <line x1="50" y1="30" x2="20" y2="10" stroke={isDark ? "#C9A84C" : "#3D1F0D"} strokeWidth="3" />
              <line x1="50" y1="30" x2="80" y2="10" stroke={isDark ? "#C9A84C" : "#3D1F0D"} strokeWidth="3" />
              <line x1="50" y1="30" x2="50" y2="5"  stroke={isDark ? "#C9A84C" : "#3D1F0D"} strokeWidth="3" />
              <line x1="50" y1="30" x2="15" y2="25" stroke={isDark ? "#C9A84C" : "#3D1F0D"} strokeWidth="2" />
              <line x1="50" y1="30" x2="85" y2="25" stroke={isDark ? "#C9A84C" : "#3D1F0D"} strokeWidth="2" />
              <line x1="20" y1="10" x2="10" y2="3"  stroke={isDark ? "#C9A84C" : "#3D1F0D"} strokeWidth="1.5" />
              <line x1="20" y1="10" x2="25" y2="2"  stroke={isDark ? "#C9A84C" : "#3D1F0D"} strokeWidth="1.5" />
              <line x1="80" y1="10" x2="75" y2="2"  stroke={isDark ? "#C9A84C" : "#3D1F0D"} strokeWidth="1.5" />
              <line x1="80" y1="10" x2="90" y2="3"  stroke={isDark ? "#C9A84C" : "#3D1F0D"} strokeWidth="1.5" />
              <line x1="50" y1="5"  x2="44" y2="0"  stroke={isDark ? "#C9A84C" : "#3D1F0D"} strokeWidth="1.5" />
              <line x1="50" y1="5"  x2="56" y2="0"  stroke={isDark ? "#C9A84C" : "#3D1F0D"} strokeWidth="1.5" />
            </svg>
            <span style={{ display: "block", width: "20px", height: "1px", backgroundColor: isDark ? "#C9A84C" : "#3D1F0D", transition: "background-color 0.5s" }} />
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-garamond text-sm tracking-widest uppercase transition-colors hover:text-[#C9A84C]"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: isDark ? "#FAF7F0" : "#3D1F0D",
                  transition: "color 0.3s",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-5">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram Madame Lala"
            className="opacity-80 hover:opacity-100 transition-opacity"
          >
            <InstagramIcon size={20} color="#C9A84C" />
          </a>
          <Link href="/panier" aria-label="Panier">
            <ShoppingBag
              size={22}
              style={{ color: isDark ? "#FAF7F0" : "#3D1F0D", transition: "color 0.3s" }}
              className="hover:text-[#C9A84C] transition-colors"
            />
          </Link>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            style={{ color: isDark ? "#FAF7F0" : "#3D1F0D" }}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#FAF7F0] border-t border-[#3D1F0D]/10 px-6 py-8">
          <ul className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="font-garamond text-lg tracking-widest uppercase text-[#1A1008] hover:text-[#C9A84C] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
