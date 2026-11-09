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
  Eye,
  EyeOff,
  AlertCircle,
} from 'lucide-react';
import { PaymentMethod, QRType } from '../../types';
import { QRFormState } from '../../utils/qrPayloads';
import { SOCIAL_PLATFORMS } from '../../utils/socialPlatforms';
import { SocialPlatformIcon } from '../SocialPlatformIcon';

interface QRInputFormsProps {
  type: QRType;
  formState: QRFormState;
  onChange: (field: keyof QRFormState, value: any) => void;
}

export const QRInputForms: React.FC<QRInputFormsProps> = ({ type, formState, onChange }) => {
  const [showWifiPass, setShowWifiPass] = React.useState(false);
  const socialPlatform = SOCIAL_PLATFORMS.find((platform) => platform.type === type);

  // Quick protocol helper
  const handleUrlPrefix = (protocol: 'https://' | 'http://') => {
    let clean = formState.url.replace(/^https?:\/\//i, '');
    onChange('url', protocol + clean);
  };

  return (
    <div className="space-y-4">
      {/* 1. URL */}
      {type === 'url' && (
        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Website or Landing Page URL
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Globe className="w-4 h-4" />
            </div>
            <input
              type="url"
              value={formState.url}
              onChange={(e) => onChange('url', e.target.value)}
              placeholder="https://example.com/promo"
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all min-h-[44px]"
            />
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500">Quick protocol:</span>
            <button
              type="button"
              onClick={() => handleUrlPrefix('https://')}
              className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px]"
            >
              https://
            </button>
            <button
              type="button"
              onClick={() => handleUrlPrefix('http://')}
              className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-mono text-[11px]"
            >
              http://
            </button>
          </div>
          {!/^https?:\/\/.+/i.test(formState.url) && formState.url.length > 0 && (
            <p className="flex items-center gap-1.5 text-xs text-amber-600 dark:text-amber-400">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>We'll automatically prepend https:// to guarantee mobile scannability.</span>
            </p>
          )}
        </div>
      )}

      {/* 2. Plain Text */}
      {type === 'text' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Plain Text or Message
            </label>
            <span className="text-xs text-slate-400 font-mono">
              {formState.text.length} characters
            </span>
          </div>
          <div className="relative">
            <textarea
              rows={4}
              value={formState.text}
              onChange={(e) => onChange('text', e.target.value)}
              placeholder="Enter instructions, notes, passwords, or serial codes..."
              className="w-full p-3.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 transition-all resize-y min-h-[100px]"
            />
          </div>
        </div>
      )}

      {/* 3. Email */}
      {type === 'email' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
              Recipient Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="email"
                value={formState.emailAddress}
                onChange={(e) => onChange('emailAddress', e.target.value)}
                placeholder="contact@business.com"
                className="w-full pl-10 pr-4 py-2.5 sm:py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 min-h-[44px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Default Subject Line
              </label>
              <input
                type="text"
                value={formState.emailSubject}
                onChange={(e) => onChange('emailSubject', e.target.value)}
                placeholder="Inquiry from QR Scan"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Pre-filled Body
              </label>
              <input
                type="text"
                value={formState.emailBody}
                onChange={(e) => onChange('emailBody', e.target.value)}
                placeholder="Hello, I would like to..."
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 min-h-[44px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* 4. Phone Number */}
      {type === 'phone' && (
        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            Phone Number (with Country Code)
          </label>
          <div className="relative">
            <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
            <input
              type="tel"
              value={formState.phoneNumber}
              onChange={(e) => onChange('phoneNumber', e.target.value)}
              placeholder="+1 (555) 234-5678"
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:border-indigo-500 min-h-[44px]"
            />
          </div>
          <p className="text-xs text-slate-500">
            Scanning this code on iOS or Android will immediately prompt to dial this number.
          </p>
        </div>
      )}

      {/* 5. WhatsApp */}
      {type === 'whatsapp' && (
        <div className="space-y-3">
          <div className="grid grid-cols-12 gap-2.5 sm:gap-3">
            <div className="col-span-4 sm:col-span-3">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Country
              </label>
              <div className="relative">
                <span className="absolute left-2.5 top-3 text-xs text-slate-400 font-mono">+</span>
                <input
                  type="text"
                  value={formState.waCountryCode}
                  onChange={(e) => onChange('waCountryCode', e.target.value.replace(/\D/g, ''))}
                  placeholder="1"
                  className="w-full pl-5 pr-2 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 font-mono min-h-[44px]"
                />
              </div>
            </div>
            <div className="col-span-8 sm:col-span-9">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                WhatsApp Phone Number
              </label>
              <div className="relative">
                <MessageCircle className="absolute left-3.5 top-3.5 w-4 h-4 text-emerald-500" />
                <input
                  type="tel"
                  value={formState.waNumber}
                  onChange={(e) => onChange('waNumber', e.target.value.replace(/\D/g, ''))}
                  placeholder="4155552671"
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
                />
              </div>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Optional Pre-filled Chat Message
            </label>
            <input
              type="text"
              value={formState.waMessage}
              onChange={(e) => onChange('waMessage', e.target.value)}
              placeholder="Hi! I scanned your QR code and want to know more."
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
            />
          </div>
        </div>
      )}

      {/* 6. SMS */}
      {type === 'sms' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Phone Number
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-400" />
              <input
                type="tel"
                value={formState.smsNumber}
                onChange={(e) => onChange('smsNumber', e.target.value)}
                placeholder="+14155552671"
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Pre-filled SMS Message
            </label>
            <input
              type="text"
              value={formState.smsMessage}
              onChange={(e) => onChange('smsMessage', e.target.value)}
              placeholder="START"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
            />
          </div>
        </div>
      )}

      {/* 7. Wi-Fi */}
      {type === 'wifi' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Network Name (SSID)
              </label>
              <div className="relative">
                <Wifi className="absolute left-3.5 top-3.5 w-4 h-4 text-cyan-500" />
                <input
                  type="text"
                  value={formState.wifiSsid}
                  onChange={(e) => onChange('wifiSsid', e.target.value)}
                  placeholder="MyHome_WiFi"
                  className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Security Encryption
              </label>
              <select
                value={formState.wifiEncryption}
                onChange={(e) => onChange('wifiEncryption', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 cursor-pointer min-h-[44px]"
              >
                <option value="WPA">WPA / WPA2 / WPA3 (Standard)</option>
                <option value="WEP">WEP (Legacy)</option>
                <option value="nopass">None (Open Network)</option>
              </select>
            </div>
          </div>

          {formState.wifiEncryption !== 'nopass' && (
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Network Password
              </label>
              <div className="relative">
                <input
                  type={showWifiPass ? 'text' : 'password'}
                  value={formState.wifiPassword}
                  onChange={(e) => onChange('wifiPassword', e.target.value)}
                  placeholder="Enter Wi-Fi password"
                  className="w-full pl-3.5 pr-11 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
                />
                <button
                  type="button"
                  onClick={() => setShowWifiPass(!showWifiPass)}
                  className="absolute right-2 top-2 p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer"
                  aria-label={showWifiPass ? 'Hide password' : 'Show password'}
                >
                  {showWifiPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="hidden-wifi"
              checked={formState.wifiHidden}
              onChange={(e) => onChange('wifiHidden', e.target.checked)}
              className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4"
            />
            <label htmlFor="hidden-wifi" className="text-xs text-slate-600 dark:text-slate-400 cursor-pointer">
              Hidden Network (SSID is not broadcasted)
            </label>
          </div>
        </div>
      )}

      {/* 8. Contact vCard */}
      {type === 'vcard' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">First Name</label>
              <input
                type="text"
                value={formState.vcardFirstName}
                onChange={(e) => onChange('vcardFirstName', e.target.value)}
                placeholder="Sarah"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Last Name</label>
              <input
                type="text"
                value={formState.vcardLastName}
                onChange={(e) => onChange('vcardLastName', e.target.value)}
                placeholder="Jenkins"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Phone Number</label>
              <input
                type="tel"
                value={formState.vcardPhone}
                onChange={(e) => onChange('vcardPhone', e.target.value)}
                placeholder="+1 555-019-2834"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Email</label>
              <input
                type="email"
                value={formState.vcardEmail}
                onChange={(e) => onChange('vcardEmail', e.target.value)}
                placeholder="sarah@company.com"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Company / Organization</label>
              <input
                type="text"
                value={formState.vcardCompany}
                onChange={(e) => onChange('vcardCompany', e.target.value)}
                placeholder="Apex Innovations"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Job Title</label>
              <input
                type="text"
                value={formState.vcardTitle}
                onChange={(e) => onChange('vcardTitle', e.target.value)}
                placeholder="Head of Product"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Website URL</label>
              <input
                type="url"
                value={formState.vcardUrl}
                onChange={(e) => onChange('vcardUrl', e.target.value)}
                placeholder="https://company.com"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Address / City</label>
              <input
                type="text"
                value={formState.vcardAddress}
                onChange={(e) => onChange('vcardAddress', e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* 9. Location / Google Maps */}
      {type === 'location' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Search Location / Address (Easiest)
            </label>
            <div className="relative">
              <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-rose-500" />
              <input
                type="text"
                value={formState.locQuery}
                onChange={(e) => {
                  onChange('locQuery', e.target.value);
                  onChange('locLatitude', '');
                  onChange('locLongitude', '');
                }}
                placeholder="e.g. Empire State Building, New York"
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
              />
            </div>
          </div>
          <div className="text-center text-xs text-slate-400 uppercase tracking-wider font-semibold">
            — Or Exact Coordinates —
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Latitude</label>
              <input
                type="text"
                value={formState.locLatitude}
                onChange={(e) => {
                  onChange('locLatitude', e.target.value);
                  onChange('locQuery', '');
                }}
                placeholder="37.7749"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 font-mono min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Longitude</label>
              <input
                type="text"
                value={formState.locLongitude}
                onChange={(e) => {
                  onChange('locLongitude', e.target.value);
                  onChange('locQuery', '');
                }}
                placeholder="-122.4194"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 font-mono min-h-[44px]"
              />
            </div>
          </div>
        </div>
      )}

      {/* 10. Event */}
      {type === 'event' && (
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Event Title</label>
            <div className="relative">
              <Calendar className="absolute left-3.5 top-3.5 w-4 h-4 text-indigo-500" />
              <input
                type="text"
                value={formState.eventTitle}
                onChange={(e) => onChange('eventTitle', e.target.value)}
                placeholder="Annual Product Launch"
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Start Date & Time</label>
              <input
                type="datetime-local"
                value={formState.eventStartDate}
                onChange={(e) => onChange('eventStartDate', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">End Date & Time</label>
              <input
                type="datetime-local"
                value={formState.eventEndDate}
                onChange={(e) => onChange('eventEndDate', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">Location or Link</label>
            <input
              type="text"
              value={formState.eventLocation}
              onChange={(e) => onChange('eventLocation', e.target.value)}
              placeholder="Convention Center or Zoom link"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
            />
          </div>
        </div>
      )}

      {/* 11-14. Social Media Types */}
      {socialPlatform && (
        <div className="space-y-3">
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 dark:text-slate-300">
            {socialPlatform.label} Profile or Link
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <SocialPlatformIcon platform={socialPlatform.type} className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={formState.socialUsername}
              onChange={(e) => onChange('socialUsername', e.target.value)}
              placeholder={socialPlatform.placeholder}
              className="w-full pl-10 pr-4 py-2.5 sm:py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 min-h-[44px]"
            />
          </div>
        </div>
      )}

      {/* 15. Crypto */}
      {type === 'crypto' && (
        <div className="space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Cryptocurrency
              </label>
              <select
                value={formState.cryptoCurrency}
                onChange={(e) => onChange('cryptoCurrency', e.target.value)}
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 cursor-pointer min-h-[44px]"
              >
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="solana">Solana (SOL)</option>
                <option value="usdt">Tether (USDT)</option>
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Wallet Address
              </label>
              <input
                type="text"
                value={formState.cryptoAddress}
                onChange={(e) => onChange('cryptoAddress', e.target.value)}
                placeholder="Enter public receive address"
                className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 font-mono text-xs min-h-[44px]"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Optional Request Amount
            </label>
            <input
              type="text"
              value={formState.cryptoAmount}
              onChange={(e) => onChange('cryptoAmount', e.target.value)}
              placeholder="0.05"
              className="w-full px-3.5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 font-mono min-h-[44px]"
            />
          </div>
        </div>
      )}

      {type === 'payment' && (
        <div className="space-y-4">
          <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs leading-relaxed text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
            <Banknote className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              This QR shows payment details as text; it does not start or confirm a payment. Raast ID here is
              for manual transfers only. For an interoperable Raast merchant QR, request an official QR from
              your bank or Raast Merchant Service Provider.
            </p>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
              Payment Method
            </label>
            <select
              value={formState.paymentMethod}
              onChange={(e) => onChange('paymentMethod', e.target.value as PaymentMethod)}
              className="w-full cursor-pointer rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-base text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 sm:text-sm min-h-[44px]"
            >
              <option value="bank">Bank account / IBAN</option>
              <option value="raast">Raast ID (manual transfer)</option>
              <option value="mobile-wallet">Mobile wallet</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
              Account Holder / Shop Name
            </label>
            <input
              type="text"
              value={formState.paymentAccountName}
              onChange={(e) => onChange('paymentAccountName', e.target.value)}
              placeholder="Name customers should verify before paying"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-base text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 sm:text-sm min-h-[44px]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
              {formState.paymentMethod === 'bank' ? 'Bank Name' : 'Bank / Wallet Provider'}
            </label>
            <input
              type="text"
              value={formState.paymentProvider}
              onChange={(e) => onChange('paymentProvider', e.target.value)}
              placeholder={formState.paymentMethod === 'mobile-wallet' ? 'Easypaisa, JazzCash, etc.' : 'Your bank name'}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-base text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 sm:text-sm min-h-[44px]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
              {formState.paymentMethod === 'bank'
                ? 'Account Number or IBAN'
                : formState.paymentMethod === 'raast'
                  ? 'Raast ID (mobile number, IBAN, or other registered ID)'
                  : 'Wallet Mobile Number / Account ID'}
            </label>
            <input
              type="text"
              value={formState.paymentIdentifier}
              onChange={(e) => onChange('paymentIdentifier', e.target.value)}
              placeholder={formState.paymentMethod === 'bank' ? 'Enter account number or IBAN' : 'Enter payment ID'}
              autoComplete="off"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 font-mono text-base text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 sm:text-sm min-h-[44px]"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-slate-600 dark:text-slate-400">
              Optional Payment Instructions
            </label>
            <input
              type="text"
              value={formState.paymentInstructions}
              onChange={(e) => onChange('paymentInstructions', e.target.value)}
              placeholder="e.g. Please confirm the shop name before sending"
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-base text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 sm:text-sm min-h-[44px]"
            />
          </div>
          <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
            Create a separate QR for each account. Anyone who scans it can read and copy these details. Always
            check your bank or wallet app for the actual payment confirmation.
          </p>
        </div>
      )}
    </div>
  );
};
