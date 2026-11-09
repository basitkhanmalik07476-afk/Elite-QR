import React from 'react';
import { X, ShieldCheck, Lock, EyeOff, HardDrive, ExternalLink } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
              Privacy Policy & Architecture
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
              <Lock className="w-4 h-4 text-emerald-500" />
              1. 100% Client-Side Generation
            </h4>
            <p>
              Unlike many web services that process your inputs on a remote server, Elite QR generates, renders, and compiles every QR code purely inside your local browser runtime via HTML5 Canvas and JavaScript.
            </p>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
              <EyeOff className="w-4 h-4 text-indigo-500" />
              2. No QR Payloads Sent to an App Server
            </h4>
            <p>
              QR payloads are processed in your browser and are not sent to an Elite QR app server. The site requests Google Fonts from Google's servers; those requests may expose standard connection data such as your IP address, but do not include QR payloads.
            </p>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
              <HardDrive className="w-4 h-4 text-cyan-500" />
              3. Local Browser Storage Only
            </h4>
            <p>
              If you save a QR, its payload, design, and any uploaded logo data are stored in this browser's `localStorage`. Browser storage is not encrypted and may be accessible to someone using this browser profile. Clear history on shared devices.
            </p>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-500" />
              4. Camera Permission Safety
            </h4>
            <p>
              Camera access is strictly invoked only after you explicitly click "Start Camera Scanner". Video frames are evaluated in memory to locate QR patterns and are immediately discarded. No video streams or snapshots are ever recorded or transmitted over a network.
            </p>
          </div>

          <div>
            <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-1.5">
              <ExternalLink className="w-4 h-4 text-indigo-500" />
              5. Contact Form
            </h4>
            <p>
              When configured, the contact form opens your email application with the message. Nothing is sent by this site; it is transmitted only if you choose to send it through your email provider.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 dark:bg-slate-950/50 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center justify-center cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
