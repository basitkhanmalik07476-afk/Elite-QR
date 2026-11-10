import React, { useState } from 'react';
import { Send } from 'lucide-react';

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
    <section id="contact" aria-labelledby="contact-heading" className="py-20 md:py-28 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 id="contact-heading" className="text-3xl sm:text-4xl font-extrabold tracking-[-0.05em] text-[#1d1a17] dark:text-white">
            Have a question or an idea?
          </h2>
          <p className="mt-3 text-base text-[#5b534d] dark:text-[#cfd7d3]">
            Send feedback, request a custom format, or report a technical issue.
          </p>
        </div>

        <div className="bg-[#fffdf9] dark:bg-[#111b21] rounded-[28px] border border-[#eae1d5] dark:border-[#21363d] p-5 sm:p-8 lg:p-10 shadow-[0_24px_60px_rgba(17,24,39,0.05)]">
          {!hasSupportEmail && (
            <p className="mb-5 rounded-xl border border-[#f0d5ad] bg-[#faf1e1] p-3 text-sm text-[#8a5b2a] dark:border-[#403327] dark:bg-[#2d2419] dark:text-[#f8d5a6]">
              Contact is not enabled yet. Set <code>VITE_SUPPORT_EMAIL</code> in the deployment environment.
            </p>
          )}
          {hasSupportEmail && (
            <p className="mb-5 rounded-xl border border-[#eae1d5] bg-[#f9f5f1] p-3 text-sm text-[#5b534d] dark:border-[#21363d] dark:bg-[#101b20] dark:text-[#c9d4cf]">
              Submitting opens your email app. Your message is not sent until you send it there.
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-[#1d1a17] dark:text-slate-300 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-2.5 bg-[#f6f1ea] dark:bg-[#0d1519] border border-[#e8dfd3] dark:border-[#21363d] rounded-xl text-base sm:text-sm text-[#1d1a17] dark:text-slate-100 placeholder-[#8c7e73] focus:outline-none focus:ring-2 focus:ring-[#1d7a5d]/30 min-h-[44px]"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#1d1a17] dark:text-slate-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full px-4 py-2.5 bg-[#f6f1ea] dark:bg-[#0d1519] border border-[#e8dfd3] dark:border-[#21363d] rounded-xl text-base sm:text-sm text-[#1d1a17] dark:text-slate-100 placeholder-[#8c7e73] focus:outline-none focus:ring-2 focus:ring-[#1d7a5d]/30 min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1d1a17] dark:text-slate-300 mb-1">
                Topic of Inquiry
              </label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#f6f1ea] dark:bg-[#0d1519] border border-[#e8dfd3] dark:border-[#21363d] rounded-xl text-base sm:text-sm text-[#1d1a17] dark:text-slate-100 cursor-pointer min-h-[44px]"
              >
                <option value="General Feedback">General Feedback</option>
                <option value="Feature Request">New Feature Request</option>
                <option value="Commercial Inquiry">Commercial Print / Bulk Packaging</option>
                <option value="Bug Report">Technical Bug Report</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#1d1a17] dark:text-slate-300 mb-1">
                Your Message *
              </label>
              <textarea
                rows={4}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help you or improve the QR Studio platform?"
                className="w-full p-4 bg-[#f6f1ea] dark:bg-[#0d1519] border border-[#e8dfd3] dark:border-[#21363d] rounded-xl text-base sm:text-sm text-[#1d1a17] dark:text-slate-100 placeholder-[#8c7e73] focus:outline-none focus:ring-2 focus:ring-[#1d7a5d]/30 resize-y min-h-[100px]"
              />
            </div>

            <button
              type="submit"
              disabled={!hasSupportEmail}
              className="primary-action w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold cursor-pointer min-h-[46px]"
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
