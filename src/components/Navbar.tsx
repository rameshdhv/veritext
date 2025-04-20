"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white fixed w-full z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-primary">VeriText</span>
            </Link>
            <div className="hidden md:ml-10 md:flex md:space-x-8">
              <Link href="/#features" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">Features</Link>
              <Link href="/#how-it-works" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">How It Works</Link>
              <Link href="/ai-detection" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">AI Detection</Link>
              <Link href="/plagiarism-detect" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">Plagiarism Check</Link>
              <Link href="/#pricing" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">Pricing</Link>
              <Link href="/#faq" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">FAQ</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center">
            <Link href="/#login" className="text-gray-900 hover:text-primary px-3 py-2 text-sm font-medium">Log in</Link>
            <Link
              href="/ai-detection"
              className="ml-4 px-4 py-2 rounded-md bg-primary text-primary-foreground text-sm font-medium hover:bg-primary-hover transition-colors"
            >
              Try For Free
            </Link>
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-primary hover:bg-gray-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/#features"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/#how-it-works"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/ai-detection"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              AI Detection
            </Link>
            <Link
              href="/plagiarism-detect"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Plagiarism Check
            </Link>
            <Link
              href="/#pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/#login"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/ai-detection"
              className="block px-3 py-2 rounded-md text-base font-medium bg-primary text-primary-foreground hover:bg-primary-hover"
              onClick={() => setIsMenuOpen(false)}
            >
              Try For Free
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
} 