"use client";

import { useState } from 'react';
import axios, { AxiosError } from 'axios';

type PlagiarismSource = {
  url?: string;
  plagiarized_text: string;
  similarity_score: number;
};

type PlagiarismResult = {
  score: number;
  provider?: string;
  sources?: PlagiarismSource[];
  status?: string;
  matching_characters?: number;
  total_characters?: number;
  total_percentage?: number;
};

// Sample fallback response for when API credits are exhausted
const FALLBACK_RESPONSE = {
  originalityai: {
    score: 0.65,
    status: "success",
    sources: [
      {
        plagiarized_text: "This is a sample text that would be flagged as plagiarized in fallback mode.",
        similarity_score: 0.82
      },
      {
        url: "https://example.com/sample-source",
        plagiarized_text: "Another example of plagiarized content for demonstration purposes.",
        similarity_score: 0.75
      }
    ],
    matching_characters: 150,
    total_characters: 500,
    total_percentage: 30
  }
};

export default function PlagiarismChecker() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [result, setResult] = useState<PlagiarismResult | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim() || text.trim().length < 50) {
      setError('Please enter at least 50 characters for accurate analysis.');
      return;
    }
    
    setIsChecking(true);
    setError(null);
    
    try {
      let data: { originalityai?: PlagiarismResult };
      
      // If fallback mode is enabled, use the mock response
      if (useFallback) {
        // Create a somewhat realistic response based on text properties
        const mockResponse = {...FALLBACK_RESPONSE};
        
        if (mockResponse.originalityai) {
          // Adjust the score based on text length and complexity
          const mockScore = 0.2 + (text.length % 50) / 100;
          mockResponse.originalityai.score = mockScore;
          
          // Create customized sources from the input text
          const sentences = text.match(/[^\.!\?]+[\.!\?]+/g) || [text];
          if (sentences.length > 2) {
            mockResponse.originalityai.sources = sentences.slice(0, 3).map((sentence, i) => ({
              url: i === 0 ? undefined : `https://example${i}.com/content`,
              plagiarized_text: sentence.trim(),
              similarity_score: 0.6 + (i / 10)
            }));
          }
          
          // Adjust character counts to match the input text
          const totalChars = text.length;
          const matchingChars = Math.floor(totalChars * mockScore);
          mockResponse.originalityai.matching_characters = matchingChars;
          mockResponse.originalityai.total_characters = totalChars;
          mockResponse.originalityai.total_percentage = Math.floor((matchingChars / totalChars) * 100);
        }
        
        data = mockResponse;
        console.log("Using fallback mode with mock data", data);
      } else {
        // Use the real API
        const response = await axios.post('/api/detect-plagiarism', { text, title });
        data = response.data;
      }
      
      const detector = data.originalityai;
      
      if (detector) {
        setResult(detector);
      } else {
        setError('Could not analyze the text. Please try again.');
      }
    } catch (err: unknown) {
      console.error('Plagiarism check error:', err);
      
      // Check specifically for 402 Payment Required error
      const error = err as AxiosError;
      if (error.response?.status === 402) {
        setError('API credits exhausted. Enable fallback mode for testing, or add more credits to your Eden AI account.');
        setUseFallback(true); // Auto-enable fallback mode after a 402 error
      } else {
        setError(
          error.response && (error.response.data as any)?.error 
            ? (error.response.data as any).error 
            : 'Failed to check plagiarism. Please try again.'
        );
      }
    } finally {
      setIsChecking(false);
    }
  };

  // Helper function to format percentage
  const formatPercentage = (value: number) => {
    return `${Math.round(value * 100)}%`;
  };

  return (
    <section id="plagiarism-checker" className="py-20 px-4 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Plagiarism Checker</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Check if your content is original or contains plagiarized material.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <form onSubmit={handleSubmit} className="p-6">
            <div className="mb-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Document Title (Optional)
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title..."
                className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Content to Check
              </label>
              <textarea
                id="content"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text here (minimum 50 characters for accurate analysis)..."
                className="w-full h-40 p-4 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                disabled={isChecking}
              />
            </div>
            
            <div className="mt-2 flex items-center mb-4">
              <input
                type="checkbox"
                id="fallback-toggle"
                checked={useFallback}
                onChange={(e) => setUseFallback(e.target.checked)}
                className="mr-2 h-4 w-4"
              />
              <label htmlFor="fallback-toggle" className="text-sm text-gray-600 dark:text-gray-400">
                Use fallback mode (for demo/testing when API credits are exhausted)
              </label>
            </div>
            
            <div className="mt-4 flex justify-between items-center flex-wrap">
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-2 sm:mb-0">
                {text.length} characters
              </div>
              <button
                type="submit"
                disabled={isChecking || text.length < 50}
                className={`px-6 py-3 rounded-md font-medium ${
                  isChecking || text.length < 50
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white transition-colors`}
              >
                {isChecking ? 'Checking...' : 'Check Plagiarism'}
              </button>
            </div>
            
            {error && (
              <div className="mt-4 text-red-500 text-sm">
                {error}
              </div>
            )}
          </form>
          
          {result && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h3 className="text-xl font-bold mb-2 md:mb-0">Plagiarism Analysis</h3>
                <div className="flex items-center">
                  <div className={`px-4 py-1 rounded-full text-white text-sm font-semibold ${
                    (result.score > 0.3) ? 'bg-red-500' : 'bg-green-500'
                  }`}>
                    {result.score > 0.3 ? 'Potential Plagiarism Detected' : 'Mostly Original'}
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex justify-between mb-2 text-sm">
                  <span className="font-medium">Originality Score</span>
                  <span>{formatPercentage(1 - result.score)}</span>
                </div>
                <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
                  <div 
                    className={`h-2 rounded-full ${result.score > 0.3 ? 'bg-red-500' : 'bg-green-500'}`}
                    style={{ width: `${(1 - result.score) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-2 text-xs text-gray-600 dark:text-gray-400">
                  <span>Plagiarized</span>
                  <span>Original</span>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold mb-3">Summary:</h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                    <div className="text-2xl font-bold">{formatPercentage(result.score)}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Similarity Score</div>
                  </div>
                  
                  {result.total_percentage !== undefined && (
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold">{result.total_percentage}%</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Content Match</div>
                    </div>
                  )}
                  
                  {result.matching_characters !== undefined && result.total_characters !== undefined && (
                    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold">{result.matching_characters}/{result.total_characters}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">Characters Matched</div>
                    </div>
                  )}
                </div>
              </div>
              
              {result.sources && result.sources.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold mb-3">Matching Content:</h4>
                  <div className="space-y-4 max-h-96 overflow-y-auto">
                    {result.sources.map((source, index) => (
                      <div 
                        key={index} 
                        className="p-4 rounded-md border border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800/30"
                      >
                        <div className="flex justify-between mb-2">
                          <span className="text-sm font-medium text-red-600 dark:text-red-400">
                            Similarity: {formatPercentage(source.similarity_score)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                          &quot;{source.plagiarized_text}&quot;
                        </p>
                        {source.url && (
                          <a 
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-blue-600 hover:underline"
                          >
                            Source: {source.url}
                          </a>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {useFallback && (
                <div className="mt-6 p-3 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-200 dark:border-yellow-800/30 rounded-md">
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    <strong>Note:</strong> Results are generated using fallback mode. For more accurate analysis, please add credits to your Eden AI account.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
} 