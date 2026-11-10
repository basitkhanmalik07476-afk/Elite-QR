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
      title: 'Instant QR generation',
      description: 'Configure your content and immediately preview a sharp, scan-ready result without sending data anywhere.',
      accent: 'from-[#f7e7d2] to-[#fffaf5] text-[#c57e2c]',
    },
    {
      icon: Palette,
      title: 'Designed to match your brand',
      description: 'Adjust colors, corners, gradients, and logo placement while keeping contrast and readability in check.',
      accent: 'from-[#e8f4ef] to-[#f6fbf9] text-[#1d7a5d]',
    },
    {
      icon: Download,
      title: 'Print-ready exports',
      description: 'Download SVG, PNG, JPG, or PDF versions suited for packaging, menus, signage, and promotional materials.',
      accent: 'from-[#edf4fc] to-[#f7fafc] text-[#4069a5]',
    },
    {
      icon: ScanLine,
      title: 'Built-in scanner support',
      description: 'Use your webcam or upload an image to instantly read QR codes and drop the result back into the studio.',
      accent: 'from-[#f3ebff] to-[#faf7ff] text-[#6b52b4]',
    },
    {
      icon: ImageIcon,
      title: 'Logo-aware layouts',
      description: 'Place a business icon, profile image, or social mark at the center without compromising scan performance.',
      accent: 'from-[#fcefe9] to-[#fffaf7] text-[#b5654a]',
    },
    {
      icon: ShieldCheck,
      title: 'Private by design',
      description: 'Everything runs in-browser, which keeps your links and content local to the device unless you save them locally.',
      accent: 'from-[#eaf8f1] to-[#f8fffb] text-[#2d8f68]',
    },
    {
      icon: Infinity,
      title: 'Permanent links',
      description: 'Static QR codes keep their destination data embedded directly in the pattern and do not expire over time.',
      accent: 'from-[#ecf0ff] to-[#f7f9ff] text-[#4b63d6]',
    },
    {
      icon: Smartphone,
      title: 'Works across devices',
      description: 'From iPhone cameras to Android scanners and standard app readers, the output remains broadly compatible.',
      accent: 'from-[#eefaf5] to-[#f9fffc] text-[#1d7a5d]',
    },
  ];

  return (
    <section id="features" aria-labelledby="features-heading" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="features-heading" className="text-3xl sm:text-4xl font-extrabold tracking-[-0.05em] text-[#1d1a17] dark:text-white">
            A practical QR toolkit for modern businesses
          </h2>
          <p className="mt-3 text-base text-[#5b534d] dark:text-[#cfd7d3]">
            QuickQR balances premium presentation with fast workflows, reliable output, and real-world scan performance.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-[28px] bg-[#fffdf9] dark:bg-[#111b21] border border-[#eae1d5] dark:border-[#21363d] shadow-[0_18px_40px_rgba(17,24,39,0.04)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between overflow-hidden"
              >
                <div className="absolute -top-14 -right-12 w-32 h-32 bg-[#dba86d]/10 dark:bg-[#1d7a5d]/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none" />

                <div className="relative z-10">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 bg-gradient-to-br ${feat.accent} shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-[#1d1a17] dark:text-white mb-2.5 group-hover:text-[#1d7a5d] dark:group-hover:text-[#93d3b1] transition-colors">
                    {feat.title}
                  </h3>
                  <p className="text-sm text-[#5b534d] dark:text-[#c4d0cd] leading-relaxed">
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
