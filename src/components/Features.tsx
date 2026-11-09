import React from 'react';
import {
  Zap,
  Palette,
  Download,
  ScanLine,
  Image as ImageIcon,
  ShieldCheck,
  Infinity,
  Smartphone,
} from 'lucide-react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: Zap,
      title: 'Instant QR Generation',
      description:
        'Zero-latency browser rendering. Watch your QR codes dynamically regenerate with every keystroke and color change.',
      accent: 'from-amber-500/10 to-amber-500/5 text-amber-500',
    },
    {
      icon: Palette,
      title: 'Precision Vector Styling',
      description:
        'Customize modules, rounded corners, eye dots, and linear/radial gradients while maintaining rigorous contrast ratios.',
      accent: 'from-indigo-500/10 to-indigo-500/5 text-indigo-500',
    },
    {
      icon: Download,
      title: '4 High-Resolution Formats',
      description:
        'Export crisp vector SVG for packaging and vinyl banners, 2000px PNGs with transparency, standard JPEGs, and print-ready PDFs.',
      accent: 'from-cyan-500/10 to-cyan-500/5 text-cyan-500',
    },
    {
      icon: ScanLine,
      title: 'Built-in Universal Scanner',
      description:
        'Scan QR codes directly through your webcam or mobile camera, or upload saved photos for instant decoding and action triggers.',
      accent: 'from-purple-500/10 to-purple-500/5 text-purple-500',
    },
    {
      icon: ImageIcon,
      title: 'Seamless Brand Logos',
      description:
        'Embed your corporate emblem or choose from 9 pre-tuned vector icons. Error correction automatically scales to 30% for scannability.',
      accent: 'from-pink-500/10 to-pink-500/5 text-pink-500',
    },
    {
      icon: ShieldCheck,
      title: '100% Client-Side Privacy',
      description:
        'QR payloads are not sent to an app server. Saved history stays in this browser’s local storage and is not encrypted.',
      accent: 'from-emerald-500/10 to-emerald-500/5 text-emerald-500',
    },
    {
      icon: Infinity,
      title: 'Permanent & Unexpiring',
      description:
        'Static QR codes embed data directly into the matrix. They never expire, require no monthly subscription, and cannot be revoked.',
      accent: 'from-blue-500/10 to-blue-500/5 text-blue-500',
    },
    {
      icon: Smartphone,
      title: 'Universal Camera Compatibility',
      description:
        'Guaranteed readability on iOS Camera, Google Lens, Samsung Camera, and all standard barcode readers worldwide.',
      accent: 'from-teal-500/10 to-teal-500/5 text-teal-500',
    },
  ];

  return (
    <section id="features" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            <span>Enterprise Standard</span>
            <span aria-hidden="true">·</span>
            <span>Uncompromising Quality</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            Engineered for Flawless Scans Anywhere
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            From subtle brand aesthetics to industrial print specifications, Elite QR provides the full toolkit.
          </p>
        </div>

        {/* Features Bento Grid with dynamic hover lift and glow */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800/90 hover:border-indigo-500/50 dark:hover:border-indigo-500/40 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                {/* Subtle hover gradient bloom */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br ${feat.accent} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-sm`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
