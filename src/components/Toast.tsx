import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { ToastMessage } from '../types';

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  if (toasts.length === 0) return null;

  return (
    <div
      className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 flex flex-col gap-3 w-[calc(100%-2rem)] max-w-[36rem] pointer-events-none"
      aria-live="polite"
      aria-relevant="additions"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role={toast.type === 'error' ? 'alert' : 'status'}
          className={`toast-notification pointer-events-auto relative flex items-center justify-between gap-3 sm:gap-4 px-4 sm:px-5 py-3.5 sm:py-4 overflow-hidden rounded-2xl shadow-2xl border backdrop-blur-xl ${
            toast.type === 'success'
              ? 'bg-emerald-950/95 border-emerald-400/25 text-emerald-50 shadow-emerald-950/25'
              : toast.type === 'error'
              ? 'bg-rose-950/95 border-rose-400/25 text-rose-50 shadow-rose-950/25'
              : 'bg-slate-900/95 border-indigo-400/25 text-slate-50 shadow-slate-950/25'
          }`}
        >
          <div className="flex min-w-0 items-center gap-3 text-sm sm:text-base font-semibold">
            <span
              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                toast.type === 'success'
                  ? 'border-emerald-400/30 bg-emerald-400/10'
                  : toast.type === 'error'
                    ? 'border-rose-400/30 bg-rose-400/10'
                    : 'border-indigo-400/30 bg-indigo-400/10'
              }`}
            >
              {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-300" />}
              {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-rose-300" />}
              {toast.type === 'info' && <Info className="w-5 h-5 text-indigo-300" />}
            </span>
            <span className="min-w-0 leading-snug">{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => onDismiss(toast.id)}
            className="shrink-0 rounded-lg p-1.5 text-white/55 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            aria-label="Dismiss toast"
          >
            <X className="w-4 h-4" />
          </button>
          <span
            aria-hidden="true"
            className={`toast-notification__timer absolute inset-x-0 bottom-0 h-0.5 origin-left ${
              toast.type === 'success'
                ? 'bg-emerald-400'
                : toast.type === 'error'
                  ? 'bg-rose-400'
                  : 'bg-indigo-400'
            }`}
          />
        </div>
      ))}
    </div>
  );
};
