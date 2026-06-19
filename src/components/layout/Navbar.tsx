"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Collection", href: "/collection" },
  { label: "Savoir-faire", href: "/savoir-faire" },
  { label: "À propos", href: "/a-propos" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#FAF7F0]/95 backdrop-blur-sm border-b border-[#3D1F0D]/10 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex flex-col items-center gap-[4px]" style={{ textDecoration: "none", height: "45px", justifyContent: "center" }}>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.15rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              fontWeight: 400,
              lineHeight: 1,
              color: scrolled ? "#3D1F0D" : "#C9A84C",
              transition: "color 0.5s",
            }}
          >
            Madame Lala
          </span>
          <span className="flex items-center gap-[5px]">
            <span style={{ display: "block", width: "20px", height: "1px", backgroundColor: scrolled ? "#3D1F0D" : "#C9A84C", transition: "background-color 0.5s" }} />
            <svg viewBox="0 0 100 120" width="12" height="14" fill={scrolled ? "#3D1F0D" : "#C9A84C"} style={{ transition: "fill 0.5s" }}>
              <path d="M38 110 Q35 80 30 60 Q25 40 35 30 Q50 22 65 30 Q75 40 70 60 Q65 80 62 110 Z" />
              <line x1="50" y1="30" x2="20" y2="10" stroke={scrolled ? "#3D1F0D" : "#C9A84C"} strokeWidth="3" style={{ transition: "stroke 0.5s" }} />
              <line x1="50" y1="30" x2="80" y2="10" stroke={scrolled ? "#3D1F0D" : "#C9A84C"} strokeWidth="3" />
              <line x1="50" y1="30" x2="50" y2="5"  stroke={scrolled ? "#3D1F0D" : "#C9A84C"} strokeWidth="3" />
              <line x1="50" y1="30" x2="15" y2="25" stroke={scrolled ? "#3D1F0D" : "#C9A84C"} strokeWidth="2" />
              <line x1="50" y1="30" x2="85" y2="25" stroke={scrolled ? "#3D1F0D" : "#C9A84C"} strokeWidth="2" />
              <line x1="20" y1="10" x2="10" y2="3"  stroke={scrolled ? "#3D1F0D" : "#C9A84C"} strokeWidth="1.5" />
              <line x1="20" y1="10" x2="25" y2="2"  stroke={scrolled ? "#3D1F0D" : "#C9A84C"} strokeWidth="1.5" />
              <line x1="80" y1="10" x2="75" y2="2"  stroke={scrolled ? "#3D1F0D" : "#C9A84C"} strokeWidth="1.5" />
              <line x1="80" y1="10" x2="90" y2="3"  stroke={scrolled ? "#3D1F0D" : "#C9A84C"} strokeWidth="1.5" />
              <line x1="50" y1="5"  x2="44" y2="0"  stroke={scrolled ? "#3D1F0D" : "#C9A84C"} strokeWidth="1.5" />
              <line x1="50" y1="5"  x2="56" y2="0"  stroke={scrolled ? "#3D1F0D" : "#C9A84C"} strokeWidth="1.5" />
            </svg>
            <span style={{ display: "block", width: "20px", height: "1px", backgroundColor: scrolled ? "#3D1F0D" : "#C9A84C", transition: "background-color 0.5s" }} />
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm tracking-widest uppercase transition-colors hover:text-[#C9A84C] ${
                  scrolled ? "text-[#1A1008]" : "text-[#FAF7F0]"
                }`}
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right icons */}
        <div className="flex items-center gap-4">
          <Link href="/checkout" aria-label="Panier" className="relative">
            <ShoppingBag
              size={22}
              className={`transition-colors hover:text-[#C9A84C] ${
                scrolled ? "text-[#1A1008]" : "text-[#FAF7F0]"
              }`}
            />
            {count > 0 && (
              <span
                className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-[#C9A84C] text-[#1A1008] text-[10px] flex items-center justify-center font-medium"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {count > 9 ? "9+" : count}
              </span>
            )}
          </Link>
          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            {menuOpen ? (
              <X size={24} className={scrolled ? "text-[#1A1008]" : "text-[#FAF7F0]"} />
            ) : (
              <Menu size={24} className={scrolled ? "text-[#1A1008]" : "text-[#FAF7F0]"} />
            )}
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
                  className="text-lg tracking-widest uppercase text-[#1A1008] hover:text-[#C9A84C] transition-colors"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/checkout"
                className="text-lg tracking-widest uppercase text-[#1A1008] hover:text-[#C9A84C] transition-colors"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
                onClick={() => setMenuOpen(false)}
              >
                Panier {count > 0 && `(${count})`}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
