export interface PresetLogo {
  id: string;
  name: string;
  category: 'social' | 'tech' | 'crypto' | 'business';
  dataUrl: string;
}

const createPresetSvg = (background: string, icon: string) =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="7" fill="${background}"/>${icon}</svg>`;

const createSocialPreset = (background: string, mark: string, foreground = 'white') =>
  createPresetSvg(
    background,
    `<text x="12" y="16.5" font-family="Arial,sans-serif" font-size="${mark.length > 2 ? 8 : 12}" font-weight="bold" fill="${foreground}" text-anchor="middle">${mark}</text>`,
  );

// Crisp vector SVG Data URIs formatted for QRCodeStyling center image
export const PRESET_LOGOS: PresetLogo[] = [
  {
    id: 'globe',
    name: 'Website',
    category: 'tech',
    dataUrl: createPresetSvg(
      '%234f46e5',
      '<circle cx="12" cy="12" r="7.5" fill="none" stroke="white" stroke-width="1.5"/><path d="M4.8 12h14.4M12 4.5c2 2 3 4.5 3 7.5s-1 5.5-3 7.5c-2-2-3-4.5-3-7.5s1-5.5 3-7.5Z" fill="none" stroke="white" stroke-width="1.4" stroke-linecap="round"/>',
    ),
  },
  {
    id: 'wifi',
    name: 'Wi-Fi',
    category: 'tech',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="%230ea5e9"/><path d="M5 12.55a11 11 0 0 1 14.08 0" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"/><path d="M8.5 15.55a6.5 6.5 0 0 1 7 0" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"/><circle cx="12" cy="19" r="1.5" fill="white"/></svg>`,
  },
  {
    id: 'whatsapp',
    name: 'WhatsApp',
    category: 'social',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="%2325D366"/><path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.979-.275-.1-.475-.15-.675.15-.2.301-.775.979-.95 1.18-.175.2-.35.225-.651.075-.301-.15-1.27-.468-2.42-1.493-.894-.798-1.497-1.783-1.672-2.084-.175-.301-.019-.464.132-.614.136-.135.301-.35.451-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.628-.925-2.231-.243-.588-.49-.508-.675-.518l-.575-.01c-.2 0-.525.075-.8.375-.275.3-1.05 1.027-1.05 2.505 0 1.478 1.075 2.906 1.225 3.107.15.2 2.115 3.23 5.123 4.53 3.008 1.3 3.008.868 3.558.818.55-.05 1.78-.727 2.03-1.428.25-.7.25-1.303.175-1.428-.075-.125-.275-.2-.575-.35z" fill="white"/></svg>`,
  },
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'social',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><rect width="22" height="22" x="1" y="1" rx="6" fill="%23E1306C"/><rect width="14" height="14" x="5" y="5" rx="4" fill="none" stroke="white" stroke-width="2"/><circle cx="12" cy="12" r="3.5" fill="none" stroke="white" stroke-width="2"/><circle cx="15.8" cy="8.2" r="1" fill="white"/></svg>`,
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'social',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><rect width="22" height="18" x="1" y="3" rx="5" fill="%23FF0000"/><polygon points="10 8 16 12 10 16" fill="white"/></svg>`,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    category: 'social',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><rect width="22" height="22" x="1" y="1" rx="5" fill="%230A66C2"/><text x="12" y="17" font-family="Arial, sans-serif" font-weight="bold" font-size="14" fill="white" text-anchor="middle">in</text></svg>`,
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    category: 'social',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="7" fill="%23000000"/><path d="M14.1 4.5c.3 1.8 1.4 3.1 3.3 3.6v2.8a7.8 7.8 0 0 1-3.3-1.2v4.5a4.8 4.8 0 1 1-4.8-4.8c.3 0 .7 0 1 .1v3a1.9 1.9 0 1 0 1 1.7V4.5z" fill="%2325F4EE" transform="translate(-.6 0)"/><path d="M14.1 4.5c.3 1.8 1.4 3.1 3.3 3.6v2.8a7.8 7.8 0 0 1-3.3-1.2v4.5a4.8 4.8 0 1 1-4.8-4.8c.3 0 .7 0 1 .1v3a1.9 1.9 0 1 0 1 1.7V4.5z" fill="%23FE2C55" transform="translate(.6 0)"/><path d="M14.1 4.5c.3 1.8 1.4 3.1 3.3 3.6v2.8a7.8 7.8 0 0 1-3.3-1.2v4.5a4.8 4.8 0 1 1-4.8-4.8c.3 0 .7 0 1 .1v3a1.9 1.9 0 1 0 1 1.7V4.5z" fill="white"/></svg>`,
  },
  { id: 'x', name: 'X (Twitter)', category: 'social', dataUrl: createSocialPreset('%23000000', 'X') },
  { id: 'snapchat', name: 'Snapchat', category: 'social', dataUrl: createSocialPreset('%23FFFC00', 'SC', '%23000000') },
  { id: 'pinterest', name: 'Pinterest', category: 'social', dataUrl: createSocialPreset('%23BD081C', 'P') },
  { id: 'telegram', name: 'Telegram', category: 'social', dataUrl: createSocialPreset('%23229ED9', 'TG') },
  { id: 'threads', name: 'Threads', category: 'social', dataUrl: createSocialPreset('%23101010', '@') },
  { id: 'twitch', name: 'Twitch', category: 'social', dataUrl: createSocialPreset('%239146FF', 'TW') },
  { id: 'reddit', name: 'Reddit', category: 'social', dataUrl: createSocialPreset('%23FF4500', 'R') },
  { id: 'discord', name: 'Discord', category: 'social', dataUrl: createSocialPreset('%235865F2', 'DC') },
  { id: 'bluesky', name: 'Bluesky', category: 'social', dataUrl: createSocialPreset('%230085FF', 'BS') },
  { id: 'github', name: 'GitHub', category: 'social', dataUrl: createSocialPreset('%2324292F', 'GH') },
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    category: 'crypto',
    dataUrl: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><circle cx="12" cy="12" r="11" fill="%23F7931A"/><text x="12" y="17" font-family="Arial, sans-serif" font-weight="bold" font-size="15" fill="white" text-anchor="middle">₿</text></svg>`,
  },
  {
    id: 'phone',
    name: 'Phone',
    category: 'tech',
    dataUrl: createPresetSvg(
      '%2310b981',
      '<path d="m8.1 4.8 2.6 2.1a1.5 1.5 0 0 1 .4 1.8l-.9 1.7a12.1 12.1 0 0 0 3.4 3.4l1.7-.9a1.5 1.5 0 0 1 1.8.4l2.1 2.6a1.5 1.5 0 0 1-.2 2.1l-1.1.9a3 3 0 0 1-2.8.5A18.2 18.2 0 0 1 5.2 9a3 3 0 0 1 .5-2.8l.9-1.1a1.5 1.5 0 0 1 1.5-.3Z" fill="none" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    ),
  },
  {
    id: 'email',
    name: 'Email',
    category: 'tech',
    dataUrl: createPresetSvg(
      '%236366f1',
      '<rect x="4.5" y="6.5" width="15" height="11" rx="2" fill="none" stroke="white" stroke-width="1.6"/><path d="m5.5 8 6.5 5 6.5-5" fill="none" stroke="white" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>',
    ),
  },
  {
    id: 'text',
    name: 'Plain Text',
    category: 'tech',
    dataUrl: createPresetSvg(
      '%23475569',
      '<path d="M7 4h7l4 4v12H7z" fill="none" stroke="white" stroke-width="1.7" stroke-linejoin="round"/><path d="M14 4v5h5M10 13h5M10 16h5" fill="none" stroke="white" stroke-width="1.5" stroke-linecap="round"/>',
    ),
  },
  {
    id: 'sms',
    name: 'SMS',
    category: 'tech',
    dataUrl: createPresetSvg(
      '%230ea5e9',
      '<path d="M5 6.5h14v10H11l-4 3v-3H5z" fill="none" stroke="white" stroke-width="1.7" stroke-linejoin="round"/><path d="M8.5 10h7M8.5 13h5" stroke="white" stroke-width="1.5" stroke-linecap="round"/>',
    ),
  },
  {
    id: 'contact',
    name: 'Contact Card',
    category: 'business',
    dataUrl: createPresetSvg(
      '%230f766e',
      '<rect x="4" y="5.5" width="16" height="13" rx="2" fill="none" stroke="white" stroke-width="1.7"/><circle cx="9" cy="10" r="1.8" fill="white"/><path d="M6.5 15c.4-1.4 1.3-2.1 2.5-2.1s2.1.7 2.5 2.1M14 9.5h3M14 12.5h3M14 15.5h2" fill="none" stroke="white" stroke-width="1.4" stroke-linecap="round"/>',
    ),
  },
  {
    id: 'location',
    name: 'Location',
    category: 'business',
    dataUrl: createPresetSvg(
      '%23e11d48',
      '<path d="M19 10.2c0 5-7 10-7 10s-7-5-7-10a7 7 0 1 1 14 0Z" fill="none" stroke="white" stroke-width="1.8"/><circle cx="12" cy="10" r="2.3" fill="none" stroke="white" stroke-width="1.7"/>',
    ),
  },
  {
    id: 'event',
    name: 'Calendar Event',
    category: 'business',
    dataUrl: createPresetSvg(
      '%237c3aed',
      '<rect x="4.5" y="6" width="15" height="13.5" rx="2" fill="none" stroke="white" stroke-width="1.7"/><path d="M8 4.5v3M16 4.5v3M4.5 10h15M8 13.5h2M13 13.5h2M8 16.5h2" stroke="white" stroke-width="1.5" stroke-linecap="round"/>',
    ),
  },
  {
    id: 'facebook',
    name: 'Facebook',
    category: 'social',
    dataUrl: createPresetSvg(
      '%231877f2',
      '<path d="M13.5 20v-7h2.4l.4-3h-2.8V8.1c0-.9.3-1.5 1.5-1.5h1.5V4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9V10H8v3h2.4v7z" fill="white"/>',
    ),
  },
  {
    id: 'payment',
    name: 'Bank / Wallet',
    category: 'business',
    dataUrl: createPresetSvg(
      '%230f766e',
      '<path d="m4 10 8-5 8 5M5.5 10h13M6.5 10v7M10 10v7M14 10v7M17.5 10v7M4.5 19h15" fill="none" stroke="white" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>',
    ),
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    category: 'crypto',
    dataUrl: createPresetSvg(
      '%233b82f6',
      '<path d="m12 3 6 9-6 3.5L6 12zM12 17l6-3.5-6 7.5-6-7.5z" fill="white" fill-opacity=".92"/>',
    ),
  },
  {
    id: 'solana',
    name: 'Solana',
    category: 'crypto',
    dataUrl: createPresetSvg(
      '%237c3aed',
      '<path d="M7 6h12l-2 2H5zM7 11h12l-2 2H5zM7 16h12l-2 2H5z" fill="white"/>',
    ),
  },
  {
    id: 'usdt',
    name: 'USDT',
    category: 'crypto',
    dataUrl: createPresetSvg(
      '%2326a17b',
      '<path d="M4.5 6h15v3h-5.3v2c3 .2 5 .8 5 1.5s-2 1.3-5 1.5v4h-4.4v-4c-3-.2-5-.8-5-1.5s2-1.3 5-1.5V9H4.5z" fill="white"/><path d="M12 11c-3.5 0-6.3.6-6.3 1.3s2.8 1.3 6.3 1.3 6.3-.6 6.3-1.3S15.5 11 12 11Z" fill="%2326a17b"/>',
    ),
  },
];
