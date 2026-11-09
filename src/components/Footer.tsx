import React from 'react';
import { QrCode, Github, Mail, Facebook, Instagram } from 'lucide-react';
import { QRType } from '../types';

interface FooterProps {
  onScrollTo: (id: string) => void;
  onSelectType: (type: QRType) => void;
  onOpenPrivacy: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onScrollTo,
  onSelectType,
  onOpenPrivacy,
}) => {
  const handleTypeClick = (type: QRType) => {
    onSelectType(type);
    onScrollTo('generator');
  };

  return (
    <footer className="bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800/80 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-x-5 gap-y-8 sm:gap-8 pb-12 border-b border-slate-200/80 dark:border-slate-800/80">
          {/* Brand & Description (5 cols) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-5 sm:pr-4">
            <button
              type="button"
              onClick={() => onScrollTo('hero')}
              aria-label="Elite QR home"
              className="inline-flex items-center gap-2.5 mb-4 rounded-lg text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-950"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
                <QrCode className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1 text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Elite<span className="text-indigo-600 dark:text-indigo-400">QR</span>
              </span>
            </button>

            <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
              Create. Customize. Connect.
            </p>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm mb-6">
              The premier QR Code generation and optical scanning suite. Vector SVG, print PDF, and instant client-side privacy with zero monthly subscriptions.
            </p>

            {/* Contact links */}
            <div className="flex items-center gap-3 text-slate-400">
              <a
                href="mailto:official.elitesolutions1@gmail.com"
                aria-label="Email Elite Solutions"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61595278437100"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/elitesolutions.official/"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://github.com/Elite-Solutions-Dev"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-400 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('hero')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('generator')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  QR Generator
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('scanner')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  QR Scanner
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('features')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Features
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('how-it-works')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('use-cases')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Use Cases
                </button>
              </li>
            </ul>
          </div>

          {/* QR Tools (3 cols) */}
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Featured Tools
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              <li>
                <button
                  type="button"
                  onClick={() => handleTypeClick('url')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Website Link QR
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleTypeClick('wifi')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Wi-Fi Password QR
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleTypeClick('vcard')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Digital Business Card (vCard)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleTypeClick('whatsapp')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  WhatsApp Direct Chat QR
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleTypeClick('payment')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Bank / Wallet Payment QR
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => handleTypeClick('crypto')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Crypto Payment QR
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy (2 cols) */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Security & Policy
            </h4>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-400 md:block md:space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Terms of Service
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('faq')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Static vs Dynamic FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onScrollTo('contact')}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
                >
                  Support & Contact
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Elite QR. All rights reserved.</p>
          <p>
            Built with care by{' '}
            <a
              href="https://elite-solutions-pearl.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="font-semibold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              Elite Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
