import { QRFormState, QRType } from '../types';
export type { QRFormState } from '../types';
import { generateSocialProfileUrl, SOCIAL_PLATFORMS } from './socialPlatforms';

export const initialFormState: QRFormState = {
  url: 'https://eliteqr.dev',
  text: 'Hello from Elite QR Studio! The premier QR solution.',
  emailAddress: 'hello@eliteqr.dev',
  emailSubject: 'Inquiry from QR Scan',
  emailBody: 'Hi Elite QR team, I am interested in your services.',
  phoneNumber: '+14155552671',
  waCountryCode: '1',
  waNumber: '4155552671',
  waMessage: 'Hello! I scanned your QR code and would like more details.',
  smsNumber: '+14155552671',
  smsMessage: 'Hi! Got your SMS QR code.',
  wifiSsid: 'Elite_Guest_5G',
  wifiPassword: 'Password123!',
  wifiEncryption: 'WPA',
  wifiHidden: false,
  vcardFirstName: 'Sarah',
  vcardLastName: 'Jenkins',
  vcardPhone: '+1 (555) 019-2834',
  vcardEmail: 'sarah.jenkins@company.com',
  vcardCompany: 'Apex Innovations',
  vcardTitle: 'Head of Product',
  vcardUrl: 'https://apex-innovations.io',
  vcardAddress: '742 Evergreen Terrace, San Francisco, CA',
  locLatitude: '',
  locLongitude: '',
  locQuery: 'San Francisco, CA',
  eventTitle: 'Elite Tech Summit 2026',
  eventLocation: 'Moscone Center, SF',
  eventDescription: 'Annual keynote and interactive developer showcase.',
  eventStartDate: '2026-11-15T09:00',
  eventEndDate: '2026-11-15T17:00',
  socialUsername: 'eliteqr_official',
  cryptoCurrency: 'bitcoin',
  cryptoAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
  cryptoAmount: '0.05',
  paymentMethod: 'bank',
  paymentAccountName: '',
  paymentProvider: '',
  paymentIdentifier: '',
  paymentInstructions: '',
};

export function formatDateTimeToICS(isoString: string): string {
  try {
    const date = new Date(isoString);
    if (isNaN(date.getTime())) return '';
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  } catch {
    return '';
  }
}

export function generatePayload(type: QRType, state: QRFormState): { payload: string; displayTitle: string } {
  switch (type) {
    case 'url': {
      let raw = state.url.trim();
      if (!raw) raw = 'https://eliteqr.dev';
      if (!/^https?:\/\//i.test(raw)) {
        raw = 'https://' + raw;
      }
      return { payload: raw, displayTitle: raw };
    }

    case 'text': {
      const raw = state.text.trim() || 'Elite QR Code';
      return { payload: raw, displayTitle: raw.length > 35 ? raw.slice(0, 32) + '...' : raw };
    }

    case 'email': {
      const email = state.emailAddress.trim();
      const subject = encodeURIComponent(state.emailSubject.trim());
      const body = encodeURIComponent(state.emailBody.trim());
      const payload = `mailto:${email}?subject=${subject}&body=${body}`;
      return { payload, displayTitle: `Email: ${email}` };
    }

    case 'phone': {
      const cleanPhone = state.phoneNumber.trim().replace(/\s+/g, '');
      return { payload: `tel:${cleanPhone}`, displayTitle: `Phone: ${cleanPhone}` };
    }

    case 'whatsapp': {
      const cleanCountry = state.waCountryCode.replace(/\D/g, '');
      const cleanNum = state.waNumber.replace(/\D/g, '');
      const full = `${cleanCountry}${cleanNum}`;
      const msg = encodeURIComponent(state.waMessage.trim());
      const payload = msg ? `https://wa.me/${full}?text=${msg}` : `https://wa.me/${full}`;
      return { payload, displayTitle: `WhatsApp: +${full}` };
    }

    case 'sms': {
      const num = state.smsNumber.trim().replace(/\s+/g, '');
      const body = state.smsMessage.trim();
      return { payload: `SMSTO:${num}:${body}`, displayTitle: `SMS: ${num}` };
    }

    case 'wifi': {
      const ssid = state.wifiSsid.replace(/([\\;,:"])/g, '\\$1');
      const pass = state.wifiPassword.replace(/([\\;,:"])/g, '\\$1');
      const enc = state.wifiEncryption;
      const hidden = state.wifiHidden ? 'true' : 'false';
      const payload = `WIFI:S:${ssid};T:${enc};P:${pass};H:${hidden};;`;
      return { payload, displayTitle: `Wi-Fi: ${state.wifiSsid}` };
    }

    case 'vcard': {
      const fn = `${state.vcardFirstName.trim()} ${state.vcardLastName.trim()}`.trim() || 'Contact';
      const payload = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${state.vcardLastName.trim()};${state.vcardFirstName.trim()};;;`,
        `FN:${fn}`,
        state.vcardCompany ? `ORG:${state.vcardCompany.trim()}` : '',
        state.vcardTitle ? `TITLE:${state.vcardTitle.trim()}` : '',
        state.vcardPhone ? `TEL;TYPE=CELL:${state.vcardPhone.trim()}` : '',
        state.vcardEmail ? `EMAIL;TYPE=WORK:${state.vcardEmail.trim()}` : '',
        state.vcardUrl ? `URL:${state.vcardUrl.trim()}` : '',
        state.vcardAddress ? `ADR;TYPE=WORK:;;${state.vcardAddress.trim()};;;;` : '',
        'END:VCARD',
      ]
        .filter(Boolean)
        .join('\n');
      return { payload, displayTitle: `vCard: ${fn}` };
    }

    case 'location': {
      if (state.locLatitude && state.locLongitude) {
        const payload = `https://maps.google.com/?q=${state.locLatitude.trim()},${state.locLongitude.trim()}`;
        return { payload, displayTitle: `Map: ${state.locLatitude}, ${state.locLongitude}` };
      }
      const q = encodeURIComponent(state.locQuery.trim() || 'San Francisco, CA');
      return { payload: `https://maps.google.com/?q=${q}`, displayTitle: `Location: ${state.locQuery || 'Map'}` };
    }

    case 'event': {
      const start = formatDateTimeToICS(state.eventStartDate);
      const end = formatDateTimeToICS(state.eventEndDate);
      const payload = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'BEGIN:VEVENT',
        `SUMMARY:${state.eventTitle.trim() || 'Event'}`,
        state.eventLocation ? `LOCATION:${state.eventLocation.trim()}` : '',
        state.eventDescription ? `DESCRIPTION:${state.eventDescription.trim()}` : '',
        start ? `DTSTART:${start}` : '',
        end ? `DTEND:${end}` : '',
        'END:VEVENT',
        'END:VCALENDAR',
      ]
        .filter(Boolean)
        .join('\n');
      return { payload, displayTitle: `Event: ${state.eventTitle}` };
    }

    case 'instagram':
    case 'facebook':
    case 'youtube':
    case 'linkedin':
    case 'tiktok':
    case 'x':
    case 'snapchat':
    case 'pinterest':
    case 'telegram':
    case 'threads':
    case 'twitch':
    case 'reddit':
    case 'discord':
    case 'bluesky':
    case 'github': {
      const payload = generateSocialProfileUrl(type, state.socialUsername);
      const platform = SOCIAL_PLATFORMS.find((item) => item.type === type);
      return {
        payload,
        displayTitle: `${platform?.label ?? 'Social'}: ${state.socialUsername.trim()}`,
      };
    }

    case 'crypto': {
      const addr = state.cryptoAddress.trim();
      const amt = state.cryptoAmount.trim();
      const prefix = state.cryptoCurrency;
      const payload = amt ? `${prefix}:${addr}?amount=${amt}` : `${prefix}:${addr}`;
      return { payload, displayTitle: `${prefix.toUpperCase()}: ${addr.slice(0, 10)}...` };
    }

    case 'payment': {
      const methodLabels = {
        bank: 'Bank account / IBAN',
        raast: 'Raast ID (manual transfer)',
        'mobile-wallet': 'Mobile wallet',
      };
      const oneLine = (value: string) => value.trim().replace(/[\r\n]+/g, ' ');
      const accountName = oneLine(state.paymentAccountName);
      const provider = oneLine(state.paymentProvider);
      const identifier = oneLine(state.paymentIdentifier);
      const instructions = oneLine(state.paymentInstructions);
      const payload = [
        'PAYMENT DETAILS (PAKISTAN)',
        `Payment method: ${methodLabels[state.paymentMethod]}`,
        accountName ? `Account title: ${accountName}` : '',
        provider ? `Bank / wallet: ${provider}` : '',
        identifier ? `Account / IBAN / Raast ID: ${identifier}` : '',
        instructions ? `Payment note: ${instructions}` : '',
        'Informational QR only. Transfer manually and verify recipient details in your payment app.',
      ]
        .filter(Boolean)
        .join('\n');
      return { payload, displayTitle: `Payment: ${accountName || 'Shop'}` };
    }

    default:
      return { payload: 'https://eliteqr.dev', displayTitle: 'Elite QR' };
  }
}

export function getFormStateFromPayload(type: QRType, payload: string): Partial<QRFormState> {
  const lines = payload.split(/\r?\n/);
  const valueAfter = (prefix: string) => lines.find((line) => line.startsWith(prefix))?.slice(prefix.length) ?? '';
  const parsedUrl = () => {
    try {
      return new URL(payload);
    } catch {
      return undefined;
    }
  };

  switch (type) {
    case 'url':
      return { url: payload };
    case 'text':
      return { text: payload };
    case 'email': {
      const emailUrl = parsedUrl();
      if (!emailUrl) return {};
      return {
        emailAddress: emailUrl.pathname,
        emailSubject: emailUrl.searchParams.get('subject') ?? '',
        emailBody: emailUrl.searchParams.get('body') ?? '',
      };
    }
    case 'phone':
      return { phoneNumber: payload.replace(/^tel:/i, '') };
    case 'whatsapp': {
      const whatsappUrl = parsedUrl();
      if (!whatsappUrl) return {};
      const phone = whatsappUrl.pathname.replace(/\D/g, '');
      return {
        waCountryCode: '',
        waNumber: phone,
        waMessage: whatsappUrl.searchParams.get('text') ?? '',
      };
    }
    case 'sms': {
      const sms = payload.replace(/^(?:SMSTO:|sms:)/i, '');
      const separator = sms.indexOf(':');
      return separator < 0
        ? { smsNumber: sms, smsMessage: '' }
        : { smsNumber: sms.slice(0, separator), smsMessage: sms.slice(separator + 1) };
    }
    case 'wifi': {
      const wifiField = (field: string) => {
        const match = payload.match(new RegExp(`(?:^|[;:])${field}:((?:\\\\.|[^;])*)`, 'i'));
        return match?.[1].replace(/\\(.)/g, '$1') ?? '';
      };
      const encryption = wifiField('T');
      return {
        wifiSsid: wifiField('S'),
        wifiPassword: wifiField('P'),
        wifiEncryption: encryption === 'WEP' || encryption === 'nopass' ? encryption : 'WPA',
        wifiHidden: wifiField('H').toLowerCase() === 'true',
      };
    }
    case 'vcard':
      return {
        vcardFirstName: valueAfter('N:').split(';')[1] ?? '',
        vcardLastName: valueAfter('N:').split(';')[0] ?? '',
        vcardPhone: lines.find((line) => /^TEL/i.test(line))?.split(':').slice(1).join(':') ?? '',
        vcardEmail: lines.find((line) => /^EMAIL/i.test(line))?.split(':').slice(1).join(':') ?? '',
        vcardCompany: valueAfter('ORG:'),
        vcardTitle: valueAfter('TITLE:'),
        vcardUrl: valueAfter('URL:'),
        vcardAddress: lines.find((line) => /^ADR/i.test(line))?.split(':').slice(1).join(':').split(';')[2] ?? '',
      };
    case 'location': {
      const locationUrl = parsedUrl();
      if (!locationUrl) return {};
      const query = locationUrl.searchParams.get('q') ?? '';
      const coordinates = query.match(/^(-?\d+(?:\.\d+)?),\s*(-?\d+(?:\.\d+)?)$/);
      return coordinates
        ? { locLatitude: coordinates[1], locLongitude: coordinates[2], locQuery: '' }
        : { locLatitude: '', locLongitude: '', locQuery: query };
    }
    case 'event': {
      const toDateTimeInput = (value: string) => {
        const match = value.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z?$/);
        if (!match) return '';
        const date = new Date(`${match[1]}-${match[2]}-${match[3]}T${match[4]}:${match[5]}:${match[6]}Z`);
        if (Number.isNaN(date.getTime())) return '';
        const pad = (part: number) => String(part).padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
      };
      return {
        eventTitle: valueAfter('SUMMARY:'),
        eventLocation: valueAfter('LOCATION:'),
        eventDescription: valueAfter('DESCRIPTION:'),
        eventStartDate: toDateTimeInput(valueAfter('DTSTART:')),
        eventEndDate: toDateTimeInput(valueAfter('DTEND:')),
      };
    }
    case 'instagram':
    case 'facebook':
    case 'youtube':
    case 'linkedin':
    case 'tiktok': {
      return { socialUsername: payload };
    }
    case 'x':
    case 'snapchat':
    case 'pinterest':
    case 'telegram':
    case 'threads':
    case 'twitch':
    case 'reddit':
    case 'discord':
    case 'bluesky':
    case 'github': {
      return { socialUsername: payload };
    }
    case 'crypto': {
      const cryptoUrl = parsedUrl();
      if (!cryptoUrl) return {};
      const currency = cryptoUrl.protocol.slice(0, -1);
      if (currency !== 'bitcoin' && currency !== 'ethereum' && currency !== 'solana' && currency !== 'usdt') return {};
      return {
        cryptoCurrency: currency,
        cryptoAddress: cryptoUrl.pathname || cryptoUrl.hostname,
        cryptoAmount: cryptoUrl.searchParams.get('amount') ?? '',
      };
    }
    case 'payment': {
      const readValue = (label: string) =>
        lines.find((line) => line.startsWith(`${label}:`))?.slice(label.length + 1).trim() ?? '';
      const method = readValue('Payment method');
      return {
        paymentMethod: method.startsWith('Raast ID')
          ? 'raast'
          : method === 'Mobile wallet'
            ? 'mobile-wallet'
            : 'bank',
        paymentAccountName: readValue('Account title'),
        paymentProvider: readValue('Bank / wallet'),
        paymentIdentifier: readValue('Account / IBAN / Raast ID'),
        paymentInstructions: readValue('Payment note'),
      };
    }
    default:
      return {};
  }
}

export interface ParsedScannedContent {
  type: 'url' | 'wifi' | 'email' | 'phone' | 'sms' | 'vcard' | 'location' | 'payment' | 'text';
  title: string;
  actionUrl?: string;
  actionLabel?: string;
  details?: Record<string, string>;
}

export function parseScannedData(raw: string): ParsedScannedContent {
  const trimmed = raw.trim();

  if (/^PAYMENT DETAILS \(PAKISTAN\)/i.test(trimmed)) {
    const readValue = (label: string) =>
      trimmed
        .split(/\r?\n/)
        .find((line) => line.startsWith(`${label}:`))
        ?.slice(label.length + 1)
        .trim() ?? '';
    const method = readValue('Payment method');
    const accountName = readValue('Account title');
    const provider = readValue('Bank / wallet');
    const identifier = readValue('Account / IBAN / Raast ID');
    const instructions = readValue('Payment note');
    return {
      type: 'payment',
      title: accountName ? `Payment details for ${accountName}` : 'Bank / wallet payment details',
      details: {
        ...(method ? { 'Payment method': method } : {}),
        ...(accountName ? { 'Account holder': accountName } : {}),
        ...(provider ? { 'Bank / wallet': provider } : {}),
        ...(identifier ? { 'Account / Payment ID': identifier } : {}),
        ...(instructions ? { Instructions: instructions } : {}),
      },
    };
  }

  // Wi-Fi detection
  if (trimmed.startsWith('WIFI:') || trimmed.startsWith('wifi:')) {
    const ssidMatch = trimmed.match(/S:([^;]+);/i);
    const passMatch = trimmed.match(/P:([^;]+);/i);
    const typeMatch = trimmed.match(/T:([^;]+);/i);
    const ssid = ssidMatch ? ssidMatch[1] : 'Unknown';
    const password = passMatch ? passMatch[1] : 'None';
    const security = typeMatch ? typeMatch[1] : 'WPA';
    return {
      type: 'wifi',
      title: `Wi-Fi Network: ${ssid}`,
      actionLabel: 'Copy Wi-Fi Password',
      details: {
        Network: ssid,
        Password: password,
        Security: security,
      },
    };
  }

  // URL detection
  if (/^https?:\/\//i.test(trimmed)) {
    return {
      type: 'url',
      title: trimmed,
      actionUrl: trimmed,
      actionLabel: 'Open Website',
    };
  }

  // Email detection
  if (trimmed.startsWith('mailto:') || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
    const email = trimmed.replace(/^mailto:/i, '').split('?')[0];
    return {
      type: 'email',
      title: `Email: ${email}`,
      actionUrl: trimmed.startsWith('mailto:') ? trimmed : `mailto:${trimmed}`,
      actionLabel: 'Send Email',
    };
  }

  // Phone detection
  if (trimmed.startsWith('tel:') || /^\+?[0-9\s\-()]{7,20}$/.test(trimmed)) {
    const phone = trimmed.replace(/^tel:/i, '');
    return {
      type: 'phone',
      title: `Phone Number: ${phone}`,
      actionUrl: `tel:${phone}`,
      actionLabel: 'Call Number',
    };
  }

  // SMS detection
  if (trimmed.startsWith('SMSTO:') || trimmed.startsWith('sms:')) {
    const parts = trimmed.replace(/^(SMSTO:|sms:)/i, '').split(':');
    return {
      type: 'sms',
      title: `SMS to: ${parts[0]}`,
      details: {
        Recipient: parts[0],
        Message: parts.slice(1).join(':'),
      },
      actionUrl: `sms:${parts[0]}`,
      actionLabel: 'Send SMS',
    };
  }

  // vCard detection
  if (trimmed.includes('BEGIN:VCARD')) {
    const fnMatch = trimmed.match(/FN:(.+)/i);
    const telMatch = trimmed.match(/TEL.*:(.+)/i);
    const emailMatch = trimmed.match(/EMAIL.*:(.+)/i);
    const orgMatch = trimmed.match(/ORG:(.+)/i);
    const name = fnMatch ? fnMatch[1].trim() : 'Contact Card';
    return {
      type: 'vcard',
      title: `Contact: ${name}`,
      details: {
        Name: name,
        ...(telMatch ? { Phone: telMatch[1].trim() } : {}),
        ...(emailMatch ? { Email: emailMatch[1].trim() } : {}),
        ...(orgMatch ? { Company: orgMatch[1].trim() } : {}),
      },
      actionLabel: telMatch ? 'Call Contact' : undefined,
      actionUrl: telMatch ? `tel:${telMatch[1].trim()}` : undefined,
    };
  }

  // Maps / Location
  if (trimmed.includes('maps.google.com') || trimmed.startsWith('geo:')) {
    return {
      type: 'location',
      title: 'Geographic Location / Map',
      actionUrl: trimmed.startsWith('geo:')
        ? `https://maps.google.com/?q=${trimmed.replace('geo:', '')}`
        : trimmed,
      actionLabel: 'View on Google Maps',
    };
  }

  return {
    type: 'text',
    title: trimmed.length > 60 ? trimmed.slice(0, 57) + '...' : trimmed,
    actionLabel: 'Copy Text',
  };
}
