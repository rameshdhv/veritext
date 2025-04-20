import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PlagiarismDetectPage from "@/components/PlagiarismDetectPage";

export const metadata = {
  title: 'Plagiarism Detection | VeriText',
  description: 'Check if your content is original or contains plagiarized material using VeriText\'s advanced plagiarism detection feature.',
};

export default function PlagiarismDetect() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <Navbar />
      <main className="pt-16">
        <PlagiarismDetectPage />
      </main>
      <Footer />
    </div>
  );
} 