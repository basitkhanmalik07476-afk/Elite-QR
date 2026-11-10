import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QRGenerator } from './components/QRGenerator';
import { QRScanner } from './components/QRScanner';
import { QRHistory } from './components/QRHistory';
import { Features } from './components/Features';
import { HowItWorks } from './components/HowItWorks';
import { UseCases } from './components/UseCases';
import { FAQ } from './components/FAQ';
import { ContactSection } from './components/ContactSection';
import { PrivacyModal } from './components/PrivacyModal';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/Toast';
import { ToastMessage, HistoryItem, QRFormState, QRType } from './types';
import { generatePayload, getFormStateFromPayload, initialFormState } from './utils/qrPayloads';
import { getHistory, setSavedTheme, defaultDesignConfig } from './utils/qrStorage';
import { getSocialTypeFromUrl } from './utils/socialPlatforms';

const navigationSections = ['generator', 'scanner', 'features', 'how-it-works', 'use-cases', 'faq'];

export default function App() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loadedHistoryItem, setLoadedHistoryItem] = useState<HistoryItem | null>(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('generator');

  useEffect(() => {
    setSavedTheme('light');
    setHistory(getHistory());

    if (window.location.pathname !== '/') {
      window.history.replaceState(null, '', '/');
    }

    const handleScroll = () => {
      let active = 'generator';
      const scrollPosition = window.scrollY + 120;

      for (const id of navigationSections) {
        const section = document.getElementById(id);
        if (section && scrollPosition >= section.offsetTop) {
          active = id;
        }
      }

      setActiveSection(active);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const handleScrollTo = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  };

  const handleHistoryUpdated = () => {
    setHistory(getHistory());
  };

  const handleLoadItem = (item: HistoryItem) => {
    setLoadedHistoryItem(item);
    handleScrollTo('generator');
    addToast('info', `Loaded "${item.title}" into Generator studio`);
  };

  const handleSelectUseCaseTemplate = (type: QRType, initialData: Partial<QRFormState>) => {
    const formState = { ...initialFormState, ...initialData };
    const tempItem: HistoryItem = {
      id: `temp_${Date.now()}`,
      title: 'Template: ' + type.toUpperCase(),
      type,
      payload: generatePayload(type, formState).payload,
      createdAt: Date.now(),
      design: { ...defaultDesignConfig },
      formState,
    };
    setLoadedHistoryItem(tempItem);
    handleScrollTo('generator');
    addToast('success', `Loaded ${type.toUpperCase()} template into Generator!`);
  };

  const handleUseScannedPayload = (payload: string) => {
    const socialType = getSocialTypeFromUrl(payload);
    const type: QRType = /^PAYMENT DETAILS \(PAKISTAN\)/i.test(payload)
      ? 'payment'
      : socialType
        ? socialType
        : /^https?:\/\//i.test(payload)
          ? 'url'
          : 'text';
    const formState = {
      ...initialFormState,
      ...(type === 'url'
        ? { url: payload }
        : type === 'payment' || socialType
          ? getFormStateFromPayload(type, payload)
          : { text: payload }),
    };
    setLoadedHistoryItem({
      id: `scan_${Date.now()}`,
      title: 'Scanned content',
      type,
      payload,
      createdAt: Date.now(),
      design: { ...defaultDesignConfig },
      formState,
    });
    handleScrollTo('generator');
    addToast('info', 'Loaded scanned content into generator.');
  };

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#f5f1ea] text-[#1d1a17] flex flex-col font-sans">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-[#1d7a5d] focus:shadow-lg"
      >
        Skip to main content
      </a>
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      <Navbar onNavigateTo={handleScrollTo} activeSection={activeSection} />

      <main id="main-content" className="flex-1">
        <Hero onNavigateTo={handleScrollTo} />

        <QRGenerator
          onToast={addToast}
          onHistoryUpdated={handleHistoryUpdated}
          loadedHistoryItem={loadedHistoryItem}
        />

        <QRScanner onToast={addToast} onUseInGenerator={handleUseScannedPayload} />

        <QRHistory
          history={history}
          onHistoryChange={handleHistoryUpdated}
          onLoadItem={handleLoadItem}
          onToast={addToast}
        />

        <Features />
        <HowItWorks onNavigateTo={handleScrollTo} />
        <UseCases onSelectUseCaseTemplate={handleSelectUseCaseTemplate} />
        <FAQ />
        <ContactSection onToast={addToast} />
      </main>

      <Footer
        onNavigateTo={handleScrollTo}
        onSelectType={(type) => handleSelectUseCaseTemplate(type, {})}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
      />

      <PrivacyModal isOpen={privacyModalOpen} onClose={() => setPrivacyModalOpen(false)} />
    </div>
  );
}
