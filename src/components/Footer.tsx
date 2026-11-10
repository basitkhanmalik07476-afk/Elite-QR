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
            <button
              type="button"
              onClick={() => onNavigateTo('hero')}
              aria-label="QuickQR home"
              className="inline-flex items-center gap-2.5 mb-4 rounded-lg text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d7a5d] focus-visible:ring-offset-2 dark:focus-visible:ring-offset-[#0d1418]"
            >
              <img src="/quickqr-logo.png" alt="QuickQR — Create Once. Share Anywhere." className="h-auto w-[min(100%,230px)] max-w-full object-contain object-left" />
            </button>

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
                <button type="button" onClick={() => onNavigateTo('hero')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  Home
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigateTo('generator')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  QR Generator
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigateTo('scanner')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  QR Scanner
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigateTo('features')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  Features
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigateTo('how-it-works')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  How It Works
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigateTo('use-cases')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  Use Cases
                </button>
              </li>
            </ul>
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1d1a17] dark:text-white mb-4">
              Featured Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#5b534d] dark:text-[#c9d4cf]">
              <li>
                <button type="button" onClick={() => handleTypeClick('url')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  Website Link QR
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleTypeClick('wifi')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  Wi-Fi Password QR
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleTypeClick('vcard')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  Digital Business Card (vCard)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleTypeClick('whatsapp')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  WhatsApp Direct Chat QR
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleTypeClick('payment')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  Bank / Wallet Payment QR
                </button>
              </li>
              <li>
                <button type="button" onClick={() => handleTypeClick('crypto')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
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
                <button type="button" onClick={onOpenPrivacy} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={onOpenPrivacy} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  Privacy & Architecture
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigateTo('faq')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  Static vs Dynamic FAQ
                </button>
              </li>
              <li>
                <button type="button" onClick={() => onNavigateTo('contact')} className="hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] transition-colors cursor-pointer">
                  Support & Contact
                </button>
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
