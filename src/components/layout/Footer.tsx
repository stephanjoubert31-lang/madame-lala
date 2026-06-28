import Link from "next/link";
import { InstagramIcon, INSTAGRAM_URL } from "@/components/ui/InstagramIcon";

export default function Footer() {
  return (
    <footer className="bg-[#3D1F0D] text-[#FAF7F0] mt-auto">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <h2
              className="text-2xl tracking-[0.25em] uppercase font-medium"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Madame Lala
            </h2>
            <p
              className="text-sm leading-relaxed text-[#FAF7F0]/70 max-w-xs"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Sacs en raphia artisanal, tissés à Madagascar par des artisanes d&apos;exception.
            </p>
            <div className="mt-2">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Madame Lala"
                className="inline-flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
                style={{ textDecoration: "none" }}
              >
                <InstagramIcon size={22} color="#C9A84C" />
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "#C9A84C", letterSpacing: "0.05em" }}>
                  @madamelala_raphia
                </span>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Navigation
            </h3>
            {[
              { label: "Collection", href: "/collection" },
              { label: "Savoir-faire", href: "/savoir-faire" },
              { label: "À propos", href: "/a-propos" },
              { label: "Contact", href: "/contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#FAF7F0]/70 hover:text-[#FAF7F0] transition-colors tracking-wider"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Legal */}
          <div className="flex flex-col gap-3">
            <h3
              className="text-xs tracking-[0.3em] uppercase text-[#C9A84C] mb-2"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              Informations
            </h3>
            {[
              { label: "Mentions légales", href: "/mentions-legales" },
              { label: "Politique de confidentialité", href: "/confidentialite" },
              { label: "Livraison & retours", href: "/livraison" },
              { label: "FAQ", href: "/faq" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-[#FAF7F0]/70 hover:text-[#FAF7F0] transition-colors tracking-wider"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="border-t border-[#FAF7F0]/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p
            className="text-xs text-[#FAF7F0]/40 tracking-wider"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            © {new Date().getFullYear()} Madame Lala. Tous droits réservés.
          </p>
          <p
            className="text-xs text-[#FAF7F0]/40 tracking-wider"
            style={{ fontFamily: "'Cormorant Garamond', serif" }}
          >
            Fait avec amour entre Paris & Madagascar
          </p>
        </div>
      </div>
    </footer>
  );
}
