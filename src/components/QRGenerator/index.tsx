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
    <section id="generator" aria-labelledby="generator-heading" className="relative py-12 sm:py-16 lg:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-8 max-w-3xl text-center sm:mb-10 lg:mb-12">
          <h2 id="generator-heading" className="text-balance text-2xl font-extrabold leading-tight tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
            Create a QR code that fits your brand
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
            Choose what to share, style your code, and download a scan-ready design in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 items-start gap-4 sm:gap-5 lg:grid-cols-12 lg:gap-6">
          <div className="order-1 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:rounded-3xl sm:p-6 lg:col-start-1 lg:col-span-7 lg:row-start-1">
            <QRTypeSelector selectedType={selectedType} onSelectType={setSelectedType} />
          </div>

          <div className="order-2 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)] sm:rounded-3xl sm:p-6 lg:col-start-1 lg:col-span-7 lg:row-start-2">
            <div className="mb-5 flex items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Your content</h3>
                <p className="mt-0.5 text-xs text-slate-500">Add the details for your {selectedType.toUpperCase()} QR code.</p>
              </div>
              <span className="shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-700 sm:text-xs">
                {selectedType}
              </span>
            </div>
            <QRInputForms type={selectedType} formState={formState} onChange={handleFormChange} />
          </div>

          <div id="qr-preview-card" className="order-3 scroll-mt-24 lg:sticky lg:top-24 lg:col-start-8 lg:col-span-5 lg:row-start-1 lg:row-span-3 lg:self-start">
            <QRPreview
              payload={payload}
              displayTitle={displayTitle}
              type={selectedType}
              design={designConfig}
              onSaveHistory={handleSaveToHistory}
              onToast={onToast}
            />
          </div>

          <div className="order-4 lg:col-span-12 lg:row-start-4">
            <QRCustomizer
              design={designConfig}
              onChange={handleDesignChange}
              onToast={onToast}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
