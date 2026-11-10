import React, { useState } from 'react';
import {
  History,
  Trash2,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { HistoryItem } from '../types';
import { deleteHistoryItem, clearAllHistory } from '../utils/qrStorage';

interface QRHistoryProps {
  history: HistoryItem[];
  onHistoryChange: () => void;
  onLoadItem: (item: HistoryItem) => void;
  onToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const QRHistory: React.FC<QRHistoryProps> = ({
  history,
  onHistoryChange,
  onLoadItem,
  onToast,
}) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleDelete = (id: string) => {
    if (!deleteHistoryItem(id)) {
      onToast('error', 'Could not remove this item. Browser storage may be unavailable.');
      return;
    }
    onHistoryChange();
    onToast('info', 'Item removed from history.');
  };

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your local QR code history?')) {
      if (!clearAllHistory()) {
        onToast('error', 'Could not clear history. Browser storage may be unavailable.');
        return;
      }
      onHistoryChange();
      onToast('info', 'All QR code history cleared.');
    }
  };

  const handleCopyPayload = async (item: HistoryItem) => {
    try {
      await navigator.clipboard.writeText(item.payload);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
      onToast('success', 'Payload copied to clipboard!');
    } catch {
      onToast('error', 'Failed to copy to clipboard.');
    }
  };

  const handleDownloadCached = (item: HistoryItem) => {
    if (!item.previewDataUrl) {
      onToast('info', 'Loading item into generator to export high-res files...');
      onLoadItem(item);
      return;
    }
    const link = document.createElement('a');
    link.href = item.previewDataUrl;
    link.download = `quickqr-${item.type}-${item.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    onToast('success', 'Downloaded QR code image!');
  };

  return (
    <section id="history" aria-labelledby="history-heading" className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 pb-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 id="history-heading" className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Recently Generated QR Codes
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              Saved strictly in your browser's private local storage. Never synced or uploaded to an external server.
            </p>
          </div>

          {history.length > 0 && (
            <button
              type="button"
              onClick={handleClearAll}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 transition-colors cursor-pointer self-start sm:self-auto"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear History</span>
            </button>
          )}
        </div>

        {/* History Grid or Empty State */}
        {history.length === 0 ? (
          <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 max-w-lg mx-auto">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto mb-3">
              <History className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
              No QR Codes Saved Yet
            </h3>
            <p className="text-xs text-slate-500 max-w-xs mx-auto mb-5">
              Generate a QR code above and click "Save to History" or download it to keep a local shortcut here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
            {history.map((item) => {
              const formattedDate = new Date(item.createdAt).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              });

              return (
                <div
                  key={item.id}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group overflow-hidden"
                >
                  <div>
                    {/* Top Item Row */}
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
                      <span className="font-semibold uppercase px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-[10px]">
                        {item.type}
                      </span>
                      <span className="text-[11px] font-mono">{formattedDate}</span>
                    </div>

                    {/* QR Thumbnail Preview */}
                    <div className="aspect-square w-full rounded-xl bg-slate-50 dark:bg-slate-950/50 p-4 mb-3 flex items-center justify-center border border-slate-100 dark:border-slate-800/80 overflow-hidden">
                      {item.previewDataUrl ? (
                        <img
                          src={item.previewDataUrl}
                          alt={item.title}
                          className="max-h-full max-w-full object-contain rounded-lg group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-24 h-24 rounded-lg bg-indigo-100 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-500 font-mono text-xs">
                          QR CODE
                        </div>
                      )}
                    </div>

                    {/* Title & Payload */}
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate mt-0.5 mb-4">
                      {item.payload}
                    </p>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-1">
                    <button
                      type="button"
                      onClick={() => onLoadItem(item)}
                      title="Load into Generator"
                      className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1d7a5d] dark:text-[#93d3b1] hover:bg-[#1d7a5d]/5 dark:hover:bg-[#1d7a5d]/10 transition-colors cursor-pointer min-h-[38px]"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        onClick={() => handleCopyPayload(item)}
                        title="Copy Payload"
                        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                      >
                        {copiedId === item.id ? (
                          <Check className="w-4 h-4 text-emerald-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadCached(item)}
                        title="Download"
                        className="p-2 rounded-xl text-slate-500 hover:text-[#1d7a5d] dark:hover:text-[#93d3b1] hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                      >
                        <Download className="w-4 h-4" />
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDelete(item.id)}
                        title="Delete from history"
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
