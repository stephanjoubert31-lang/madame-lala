import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartView from "@/components/sections/CartView";

export default function PanierPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FAF7F0] pt-28 pb-24 px-6">
        <CartView />
      </main>
      <Footer />
    </>
  );
}
