export interface PresetLogo {
  id: string;
  name: string;
  category: 'social' | 'tech' | 'crypto' | 'business';
  dataUrl: string;
}

const createPresetSvg = (background: string, icon: string) =>
  `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 24 24"><rect x="1" y="1" width="22" height="22" rx="7" fill="${background}"/>${icon}</svg>`;

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
  {
    id: 'x',
    name: 'X (Twitter)',
    category: 'social',
    dataUrl: createPresetSvg(
      '%23000000',
      '<path d="M18.9 2h3.2l-7 8 8.2 12h-6.4l-5-7.4L5.4 22H2.2l7.5-8.6L2 2h6.6l4.5 6.8L18.9 2Zm-1.1 17.9h1.8L8 4h-2l11.8 15.9Z" fill="white"/>',
    ),
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    category: 'social',
    dataUrl: createPresetSvg(
      '%23FFFC00',
      '<path d="M12 3.2c-2.7 0-4.4 2-4.4 4.8 0 1.1.1 2.1-.2 2.8-.3.8-1.3 1.2-2.5 1.5-.6.2-.6.9.1 1.1l1.5.5c.4.2.6.7.4 1.1-.2.5-.7 1-1.5 1.3-.3.1-.2.6.2.6.8.1 1.5-.1 2.2-.3.5-.1.9 0 1.2.4.6.8 1.6 1.2 3 1.2s2.4-.4 3-1.2c.3-.4.7-.5 1.2-.4.7.2 1.4.4 2.2.3.4 0 .5-.5.2-.6-.8-.3-1.3-.8-1.5-1.3-.2-.4 0-.9.4-1.1l1.5-.5c.7-.2.7-.9.1-1.1-1.2-.3-2.2-.7-2.5-1.5-.3-.7-.2-1.7-.2-2.8 0-2.8-1.7-4.8-4.4-4.8Z" fill="%23000000"/>',
    ),
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    category: 'social',
    dataUrl: createPresetSvg(
      '%23BD081C',
      '<path d="M12 3a9 9 0 0 0-3.3 17.4c0-.8 0-1.7.2-2.5l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.5-.3 1.1.6 2 1.7 2 2 0 3.4-2.6 3.4-5.7 0-2.3-1.5-4-4.2-4-3.1 0-5.1 2.3-5.1 4.9 0 .9.3 1.6.7 2.1.2.3.3.4.2.7l-.2.8c0 .3-.3.4-.6.3-1.4-.6-2-2.1-2-3.9 0-2.9 2.4-6.4 7.3-6.4 3.9 0 6.5 2.8 6.5 5.9 0 4.1-2.3 7.2-5.8 7.2-1.2 0-2.3-.7-2.7-1.4l-.8 3.1c-.2.8-.7 1.6-1.1 2.2A9 9 0 1 0 12 3Z" fill="white"/>',
    ),
  },
  {
    id: 'telegram',
    name: 'Telegram',
    category: 'social',
    dataUrl: createPresetSvg(
      '%23229ED9',
      '<path d="m21 4-3.2 16c-.2 1.1-.8 1.4-1.7.9l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9L17.3 7c.4-.3-.1-.5-.6-.2L5.5 13.6.8 12.1c-1-.3-1-1 .2-1.5L19.3 3.5c.9-.3 1.8.2 1.7.5Z" fill="white"/>',
    ),
  },
  {
    id: 'threads',
    name: 'Threads',
    category: 'social',
    dataUrl: createPresetSvg(
      '%23101010',
      '<path d="M17.8 11.1c-.3-4.1-2.7-6.5-6.4-6.5-3.9 0-6.4 2.7-6.4 7.2 0 4.5 2.5 7.6 6.5 7.6 3 0 5-1.7 5-4.3 0-2.5-1.7-4-4.6-4-2.2 0-3.5 1.1-3.5 2.8 0 1.5 1.1 2.5 2.8 2.5 1.9 0 3.3-1.5 3.3-3.7 0-3.3-1.7-5.5-4.5-5.5-2.2 0-3.7 1.7-3.7 4.2" fill="none" stroke="white" stroke-width="2" stroke-linecap="round"/>',
    ),
  },
  {
    id: 'twitch',
    name: 'Twitch',
    category: 'social',
    dataUrl: createPresetSvg(
      '%239146FF',
      '<path d="M5 3h17v12l-5 5h-4l-3 3v-3H5V3Zm2 2v13h5v2l2-2h3l3-3V5H7Zm5 3h2v5h-2V8Zm5 0h2v5h-2V8Z" fill="white"/>',
    ),
  },
  {
    id: 'reddit',
    name: 'Reddit',
    category: 'social',
    dataUrl: createPresetSvg(
      '%23FF4500',
      '<circle cx="12" cy="13" r="8" fill="white"/><circle cx="9" cy="13" r="1.2" fill="%23FF4500"/><circle cx="15" cy="13" r="1.2" fill="%23FF4500"/><path d="M9 16c1.7 1.2 4.3 1.2 6 0M12 5l1-3 3 1" fill="none" stroke="white" stroke-width="1.6" stroke-linecap="round"/><circle cx="17" cy="3" r="1.4" fill="white"/>',
    ),
  },
  {
    id: 'discord',
    name: 'Discord',
    category: 'social',
    dataUrl: createPresetSvg(
      '%235865F2',
      '<path d="M19.5 6.2a17 17 0 0 0-4.2-1.3l-.5 1a15 15 0 0 0-5.6 0l-.5-1a17 17 0 0 0-4.2 1.3C1.8 10.1 1 13.8 1.4 17.4a17 17 0 0 0 5.2 2.6l1.1-1.8-1.7-.8.4-.3a12 12 0 0 0 11.2 0l.4.3-1.7.8 1.1 1.8a17 17 0 0 0 5.2-2.6c.5-4.2-.7-7.9-3.1-11.2ZM8.8 14.8c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.4 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" fill="white"/>',
    ),
  },
  {
    id: 'bluesky',
    name: 'Bluesky',
    category: 'social',
    dataUrl: createPresetSvg(
      '%230085FF',
      '<path d="M12 11c-1.1-2.2-4.1-6.4-6.9-8.5C2.4.5 1.4 1.1 1.4 2.5c0 1.2.7 10.1 1.1 11.6.8 2.7 3.6 3.6 6.1 3.2-4.4.7-8.3 2.5-3.2 7.1 5.6 4.8 6-1 6.6-3.7.6 2.7 1 8.5 6.6 3.7 5.1-4.6 1.2-6.4-3.2-7.1 2.5.4 5.3-.5 6.1-3.2.4-1.5 1.1-10.4 1.1-11.6 0-1.4-1-2-3.7 0C16.1 4.6 13.1 8.8 12 11Z" fill="white"/>',
    ),
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'social',
    dataUrl: createPresetSvg(
      '%2324292F',
      '<path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 2.2 3.8 1.6.1-.7.4-1.2.7-1.5-2.3-.3-4.7-1.2-4.7-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.7 9.7 0 0 1 5.1 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.8-2.4 4.7-4.7 5 .4.3.7 1 .7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" fill="white"/>',
    ),
  },
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
