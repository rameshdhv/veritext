export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      billing: "forever",
      description: "Perfect for individuals who need occasional content verification.",
      features: [
        "500 words per scan",
        "Basic AI detection",
        "5 scans per day",
        "Web-based interface",
        "Standard accuracy (92%)"
      ],
      cta: "Start Free",
      popular: false
    },
    {
      name: "Pro",
      price: "$12",
      billing: "per month",
      description: "Ideal for content creators, writers, and small businesses.",
      features: [
        "25,000 words per scan",
        "Advanced AI detection",
        "Unlimited scans",
        "Plagiarism checking",
        "PDF report exports",
        "Enhanced accuracy (98%)",
        "API access (10k words/month)"
      ],
      cta: "Start 7-Day Free Trial",
      popular: true
    },
    {
      name: "Team",
      price: "$49",
      billing: "per month",
      description: "For organizations needing robust content verification tools.",
      features: [
        "50,000 words per scan",
        "Premium AI detection",
        "Unlimited scans",
        "Plagiarism checking",
        "PDF & branded reports",
        "Maximum accuracy (98.7%)",
        "API access (100k words/month)",
        "Team management dashboard",
        "Priority support"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <section id="pricing" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose the plan that's right for you. All plans include core AI detection features.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <div 
              key={index} 
              className={`bg-white rounded-lg overflow-hidden shadow-lg border ${
                plan.popular 
                  ? 'border-primary relative' 
                  : 'border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="bg-primary text-primary-foreground text-xs font-bold uppercase py-1 px-3 tracking-wide text-center">
                  Most Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <span className="text-4xl font-bold">${plan.price}</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg className="w-5 h-5 mr-2 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button 
                  className={`w-full py-3 px-4 rounded-md font-medium transition-colors ${
                    plan.popular 
                    ? 'bg-primary hover:bg-primary-hover text-primary-foreground' 
                    : 'border border-gray-300 hover:bg-gray-100'
                  }`}
                >
                  {plan.cta}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center text-lg">
          Need a custom plan for your enterprise? <a href="#contact" className="text-primary hover:underline">Contact our sales team</a>.
        </div>
      </div>
    </section>
  );
} 