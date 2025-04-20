export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Paste Your Text",
      description: "Copy and paste the text you want to analyze into our simple interface. Support for documents up to 25,000 words.",
      icon: (
        <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Analyze Content",
      description: "Click 'Analyze Text' and our advanced AI algorithms will instantly process the content to determine its origin.",
      icon: (
        <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Review Detailed Report",
      description: "Get comprehensive analysis showing AI probability score, content patterns, and specific markers identified.",
      icon: (
        <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      number: "04",
      title: "Download & Share",
      description: "Export your results as a PDF report or share directly via link with colleagues, students, or clients.",
      icon: (
        <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
        </svg>
      )
    }
  ];

  return (
    <section id="how-it-works" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How VeriText Works</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            VeriText uses advanced AI algorithms to analyze text and detect patterns that indicate AI generation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="absolute w-16 h-16 rounded-full bg-accent"></div>
              <div className="relative text-primary">
                {step.icon}
              </div>
              <div className="mt-8">
                <div className="text-sm font-semibold text-primary mb-2">{step.number}</div>
                <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <a 
            href="#try-now" 
            className="px-8 py-4 text-lg rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary-hover transition-colors"
          >
            Try It Now
          </a>
        </div>
      </div>
    </section>
  );
} 