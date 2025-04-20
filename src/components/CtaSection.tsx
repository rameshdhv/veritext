export default function CtaSection() {
  return (
    <section id="cta" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Start Verifying Content Authorship Today
        </h2>
        <p className="text-xl mb-8 max-w-3xl mx-auto text-gray-700">
          Join thousands of professionals using VeriText to ensure content authenticity and maintain quality standards.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <a 
            href="#try-now" 
            className="px-8 py-4 text-lg rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors"
          >
            Try For Free
          </a>
          <a 
            href="#pricing" 
            className="px-8 py-4 text-lg rounded-md border-2 border-primary text-primary font-medium hover:bg-accent/30 transition-colors"
          >
            View Pricing Plans
          </a>
        </div>
        
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="flex items-center gap-3">
            <div className="bg-accent rounded-lg p-4 inline-block">
              <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <div className="text-left">
              <span className="block font-semibold text-gray-900">Secure & Private</span>
              <span className="text-sm text-gray-600">Your content stays private</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-accent rounded-lg p-4 inline-block">
              <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="text-left">
              <span className="block font-semibold text-gray-900">Fast Results</span>
              <span className="text-sm text-gray-600">Analysis in seconds</span>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="bg-accent rounded-lg p-4 inline-block">
              <svg className="w-6 h-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="text-left">
              <span className="block font-semibold text-gray-900">Accuracy Guaranteed</span>
              <span className="text-sm text-gray-600">99% detection accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 