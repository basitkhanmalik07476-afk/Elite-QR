import React from 'react';
import { MousePointerClick, SlidersHorizontal, DownloadCloud, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onScrollTo: (id: string) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onScrollTo }) => {
  const steps = [
    {
      number: '01',
      icon: MousePointerClick,
      title: 'Choose Your QR Type',
      description:
        'Select from 15 purpose-built templates including URLs, Wi-Fi networks, Contact Cards (vCard), WhatsApp chats, or Crypto addresses.',
    },
    {
      number: '02',
      icon: SlidersHorizontal,
      title: 'Customize Your Design',
      description:
        'Tailor your colors, apply sleek gradients, select smooth rounded modules, and embed your business logo with automatic error-tolerance.',
    },
    {
      number: '03',
      icon: DownloadCloud,
      title: 'Download & Deploy',
      description:
        'Export your high-resolution asset in vector SVG for billboards, transparent PNG for digital campaigns, or formatted PDF for instant printing.',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-slate-100/50 dark:bg-slate-900/30 border-y border-slate-200/80 dark:border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            <span>Simple 3-Step Workflow</span>
            <span aria-hidden="true">·</span>
            <span>Zero Sign-up Required</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            How Elite QR Works
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Produce print-ready, scannable QR codes ready for commercial production in under thirty seconds.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800/90 shadow-sm flex flex-col justify-between group hover:border-indigo-500/40 transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-slate-200 dark:text-slate-800 font-mono">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:translate-x-1 transition-transform">
                  <span>Step {idx + 1} of 3</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA to start */}
        <div className="mt-12 text-center">
          <button
            onClick={() => onScrollTo('generator')}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] w-full sm:w-auto rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 shadow-md shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer text-sm"
          >
            <span>Start Building Your QR Code</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
