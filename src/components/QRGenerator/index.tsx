import React, { useState } from 'react';
import { QRType, QRDesignConfig, HistoryItem } from '../../types';
import { QRFormState, initialFormState, generatePayload, getFormStateFromPayload } from '../../utils/qrPayloads';
import { defaultDesignConfig, saveHistoryItem } from '../../utils/qrStorage';
import { QRTypeSelector } from './QRTypeSelector';
import { QRInputForms } from './QRInputForms';
import { QRCustomizer } from './QRCustomizer';
import { QRPreview } from './QRPreview';

interface QRGeneratorProps {
  onToast: (type: 'success' | 'error' | 'info', message: string) => void;
  onHistoryUpdated: () => void;
  loadedHistoryItem?: HistoryItem | null;
}

export const QRGenerator: React.FC<QRGeneratorProps> = ({
  onToast,
  onHistoryUpdated,
  loadedHistoryItem,
}) => {
  const [selectedType, setSelectedType] = useState<QRType>('url');
  const [formState, setFormState] = useState<QRFormState>(initialFormState);
  const [designConfig, setDesignConfig] = useState<QRDesignConfig>(defaultDesignConfig);

  // If user clicked "Load" from history
  React.useEffect(() => {
    if (loadedHistoryItem) {
      setSelectedType(loadedHistoryItem.type);
      setDesignConfig({ ...defaultDesignConfig, ...loadedHistoryItem.design });
      const restoredFormState =
        loadedHistoryItem.formState ??
        getFormStateFromPayload(loadedHistoryItem.type, loadedHistoryItem.payload);
      setFormState((prev) => ({ ...prev, ...restoredFormState }));
    }
  }, [loadedHistoryItem]);

  const handleFormChange = (field: keyof QRFormState, value: any) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleDesignChange = (updates: Partial<QRDesignConfig>) => {
    setDesignConfig((prev) => ({ ...prev, ...updates }));
  };

  const { payload, displayTitle } = generatePayload(selectedType, formState);

  const handleSaveToHistory = (previewDataUrl?: string): boolean => {
    const item: HistoryItem = {
      id: `qr_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`,
      title: displayTitle,
      type: selectedType,
      payload,
      createdAt: Date.now(),
      design: designConfig,
      formState: { ...formState },
      previewDataUrl,
    };
    const saved = saveHistoryItem(item);
    if (saved) onHistoryUpdated();
    return saved;
  };

  return (
    <section id="generator" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            <span>Core Studio Engine</span>
            <span aria-hidden="true">·</span>
            <span>Instant Client-Side Vector Generation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
            Interactive QR Code Generator & Studio
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Select your content type, customize styles with real-time feedback, and export in four professional formats.
          </p>
        </div>

        {/* Main Grid: Inputs + Studio vs. Live Preview Sticky Column */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left / Center 7 cols: Content Types, Inputs, Customizer */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Type Selector Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
              <QRTypeSelector selectedType={selectedType} onSelectType={setSelectedType} />
            </div>

            {/* Input Forms Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl sm:rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  Content Configuration
                </span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                  Type: {selectedType.toUpperCase()}
                </span>
              </div>
              <QRInputForms
                type={selectedType}
                formState={formState}
                onChange={handleFormChange}
              />
            </div>

            {/* Mobile-only Quick Jump to Preview */}
            <div className="lg:hidden flex justify-end">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById('qr-preview-card');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3.5 py-2 rounded-xl border border-indigo-200 dark:border-indigo-900 flex items-center gap-1.5 cursor-pointer min-h-[40px]"
              >
                <span>Jump to Live Preview & Download</span>
                <span>↓</span>
              </button>
            </div>

            {/* Customizer Studio */}
            <QRCustomizer
              design={designConfig}
              onChange={handleDesignChange}
              onToast={onToast}
            />
          </div>

          {/* Right 5 cols: Sticky Live QR Preview & Downloads */}
          <div id="qr-preview-card" className="lg:col-span-5 lg:sticky lg:top-24 space-y-6 scroll-mt-24">
            <QRPreview
              payload={payload}
              displayTitle={displayTitle}
              type={selectedType}
              design={designConfig}
              onSaveHistory={handleSaveToHistory}
              onToast={onToast}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
