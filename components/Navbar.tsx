"use client";

import { Menu, X, Activity, Heart, Globe, Zap, CheckCircle, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-slate-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden shadow-sm bg-gradient-to-br from-blue-500 to-cyan-400 p-0.5">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                <Image src="/logo.png" alt="MedAssist" width={36} height={36} className="object-contain" />
              </div>
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent group-hover:scale-105 transition-transform">
                MedAssist
              </h1>
              <p className="text-[9px] text-slate-400 font-semibold uppercase tracking-wider leading-tight">
                AI Triage Assistant
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              How It Works
            </a>
            <a href="#impact" className="text-slate-600 hover:text-blue-600 font-medium transition-colors">
              Impact
            </a>
            <Link
              href="/chat"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all"
            >
              Start Chat →
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-slate-100 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3 animate-in slide-in-from-top-5 fade-in">
            <a
              href="#features"
              className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#how-it-works"
              className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </a>
            <a
              href="#impact"
              className="block px-4 py-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Impact
            </a>
            <Link
              href="/chat"
              className="block px-4 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-lg font-semibold text-center"
            >
              Start Chat →
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
