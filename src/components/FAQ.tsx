"use client";

import { useState } from 'react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  
  const faqs = [
    {
      question: "How accurate is VeriText's AI detection?",
      answer: "VeriText achieves over 95% accuracy in detecting AI-generated content from popular models like ChatGPT, GPT-4, Bard, Claude, and others. Our detection algorithms are constantly improved to keep up with advancements in AI text generation."
    },
    {
      question: "Can VeriText detect partially AI-generated content?",
      answer: "Yes! VeriText doesn't just provide a binary yes/no result. It analyzes text segments individually and provides an overall probability score, helping you identify which parts of a text may have been written or edited by AI."
    },
    {
      question: "What types of AI-generated content can VeriText detect?",
      answer: "VeriText can detect content produced by all major AI writing tools, including OpenAI's GPT models, Google's Bard, Anthropic's Claude, and many others. Our system is continuously updated to recognize patterns from the latest AI writing technologies."
    },
    {
      question: "How much text can I analyze with the free plan?",
      answer: "The free plan allows you to analyze up to 500 words per check, with a limit of 5 checks per day. This is perfect for occasional use or testing our service. For more extensive usage, consider our affordable subscription plans."
    },
    {
      question: "Will my content be stored or shared?",
      answer: "We prioritize your privacy. Content submitted for analysis is processed securely and not stored beyond the analysis period. We never share or reuse your content for training our models or for any other purposes. For enterprise users, we offer additional compliance features."
    },
    {
      question: "How does plagiarism detection work with VeriText?",
      answer: "VeriText checks content against billions of web pages, academic papers, and other published works to identify matching text. The system provides a similarity score and highlights matched passages, helping you ensure content originality and proper attribution."
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about VeriText's AI detection capabilities.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                className={`w-full p-4 flex justify-between items-center text-left font-medium text-lg focus:outline-none ${
                  openIndex === index ? 'bg-gray-50' : ''
                }`}
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 p-4' : 'max-h-0'
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-lg mb-6">
            Still have questions? We're here to help.
          </p>
          <a 
            href="#contact" 
            className="px-6 py-3 rounded-md text-primary border border-primary hover:bg-accent/30 transition-colors font-medium"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
} 