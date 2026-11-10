import React from 'react';
import { Mail, Facebook, Instagram } from 'lucide-react';
import { QRType } from '../types';

interface FooterProps {
  onNavigateTo: (id: string) => void;
  onSelectType: (type: QRType) => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateTo,
  onSelectType,
  onOpenPrivacy,
}) => {
  const handleTypeClick = (type: QRType) => {
    onSelectType(type);
    onNavigateTo('generator');
  };

  return (
    <footer className="bg-[#f1eee8] dark:bg-[#0d1418] border-t border-[#e8dfd3] dark:border-[#1b2a2f] pt-16 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-x-5 gap-y-8 sm:gap-8 pb-12 border-b border-[#e8dfd3] dark:border-[#1b2a2f]">
          <div className="col-span-2 md:col-span-4 lg:col-span-5 sm:pr-4">
            <a
              href="#hero"
              aria-label="QuickQR home"
              className="inline-flex items-center gap-2.5 mb-4 rounded-lg text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d7a5d] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0d1418]"
            >
              <picture>
                <source srcSet="/quickqr-logo.webp" type="image/webp" />
                <img
                  src="/quickqr-logo.png"
                  alt="QuickQR — Create Once. Share Anywhere."
                  width="1828"
                  height="413"
                  decoding="async"
                  className="h-auto w-[170px] max-w-full object-contain object-left"
                />
              </picture>
            </a>

            <p className="text-xs sm:text-sm text-[#5b534d] dark:text-[#c9d4cf] leading-relaxed max-w-[300px] mb-6">
              Create, customize, and share beautiful QR codes for your digital and everyday needs. Simple tools, reliable scans, and seamless connections.
            </p>

            <div className="flex items-center gap-3 text-[#8a7d74] dark:text-[#93a3a6]">
              <a
                href="mailto:official.elitesolutions1@gmail.com"
                aria-label="Email QuickQR support"
                className="p-2 rounded-xl border border-[#e8dfd3] dark:border-[#24343b] hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] hover:border-[#b9d9ca] transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61595278437100"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-xl border border-[#e8dfd3] dark:border-[#24343b] hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] hover:border-[#b9d9ca] transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/elitesolutions.official/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-xl border border-[#e8dfd3] dark:border-[#24343b] hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] hover:border-[#b9d9ca] transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1d1a17] dark:text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#5b534d] dark:text-[#c9d4cf]">
              <li>
                <a href="#hero" className="link-action hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  Home
                </a>
              </li>
              <li>
                <a href="#generator" className="link-action hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  QR Generator
                </a>
              </li>
              <li>
                <a href="#scanner" className="link-action hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  QR Scanner
                </a>
              </li>
              <li>
                <a href="#features" className="link-action hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="link-action hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#use-cases" className="link-action hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  Use Cases
                </a>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1d1a17] dark:text-white mb-4">
              Featured Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#5b534d] dark:text-[#c9d4cf]">
              <li>
                <button type="button" onClick={() => handleTypeClick('url')} className="link-action block w-full text-left hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  Website Link QR
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleTypeClick('wifi')} className="link-action block w-full text-left hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  Wi-Fi Password QR
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleTypeClick('vcard')} className="link-action block w-full text-left hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  Digital Business Card (vCard)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleTypeClick('whatsapp')} className="link-action block w-full text-left hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  WhatsApp Direct Chat QR
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleTypeClick('payment')} className="link-action block w-full text-left hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  Bank / Wallet Payment QR
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleTypeClick('crypto')} className="link-action block w-full text-left hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  Crypto Payment QR
                </button>
              </li>
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1d1a17] dark:text-white mb-4">
              Security & Policy
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm text-[#5b534d] dark:text-[#c9d4cf] md:block md:space-y-2.5">
              <li>
                <button type="button" onClick={onOpenPrivacy} className="link-action hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenPrivacy} className="link-action hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  Privacy & Architecture
                </button>
              </li>
              <li>
                <a href="#faq" className="link-action hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  Static vs Dynamic FAQ
                </a>
              </li>
              <li>
                <a href="#contact" className="link-action hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] cursor-pointer">
                  Support & Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#7b6d65] dark:text-[#9bb0b4] text-center sm:text-left">
          <p>© {new Date().getFullYear()} QuickQR. All rights reserved.</p>
          <p>Built with care for QuickQR</p>
        </div>
      </div>
    </footer>
  );
};
