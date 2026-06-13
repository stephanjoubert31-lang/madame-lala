import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "MADAME LALA — Sacs en raphia artisanal de Madagascar",
  description: "Sacs à main haut de gamme en raphia artisanal, fabriqués à Madagascar. Luxe authentique franco-malgache.",
  keywords: "sac raphia, Madagascar, artisanal, luxe, sac main, MADAME LALA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
