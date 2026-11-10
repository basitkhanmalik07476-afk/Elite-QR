import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Zap, DownloadCloud, Scan } from 'lucide-react';

interface HeroProps {
  onNavigateTo: (id: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigateTo }) => {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(circle_at_top,_rgba(29,122,93,0.12),_transparent_52%)] dark:bg-[radial-gradient(circle_at_top,_rgba(116,180,158,0.12),_transparent_52%)] -z-10" />
      <div className="absolute right-[-80px] top-24 h-72 w-72 rounded-full bg-[#dba86d]/10 blur-3xl -z-10" />
      <div className="absolute left-[-60px] top-20 h-72 w-72 rounded-full bg-[#1d7a5d]/8 blur-3xl -z-10" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#d8d0c5] bg-white/70 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1d7a5d] dark:border-[#2d3d40] dark:bg-[#111b21] dark:text-[#93d3b1] mb-5">
              <span>QR Studio</span>
              <span aria-hidden="true">·</span>
              <span>Built for Real Use</span>
            </div>

            <h1 id="hero-heading" className="text-4xl sm:text-5xl lg:text-[4.15rem] leading-[0.96] font-extrabold tracking-[-0.06em] text-[#1d1a17] dark:text-white mb-6 max-w-xl">
              Clean QR Codes for
              <span className="block text-[#1d7a5d] dark:text-[#8ad2b4]">Menus, Links, and Brands.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#5b534d] dark:text-[#cad2d0] leading-relaxed max-w-xl mb-8">
              Create polished, reliable QR codes for menus, products, social profiles, and more. Customize your design and download QR codes ready to use anywhere.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 sm:gap-4 mb-10 w-full sm:w-auto">
              <button
                onClick={() => onNavigateTo('generator')}
                className="primary-action w-full sm:w-auto flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold cursor-pointer min-h-[48px]"
              >
                <Sparkles className="w-5 h-5 shrink-0" />
                <span>Generate QR Code</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>

              <button
                onClick={() => onNavigateTo('scanner')}
                className="primary-action w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold cursor-pointer min-h-[48px]"
              >
                <Scan className="w-4 h-4 shrink-0" />
                <span>Launch Scanner</span>
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-3 sm:gap-x-4 text-xs font-semibold text-[#5b534d] dark:text-[#b9c2be] pt-2 border-t border-[#e8dfd3] dark:border-[#20353c] w-full">
              <div className="flex items-center gap-1.5 shrink-0">
                <ShieldCheck className="w-4 h-4 text-[#1d7a5d]" />
                <span>Private by default</span>
              </div>
              <span aria-hidden="true" className="hidden min-[475px]:inline">·</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <Zap className="w-4 h-4 text-[#dba86d]" />
                <span>SVG, PNG, PDF</span>
              </div>
              <span aria-hidden="true" className="hidden min-[475px]:inline">·</span>
              <div className="flex items-center gap-1.5 shrink-0">
                <DownloadCloud className="w-4 h-4 text-[#1d7a5d]" />
                <span>Permanent static links</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 relative flex justify-center w-full qr-perspective">
            <div className="relative w-full max-w-sm sm:max-w-md p-5 sm:p-8 rounded-[28px] bg-[#fffdf9] dark:bg-[#111b21] border border-[#e9e0d5] dark:border-[#1f2f35] shadow-[0_30px_80px_rgba(27,34,39,0.12)] animate-float qr-card-3d">
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#f0e7de] dark:border-[#22353d]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#dc7676]" />
                  <div className="w-3 h-3 rounded-full bg-[#e3b862]" />
                  <div className="w-3 h-3 rounded-full bg-[#2d9d7d]" />
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#8c7e73] dark:text-[#9bb1b6]">
                  quickqr://preview
                </div>
              </div>

              <div className="relative aspect-square w-full rounded-[22px] bg-[linear-gradient(135deg,_#f4efe9,_#ffffff_45%,_#edf8f3)] dark:bg-[linear-gradient(135deg,_#111b21,_#101a1e_40%,_#15282b)] p-4 sm:p-6 flex flex-col items-center justify-center border border-[#ebdfd5] dark:border-[#22353d] shadow-inner overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(29,122,93,0.08),_transparent_55%)]" />
                <svg
                  className="relative z-10 w-full h-full max-w-[200px] sm:max-w-[220px] text-[#1d7a5d] dark:text-[#8ad2b4] drop-shadow-[0_16px_30px_rgba(29,122,93,0.18)]"
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="5" y="5" width="26" height="26" rx="6" stroke="currentColor" strokeWidth="4" />
                  <rect x="12" y="12" width="12" height="12" rx="3" fill="currentColor" />
                  <rect x="69" y="5" width="26" height="26" rx="6" stroke="currentColor" strokeWidth="4" />
                  <rect x="76" y="12" width="12" height="12" rx="3" fill="currentColor" />
                  <rect x="5" y="69" width="26" height="26" rx="6" stroke="currentColor" strokeWidth="4" />
                  <rect x="12" y="76" width="12" height="12" rx="3" fill="currentColor" />

                  <circle cx="40" cy="10" r="3" fill="currentColor" />
                  <circle cx="50" cy="10" r="3" fill="currentColor" />
                  <circle cx="60" cy="10" r="3" fill="currentColor" />
                  <circle cx="40" cy="20" r="3" fill="currentColor" />
                  <circle cx="60" cy="20" r="3" fill="currentColor" />
                  <circle cx="40" cy="30" r="3" fill="currentColor" />
                  <circle cx="50" cy="30" r="3" fill="currentColor" />
                  <circle cx="60" cy="30" r="3" fill="currentColor" />
                  <circle cx="30" cy="40" r="3" fill="currentColor" />
                  <circle cx="40" cy="40" r="3" fill="currentColor" />
                  <circle cx="50" cy="40" r="3" fill="currentColor" />
                  <circle cx="70" cy="40" r="3" fill="currentColor" />
                  <circle cx="80" cy="40" r="3" fill="currentColor" />
                  <circle cx="30" cy="50" r="3" fill="currentColor" />
                  <circle cx="50" cy="50" r="3" fill="currentColor" />
                  <circle cx="70" cy="50" r="3" fill="currentColor" />
                  <circle cx="30" cy="60" r="3" fill="currentColor" />
                  <circle cx="40" cy="60" r="3" fill="currentColor" />
                  <circle cx="60" cy="60" r="3" fill="currentColor" />
                  <circle cx="70" cy="60" r="3" fill="currentColor" />
                  <circle cx="40" cy="70" r="3" fill="currentColor" />
                  <circle cx="50" cy="70" r="3" fill="currentColor" />
                  <circle cx="60" cy="70" r="3" fill="currentColor" />
                  <circle cx="70" cy="70" r="3" fill="currentColor" />
                  <circle cx="80" cy="70" r="3" fill="currentColor" />
                  <circle cx="40" cy="80" r="3" fill="currentColor" />
                  <circle cx="50" cy="80" r="3" fill="currentColor" />
                  <circle cx="60" cy="80" r="3" fill="currentColor" />
                  <circle cx="80" cy="90" r="3" fill="currentColor" />
                </svg>

                <div className="relative z-10 mt-5 flex items-center gap-3 rounded-full border border-[#dfe9e4] dark:border-[#20353c] bg-white/80 dark:bg-[#161f24] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#1d7a5d] dark:text-[#b4d9c3]">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#1d7a5d]" />
                  Ready to scan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
