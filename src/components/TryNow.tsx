"use client";

import { useState } from 'react';
import axios from 'axios';

type DetectionResult = {
  ai_score: number;
  items?: Array<{
    text: string;
    prediction: string;
    ai_score: number;
    ai_score_detail?: number;
  }>;
  cost?: number;
  status?: string;
};

type ApiResponse = {
  sapling?: DetectionResult;
  winstonai?: DetectionResult;
};

// Sample fallback response for when API credits are exhausted
const FALLBACK_RESPONSE = {
  winstonai: {
    ai_score: 0.85, // This will vary based on input
    items: [
      {
        text: "This is a sample text segment for demonstration when API credits are exhausted.",
        prediction: "ai-generated",
        ai_score: 0.92
      },
      {
        text: "You can use this fallback mode while resolving API credit issues with Eden AI.",
        prediction: "ai-generated",
        ai_score: 0.89
      }
    ]
  }
};

export default function TryNow() {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [result, setResult] = useState<null | { 
    score: number; 
    isAI: boolean; 
    confidence: string;
    details: string[];
    segments?: Array<{
      text: string;
      isAI: boolean;
      score: number;
    }>;
  }>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim() || text.trim().length < 50) {
      setError('Please enter at least 50 characters for accurate analysis.');
      return;
    }
    
    setIsAnalyzing(true);
    setError(null);
    
    try {
      let data: ApiResponse;
      
      // If fallback mode is enabled, use the mock response
      if (useFallback) {
        // Create a somewhat realistic response based on text properties
        const mockScore = 0.5 + (text.length % 50) / 100; // Vary the score based on text length
        const mockResponse = {...FALLBACK_RESPONSE};
        
        if (mockResponse.winstonai) {
          mockResponse.winstonai.ai_score = mockScore;
          
          // Create segments from the input text
          const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
          mockResponse.winstonai.items = sentences.slice(0, 5).map((sentence, i) => ({
            text: sentence.trim(),
            prediction: i % 3 === 0 ? "human-written" : "ai-generated",
            ai_score: i % 3 === 0 ? 0.3 + (i / 10) : 0.7 + (i / 10)
          }));
        }
        
        data = mockResponse;
        console.log("Using fallback mode with mock data", data);
      } else {
        // Use the real API
        const response = await axios.post('/api/detect-ai', { text });
        data = response.data;
      }
      
      // Prefer Winston AI results, but fall back to Sapling if needed
      const detector = data.winstonai || data.sapling;
      
      if (detector) {
        const aiScore = detector.ai_score * 100; // Convert to percentage
        const isAI = aiScore > 70; // Threshold can be adjusted
        
        // Process segments for detailed analysis
        const segments = detector.items?.map(item => ({
          text: item.text,
          isAI: item.prediction === 'ai-generated',
          score: item.ai_score * 100
        })) || [];

        // Count AI segments
        const aiSegments = segments.filter(segment => segment.isAI).length;
        const totalSegments = segments.length;
        const aiSegmentPercentage = totalSegments > 0 
          ? Math.round((aiSegments / totalSegments) * 100) 
          : 0;
        
        setResult({
          score: aiScore,
          isAI,
          confidence: aiScore > 90 || aiScore < 10 ? 'Very High' : aiScore > 75 || aiScore < 25 ? 'High' : 'Medium',
          details: [
            isAI ? 'Statistical patterns consistent with AI generation' : 'Natural language variations typical of human writing',
            isAI ? 'Consistent tone and style throughout text' : 'Subtle style shifts throughout content',
            `${aiSegmentPercentage}% of text segments show AI patterns`,
            `Overall AI probability score: ${aiScore.toFixed(1)}%`,
          ],
          segments
        });
      } else {
        setError('Could not analyze the text. Please try again.');
      }
    } catch (err: any) {
      console.error('Analysis error:', err);
      // Check specifically for 402 Payment Required error
      if (err.response?.status === 402) {
        setError('API credits exhausted. Enable fallback mode for testing, or add more credits to your Eden AI account.');
        setUseFallback(true); // Auto-enable fallback mode after a 402 error
      } else {
        setError(err.response?.data?.error || 'Failed to analyze text. Please try again.');
      }
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <section id="try-now" className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Try VeriText Now</h2>
          <p className="text-xl text-gray-600">
            Paste any text below to instantly check if it was written by AI or a human.
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Paste your text here (minimum 100 characters for accurate analysis)..."
              className="w-full h-40 p-4 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              disabled={isAnalyzing}
            />
            
            <div className="mt-2 flex items-center mb-4">
              <input
                type="checkbox"
                id="fallback-toggle"
                checked={useFallback}
                onChange={(e) => setUseFallback(e.target.checked)}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="fallback-toggle" className="text-sm text-gray-600">
                Use fallback mode (for demo/testing when API credits are exhausted)
              </label>
            </div>
            
            <div className="mt-4 flex justify-between items-center flex-wrap">
              <div className="text-sm text-gray-500 mb-2 sm:mb-0">
                {text.length} characters (Free: up to 500 words)
              </div>
              <button
                type="submit"
                disabled={isAnalyzing || text.length < 50}
                className={`px-6 py-3 rounded-md font-medium ${
                  isAnalyzing || text.length < 50
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-primary text-primary-foreground hover:bg-primary-hover'
                } transition-colors`}
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Text'}
              </button>
            </div>
            
            {error && (
              <div className="mt-4 text-red-500 text-sm">
                {error}
              </div>
            )}
          </form>
          
          {result && (
            <div className="border-t border-gray-200 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h3 className="text-xl font-bold mb-2 md:mb-0">Analysis Results</h3>
                <div className="flex items-center">
                  <div className={`px-4 py-1 rounded-full text-primary-foreground text-sm font-semibold ${
                    result.isAI ? 'bg-red-500' : 'bg-primary'
                  }`}>
                    {result.isAI ? 'AI-Generated' : 'Human-Written'}
                  </div>
                  <div className="ml-3 text-sm text-gray-600">
                    Confidence: <span className="font-semibold">{result.confidence}</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="h-2 w-full bg-gray-200 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${result.isAI ? 'bg-red-500' : 'bg-primary'}`}
                    style={{ width: `${result.score}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>Human-Written</span>
                  <span>AI-Generated</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">Key Indicators:</h4>
                <ul className="space-y-2">
                  {result.details.map((detail, index) => (
                    <li key={index} className="flex items-start">
                      <svg className={`w-5 h-5 mr-2 mt-0.5 flex-shrink-0 ${
                        result.isAI ? 'text-red-500' : 'text-primary'
                      }`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {result.segments && result.segments.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Segment Analysis:</h4>
                  <div className="space-y-4 max-h-64 overflow-y-auto">
                    {result.segments.map((segment, index) => (
                      <div 
                        key={index} 
                        className={`p-3 rounded-md border ${
                          segment.isAI 
                            ? 'border-red-200 bg-red-50' 
                            : 'border-primary-200 bg-accent/30'
                        }`}
                      >
                        <div className="flex justify-between mb-2">
                          <span className={`text-xs font-medium ${
                            segment.isAI ? 'text-red-600' : 'text-primary-foreground'
                          }`}>
                            {segment.isAI ? 'AI-Generated' : 'Human-Written'} 
                            <span className="text-gray-500 ml-2">
                              ({segment.score.toFixed(1)}%)
                            </span>
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{segment.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {useFallback && (
                <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                  <p className="text-sm text-yellow-700">
                    <strong>Note:</strong> Results are generated using fallback mode. For more accurate analysis, please add credits to your Eden AI account.
                  </p>
                </div>
              )}
              
              <div className="mt-6 text-center">
                <a 
                  href="#pricing" 
                  className="text-primary hover:text-primary-hover font-medium"
                >
                  Upgrade for more detailed analysis and higher word limits →
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 