import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is a QR code and how does it work?',
      a: 'A QR (Quick Response) code is a two-dimensional barcode capable of encoding text, web addresses, Wi-Fi credentials, contact cards (vCards), and more. When captured by any smartphone camera or optical scanner, the black-and-white grid is decoded instantly to trigger browser links, phone calls, or network connections.',
    },
    {
      q: 'What is the difference between Static and Dynamic QR codes?',
      a: 'QuickQR creates permanent Static QR codes. In a static QR code, your destination URL or data is encoded directly into the pixel pattern. It functions forever without depending on an intermediary redirect server, never expires, and requires no monthly subscription. In contrast, dynamic QR codes route through third-party redirect links which can break or demand payments later.',
    },
    {
      q: 'Are the QR codes generated on QuickQR 100% free?',
      a: 'Yes, completely free with no limits on generation, customization, or downloads. All four formats (PNG, SVG, JPEG, and PDF) are provided free of charge with zero watermarks.',
    },
    {
      q: 'Can I add my company logo without breaking scannability?',
      a: 'Adding a logo raises error correction to High (H), which can help recover from limited damage. It does not guarantee a successful scan: keep the logo modest, preserve strong contrast, and test the exported code on multiple devices.',
    },
    {
      q: 'Do generated QR codes ever expire?',
      a: 'No. Because these are static QR codes generated client-side, they have no expiration date. As long as your destination link or content remains online, the printed or digital QR code will continue to work indefinitely.',
    },
    {
      q: 'Which file format should I download for printing?',
      a: 'For print materials like business cards, posters, product packaging, and restaurant menus, we strongly recommend Vector SVG or the 1200px+ High-Resolution PNG. Vector SVG can be scaled to any size without losing crispness. We also offer a formatted PDF download ready for instant home/office printing.',
    },
    {
      q: 'Can I scan QR codes directly using this website?',
      a: 'Yes! Our built-in QR Scanner works seamlessly using your device camera (front or rear) or by uploading any photo/screenshot containing a QR code. It automatically detects URLs, Wi-Fi keys, phone numbers, and vCards with one-click actions.',
    },
    {
      q: 'Is my personal information stored or tracked on your servers?',
      a: 'QR generation and scanning run in your browser, and QR payloads are not sent to a QuickQR app server. If you save history, the payload, design, and any logo data are stored in this browser’s localStorage without encryption. Clear history on shared devices. The site also requests Google Fonts from Google; the contact form opens your email app only when configured.',
    },
    {
      q: 'What are the best practices for printing QR codes?',
      a: 'Always ensure sufficient contrast between the foreground and background (dark patterns on light backgrounds scan most reliably). For physical print, we recommend a minimum size of 2 x 2 cm (0.8 x 0.8 inches) for short URLs, and larger sizes for longer content like vCards.',
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" aria-labelledby="faq-heading" className="py-20 md:py-28 bg-[#f5f1ea] dark:bg-[#0d1519] border-t border-[#e6ddd1] dark:border-[#1a2c31] relative">
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: faq.a,
            },
          })),
        })}
      </script>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 id="faq-heading" className="text-3xl sm:text-4xl font-extrabold tracking-[-0.05em] text-[#1d1a17] dark:text-white">
            Everything you need to know
          </h2>
          <p className="mt-3 text-base text-[#5b534d] dark:text-[#cfd7d3]">
            Answers to the common questions that come up during QR generation, printing, and deployment.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-[#e6ddd1] dark:border-[#20353c] bg-[#fffdf9] dark:bg-[#111b21] overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${idx}`}
                  className="w-full flex items-center justify-between p-5 text-left font-semibold text-[#1d1a17] dark:text-white hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer"
                >
                  <span id={`faq-question-${idx}`} className="text-sm sm:text-base pr-4">{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#8c7e73] dark:text-[#aebdba] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#1d7a5d] dark:text-[#93d3b1]' : ''
                    }`}
                  />
                </button>

                <div
                  id={`faq-answer-${idx}`}
                  role="region"
                  aria-labelledby={`faq-question-${idx}`}
                  hidden={!isOpen}
                  className="px-5 pb-5 pt-1 text-xs sm:text-sm text-[#5b534d] dark:text-[#c4d0cd] leading-relaxed border-t border-[#efe5dc] dark:border-[#20353c] animate-in fade-in duration-200"
                >
                  {faq.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
