import React, { useMemo, useState } from 'react';
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
  Search,
  X,
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

const POPULAR_TYPES: QRType[] = ['url', 'wifi', 'text', 'whatsapp', 'vcard', 'instagram', 'email', 'payment'];

export const QRTypeSelector: React.FC<QRTypeSelectorProps> = ({ selectedType, onSelectType }) => {
  const [activeCategory, setActiveCategory] = useState('Popular');
  const [search, setSearch] = useState('');
  const categories = ['Popular', 'All types', 'Web & text', 'Calls & messages', 'Business', 'Social'];
  const visibleTypes = useMemo(() => {
    const query = search.trim().toLowerCase();
    return QR_TYPES.filter((item) => {
      if (query) return `${item.label} ${item.type}`.toLowerCase().includes(query);
      if (activeCategory === 'Popular') return POPULAR_TYPES.includes(item.type);
      if (activeCategory === 'All types') return true;
      if (activeCategory === 'Web & text') return item.category === 'web';
      if (activeCategory === 'Calls & messages') return item.category === 'comm';
      if (activeCategory === 'Business') return item.category === 'business';
      return item.category === 'social';
    });
  }, [activeCategory, search]);

  return (
    <div className="w-full">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Choose a QR type</h3>
          <p className="mt-0.5 text-xs text-slate-500">Pick what you want people to open when they scan.</p>
        </div>
        <label className="flex min-h-11 w-full items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3 text-slate-400 transition-colors focus-within:border-indigo-400 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 sm:max-w-[220px]">
          <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search QR types"
            aria-label="Search QR types"
            className="min-w-0 flex-1 bg-transparent text-base text-slate-800 outline-none placeholder:text-slate-400 sm:text-sm"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              aria-label="Clear QR type search"
              className="rounded-md p-1 text-slate-400 hover:bg-slate-200 hover:text-slate-700"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </label>
      </div>

      <div className="mb-3 grid grid-cols-3 gap-1.5 sm:grid-cols-6" role="group" aria-label="Filter QR types">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => {
              setActiveCategory(category);
              setSearch('');
            }}
            aria-pressed={activeCategory === category && !search}
            className={`flex min-h-10 items-center justify-center rounded-full border px-1.5 text-center text-[10px] font-semibold leading-tight transition-colors sm:px-2 sm:text-[11px] ${
              activeCategory === category && !search
                ? 'border-[#1d7a5d] bg-[#1d7a5d] text-white'
                : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <p className="mb-2 text-[11px] font-medium text-slate-500" aria-live="polite">
        {search ? `${visibleTypes.length} matching types` : activeCategory === 'Popular' ? 'Popular choices' : `${visibleTypes.length} types`}
      </p>
      {visibleTypes.length > 0 ? (
      <div className="grid grid-cols-2 gap-2 min-[480px]:grid-cols-3 lg:grid-cols-2 min-[1150px]:grid-cols-3">
        {visibleTypes.map((item) => {
          const Icon = item.icon;
          const isSelected = selectedType === item.type;

          return (
            <button
              key={item.type}
              type="button"
              onClick={() => onSelectType(item.type)}
              aria-pressed={isSelected}
              className={`flex min-h-[52px] min-w-0 items-center gap-2 rounded-xl border px-2.5 py-2 text-left transition-colors cursor-pointer ${
                isSelected
                  ? 'border-[#1d7a5d] bg-[#1d7a5d]/5 text-[#1d7a5d] shadow-sm ring-1 ring-[#1d7a5d]/15'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-[#1d7a5d]/50 hover:bg-slate-50'
              }`}
            >
              <div
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  isSelected
                    ? 'bg-[#1d7a5d] text-white'
                    : 'bg-slate-100 text-slate-600'
                }`}
              >
                {Icon ? (
                  <Icon className="h-4 w-4" />
                ) : item.socialType ? (
                  <SocialPlatformIcon platform={item.socialType} className="h-4 w-4" />
                ) : null}
              </div>
              <span className="min-w-0 text-xs font-semibold leading-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-6 text-center">
          <p className="text-sm font-semibold text-slate-700">No QR types found</p>
          <p className="mt-1 text-xs text-slate-500">Try another search or browse all types.</p>
          <button
            type="button"
            onClick={() => {
              setSearch('');
              setActiveCategory('All types');
            }}
            className="mt-3 min-h-10 rounded-lg px-3 text-xs font-bold text-[#1d7a5d] hover:bg-[#1d7a5d]/5"
          >
            Browse all types
          </button>
        </div>
      )}
    </div>
  );
};
