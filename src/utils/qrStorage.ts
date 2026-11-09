import { HistoryItem, QRDesignConfig, QRType } from '../types';

const STORAGE_KEY = 'elite_qr_history_v1';
const THEME_KEY = 'elite_qr_theme_v1';
const QR_TYPES = new Set<QRType>([
  'url', 'text', 'email', 'phone', 'whatsapp', 'sms', 'wifi', 'vcard',
  'location', 'event', 'instagram', 'facebook', 'youtube', 'linkedin', 'tiktok',
  'x', 'snapchat', 'pinterest', 'telegram', 'threads', 'twitch', 'reddit', 'discord', 'bluesky', 'github',
  'crypto', 'payment',
]);

function isHistoryItem(value: unknown): value is HistoryItem {
  if (!value || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return (
    typeof item.id === 'string' &&
    typeof item.title === 'string' &&
    typeof item.type === 'string' &&
    QR_TYPES.has(item.type as QRType) &&
    typeof item.payload === 'string' &&
    typeof item.createdAt === 'number' &&
    typeof item.design === 'object' &&
    item.design !== null &&
    !Array.isArray(item.design)
  );
}

export const defaultDesignConfig: QRDesignConfig = {
  dotsColor: '#4f46e5', // Deep Indigo
  backgroundColor: '#ffffff',
  isTransparentBg: false,
  dotsType: 'extra-rounded',
  cornersSquareType: 'extra-rounded',
  cornersSquareColor: '#3730a3',
  cornersDotType: 'dot',
  cornersDotColor: '#4f46e5',
  gradient: {
    enabled: true,
    type: 'linear',
    color1: '#4f46e5',
    color2: '#06b6d4',
    rotation: 45,
  },
  logoUrl: undefined,
  logoSize: 0.35,
  logoMargin: 6,
  margin: 10,
  errorCorrectionLevel: 'Q',
  size: 320,
  frame: {
    style: 'none',
    text: 'SCAN ME',
    color: '#4f46e5',
    textColor: '#ffffff',
  },
};

export interface ProfessionalStylePreset {
  id: string;
  name: string;
  description: string;
  tag: string;
  config: Partial<QRDesignConfig>;
}

export const PROFESSIONAL_STYLES: ProfessionalStylePreset[] = [
  {
    id: 'executive-mono',
    name: 'Executive Minimalist',
    description: 'Crisp slate monochrome with smooth rounded modules. Supreme corporate standard.',
    tag: 'Corporate & Legal',
    config: {
      dotsColor: '#0f172a',
      backgroundColor: '#ffffff',
      isTransparentBg: false,
      dotsType: 'extra-rounded',
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#020617',
      cornersDotType: 'dot',
      cornersDotColor: '#0f172a',
      gradient: { enabled: false, type: 'linear', color1: '#0f172a', color2: '#1e293b', rotation: 0 },
      frame: { style: 'bottom-badge', text: 'CONNECT WITH US', color: '#0f172a', textColor: '#ffffff' },
    },
  },
  {
    id: 'tech-unicorn',
    name: 'Tech Unicorn',
    description: 'Electric Indigo to Cyan gradient with micro-dots. Modern SaaS aesthetic.',
    tag: 'SaaS & Web3',
    config: {
      dotsColor: '#4338ca',
      backgroundColor: '#ffffff',
      isTransparentBg: false,
      dotsType: 'dots',
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#3730a3',
      cornersDotType: 'dot',
      cornersDotColor: '#06b6d4',
      gradient: { enabled: true, type: 'linear', color1: '#4338ca', color2: '#06b6d4', rotation: 45 },
      frame: { style: 'minimal-card', text: 'SCAN TO LAUNCH', color: '#4338ca', textColor: '#ffffff' },
    },
  },
  {
    id: 'emerald-fintech',
    name: 'Fintech Emerald',
    description: 'High-trust rich emerald & jade tones with classy-rounded modules.',
    tag: 'Finance & Payments',
    config: {
      dotsColor: '#047857',
      backgroundColor: '#ffffff',
      isTransparentBg: false,
      dotsType: 'classy-rounded',
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#064e3b',
      cornersDotType: 'dot',
      cornersDotColor: '#10b981',
      gradient: { enabled: true, type: 'linear', color1: '#047857', color2: '#10b981', rotation: 30 },
      frame: { style: 'bottom-badge', text: 'SECURE PAYMENT', color: '#047857', textColor: '#ffffff' },
    },
  },
  {
    id: 'artisan-luxury',
    name: 'Artisan & Luxury',
    description: 'Deep espresso & burnished gold with smooth rounded eyes. Ideal for hospitality.',
    tag: 'Restaurants & Hotels',
    config: {
      dotsColor: '#451a03',
      backgroundColor: '#ffffff',
      isTransparentBg: false,
      dotsType: 'rounded',
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#78350f',
      cornersDotType: 'dot',
      cornersDotColor: '#d97706',
      gradient: { enabled: true, type: 'linear', color1: '#451a03', color2: '#b45309', rotation: 45 },
      frame: { style: 'ticket', text: 'MENU & SPECIALS', color: '#78350f', textColor: '#ffffff' },
    },
  },
  {
    id: 'cyber-violet',
    name: 'Cyber Violet',
    description: 'Vibrant neon purple to hot fuchsia for creators, media, and events.',
    tag: 'Social & Creators',
    config: {
      dotsColor: '#7e22ce',
      backgroundColor: '#ffffff',
      isTransparentBg: false,
      dotsType: 'dots',
      cornersSquareType: 'extra-rounded',
      cornersSquareColor: '#6b21a8',
      cornersDotType: 'dot',
      cornersDotColor: '#db2777',
      gradient: { enabled: true, type: 'linear', color1: '#7e22ce', color2: '#ec4899', rotation: 45 },
      frame: { style: 'bottom-badge', text: 'FOLLOW US', color: '#7e22ce', textColor: '#ffffff' },
    },
  },
  {
    id: 'pure-print',
    name: 'Industrial Print Standard',
    description: '100% optical contrast and maximum quiet zone for billboards, vinyl, and packaging.',
    tag: 'Print & Packaging',
    config: {
      dotsColor: '#000000',
      backgroundColor: '#ffffff',
      isTransparentBg: false,
      dotsType: 'square',
      cornersSquareType: 'square',
      cornersSquareColor: '#000000',
      cornersDotType: 'square',
      cornersDotColor: '#000000',
      gradient: { enabled: false, type: 'linear', color1: '#000000', color2: '#000000', rotation: 0 },
      margin: 15,
      frame: { style: 'none', text: 'SCAN HERE', color: '#000000', textColor: '#ffffff' },
    },
  },
];

export const COLOR_PRESETS = [
  {
    name: 'Electric Indigo',
    dotsColor: '#4f46e5',
    gradient: { enabled: true, type: 'linear' as const, color1: '#4338ca', color2: '#06b6d4', rotation: 45 },
    cornersSquareColor: '#3730a3',
    cornersDotColor: '#06b6d4',
    backgroundColor: '#ffffff',
  },
  {
    name: 'Cyber Violet',
    dotsColor: '#9333ea',
    gradient: { enabled: true, type: 'linear' as const, color1: '#7e22ce', color2: '#ec4899', rotation: 45 },
    cornersSquareColor: '#6b21a8',
    cornersDotColor: '#db2777',
    backgroundColor: '#ffffff',
  },
  {
    name: 'Emerald Luxe',
    dotsColor: '#059669',
    gradient: { enabled: true, type: 'linear' as const, color1: '#047857', color2: '#10b981', rotation: 30 },
    cornersSquareColor: '#065f46',
    cornersDotColor: '#059669',
    backgroundColor: '#ffffff',
  },
  {
    name: 'Sunset Flame',
    dotsColor: '#ea580c',
    gradient: { enabled: true, type: 'linear' as const, color1: '#c2410c', color2: '#f59e0b', rotation: 45 },
    cornersSquareColor: '#9a3412',
    cornersDotColor: '#ea580c',
    backgroundColor: '#ffffff',
  },
  {
    name: 'Monochrome Stealth',
    dotsColor: '#0f172a',
    gradient: { enabled: false, type: 'linear' as const, color1: '#0f172a', color2: '#334155', rotation: 0 },
    cornersSquareColor: '#020617',
    cornersDotColor: '#0f172a',
    backgroundColor: '#ffffff',
  },
  {
    name: 'Ocean Depths',
    dotsColor: '#0284c7',
    gradient: { enabled: true, type: 'linear' as const, color1: '#0369a1', color2: '#0ea5e9', rotation: 90 },
    cornersSquareColor: '#0c4a6e',
    cornersDotColor: '#0284c7',
    backgroundColor: '#ffffff',
  },
];

export function getHistory(): HistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const history: unknown = JSON.parse(raw);
    if (!Array.isArray(history)) {
      console.warn('Invalid QR history format in localStorage');
      return [];
    }
    const validHistory = history.filter(isHistoryItem);
    if (validHistory.length !== history.length) {
      console.warn('Ignored invalid QR history entries in localStorage');
    }
    return validHistory;
  } catch (err) {
    console.warn('Failed to parse QR history from localStorage', err);
    return [];
  }
}

export function saveHistoryItem(item: HistoryItem): boolean {
  try {
    const current = getHistory();
    const updated = [item, ...current.filter((x) => x.id !== item.id)].slice(0, 40);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.warn('Failed to save QR history item', err);
    return false;
  }
}

export function deleteHistoryItem(id: string): boolean {
  try {
    const current = getHistory();
    const updated = current.filter((x) => x.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return true;
  } catch (err) {
    console.warn('Failed to delete history item', err);
    return false;
  }
}

export function clearAllHistory(): boolean {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (err) {
    console.warn('Failed to clear history', err);
    return false;
  }
}

export function getInitialTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

export function setSavedTheme(theme: 'light' | 'dark'): void {
  try {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  } catch (err) {
    console.warn('Failed to set theme in localStorage', err);
  }
}
