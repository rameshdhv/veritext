"use client";

import { useState, useRef } from 'react';
import axios, { AxiosError } from 'axios';
import Link from 'next/link';

// Define minimum characters required for analysis
const MIN_CHARS = 50;

type PlagiarismCandidate = {
  url?: string;
  plagiarized_text: string;
  plagia_score: number;
  prediction: string;
};

type PlagiarismItem = {
  text: string;
  candidates: PlagiarismCandidate[];
};

type PlagiarismResult = {
  plagia_score: number;
  items?: PlagiarismItem[];
  cost?: number;
};

// Sample fallback response for when API credits are exhausted
const FALLBACK_RESPONSE = {
  winstonai: {
    plagia_score: 100,
    items: [
      {
        text: "Sample Source 1",
        candidates: [
          {
            url: "https://example.com/sample-source",
            plagia_score: 1,
            prediction: "plagiarized",
            plagiarized_text: "This is a sample text that would be flagged as plagiarized in fallback mode."
          }
        ]
      },
      {
        text: "Sample Source 2",
        candidates: [
          {
            url: "https://example.com/another-source",
            plagia_score: 1,
            prediction: "plagiarized",
            plagiarized_text: "Another example of plagiarized content for demonstration purposes."
          },
          {
            url: "https://example.com/third-source",
            plagia_score: 0.8,
            prediction: "plagiarized",
            plagiarized_text: "A third example showing multiple matches from different sources."
          }
        ]
      }
    ],
    cost: 0
  }
};

export default function PlagiarismDetectPage() {
  const [text, setText] = useState('');
  const [title, setTitle] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [result, setResult] = useState<PlagiarismResult | null>(null);
  const [sources, setSources] = useState<{text: string, matches: PlagiarismCandidate[]}[]>([]);
  const [isExporting, setIsExporting] = useState(false);
  
  const reportRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!text.trim() || text.trim().length < MIN_CHARS) {
      setError(`Please enter at least ${MIN_CHARS} characters for accurate analysis.`);
      return;
    }
    
    setIsChecking(true);
    setError(null);
    setSources([]);
    
    try {
      let data: { winstonai?: PlagiarismResult };
      
      // If fallback mode is enabled, use the mock response
      if (useFallback) {
        // Create a simple mock response for fallback mode
        data = {
          winstonai: {
            plagia_score: 85,
            items: [
              {
                text: "Example Source 1",
                candidates: [
                  {
                    url: "https://example.com/source1",
                    plagia_score: 0.9,
                    prediction: "plagiarized",
                    plagiarized_text: "This is an example of plagiarized content created in fallback mode."
                  }
                ]
              },
              {
                text: "Example Source 2",
                candidates: [
                  {
                    url: "https://example.com/source2",
                    plagia_score: 0.8,
                    prediction: "plagiarized",
                    plagiarized_text: text.length > 100 ? text.substring(0, 100) + "..." : text
                  }
                ]
              }
            ],
            cost: 0
          }
        };
        console.log("Using fallback mode with mock data", data);
      } else {
        // Use the real API
        const response = await axios.post('/api/detect-plagiarism', { text, title });
        data = response.data;
      }
      
      const detector = data.winstonai;
      
      if (detector) {
        setResult(detector);
        
        // Process the items to get all matches for display
        if (detector.items && detector.items.length > 0) {
          const processedSources = detector.items.map(item => ({
            text: item.text,
            matches: item.candidates
          }));
          setSources(processedSources);
        }
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
    return `${Math.round(value)}%`;
  };

  // Count total matches across all sources
  const getTotalMatches = () => {
    return sources.reduce((total, source) => total + source.matches.length, 0);
  };

  // Function to generate and download a text report
  const exportReport = () => {
    if (!result) return;
    
    try {
      setIsExporting(true);
      
      // Create report content
      let reportContent = '';
      
      // Add header
      reportContent += 'VeriText Plagiarism Report\n';
      reportContent += '========================\n\n';
      reportContent += `Generated on: ${new Date().toLocaleString()}\n`;
      reportContent += `Document: ${title || 'Untitled Document'}\n\n`;
      
      // Add summary
      reportContent += 'SUMMARY\n';
      reportContent += '=======\n';
      reportContent += `Plagiarism Score: ${formatPercentage(result.plagia_score)}\n`;
      reportContent += `Overall Assessment: ${result.plagia_score > 30 ? 'Potential Plagiarism Detected' : 'Mostly Original'}\n`;
      reportContent += `Sources Found: ${sources.length}\n`;
      reportContent += `Total Matches: ${getTotalMatches()}\n\n`;
      
      // Add source details
      reportContent += 'DETAILED ANALYSIS\n';
      reportContent += '=================\n\n';
      
      sources.forEach((source, index) => {
        reportContent += `Source ${index + 1}: ${source.text}\n`;
        reportContent += '-'.repeat(40) + '\n';
        
        source.matches.forEach((match, mIndex) => {
          reportContent += `Match ${mIndex + 1} (Confidence: ${Math.round(match.plagia_score * 100)}%)\n`;
          reportContent += `Text: "${match.plagiarized_text}"\n`;
          if (match.url) {
            reportContent += `Source URL: ${match.url}\n`;
          }
          reportContent += '\n';
        });
        
        reportContent += '\n';
      });
      
      // Add analyzed text
      reportContent += 'ANALYZED TEXT\n';
      reportContent += '=============\n\n';
      reportContent += text;
      
      // Create a blob and download
      const blob = new Blob([reportContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `VeriText_Plagiarism_Report_${(title || 'Untitled').replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
    } catch (err) {
      console.error('Error generating report:', err);
      alert('There was an error generating your report. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Plagiarism Checker</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Check your content for plagiarism against billions of web pages and academic sources.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Check Your Text</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Paste your text here (minimum 50 characters for accurate analysis)..."
                      className="w-full h-64 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                      disabled={isChecking}
                    />
                    <div className="mt-2 text-sm text-gray-500">
                      {text.length} characters ({MIN_CHARS} minimum)
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isChecking || text.length < MIN_CHARS}
                      className={`px-6 py-3 rounded-md font-medium ${
                        isChecking || text.length < MIN_CHARS
                          ? 'bg-gray-400 cursor-not-allowed text-white'
                          : 'bg-primary text-primary-foreground hover:bg-primary-hover transition-colors'
                      }`}
                    >
                      {isChecking ? 'Analyzing...' : 'Check for Plagiarism'}
                    </button>
                  </div>
                </form>

                {error && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
                    {error}
                  </div>
                )}

                {result && !error && (
                  <div className="mt-8">
                    <div className="mb-6">
                      <h3 className="text-xl font-bold mb-4">Overall Score</h3>
                      <div className="flex items-center space-x-4">
                        <div className="flex-1">
                          <div className="h-4 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`h-4 ${
                                result.plagia_score > 30
                                  ? 'bg-red-500'
                                  : result.plagia_score > 10
                                  ? 'bg-yellow-500'
                                  : 'bg-primary'
                              }`}
                              style={{ width: `${result.plagia_score}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="w-16 text-right">
                          <span className="font-bold">{formatPercentage(result.plagia_score)}</span>
                        </div>
                      </div>
                      <div className="mt-2 flex justify-between text-sm text-gray-500">
                        <span>Original</span>
                        <span>Plagiarized</span>
                      </div>
                    </div>

                    {result.items && result.items.length > 0 && (
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-4">
                          <h3 className="text-xl font-bold">Detected Matches</h3>
                          <button
                            onClick={exportReport}
                            className="px-4 py-2 text-sm bg-accent/30 text-primary-foreground hover:bg-accent/50 rounded-md transition-colors"
                          >
                            Export Report
                          </button>
                        </div>

                        <div className="space-y-6 max-h-96 overflow-y-auto">
                          {result.items.map((item, index) => (
                            <div
                              key={index}
                              className="p-4 border border-gray-200 rounded-md"
                            >
                              <div className="font-medium mb-2">{item.text}</div>
                              
                              {item.candidates && item.candidates.length > 0 ? (
                                <div className="space-y-4 mt-4">
                                  {item.candidates.map((candidate, cIndex) => (
                                    <div key={cIndex} className="pl-4 border-l-4 border-primary">
                                      <div className="flex justify-between mb-1">
                                        <div className="text-sm text-gray-500">
                                          Match Score: <span className="font-bold">{formatPercentage(candidate.plagia_score)}</span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                          {candidate.prediction}
                                        </div>
                                      </div>
                                      <div className="text-sm">{candidate.plagiarized_text}</div>
                                      {candidate.url && (
                                        <div className="mt-2">
                                          <a 
                                            href={candidate.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="text-xs text-primary hover:text-primary-hover"
                                          >
                                            {candidate.url}
                                          </a>
                                        </div>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <div className="text-sm text-gray-500 italic">No matches found for this text.</div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="p-4 bg-gray-50 rounded-md">
                      <div className="flex justify-between">
                        <div className="text-sm text-gray-500">
                          Total matches: <span className="font-bold">{getTotalMatches()}</span>
                        </div>
                        {result.cost && (
                          <div className="text-xs text-gray-400">
                            API Cost: ${result.cost.toFixed(5)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Why Use Our Plagiarism Checker?</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Accurate detection with over 95% success rate</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Scans billions of web pages and academic sources</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Identifies exact matches and paraphrased content</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Fast results in seconds, not minutes</span>
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-primary mr-2 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-gray-700">Secure and private - your content is never stored</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Also Try</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/#try-now" className="flex items-center text-primary hover:text-primary-hover">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    AI Content Detection
                  </Link>
                </li>
                <li>
                  <Link href="/#features" className="flex items-center text-primary hover:text-primary-hover">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    See All Features
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="flex items-center text-primary hover:text-primary-hover">
                    <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Pricing Plans
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 