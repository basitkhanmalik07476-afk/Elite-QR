import { SocialQRType } from '../types';

export interface SocialPlatform {
  type: SocialQRType;
  label: string;
  placeholder: string;
}

export const SOCIAL_PLATFORMS: SocialPlatform[] = [
  { type: 'instagram', label: 'Instagram', placeholder: 'username or profile URL' },
  { type: 'facebook', label: 'Facebook', placeholder: 'page name or profile URL' },
  { type: 'youtube', label: 'YouTube', placeholder: '@channel or channel URL' },
  { type: 'linkedin', label: 'LinkedIn', placeholder: 'profile handle or profile URL' },
  { type: 'tiktok', label: 'TikTok', placeholder: '@username or profile URL' },
  { type: 'x', label: 'X (Twitter)', placeholder: '@username or profile URL' },
  { type: 'snapchat', label: 'Snapchat', placeholder: 'username or profile URL' },
  { type: 'pinterest', label: 'Pinterest', placeholder: 'username or profile URL' },
  { type: 'telegram', label: 'Telegram', placeholder: 'username, channel, or t.me link' },
  { type: 'threads', label: 'Threads', placeholder: '@username or profile URL' },
  { type: 'twitch', label: 'Twitch', placeholder: 'channel name or profile URL' },
  { type: 'reddit', label: 'Reddit', placeholder: 'username, subreddit, or profile URL' },
  { type: 'discord', label: 'Discord', placeholder: 'invite code or full invite URL' },
  { type: 'bluesky', label: 'Bluesky', placeholder: 'handle or profile URL' },
  { type: 'github', label: 'GitHub', placeholder: 'username or profile URL' },
];

const PROFILE_URLS: Record<SocialQRType, (handle: string) => string> = {
  instagram: (handle) => `https://www.instagram.com/${handle}`,
  facebook: (handle) => `https://www.facebook.com/${handle}`,
  youtube: (handle) => `https://www.youtube.com/@${handle.replace(/^@/, '')}`,
  linkedin: (handle) => `https://www.linkedin.com/in/${handle.replace(/^@/, '')}`,
  tiktok: (handle) => `https://www.tiktok.com/@${handle.replace(/^@/, '')}`,
  x: (handle) => `https://x.com/${handle.replace(/^@/, '')}`,
  snapchat: (handle) => `https://www.snapchat.com/add/${handle.replace(/^@/, '')}`,
  pinterest: (handle) => `https://www.pinterest.com/${handle.replace(/^@/, '')}`,
  telegram: (handle) => `https://t.me/${handle.replace(/^@/, '')}`,
  threads: (handle) => `https://www.threads.net/@${handle.replace(/^@/, '')}`,
  twitch: (handle) => `https://www.twitch.tv/${handle.replace(/^@/, '')}`,
  reddit: (handle) => `https://www.reddit.com/user/${handle.replace(/^@/, '')}`,
  discord: (handle) => `https://discord.gg/${handle.replace(/^@/, '')}`,
  bluesky: (handle) => `https://bsky.app/profile/${handle.replace(/^@/, '')}`,
  github: (handle) => `https://github.com/${handle.replace(/^@/, '')}`,
};

const HOST_TYPES: Array<{ host: string; type: SocialQRType }> = [
  { host: 'instagram.com', type: 'instagram' },
  { host: 'facebook.com', type: 'facebook' },
  { host: 'fb.com', type: 'facebook' },
  { host: 'youtube.com', type: 'youtube' },
  { host: 'youtu.be', type: 'youtube' },
  { host: 'linkedin.com', type: 'linkedin' },
  { host: 'tiktok.com', type: 'tiktok' },
  { host: 'x.com', type: 'x' },
  { host: 'twitter.com', type: 'x' },
  { host: 'snapchat.com', type: 'snapchat' },
  { host: 'pinterest.com', type: 'pinterest' },
  { host: 'pin.it', type: 'pinterest' },
  { host: 't.me', type: 'telegram' },
  { host: 'telegram.me', type: 'telegram' },
  { host: 'threads.net', type: 'threads' },
  { host: 'threads.com', type: 'threads' },
  { host: 'twitch.tv', type: 'twitch' },
  { host: 'reddit.com', type: 'reddit' },
  { host: 'redd.it', type: 'reddit' },
  { host: 'discord.com', type: 'discord' },
  { host: 'discord.gg', type: 'discord' },
  { host: 'bsky.app', type: 'bluesky' },
  { host: 'github.com', type: 'github' },
];

export function generateSocialProfileUrl(type: SocialQRType, value: string): string {
  const profile = value.trim();
  if (!profile) return '';

  const candidate = /^https?:\/\//i.test(profile)
    ? profile
    : /^(?:www\.)?[a-z0-9.-]+\.[a-z]{2,}(?:\/|$)/i.test(profile)
      ? `https://${profile}`
      : '';
  if (candidate) {
    try {
      const url = new URL(candidate);
      if (url.protocol !== 'https:' && url.protocol !== 'http:') return '';
      if (/^https?:\/\//i.test(profile) || getSocialTypeFromUrl(url.toString()) === type) {
        return url.toString();
      }
    } catch {
      return '';
    }
  }

  return PROFILE_URLS[type](profile);
}

export function getSocialTypeFromUrl(value: string): SocialQRType | undefined {
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return undefined;
    const hostname = url.hostname.toLowerCase().replace(/^www\./, '');
    return HOST_TYPES.find(({ host }) => hostname === host || hostname.endsWith(`.${host}`))?.type;
  } catch {
    return undefined;
  }
}
