"use client";

import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Link from "next/link";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function CheckoutForm({ total }: { total: number }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error: stripeError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/confirmation`,
      },
    });

    if (stripeError) {
      setError(stripeError.message ?? "Une erreur est survenue.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <PaymentElement
        options={{
          layout: "tabs",
          wallets: { applePay: "auto", googlePay: "auto" },
        }}
      />
      {error && (
        <p
          className="text-red-600 text-sm"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full py-4 bg-[#3D1F0D] text-[#FAF7F0] text-sm tracking-[0.25em] uppercase hover:bg-[#5c2e12] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ fontFamily: "'Cormorant Garamond', serif" }}
      >
        {loading ? "Traitement en cours…" : `Payer ${total} €`}
      </button>
    </form>
  );
}

export default function CheckoutPage() {
  const { items, total, removeFromCart, updateQuantity } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;
    setClientSecret(null);
    setFetchError(null);

    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({ slug: i.product.slug, quantity: i.quantity })),
      }),
    })
      .then((r) => r.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else setFetchError(data.error ?? "Erreur lors de la création du paiement.");
      })
      .catch(() => setFetchError("Erreur réseau."));
  }, [items]);

  const fontStyle = { fontFamily: "'Cormorant Garamond', serif" };

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-[#FAF7F0] pt-28 pb-24 px-6 md:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-[#C9A84C] text-xs tracking-[0.5em] uppercase mb-3" style={fontStyle}>
              Paiement sécurisé
            </p>
            <h1 className="text-[#3D1F0D] text-4xl font-light" style={fontStyle}>
              Votre commande
            </h1>
          </div>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#1A1008]/60 text-lg mb-6" style={fontStyle}>
                Votre panier est vide.
              </p>
              <Link
                href="/collection"
                className="inline-block px-10 py-4 bg-[#3D1F0D] text-[#FAF7F0] text-sm tracking-[0.25em] uppercase hover:bg-[#5c2e12] transition-colors"
                style={fontStyle}
              >
                Voir la collection
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Récapitulatif */}
              <div className="flex flex-col gap-6">
                <h2 className="text-[#3D1F0D] text-xl tracking-wider" style={fontStyle}>
                  Récapitulatif
                </h2>
                <div className="flex flex-col gap-4">
                  {items.map((item) => (
                    <div
                      key={item.product.slug}
                      className="flex items-center justify-between gap-4 pb-4 border-b border-[#3D1F0D]/10"
                    >
                      <div
                        className="w-16 h-16 shrink-0"
                        style={{ backgroundColor: item.product.color + "22", border: `1px solid ${item.product.color}20` }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-[#1A1008] font-light tracking-wider" style={fontStyle}>
                          {item.product.name}
                        </p>
                        <p className="text-[#1A1008]/50 text-sm" style={fontStyle}>
                          {item.product.description}
                        </p>
                        <div className="flex items-center gap-3 mt-1">
                          <button
                            onClick={() => updateQuantity(item.product.slug, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center border border-[#3D1F0D]/20 text-[#3D1F0D] hover:border-[#3D1F0D] transition-colors"
                            style={fontStyle}
                          >
                            −
                          </button>
                          <span className="text-[#1A1008] text-sm" style={fontStyle}>{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.slug, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center border border-[#3D1F0D]/20 text-[#3D1F0D] hover:border-[#3D1F0D] transition-colors"
                            style={fontStyle}
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.product.slug)}
                            className="ml-2 text-[#1A1008]/30 text-xs hover:text-[#1A1008]/60 transition-colors"
                            style={fontStyle}
                          >
                            Retirer
                          </button>
                        </div>
                      </div>
                      <p className="text-[#3D1F0D] font-light shrink-0" style={fontStyle}>
                        {item.product.price * item.quantity} €
                      </p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-2">
                  <p className="text-[#1A1008]/60 text-sm tracking-wider" style={fontStyle}>
                    Livraison offerte
                  </p>
                  <p className="text-[#3D1F0D] text-2xl font-light" style={fontStyle}>
                    {total} €
                  </p>
                </div>
              </div>

              {/* Paiement */}
              <div className="flex flex-col gap-6">
                <h2 className="text-[#3D1F0D] text-xl tracking-wider" style={fontStyle}>
                  Paiement
                </h2>
                {fetchError && (
                  <p className="text-red-600 text-sm" style={fontStyle}>{fetchError}</p>
                )}
                {clientSecret ? (
                  <Elements
                    stripe={stripePromise}
                    options={{
                      clientSecret,
                      appearance: {
                        theme: "stripe",
                        variables: {
                          colorPrimary: "#3D1F0D",
                          colorBackground: "#FAF7F0",
                          colorText: "#1A1008",
                          colorDanger: "#c0392b",
                          fontFamily: "Cormorant Garamond, Georgia, serif",
                          borderRadius: "0px",
                          spacingUnit: "4px",
                        },
                      },
                    }}
                  >
                    <CheckoutForm total={total} />
                  </Elements>
                ) : (
                  !fetchError && (
                    <div className="flex items-center gap-3 py-10">
                      <div className="w-4 h-4 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
                      <p className="text-[#1A1008]/50 text-sm" style={fontStyle}>
                        Préparation du paiement…
                      </p>
                    </div>
                  )
                )}
                <p className="text-[#1A1008]/40 text-xs tracking-wider" style={fontStyle}>
                  Paiement 100 % sécurisé par Stripe · SSL · Apple Pay · Google Pay
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
