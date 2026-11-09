export type QRType =
  | 'url'
  | 'text'
  | 'email'
  | 'phone'
  | 'whatsapp'
  | 'sms'
  | 'wifi'
  | 'vcard'
  | 'location'
  | 'event'
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'linkedin'
  | 'tiktok'
  | 'x'
  | 'snapchat'
  | 'pinterest'
  | 'telegram'
  | 'threads'
  | 'twitch'
  | 'reddit'
  | 'discord'
  | 'bluesky'
  | 'github'
  | 'crypto'
  | 'payment';

export type SocialQRType =
  | 'instagram'
  | 'facebook'
  | 'youtube'
  | 'linkedin'
  | 'tiktok'
  | 'x'
  | 'snapchat'
  | 'pinterest'
  | 'telegram'
  | 'threads'
  | 'twitch'
  | 'reddit'
  | 'discord'
  | 'bluesky'
  | 'github';

export type PaymentMethod = 'bank' | 'raast' | 'mobile-wallet';

export interface QRFormState {
  url: string;
  text: string;
  emailAddress: string;
  emailSubject: string;
  emailBody: string;
  phoneNumber: string;
  waCountryCode: string;
  waNumber: string;
  waMessage: string;
  smsNumber: string;
  smsMessage: string;
  wifiSsid: string;
  wifiPassword: string;
  wifiEncryption: 'WPA' | 'WEP' | 'nopass';
  wifiHidden: boolean;
  vcardFirstName: string;
  vcardLastName: string;
  vcardPhone: string;
  vcardEmail: string;
  vcardCompany: string;
  vcardTitle: string;
  vcardUrl: string;
  vcardAddress: string;
  locLatitude: string;
  locLongitude: string;
  locQuery: string;
  eventTitle: string;
  eventLocation: string;
  eventDescription: string;
  eventStartDate: string;
  eventEndDate: string;
  socialUsername: string;
  cryptoCurrency: 'bitcoin' | 'ethereum' | 'solana' | 'usdt';
  cryptoAddress: string;
  cryptoAmount: string;
  paymentMethod: PaymentMethod;
  paymentAccountName: string;
  paymentProvider: string;
  paymentIdentifier: string;
  paymentInstructions: string;
}

export type DotType = 'square' | 'dots' | 'rounded' | 'classy' | 'classy-rounded' | 'extra-rounded';
export type CornerSquareType = 'square' | 'dot' | 'extra-rounded';
export type CornerDotType = 'square' | 'dot';
export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';
export type FrameStyle = 'none' | 'bottom-badge' | 'top-header' | 'minimal-card' | 'ticket';

export interface QRFrameOptions {
  style: FrameStyle;
  text: string;
  color: string;
  textColor: string;
}

export interface GradientOptions {
  enabled: boolean;
  type: 'linear' | 'radial';
  color1: string;
  color2: string;
  rotation: number;
}

export interface QRDesignConfig {
  dotsColor: string;
  backgroundColor: string;
  isTransparentBg: boolean;
  dotsType: DotType;
  cornersSquareType: CornerSquareType;
  cornersSquareColor: string;
  cornersDotType: CornerDotType;
  cornersDotColor: string;
  gradient: GradientOptions;
  logoUrl?: string;
  logoSize: number; // 0.1 to 0.5
  logoMargin: number;
  margin: number; // quiet zone
  errorCorrectionLevel: ErrorCorrectionLevel;
  size: number; // export dimensions (e.g. 500, 1000, 1500)
  frame: QRFrameOptions;
}

export interface HistoryItem {
  id: string;
  title: string;
  type: QRType;
  payload: string;
  createdAt: number;
  design: QRDesignConfig;
  formState?: QRFormState;
  previewDataUrl?: string;
}

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
}
