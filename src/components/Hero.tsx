import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, DownloadCloud, Scan } from 'lucide-react';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onScrollTo }) => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background decorative glows with pulse animation */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-indigo-500/15 via-purple-500/10 to-cyan-400/15 blur-3xl -z-10 pointer-events-none rounded-full animate-pulse-glow" />
      <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-400/10 blur-2xl -z-10 pointer-events-none rounded-full animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
      <div className="absolute top-40 left-10 w-72 h-72 bg-indigo-600/10 blur-2xl -z-10 pointer-events-none rounded-full animate-pulse-glow" style={{ animationDelay: '3s' }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            {/* Quiet text kicker with typographic separator */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-4">
              <span>Next-Gen QR Studio</span>
              <span aria-hidden="true">·</span>
              <span>Vector & High-Res</span>
              <span aria-hidden="true">·</span>
              <span>100% Client-Side</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance mb-6">
              Create Beautiful <br />
              <span className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">
                QR Codes in Seconds
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl mb-8">
              Generate, customize, and download professional QR codes for your business, website, products, and everyday needs. Free, secure, and forever active.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={() => onScrollTo('generator')}
                className="group relative overflow-hidden w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-h-[48px]"
              >
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none" />
                <Sparkles className="w-5 h-5 shrink-0 transition-transform group-hover:rotate-12" />
                <span>Generate QR Code</span>
                <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={() => onScrollTo('scanner')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 rounded-xl shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer min-h-[48px]"
              >
                <Scan className="w-4 h-4 text-indigo-500 shrink-0" />
                <span>Launch QR Scanner</span>
              </button>
            </div>

            {/* Trust Indicators (Quiet metadata with separators) */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-3 sm:gap-x-4 text-xs font-medium text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200/80 dark:border-slate-800/80 w-full">
              <div className="flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Zero Server Tracking</span>
              </div>
              <span aria-hidden="true" className="hidden min-[475px]:inline">·</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <Zap className="w-4 h-4 text-amber-500" />
                <span>Instant Vector SVG & PDF</span>
              </div>
              <span aria-hidden="true" className="hidden min-[475px]:inline">·</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <DownloadCloud className="w-4 h-4 text-indigo-500" />
                <span>Permanent Static Codes</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Floating Interactive Showcase with 3D and floating animations */}
          <div className="lg:col-span-5 relative flex justify-center w-full qr-perspective">
            {/* Background glowing frame with floating motion */}
            <div className="relative w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200/90 dark:border-slate-800/90 shadow-2xl shadow-indigo-500/10 animate-float qr-card-3d">
              {/* Top card header */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-xs font-mono font-medium text-slate-400 dark:text-slate-500">
                  elite-qr://preview
                </div>
              </div>

              {/* Showcase QR display */}
              <div className="relative aspect-square w-full rounded-2xl bg-gradient-to-tr from-indigo-50 via-white to-cyan-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950/40 p-4 sm:p-6 flex flex-col items-center justify-center border border-indigo-100 dark:border-indigo-900/40 shadow-inner overflow-hidden">
                {/* SVG mock with real scannable look */}
                <svg
                  className="w-full h-full max-w-[200px] sm:max-w-[240px] text-indigo-600 dark:text-indigo-400 filter drop-shadow-md"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Outer corner top-left */}
                  <rect x="5" y="5" width="26" height="26" rx="6" stroke="currentColor" strokeWidth="4" />
                  <rect x="12" y="12" width="12" height="12" rx="3" fill="currentColor" />

                  {/* Outer corner top-right */}
                  <rect x="69" y="5" width="26" height="26" rx="6" stroke="currentColor" strokeWidth="4" />
                  <rect x="76" y="12" width="12" height="12" rx="3" fill="currentColor" />

                  {/* Outer corner bottom-left */}
                  <rect x="5" y="69" width="26" height="26" rx="6" stroke="currentColor" strokeWidth="4" />
                  <rect x="12" y="76" width="12" height="12" rx="3" fill="currentColor" />

                  {/* Data modules pattern */}
                  <circle cx="40" cy="10" r="3" fill="currentColor" />
                  <circle cx="50" cy="10" r="3" fill="currentColor" />
                  <circle cx="60" cy="10" r="3" fill="currentColor" />
                  <circle cx="45" cy="20" r="3" fill="currentColor" />
                  <circle cx="55" cy="20" r="3" fill="currentColor" />

                  <circle cx="10" cy="40" r="3" fill="currentColor" />
                  <circle cx="20" cy="45" r="3" fill="currentColor" />
                  <circle cx="10" cy="55" r="3" fill="currentColor" />

                  <circle cx="90" cy="40" r="3" fill="currentColor" />
                  <circle cx="80" cy="50" r="3" fill="currentColor" />
                  <circle cx="90" cy="60" r="3" fill="currentColor" />

                  <circle cx="40" cy="90" r="3" fill="currentColor" />
                  <circle cx="50" cy="85" r="3" fill="currentColor" />
                  <circle cx="60" cy="90" r="3" fill="currentColor" />

                  {/* Center branding icon container */}
                  <rect x="36" y="36" width="28" height="28" rx="8" fill="white" className="dark:fill-slate-900" />
                  <rect x="38" y="38" width="24" height="24" rx="6" fill="#4f46e5" />
                  <path
                    d="M45 50L48 53L55 46"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Laser scan animation overlay with glow */}
                <div className="absolute inset-x-4 sm:inset-x-6 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_rgba(6,182,212,0.9)] animate-scan pointer-events-none" />
              </div>

              {/* Bottom tag inside card */}
              <div className="mt-4 flex flex-col min-[475px]:flex-row items-center justify-between gap-1 text-xs text-slate-500 dark:text-slate-400">
                <span className="font-medium text-slate-700 dark:text-slate-300">Live High-Res Rendering</span>
                <span className="font-mono text-indigo-600 dark:text-indigo-400">Error Correction: 30% [H]</span>
              </div>
            </div>

            {/* Floating chip bottom-left with subtle float */}
            <div className="hidden md:flex absolute -bottom-3 sm:left-0 lg:-left-6 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 backdrop-blur-md text-xs font-semibold text-slate-800 dark:text-slate-200 pointer-events-none animate-float-badge">
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
              <span>4 Formats: PNG, SVG, JPG, PDF</span>
            </div>

            {/* Floating chip top-right with counter-float */}
            <div className="hidden md:flex absolute -top-3 sm:right-0 lg:-right-4 items-center gap-2 px-3.5 py-2 rounded-2xl bg-white dark:bg-slate-800 shadow-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-800 dark:text-slate-200 pointer-events-none animate-float-reverse">
              <span className="text-emerald-500 font-bold">15+</span>
              <span>QR Types Supported</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
