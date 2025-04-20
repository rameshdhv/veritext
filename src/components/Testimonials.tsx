export default function Testimonials() {
  const testimonials = [
    {
      quote: "VeriText has become an essential tool for our editorial team. The accuracy of the AI detection is impressive, and it saves us hours of manual verification.",
      author: "Sarah Johnson",
      role: "Editor-in-Chief, Digital Publishing Group",
      avatar: "https://randomuser.me/api/portraits/women/17.jpg"
    },
    {
      quote: "As an educator, I need to quickly determine if my students' work is original. VeriText gives me confidence in identifying AI-generated content with clear, detailed reports.",
      author: "Dr. Michael Chen",
      role: "Professor of Computer Science, University of Technology",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      quote: "Our content marketing team uses VeriText to ensure all our material maintains human authenticity. The interface is intuitive and the results are consistently reliable.",
      author: "Jessica Torres",
      role: "Content Director, MarketEdge Solutions",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg"
    }
  ];

  const stats = [
    { value: "10,000+", label: "Active Users" },
    { value: "30M+", label: "Words Analyzed" },
    { value: "98.7%", label: "Detection Accuracy" },
    { value: "30+", label: "Supported Languages" }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            VeriText is trusted by educators, publishers, content managers, and hiring teams worldwide.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <img src={testimonial.avatar} alt={testimonial.author} className="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 className="font-bold">{testimonial.author}</h4>
                  <p className="text-gray-600 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-yellow-400 ${i >= 4 ? 'opacity-30' : ''}`}>★</span>
                ))}
              </div>
              <p className="text-gray-700">{testimonial.quote}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary text-primary-foreground rounded-lg p-10">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-6">Join thousands of professionals who trust VeriText</h3>
            <p className="text-lg mb-8">
              From teachers checking student submissions to publishers ensuring original content, our tools are helping maintain content integrity across industries.
            </p>
            <a 
              href="#pricing" 
              className="px-6 py-3 text-lg rounded-md bg-white text-primary font-medium hover:bg-gray-100 transition-colors"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 