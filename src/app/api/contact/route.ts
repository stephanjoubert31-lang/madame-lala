import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const { nom, email, message } = await req.json();

    if (!nom || !email || !message) {
      return NextResponse.json({ error: "Champs manquants" }, { status: 400 });
    }

    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json({ error: "Email non configuré" }, { status: 500 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "Madame Lala <contact@madame-lala.com>",
      to: "contact@madame-lala.com",
      replyTo: email,
      subject: `Nouveau message - ${nom}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #1A1008;">
          <div style="text-align: center; padding: 32px 0 16px;">
            <p style="font-size: 11px; letter-spacing: 0.4em; color: #C9A84C; text-transform: uppercase; margin: 0 0 6px;">Madame Lala</p>
            <h1 style="font-size: 22px; font-weight: 400; color: #3D1F0D; margin: 0;">Nouveau message de ${nom}</h1>
            <div style="width: 40px; height: 1px; background: #C9A84C; margin: 14px auto 0;"></div>
          </div>

          <div style="border: 1px solid rgba(61,31,13,0.15); padding: 20px 24px; margin: 20px 0; background: #FAF7F0;">
            <p style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #3D1F0D; margin: 0 0 10px;">Expéditeur</p>
            <p style="font-size: 15px; line-height: 1.6; margin: 0; color: #1A1008;">
              <strong>${nom}</strong><br/>
              <a href="mailto:${email}" style="color: #C9A84C;">${email}</a>
            </p>
          </div>

          <div style="border: 1px solid rgba(61,31,13,0.15); padding: 20px 24px; background: #FAF7F0;">
            <p style="font-size: 11px; letter-spacing: 0.3em; text-transform: uppercase; color: #3D1F0D; margin: 0 0 10px;">Message</p>
            <p style="font-size: 15px; line-height: 1.8; margin: 0; color: #1A1008; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="text-align: center; padding: 24px 0; border-top: 1px solid rgba(61,31,13,0.1); margin-top: 24px;">
            <p style="font-size: 11px; letter-spacing: 0.3em; color: #C9A84C; text-transform: uppercase; margin: 0;">Répondre directement à cet email pour contacter ${nom}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
