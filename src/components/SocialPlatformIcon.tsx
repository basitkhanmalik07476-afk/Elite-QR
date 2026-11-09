import React from 'react';
import { SocialQRType } from '../types';

interface SocialPlatformIconProps {
  platform: SocialQRType;
  className?: string;
}

const MARKS: Record<SocialQRType, React.ReactNode> = {
  instagram: <><rect x="5" y="5" width="14" height="14" rx="4" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="12" cy="12" r="3.3" fill="none" stroke="currentColor" strokeWidth="2" /><circle cx="17" cy="7.5" r="1" fill="currentColor" /></>,
  facebook: <path d="M13.5 20v-7h2.4l.4-3h-2.8V8.1c0-.9.3-1.5 1.5-1.5h1.5V4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.8 1.4-3.8 3.9V10H8v3h2.4v7z" fill="currentColor" />,
  youtube: <><rect x="3" y="5" width="18" height="14" rx="4" fill="currentColor" /><path d="m10 9 5 3-5 3z" fill="var(--social-icon-bg, white)" /></>,
  linkedin: <><rect x="3" y="3" width="18" height="18" rx="3" fill="currentColor" /><text x="12" y="17" textAnchor="middle" fontSize="12" fontWeight="bold" fill="var(--social-icon-bg, white)">in</text></>,
  tiktok: <path d="M14 4h3c.4 2 1.5 3.4 3.5 4v3.2a9 9 0 0 1-3.5-1.4v5.1a5.5 5.5 0 1 1-5.5-5.5c.4 0 .7 0 1 .1v3.4a2.1 2.1 0 1 0 1.5 2V4Z" fill="currentColor" />,
  x: <path d="M5 4h4.2l9.8 16h-4.2L5 4Zm0 16 6.2-7.1 2 2.4L8.7 20H5Zm8.3-9.6L18.6 4H15l-3.6 4.2 1.9 2.2Z" fill="currentColor" />,
  snapchat: <path d="M12 3.5c-2.7 0-4.4 2-4.4 4.8 0 1.1.1 2.1-.2 2.8-.3.8-1.3 1.2-2.5 1.5-.6.2-.6.9.1 1.1l1.5.5c.4.2.6.7.4 1.1-.2.5-.7 1-1.5 1.3-.3.1-.2.6.2.6.8.1 1.5-.1 2.2-.3.5-.1.9 0 1.2.4.6.8 1.6 1.2 3 1.2s2.4-.4 3-1.2c.3-.4.7-.5 1.2-.4.7.2 1.4.4 2.2.3.4 0 .5-.5.2-.6-.8-.3-1.3-.8-1.5-1.3-.2-.4 0-.9.4-1.1l1.5-.5c.7-.2.7-.9.1-1.1-1.2-.3-2.2-.7-2.5-1.5-.3-.7-.2-1.7-.2-2.8 0-2.8-1.7-4.8-4.4-4.8Z" fill="currentColor" />,
  pinterest: <path d="M12 3a9 9 0 0 0-3.3 17.4c0-.8 0-1.7.2-2.5l1.2-5s-.3-.6-.3-1.5c0-1.4.8-2.4 1.8-2.4.9 0 1.3.7 1.3 1.5 0 .9-.6 2.2-.9 3.5-.3 1.1.6 2 1.7 2 2 0 3.4-2.6 3.4-5.7 0-2.3-1.5-4-4.2-4-3.1 0-5.1 2.3-5.1 4.9 0 .9.3 1.6.7 2.1.2.3.3.4.2.7l-.2.8c0 .3-.3.4-.6.3-1.4-.6-2-2.1-2-3.9 0-2.9 2.4-6.4 7.3-6.4 3.9 0 6.5 2.8 6.5 5.9 0 4.1-2.3 7.2-5.8 7.2-1.2 0-2.3-.7-2.7-1.4l-.8 3.1c-.2.8-.7 1.6-1.1 2.2A9 9 0 1 0 12 3Z" fill="currentColor" />,
  telegram: <path d="m21 4-3.2 16c-.2 1.1-.8 1.4-1.7.9l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.4-4.9L17.3 7c.4-.3-.1-.5-.6-.2L5.5 13.6.8 12.1c-1-.3-1-1 .2-1.5L19.3 3.5c.9-.3 1.8.2 1.7.5Z" fill="currentColor" />,
  threads: <path d="M17.8 11.1c-.3-4.1-2.7-6.5-6.4-6.5-3.9 0-6.4 2.7-6.4 7.2 0 4.5 2.5 7.6 6.5 7.6 3 0 5-1.7 5-4.3 0-2.5-1.7-4-4.6-4-2.2 0-3.5 1.1-3.5 2.8 0 1.5 1.1 2.5 2.8 2.5 1.9 0 3.3-1.5 3.3-3.7 0-3.3-1.7-5.5-4.5-5.5-2.2 0-3.7 1.7-3.7 4.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />,
  twitch: <><path d="M5 4h16v11l-5 5h-4l-3 3v-3H5V4Z" fill="currentColor" /><path d="M10 8v5m5-5v5" stroke="var(--social-icon-bg, white)" strokeWidth="2" /></>,
  reddit: <><circle cx="12" cy="13" r="8" fill="currentColor" /><circle cx="9" cy="13" r="1" fill="var(--social-icon-bg, white)" /><circle cx="15" cy="13" r="1" fill="var(--social-icon-bg, white)" /><path d="M9 16c1.7 1.2 4.3 1.2 6 0M12 5l1-3 3 1" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /><circle cx="17" cy="3" r="1.3" fill="currentColor" /></>,
  discord: <><path d="M19.5 6.2a17 17 0 0 0-4.2-1.3l-.5 1a15 15 0 0 0-5.6 0l-.5-1a17 17 0 0 0-4.2 1.3C1.8 10.1 1 13.8 1.4 17.4a17 17 0 0 0 5.2 2.6l1.1-1.8-1.7-.8.4-.3a12 12 0 0 0 11.2 0l.4.3-1.7.8 1.1 1.8a17 17 0 0 0 5.2-2.6c.5-4.2-.7-7.9-3.1-11.2ZM8.8 14.8c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Zm6.4 0c-1 0-1.8-.9-1.8-2s.8-2 1.8-2 1.8.9 1.8 2-.8 2-1.8 2Z" fill="currentColor" /></>,
  bluesky: <path d="M12 11c-1.1-2.2-4.1-6.4-6.9-8.5C2.4.5 1.4 1.1 1.4 2.5c0 1.2.7 10.1 1.1 11.6.8 2.7 3.6 3.6 6.1 3.2-4.4.7-8.3 2.5-3.2 7.1 5.6 4.8 6-1 6.6-3.7.6 2.7 1 8.5 6.6 3.7 5.1-4.6 1.2-6.4-3.2-7.1 2.5.4 5.3-.5 6.1-3.2.4-1.5 1.1-10.4 1.1-11.6 0-1.4-1-2-3.7 0C16.1 4.6 13.1 8.8 12 11Z" fill="currentColor" />,
  github: <><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.9.6-3.5-1.2-3.5-1.2-.5-1.2-1.2-1.5-1.2-1.5-1-.7.1-.7.1-.7 1.1.1 1.7 1.1 1.7 1.1 1 .1.8 2.2 3.8 1.6.1-.7.4-1.2.7-1.5-2.3-.3-4.7-1.2-4.7-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.4-1.3.1-2.7 0 0 .9-.3 2.8 1a9.7 9.7 0 0 1 5.1 0c1.9-1.3 2.8-1 2.8-1 .5 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.8-2.4 4.7-4.7 5 .4.3.7 1 .7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2Z" fill="currentColor" /></>,
};

const BACKGROUNDS: Record<SocialQRType, string> = {
  instagram: '#e1306c',
  facebook: '#1877f2',
  youtube: '#ff0033',
  linkedin: '#0a66c2',
  tiktok: '#000000',
  x: '#000000',
  snapchat: '#fffc00',
  pinterest: '#bd081c',
  telegram: '#229ed9',
  threads: '#101010',
  twitch: '#9146ff',
  reddit: '#ff4500',
  discord: '#5865f2',
  bluesky: '#0085ff',
  github: '#24292f',
};

export const SocialPlatformIcon: React.FC<SocialPlatformIconProps> = ({ platform, className }) => (
  <svg
    aria-hidden="true"
    className={className}
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    style={{ color: BACKGROUNDS[platform], '--social-icon-bg': '#ffffff' } as React.CSSProperties}
  >
    {MARKS[platform]}
  </svg>
);
