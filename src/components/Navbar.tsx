import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Sparkles, ScanLine } from 'lucide-react';

interface NavbarProps {
  onNavigateTo: (sectionId: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateTo, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (
        target instanceof Node &&
        !mobileMenuRef.current?.contains(target) &&
        !mobileMenuTriggerRef.current?.contains(target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };

    document.addEventListener('pointerdown', handleOutsidePointerDown);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('pointerdown', handleOutsidePointerDown);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'generator', label: 'QR Generator' },
    { id: 'scanner', label: 'QR Scanner' },
    { id: 'features', label: 'Features' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'use-cases', label: 'Use Cases' },
    { id: 'faq', label: 'FAQ' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigateTo(id);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[#f5f1ea]/85 dark:bg-[#0f1418]/85 backdrop-blur-md shadow-[0_10px_30px_rgba(28,26,23,0.08)] border-b border-[#e8dfd3] dark:border-[#1b2a2f] py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          <button
            type="button"
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-2.5 text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1d7a5d] rounded-lg shrink-0"
            aria-label="QuickQR home"
          >
            <img
              src="/quickqr-logo.png"
              alt="QuickQR — Create Once. Share Anywhere."
              className="h-[40px] w-[145px] max-w-full object-contain object-left sm:h-auto sm:w-[250px] lg:w-[230px]"
            />
          </button>

          <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-[#5b534d] dark:text-[#cad2d0]">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  aria-current={activeSection === link.id ? 'page' : undefined}
                  className={`relative py-1 transition-colors whitespace-nowrap cursor-pointer hover:text-[#1d7a5d] dark:hover:text-[#8ad2b4] ${
                    isActive ? 'text-[#1d7a5d] dark:text-[#8ad2b4]' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#1d7a5d] dark:bg-[#8ad2b4] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => handleLinkClick('generator')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 text-sm font-bold text-white bg-[#1d7a5d] hover:bg-[#115a49] rounded-xl shadow-[0_14px_24px_rgba(29,122,93,0.18)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4" />
              <span>Generate QR Code</span>
            </button>

            <button
              ref={mobileMenuTriggerRef}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              className="lg:hidden p-2.5 rounded-xl text-[#1d1a17] dark:text-stone-200 hover:bg-white/80 dark:hover:bg-[#172228] transition-colors cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 top-[65px] bg-[#1d1a17]/30 backdrop-blur-sm z-30 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <div
              ref={mobileMenuRef}
              id="mobile-navigation-menu"
              className="relative z-40 lg:hidden mt-3 p-4 rounded-2xl bg-[#fffdf9] dark:bg-[#10191d] shadow-[0_18px_45px_rgba(17,23,31,0.12)] border border-[#e8dfd3] dark:border-[#1d2b31] animate-mobile-dropdown"
            >
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold text-left transition-colors cursor-pointer min-h-[44px] ${
                      activeSection === link.id
                        ? 'bg-[#edf7f3] dark:bg-[#112a2a] text-[#1d7a5d] dark:text-[#8ad2b4]'
                        : 'text-[#1d1a17] dark:text-stone-200 hover:bg-[#f7f4f0] dark:hover:bg-[#172228]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.id === 'scanner' && <ScanLine className="w-4 h-4 text-[#8f8279]" />}
                  </button>
                ))}

                <div className="pt-3 mt-2 border-t border-[#efe7dc] dark:border-[#1d2b31]">
                  <button
                    onClick={() => handleLinkClick('generator')}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-[#1d7a5d] shadow-[0_16px_24px_rgba(29,122,93,0.2)] min-h-[44px] active:scale-[0.98] transition-transform"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Generate QR Code</span>
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};
