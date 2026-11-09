import React from 'react';
import {
  Globe,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  MessageCircle,
  Wifi,
  Contact,
  MapPin,
  Calendar,
  Coins,
  Banknote,
} from 'lucide-react';
import { QRType, SocialQRType } from '../../types';
import { SocialPlatformIcon } from '../SocialPlatformIcon';
import { SOCIAL_PLATFORMS } from '../../utils/socialPlatforms';

interface QRTypeSelectorProps {
  selectedType: QRType;
  onSelectType: (type: QRType) => void;
}

interface TypeItem {
  type: QRType;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  socialType?: SocialQRType;
  category: 'web' | 'comm' | 'business' | 'social';
}

const QR_TYPES: TypeItem[] = [
  { type: 'url', label: 'URL / Link', icon: Globe, category: 'web' },
  { type: 'text', label: 'Plain Text', icon: FileText, category: 'web' },
  { type: 'wifi', label: 'Wi-Fi Network', icon: Wifi, category: 'web' },
  { type: 'email', label: 'Email', icon: Mail, category: 'comm' },
  { type: 'phone', label: 'Phone Call', icon: Phone, category: 'comm' },
  { type: 'whatsapp', label: 'WhatsApp', icon: MessageCircle, category: 'comm' },
  { type: 'sms', label: 'SMS Text', icon: MessageSquare, category: 'comm' },
  { type: 'vcard', label: 'Contact Card', icon: Contact, category: 'business' },
  { type: 'location', label: 'Google Maps', icon: MapPin, category: 'business' },
  { type: 'event', label: 'Calendar Event', icon: Calendar, category: 'business' },
  ...SOCIAL_PLATFORMS.map((platform) => ({
    type: platform.type,
    label: platform.label,
    socialType: platform.type,
    category: 'social' as const,
  })),
  { type: 'crypto', label: 'Crypto Address', icon: Coins, category: 'business' },
  { type: 'payment', label: 'Bank / Wallet Payment', icon: Banknote, category: 'business' },
];

export const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({ selectedType, onSelectType }) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
          Select QR Code Content Type
        </label>
        <span className="text-xs text-slate-400 dark:text-slate-500 font-medium">
          {QR_TYPES.length} Types Available
        </span>
      </div>

      <div className="grid grid-cols-2 min-[475px]:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5">
        {QR_TYPES.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedType === item.type;

          return (
            <button
              key={item.type}
              type="button"
              onClick={() => onSelectType(item.type)}
              className={`flex items-center gap-2 sm:gap-2.5 p-2.5 sm:p-3 rounded-xl text-left border transition-all duration-200 cursor-pointer min-h-[46px] hover:scale-[1.02] active:scale-[0.98] ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-50 to-indigo-100/60 dark:from-indigo-950/70 dark:to-indigo-900/40 border-indigo-500 dark:border-indigo-400 text-indigo-700 dark:text-indigo-300 shadow-sm font-semibold ring-1 ring-indigo-500/20'
                  : 'bg-white dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-indigo-300 dark:hover:border-indigo-700 hover:bg-slate-50 dark:hover:bg-slate-800/50'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg shrink-0 transition-transform duration-200 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                }`}
              >
                {Icon ? (
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : item.socialType ? (
                  <SocialPlatformIcon platform={item.socialType} className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                ) : null}
              </div>
              <span className="text-[11px] sm:text-xs font-medium truncate">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
