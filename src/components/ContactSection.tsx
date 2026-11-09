import React, { useState } from 'react';
import { Mail, Send, MessageSquare, Sparkles } from 'lucide-react';

interface ContactSectionProps {
  onToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('General Feedback');
  const [message, setMessage] = useState('');
  const supportEmail = import.meta.env.VITE_SUPPORT_EMAIL?.trim() || 'official.elitesolutions1@gmail.com';
  const hasSupportEmail = !!supportEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(supportEmail);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      onToast('error', 'Please fill out all required fields.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      onToast('error', 'Please enter a valid email address.');
      return;
    }

    if (!hasSupportEmail || !supportEmail) {
      onToast('error', 'Contact email is not configured for this deployment.');
      return;
    }

    const subject = encodeURIComponent(`${topic} - ${name.trim()}`);
    const body = encodeURIComponent(`From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`);
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    onToast('info', 'Your email app will open. The message is sent only after you press Send there.');
  };

  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>Support & Inquiries</span>
            <span aria-hidden="true">·</span>
            <span>Email-App Based</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Have Questions or Feature Ideas?
          </h2>
          <p className="mt-3 text-base text-slate-600 dark:text-slate-300">
            Send us feedback, request custom enterprise formats, or report issues.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 sm:p-8 lg:p-10 shadow-xl shadow-indigo-500/5">
          {!hasSupportEmail && (
            <p className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
              Contact is not enabled yet. Set <code>VITE_SUPPORT_EMAIL</code> in the deployment environment.
            </p>
          )}
          {hasSupportEmail && (
            <p className="mb-5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300">
              Submitting opens your email app. Your message is not sent until you send it there.
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Topic of Inquiry
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 cursor-pointer min-h-[44px]"
              >
                <option value="General Feedback">General Feedback</option>
                <option value="Feature Request">New Feature Request</option>
                <option value="Commercial Inquiry">Commercial Print / Bulk Packaging</option>
                <option value="Bug Report">Technical Bug Report</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Message *
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you or improve the QR Studio platform?"
                className="w-full p-4 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-base sm:text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-y min-h-[100px]"
              />
            </div>

            <button
              type="submit"
              disabled={!hasSupportEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-md shadow-indigo-500/20 text-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 min-h-[46px]"
            >
              <Send className="w-4 h-4" />
              <span>Submit Message</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
