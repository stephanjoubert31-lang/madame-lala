import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-05-27.dahlia",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature") ?? "";
  const secret = process.env.STRIPE_WEBHOOK_SECRET ?? "";

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch {
    return NextResponse.json({ error: "Signature invalide" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_email;
    const meta = session.metadata ?? {};
    const total = session.amount_total ? (session.amount_total / 100).toFixed(2) : "—";

    if (email && process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: "Madame Lala <contact@madame-lala.com>",
        to: email,
        subject: "Votre commande Madame Lala — Confirmation",
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1A1008;">
            <div style="text-align: center; padding: 40px 0 20px;">
              <p style="font-size: 11px; letter-spacing: 0.4em; color: #C9A84C; text-transform: uppercase; margin-bottom: 8px;">Madame Lala</p>
              <h1 style="font-size: 28px; font-weight: 400; color: #3D1F0D; margin: 0;">Merci pour votre commande</h1>
              <div style="width: 40px; height: 1px; background: #C9A84C; margin: 16px auto;"></div>
            </div>

            <p style="font-size: 16px; line-height: 1.8; color: #1A1008; opacity: 0.75;">
              Bonjour ${meta.prenom || ""} ${meta.nom || ""},
            </p>
            <p style="font-size: 16px; line-height: 1.8; color: #1A1008; opacity: 0.75;">
              Nous avons bien reçu votre règlement de <strong>${total} €</strong>.
              Votre pièce est en cours de préparation et vous sera expédiée dans les meilleurs délais.
            </p>

            <div style="border: 1px solid rgba(61,31,13,0.15); padding: 20px 24px; margin: 28px 0; background: #FAF7F0;">
              <p style="font-size: 10px; letter-spacing: 0.3em; text-transform: uppercase; color: #3D1F0D; margin: 0 0 12px;">Adresse de livraison</p>
              <p style="font-size: 15px; line-height: 1.7; margin: 0; color: #1A1008;">
                ${meta.prenom} ${meta.nom}<br/>
                ${meta.adresse}<br/>
                ${meta.codePostal} ${meta.ville}<br/>
                ${meta.pays}
              </p>
            </div>

            <p style="font-size: 14px; line-height: 1.8; color: #1A1008; opacity: 0.6;">
              Pour toute question, répondez à cet email ou écrivez-nous à
              <a href="mailto:contact@madame-lala.com" style="color: #C9A84C;">contact@madame-lala.com</a>
            </p>

            <div style="text-align: center; padding: 32px 0; border-top: 1px solid rgba(61,31,13,0.1); margin-top: 32px;">
              <p style="font-size: 11px; letter-spacing: 0.3em; color: #C9A84C; text-transform: uppercase; margin: 0;">Madame Lala — Made in Madagascar</p>
            </div>
          </div>
        `,
      });
    }
  }

  return NextResponse.json({ received: true });
}
