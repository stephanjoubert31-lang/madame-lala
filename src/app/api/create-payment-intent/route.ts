import { stripe } from "@/lib/stripe";
import { products } from "@/lib/products";

export async function POST(request: Request) {
  try {
    const { items } = await request.json() as {
      items: Array<{ slug: string; quantity: number }>;
    };

    if (!items || items.length === 0) {
      return Response.json({ error: "Panier vide" }, { status: 400 });
    }

    let amount = 0;
    for (const item of items) {
      const product = products.find((p) => p.slug === item.slug);
      if (!product) {
        return Response.json({ error: `Produit introuvable : ${item.slug}` }, { status: 400 });
      }
      amount += product.price * item.quantity;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: "eur",
      automatic_payment_methods: { enabled: true },
    });

    return Response.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("Stripe error:", err);
    return Response.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
