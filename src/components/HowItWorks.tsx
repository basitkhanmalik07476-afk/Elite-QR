import React from 'react';
import { MousePointerClick, SlidersHorizontal, DownloadCloud, ArrowRight } from 'lucide-react';

interface HowItWorksProps {
  onNavigateTo: (id: string) => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onNavigateTo }) => {
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
    <section id="how-it-works" aria-labelledby="how-it-works-heading" className="py-20 md:py-28 bg-[#f2eee8] dark:bg-[#0d1519] border-y border-[#e6ddd1] dark:border-[#1a2c31] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.18em] text-[#1d7a5d] dark:text-[#93d3b1] mb-2">
            <span>Simple 3-step workflow</span>
            <span aria-hidden="true">·</span>
            <span>Zero sign-up required</span>
          </div>
          <h2 id="how-it-works-heading" className="text-3xl sm:text-4xl font-extrabold tracking-[-0.05em] text-[#1d1a17] dark:text-white">
            How QuickQR works
          </h2>
          <p className="mt-3 text-base text-[#5b534d] dark:text-[#cfd7d3]">
            Produce scannable, production-ready QR assets in a few deliberate steps.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="relative bg-[#fffdf9] dark:bg-[#111b21] rounded-[28px] p-6 sm:p-8 border border-[#eae0d4] dark:border-[#21363d] shadow-[0_18px_40px_rgba(17,24,39,0.04)] flex flex-col justify-between group hover:border-[#b9d9ca] transition-all duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-[#edf7f3] dark:bg-[#192d2b] text-[#1d7a5d] dark:text-[#93d3b1] flex items-center justify-center font-bold">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-2xl font-black text-[#e9e2d7] dark:text-[#1b2d33] font-mono">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-[#1d1a17] dark:text-white mb-2.5">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#5b534d] dark:text-[#c4d0cd] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#efe5dc] dark:border-[#21363d] flex items-center text-xs font-semibold text-[#1d7a5d] dark:text-[#93d3b1] group-hover:translate-x-1 transition-transform">
                  <span>Step {idx + 1} of 3</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => onNavigateTo('generator')}
            className="primary-action inline-flex items-center justify-center gap-2 px-6 py-3.5 min-h-[48px] w-full sm:w-auto rounded-xl font-bold cursor-pointer text-sm"
          >
            <span>Start building your QR code</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
