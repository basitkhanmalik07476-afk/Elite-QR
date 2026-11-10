import React, { useState } from 'react';
import {
  UtensilsCrossed,
  Briefcase,
  Package,
  IdCard,
  Ticket,
  Wifi,
  Share2,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import { QRFormState, QRType } from '../types';

interface UseCasesProps {
  onSelectUseCaseTemplate: (type: QRType, initialData: Partial<QRFormState>) => void;
}

export const UseCases: React.FC<UseCasesProps> = ({ onSelectUseCaseTemplate }) => {
  const [selectedCategory, setSelectedCategory] = useState<number>(0);

  const cases = [
    {
      title: 'Restaurant & Hospitality Menus',
      icon: UtensilsCrossed,
      tag: 'Hospitality',
      type: 'url' as QRType,
      headline: 'Contactless Digital Menus & Table Ordering',
      description:
        'Eliminate dirty laminated menus and costly reprinting. Customers scan tabletop QR coasters to browse daily specials, allergen filters, and place mobile orders directly.',
      benefits: ['Instant daily menu updates', 'Zero paper reprinting costs', 'Faster table turnaround times'],
      demoData: { url: 'https://menu.bistroluxe.com/table-14' },
    },
    {
      title: 'Product Packaging & Labels',
      icon: Package,
      tag: 'Manufacturing',
      type: 'url' as QRType,
      headline: 'Interactive Unboxing & Authentication',
      description:
        'Print high-density vector QR codes on product boxes, cosmetics, or apparel tags to deliver video setup guides, warranty registration, and proof of authenticity.',
      benefits: ['Anti-counterfeiting verification', 'Direct warranty registration', 'User manuals & safety docs'],
      demoData: { url: 'https://verify.aurasound.com/batch/9821' },
    },
    {
      title: 'Smart Business Cards (vCard)',
      icon: IdCard,
      tag: 'Networking',
      type: 'vcard' as QRType,
      headline: 'One-Tap Address Book Contact Saving',
      description:
        'Exchange full contact information seamlessly at trade shows and conferences. When scanned, phones immediately prompt to save your name, title, email, and phone to contacts.',
      benefits: ['100% paperless networking', 'Instant phone address book save', 'Always up to date'],
      demoData: {
        vcardFirstName: 'Alexander',
        vcardLastName: 'Wright',
        vcardCompany: 'Vanguard Capital',
        vcardTitle: 'Managing Director',
        vcardPhone: '+1 415-829-1002',
        vcardEmail: 'a.wright@vanguard.io',
      },
    },
    {
      title: 'Guest Wi-Fi Access Points',
      icon: Wifi,
      tag: 'Facilities',
      type: 'wifi' as QRType,
      headline: 'Zero-Typing Wi-Fi Connection for Venues',
      description:
        'Place attractive framed QR signs in cafes, Airbnb rentals, and corporate lobbies. Guests point their camera and connect instantly without typing cumbersome 20-character passwords.',
      benefits: ['No more misspelled passwords', 'Supports WPA3 & hidden SSIDs', 'Enhanced guest satisfaction'],
      demoData: {
        wifiSsid: 'Velvet_Roast_Guest_5G',
        wifiPassword: 'CoffeeFresh2026!',
        wifiEncryption: 'WPA' as const,
      },
    },
    {
      title: 'Event Tickets & Conferences',
      icon: Ticket,
      tag: 'Events',
      type: 'event' as QRType,
      headline: 'Fast Turnstile Check-In & Calendar Reminders',
      description:
        'Add calendar sync or admission credentials to badge lanyards and email confirmations. Attendees scan to save date, time, and auditorium venue with one click.',
      benefits: ['Automated calendar invite injection', 'Rapid entrance validation', 'Real-time badge scanning'],
      demoData: {
        eventTitle: 'SaaS Innovate World Summit',
        eventLocation: 'Hall B, Convention Center',
        eventStartDate: '2026-11-20T10:00',
        eventEndDate: '2026-11-20T18:00',
      },
    },
    {
      title: 'Omnichannel Marketing Campaigns',
      icon: Briefcase,
      tag: 'Marketing',
      type: 'url' as QRType,
      headline: 'Bridge Print Ads to Digital Conversions',
      description:
        'Transform static billboards, magazine ads, and transit posters into high-converting digital funnels with custom UTM campaign tags and mobile discount codes.',
      benefits: ['Precise campaign attribution', 'App store direct downloads', 'Geo-targeted landing pages'],
      demoData: { url: 'https://shopbrand.com/fall-collection?utm_source=billboard_sf' },
    },
    {
      title: 'Social Media & Creator Profiles',
      icon: Share2,
      tag: 'Social',
      type: 'instagram' as QRType,
      headline: 'Rapid In-Person Follower Growth',
      description:
        'Display your Instagram, YouTube channel, or LinkedIn handle on storefront windows, exhibition booths, and presentation slides to turn passersby into followers instantly.',
      benefits: ['Direct profile launch in app', 'Boost organic social growth', 'Great for creators & influencers'],
      demoData: { socialUsername: 'quickqr_studio' },
    },
    {
      title: 'Education & Classroom Handouts',
      icon: GraduationCap,
      tag: 'Education',
      type: 'text' as QRType,
      headline: 'Interactive Study Materials & Lab Guides',
      description:
        'Teachers and universities embed research links, exam prep checklists, and lab equipment manuals onto lecture slides and printed syllabi.',
      benefits: ['Direct access to course portals', 'Frictionless homework links', 'Eco-friendly paper reduction'],
      demoData: { text: 'Class Syllabus & Lab Schedule: https://university.edu/chem301' },
    },
  ];

  const current = cases[selectedCategory];

  return (
    <section id="use-cases" aria-labelledby="use-cases-heading" className="py-20 md:py-28 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="use-cases-heading" className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Designed for Real-World Scenarios
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Discover how businesses, restaurants, creators, and organizers leverage QuickQR.
          </p>
        </div>

        {/* Interactive Selector Pill Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none justify-start lg:justify-center">
          {cases.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedCategory === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedCategory(idx)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1d7a5d] text-white shadow-[0_12px_24px_rgba(29,122,93,0.18)] scale-[1.02]'
                    : 'bg-[#fffdf9] dark:bg-[#111b21] border border-[#e8dfd3] dark:border-[#21363d] text-[#1d1a17] dark:text-slate-300 hover:bg-[#f7f4f0] dark:hover:bg-[#172228]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.tag}</span>
              </button>
            );
          })}
        </div>

        <div className="bg-[#fffdf9] dark:bg-[#111b21] rounded-[28px] border border-[#eae1d5] dark:border-[#21363d] p-5 sm:p-8 lg:p-12 shadow-[0_24px_60px_rgba(17,24,39,0.05)]">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Column info */}
            <div className="lg:col-span-7">
              <div className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#1d7a5d] dark:text-[#93d3b1] mb-2">
                {current.title}
              </div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-[-0.04em] text-[#1d1a17] dark:text-white mb-4">
                {current.headline}
              </h3>
              <p className="text-sm sm:text-base text-[#5b534d] dark:text-slate-300 leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="space-y-2.5 mb-8">
                {current.benefits.map((b, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-[#1d1a17] dark:text-slate-300 font-medium">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#1d7a5d] shrink-0" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => onSelectUseCaseTemplate(current.type, current.demoData)}
                className="primary-action w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-bold cursor-pointer min-h-[44px]"
              >
                <span>Load this template in generator</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right Column visual preview mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-[24px] bg-[linear-gradient(135deg,_#f4efe9,_#ffffff_40%,_#edf8f3)] dark:bg-[linear-gradient(135deg,_#111b21,_#101a1e_35%,_#122a2a)] p-6 border border-[#e8dfd3] dark:border-[#21363d] text-center shadow-[0_18px_38px_rgba(17,24,39,0.05)]">
                <div className="w-12 h-12 rounded-xl bg-white dark:bg-[#101b20] shadow-sm flex items-center justify-center mx-auto mb-4 text-[#1d7a5d] dark:text-[#93d3b1]">
                  <current.icon className="w-6 h-6" />
                </div>
                <h4 className="text-sm font-bold text-[#1d1a17] dark:text-white mb-1">
                  Ready-to-use preset
                </h4>
                <p className="text-xs text-[#5b534d] dark:text-slate-400 mb-4">
                  Type: {current.type.toUpperCase()} template with tuned contrast and sizing.
                </p>
                <div className="p-3 rounded-xl bg-white dark:bg-[#101b20] border border-[#e8dfd3] dark:border-[#21363d] text-xs font-mono text-[#5b534d] dark:text-slate-300 break-all text-left">
                  {JSON.stringify(current.demoData, null, 2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
