import React, { useState, useEffect } from 'react';
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
import { getHistory, getInitialTheme, setSavedTheme, defaultDesignConfig } from './utils/qrStorage';

export default function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(getInitialTheme());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loadedHistoryItem, setLoadedHistoryItem] = useState<HistoryItem | null>(null);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Sync initial theme
  useEffect(() => {
    setSavedTheme(theme);
    setHistory(getHistory());
  }, []);

  const handleToggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    setSavedTheme(next);
  };

  const addToast = (type: 'success' | 'error' | 'info', message: string) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const topOffset = 80;
      const elementPosition = el.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - topOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
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

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onDismiss={dismissToast} />

      {/* Top Navbar */}
      <Navbar
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onNavigateTo={handleScrollTo}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero onScrollTo={handleScrollTo} />

        {/* QR Code Generator (Core Feature) */}
        <QRGenerator
          onToast={addToast}
          onHistoryUpdated={handleHistoryUpdated}
          loadedHistoryItem={loadedHistoryItem}
        />

        {/* QR Code Scanner (Camera & File Decoding) */}
        <QRScanner
          onToast={addToast}
          onUseInGenerator={(payload) => {
            const type: QRType = /^https?:\/\//i.test(payload)
              ? 'url'
              : /^PAYMENT DETAILS \(PAKISTAN\)/i.test(payload)
                ? 'payment'
                : 'text';
            const formState = {
              ...initialFormState,
              ...(type === 'url'
                ? { url: payload }
                : type === 'payment'
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
          }}
        />

        {/* Recent QR History */}
        <QRHistory
          history={history}
          onHistoryChange={handleHistoryUpdated}
          onLoadItem={handleLoadItem}
          onToast={addToast}
        />

        {/* Features Bento Grid */}
        <Features />

        {/* How It Works (3 Steps) */}
        <HowItWorks onScrollTo={handleScrollTo} />

        {/* Use Cases Section */}
        <UseCases onSelectUseCaseTemplate={handleSelectUseCaseTemplate} />

        {/* Frequently Asked Questions */}
        <FAQ />

        {/* Contact / Inquiries Section */}
        <ContactSection onToast={addToast} />
      </main>

      {/* Footer */}
      <Footer
        onScrollTo={handleScrollTo}
        onSelectType={(type) => {
          handleSelectUseCaseTemplate(type, {});
        }}
        onOpenPrivacy={() => setPrivacyModalOpen(true)}
      />

      {/* Privacy Policy & Terms Modal */}
      <PrivacyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}
