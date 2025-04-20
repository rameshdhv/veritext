import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TryNow from "@/components/TryNow";

export const metadata = {
  title: 'AI Content Detection | VeriText',
  description: 'Detect if text content was written by AI or a human with VeriText\'s advanced AI detection technology.',
};

export default function AIDetection() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="pt-16">
        <TryNow />
      </main>
      <Footer />
    </div>
  );
} 