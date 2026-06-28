"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import BackButton from "@/components/ui/BackButton";
import { InstagramIcon, INSTAGRAM_URL } from "@/components/ui/InstagramIcon";

const inputStyle = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "1rem",
  color: "#1A1008",
  backgroundColor: "#fff",
  border: "1px solid rgba(61,31,13,0.2)",
  padding: "0.9rem 1.1rem",
  width: "100%",
  outline: "none",
  letterSpacing: "0.02em",
} as React.CSSProperties;

const labelStyle = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  color: "#3D1F0D",
  display: "block",
  marginBottom: "6px",
};

function InstagramLink() {
  return (
    <a
      href={INSTAGRAM_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity"
      style={{ textDecoration: "none" }}
    >
      <InstagramIcon size={22} color="#C9A84C" />
      <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "#C9A84C", letterSpacing: "0.05em" }}>
        @madamelala_raphia
      </span>
    </a>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ nom: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "sent" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF7F0] pt-24 pb-24 px-6">
        <div className="max-w-xl mx-auto flex flex-col gap-12">
          <BackButton />

          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.72rem", letterSpacing: "0.45em", color: "#C9A84C", textTransform: "uppercase" }}>
              Nous écrire
            </p>
            <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(2.5rem, 5vw, 3.5rem)", fontWeight: 400, color: "#3D1F0D", lineHeight: 1.1 }}>
              Contact
            </h1>
            <div style={{ width: "48px", height: "1px", backgroundColor: "#C9A84C" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.15rem", color: "#1A1008", opacity: 0.65, lineHeight: 1.8 }}>
              Une question ? Nous vous répondons avec plaisir.
            </p>
          </div>

          {/* Formulaire / Confirmation */}
          {status === "sent" ? (
            <div className="text-center flex flex-col items-center gap-5 py-12">
              <div style={{ width: "48px", height: "1px", backgroundColor: "#C9A84C" }} />
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", fontWeight: 400, color: "#3D1F0D" }}>
                Message envoyé
              </h2>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem", color: "#1A1008", opacity: 0.65, lineHeight: 1.8 }}>
                Merci pour votre message. Nous reviendrons vers vous dans les plus brefs délais.
              </p>
              <InstagramLink />
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div>
                <label htmlFor="nom" style={labelStyle}>Nom</label>
                <input id="nom" type="text" required placeholder="Votre nom"
                  value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })}
                  style={inputStyle} className="focus:border-[#C9A84C] transition-colors" />
              </div>
              <div>
                <label htmlFor="email" style={labelStyle}>Email</label>
                <input id="email" type="email" required placeholder="votre@email.com"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  style={inputStyle} className="focus:border-[#C9A84C] transition-colors" />
              </div>
              <div>
                <label htmlFor="message" style={labelStyle}>Message</label>
                <textarea id="message" required rows={6} placeholder="Votre message..."
                  value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  style={{ ...inputStyle, resize: "vertical" }} className="focus:border-[#C9A84C] transition-colors" />
              </div>

              {status === "error" && (
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.9rem", color: "#c0392b" }}>
                  Une erreur est survenue. Veuillez réessayer ou nous écrire directement.
                </p>
              )}

              <button type="submit" disabled={status === "loading"}
                style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "0.8rem", letterSpacing: "0.3em", textTransform: "uppercase", backgroundColor: status === "loading" ? "#8a6a3a" : "#3D1F0D", color: "#FAF7F0", padding: "1rem 2.5rem", border: "none", cursor: status === "loading" ? "wait" : "pointer", alignSelf: "flex-start" }}
                className="hover:bg-[#5c2e12] transition-colors">
                {status === "loading" ? "Envoi en cours…" : "Envoyer"}
              </button>
            </form>
          )}

          {/* Coordonnées */}
          <div className="border-t border-[#3D1F0D]/10 pt-10 flex flex-col items-center gap-5">
            <a href="mailto:contact@madame-lala.com"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1rem", letterSpacing: "0.08em", color: "#3D1F0D", textDecoration: "none" }}
              className="hover:text-[#C9A84C] transition-colors">
              contact@madame-lala.com
            </a>
            <InstagramLink />
          </div>

        </div>
      </main>
      <Footer />
    </>
  );
}
