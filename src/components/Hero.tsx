import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="py-20 px-4 mx-auto max-w-7xl">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Know <span className="text-primary">Instantly</span> If Content Is AI-Generated
          </h1>
          <p className="text-xl mb-8 text-gray-700">
            VeriText uses advanced algorithms to detect AI-written content with industry-leading accuracy. 
            Paste your text and get instant analysis on originality and authorship.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link 
              href="/ai-detection" 
              className="px-6 py-3 text-center rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors"
            >
              AI Detection
            </Link>
            <Link 
              href="/plagiarism-detect" 
              className="px-6 py-3 text-center rounded-md border border-gray-300 font-medium hover:bg-gray-100 transition-colors"
            >
              Plagiarism Check
            </Link>
          </div>
        </div>
        <div className="w-full md:w-2/5">
          <div className="relative rounded-lg shadow-xl overflow-hidden border border-gray-200 bg-white">
            <div className="p-4 bg-gray-100 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <div className="p-6">
              <div className="p-4 mb-4 rounded bg-gray-100 text-sm">
                Paste your text here to verify if it's human or AI-written...
              </div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
              <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm">
                Analyze Text
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 