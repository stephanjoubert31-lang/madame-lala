"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type PaymentStatus = "loading" | "succeeded" | "processing" | "failed";

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const { clearCart } = useCart();
  const [status, setStatus] = useState<PaymentStatus>("loading");
  const fontStyle = { fontFamily: "'Cormorant Garamond', serif" };

  useEffect(() => {
    const clientSecret = searchParams.get("payment_intent_client_secret");
    if (!clientSecret) {
      setStatus("failed");
      return;
    }

    stripePromise.then(async (stripe) => {
      if (!stripe) { setStatus("failed"); return; }
      const { paymentIntent } = await stripe.retrievePaymentIntent(clientSecret);
      switch (paymentIntent?.status) {
        case "succeeded":
          clearCart();
          setStatus("succeeded");
          break;
        case "processing":
          setStatus("processing");
          break;
        default:
          setStatus("failed");
      }
    });
  }, [searchParams, clearCart]);

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#FAF7F0] pt-28 pb-24 px-6 md:px-10">
        <div className="max-w-xl mx-auto text-center flex flex-col items-center gap-8">
          {status === "loading" && (
            <>
              <div className="w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
              <p className="text-[#1A1008]/50 text-lg" style={fontStyle}>
                Vérification du paiement…
              </p>
            </>
          )}

          {status === "succeeded" && (
            <>
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#C9A84C20", border: "1px solid #C9A84C40" }}
              >
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="#C9A84C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div>
                <p className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-3" style={fontStyle}>
                  Commande confirmée
                </p>
                <h1 className="text-[#3D1F0D] text-4xl md:text-5xl font-light" style={fontStyle}>
                  Merci pour votre achat
                </h1>
              </div>
              <div className="w-12 h-px bg-[#C9A84C]" />
              <p className="text-[#1A1008]/60 text-lg leading-relaxed" style={fontStyle}>
                Votre commande a bien été reçue. Vous recevrez un email de confirmation sous peu.
                Vos créations MADAME LALA sont en cours de préparation à Madagascar.
              </p>
              <Link
                href="/"
                className="inline-block px-12 py-4 bg-[#3D1F0D] text-[#FAF7F0] text-sm tracking-[0.3em] uppercase hover:bg-[#5c2e12] transition-colors duration-300"
                style={fontStyle}
              >
                Retour à l&apos;accueil
              </Link>
            </>
          )}

          {status === "processing" && (
            <>
              <p className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase" style={fontStyle}>
                Paiement en cours
              </p>
              <h1 className="text-[#3D1F0D] text-4xl font-light" style={fontStyle}>
                Votre paiement est en traitement
              </h1>
              <p className="text-[#1A1008]/60 text-lg" style={fontStyle}>
                Vous recevrez une confirmation par email dès validation.
              </p>
              <Link href="/" className="text-[#C9A84C] text-sm tracking-widest uppercase" style={fontStyle}>
                Retour à l&apos;accueil
              </Link>
            </>
          )}

          {status === "failed" && (
            <>
              <p className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase" style={fontStyle}>
                Paiement refusé
              </p>
              <h1 className="text-[#3D1F0D] text-4xl font-light" style={fontStyle}>
                Une erreur est survenue
              </h1>
              <p className="text-[#1A1008]/60 text-lg" style={fontStyle}>
                Le paiement n&apos;a pas pu être traité. Veuillez réessayer.
              </p>
              <Link
                href="/checkout"
                className="inline-block px-12 py-4 bg-[#3D1F0D] text-[#FAF7F0] text-sm tracking-[0.3em] uppercase hover:bg-[#5c2e12] transition-colors"
                style={fontStyle}
              >
                Réessayer
              </Link>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
