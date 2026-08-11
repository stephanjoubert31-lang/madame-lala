import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Preloader from "@/components/layout/Preloader";
import Cursor from "@/components/ui/Cursor";
import Hero from "@/components/sections/Hero";
import FeaturedCollection from "@/components/sections/FeaturedCollection";
import Savoir from "@/components/sections/Savoir";
import Newsletter from "@/components/sections/Newsletter";
import Marquee from "@/components/ui/Marquee";

export default function Home() {
  return (
    <>
      <Preloader />
      <Cursor />
      <Navbar />
      <main className="flex-1">
        <Hero />
        <FeaturedCollection />
        {/* Respiration dorée entre les tableaux */}
        <div
          style={{
            backgroundColor: "#C9A84C",
            padding: "1.1rem 0",
          }}
        >
          <Marquee
            duration={22}
            items={[
              "Madame Lala",
              "Made in Madagascar",
              "Raphia tissé main",
              "Madame Lala",
              "Élégance artisanale",
              "Paris — Antananarivo",
            ]}
          />
        </div>
        <Savoir />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
