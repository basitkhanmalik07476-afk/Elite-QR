import React, { useRef } from 'react';
import {
  Palette,
  Shapes,
  Image as ImageIcon,
  Sliders,
  Upload,
  Trash2,
  Sparkles,
  ShieldCheck,
  LayoutTemplate,
  SquareCode,
  Check,
} from 'lucide-react';
import {
  QRDesignConfig,
  DotType,
  CornerSquareType,
  CornerDotType,
  ErrorCorrectionLevel,
  FrameStyle,
} from '../../types';
import { COLOR_PRESETS, PROFESSIONAL_STYLES } from '../../utils/qrStorage';
import { PRESET_LOGOS } from '../../utils/presetLogos';

interface QRCustomizerProps {
  design: QRDesignConfig;
  onChange: (updates: Partial<QRDesignConfig>) => void;
  onToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const QRCustomizer: React.FC<QRCustomizerProps> = ({ design, onChange, onToast }) => {
  const [activeTab, setActiveTab] = React.useState<
    'templates' | 'colors' | 'shapes' | 'frames' | 'logo' | 'advanced'
  >('templates');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Logo file upload handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onToast('error', 'Please upload a valid image file (PNG, JPG, SVG, WebP)');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      onToast('error', 'Image size exceeds 3MB. Please use a smaller logo.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onChange({
        logoUrl: result,
        errorCorrectionLevel: 'H', // Auto-upgrade error correction for scannability
      });
      onToast('success', 'Custom logo applied. Error correction raised to High [H] to help preserve scannability.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    onChange({ logoUrl: undefined });
    if (fileInputRef.current) fileInputRef.current.value = '';
    onToast('info', 'Logo removed.');
  };

  const handleApplyPreset = (preset: typeof COLOR_PRESETS[0]) => {
    onChange({
      dotsColor: preset.dotsColor,
      gradient: preset.gradient,
      cornersSquareColor: preset.cornersSquareColor,
      cornersDotColor: preset.cornersDotColor,
      backgroundColor: preset.backgroundColor,
      isTransparentBg: false,
    });
    onToast('success', `Applied ${preset.name} color palette!`);
  };

  const handleApplyProfessionalStyle = (stylePreset: typeof PROFESSIONAL_STYLES[0]) => {
    onChange({
      ...stylePreset.config,
    });
    onToast('success', `Applied "${stylePreset.name}" professional design template!`);
  };

  // Graphical representation data for dots
  const dotStyles: { type: DotType; label: string; desc: string }[] = [
    { type: 'extra-rounded', label: 'Extra Smooth', desc: 'Modern & organic' },
    { type: 'rounded', label: 'Soft Rounded', desc: 'Gentle curve' },
    { type: 'dots', label: 'Circular Dots', desc: 'Clean tech feel' },
    { type: 'classy', label: 'Classy Diamond', desc: 'Sophisticated elegance' },
    { type: 'classy-rounded', label: 'Classy Soft', desc: 'Luxury editorial' },
    { type: 'square', label: 'Crisp Square', desc: 'Industrial standard' },
  ];

  const cornerSquareStyles: { type: CornerSquareType; label: string; desc: string }[] = [
    { type: 'extra-rounded', label: 'Rounded Box', desc: 'Modern curve' },
    { type: 'dot', label: 'Circular Ring', desc: 'Smooth eye' },
    { type: 'square', label: 'Sharp Box', desc: 'Classic square' },
  ];

  const cornerDotStyles: { type: CornerDotType; label: string; desc: string }[] = [
    { type: 'dot', label: 'Circular Eye', desc: 'Spherical center' },
    { type: 'square', label: 'Square Eye', desc: 'Solid square center' },
  ];

  const frameOptions: { style: FrameStyle; label: string; desc: string }[] = [
    { style: 'none', label: 'Pure QR', desc: 'No frame border' },
    { style: 'bottom-badge', label: 'Bottom Pill Badge', desc: 'High conversion CTA' },
    { style: 'top-header', label: 'Top Header Bar', desc: 'Signage & menus' },
    { style: 'minimal-card', label: 'Minimal Card', desc: 'Subtle outline & tag' },
    { style: 'ticket', label: 'Ticket / Voucher', desc: 'Event passes & offers' },
  ];

  const suggestedFrameTexts = [
    'SCAN ME',
    'SCAN FOR MENU',
    'CONNECT WI-FI',
    'VISIT OUR SITE',
    'SAVE CONTACT',
    'PAY SECURELY',
    'FOLLOW ON INSTAGRAM',
    'CLAIM 20% DISCOUNT',
  ];

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 shadow-sm">
      {/* Studio Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
            <Palette className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Design & Styling Studio
            </h3>
            <p className="text-[11px] text-slate-500">Vector styling with error-correction support</p>
          </div>
        </div>
        <span className="hidden sm:inline text-xs text-indigo-600 dark:text-indigo-400 font-mono font-medium">
          Live Render
        </span>
      </div>

      {/* 6 Tabs */}
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl mb-5">
        <button
          type="button"
          onClick={() => setActiveTab('templates')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
            activeTab === 'templates'
              ? 'bg-white dark:bg-slate-900 text-[#1d7a5d] dark:text-[#93d3b1] shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Styles</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('colors')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
            activeTab === 'colors'
              ? 'bg-white dark:bg-slate-900 text-[#1d7a5d] dark:text-[#93d3b1] shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Palette className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Colors</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('shapes')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
            activeTab === 'shapes'
              ? 'bg-white dark:bg-slate-900 text-[#1d7a5d] dark:text-[#93d3b1] shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Shapes className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Shapes</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('frames')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
            activeTab === 'frames'
              ? 'bg-white dark:bg-slate-900 text-[#1d7a5d] dark:text-[#93d3b1] shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <LayoutTemplate className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Frames</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('logo')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
            activeTab === 'logo'
              ? 'bg-white dark:bg-slate-900 text-[#1d7a5d] dark:text-[#93d3b1] shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <ImageIcon className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Logo</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('advanced')}
          className={`flex items-center justify-center gap-1.5 py-2 px-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer min-h-[40px] ${
            activeTab === 'advanced'
              ? 'bg-white dark:bg-slate-900 text-[#1d7a5d] dark:text-[#93d3b1] shadow-sm'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Sliders className="w-3.5 h-3.5 shrink-0" />
          <span className="truncate">Options</span>
        </button>
      </div>

      {/* Tab 0: Professional Style Presets */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Curated Executive Templates
              </label>
              <span className="text-[11px] text-slate-400">One-click styling</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">
              Handcrafted combinations of modules, eye corners, gradients, and frames engineered for maximum brand elegance and scannability.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PROFESSIONAL_STYLES.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleApplyProfessionalStyle(preset)}
                  className="group relative p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-[#1d7a5d]/60 dark:hover:border-[#93d3b1] text-left transition-all duration-200 hover:shadow-md cursor-pointer bg-slate-50/70 dark:bg-slate-800/40 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#1d7a5d] dark:group-hover:text-[#93d3b1] transition-colors">
                        {preset.name}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-200/80 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                        {preset.tag}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed mb-3">
                      {preset.description}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                    {/* Visual Color Pill preview */}
                    <div
                      className="w-5 h-5 rounded-md shadow-inner border border-black/10 shrink-0"
                      style={{
                        background: preset.config.gradient?.enabled
                          ? `linear-gradient(135deg, ${preset.config.gradient.color1}, ${preset.config.gradient.color2})`
                          : preset.config.dotsColor || '#000',
                      }}
                    />
                    <span className="text-[11px] font-medium text-slate-600 dark:text-slate-300">
                      Module: <span className="font-mono text-indigo-600 dark:text-indigo-400">{preset.config.dotsType}</span>
                    </span>
                    <span className="text-[10px] text-[#1d7a5d] dark:text-[#93d3b1] font-semibold ml-auto group-hover:translate-x-0.5 transition-transform">
                      Apply →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 1: Colors & Gradients */}
      {activeTab === 'colors' && (
        <div className="space-y-5">
          {/* Quick Palettes */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Color Schemes & Gradients
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handleApplyPreset(preset)}
                  className="flex items-center gap-2 p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#1d7a5d]/60 text-left transition-all group cursor-pointer bg-slate-50 dark:bg-slate-800/40"
                >
                  <div
                    className="w-5 h-5 rounded-md shadow-sm shrink-0 border border-black/10"
                    style={{
                      background: preset.gradient.enabled
                        ? `linear-gradient(135deg, ${preset.gradient.color1}, ${preset.gradient.color2})`
                        : preset.dotsColor,
                    }}
                  />
                  <span className="text-xs font-medium text-slate-700 dark:text-slate-300 truncate">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Gradient Toggle */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                  Dual-Tone Gradient
                </label>
                <span className="text-[11px] text-slate-500">Apply modern linear or radial gradient</span>
              </div>
              <input
                type="checkbox"
                id="grad-toggle"
                checked={design.gradient.enabled}
                onChange={(e) =>
                  onChange({
                    gradient: { ...design.gradient, enabled: e.target.checked },
                  })
                }
                className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
              />
            </div>

            {design.gradient.enabled ? (
              <div className="space-y-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Color 1 (Start)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={design.gradient.color1}
                        onChange={(e) =>
                          onChange({
                            gradient: { ...design.gradient, color1: e.target.value },
                          })
                        }
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <input
                        type="text"
                        value={design.gradient.color1}
                        onChange={(e) =>
                          onChange({
                            gradient: { ...design.gradient, color1: e.target.value },
                          })
                        }
                        className="w-full text-xs font-mono px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-500 mb-1">Color 2 (End)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={design.gradient.color2}
                        onChange={(e) =>
                          onChange({
                            gradient: { ...design.gradient, color2: e.target.value },
                          })
                        }
                        className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <input
                        type="text"
                        value={design.gradient.color2}
                        onChange={(e) =>
                          onChange({
                            gradient: { ...design.gradient, color2: e.target.value },
                          })
                        }
                        className="w-full text-xs font-mono px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500">Gradient Flow:</span>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          gradient: { ...design.gradient, type: 'linear' },
                        })
                      }
                      className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                        design.gradient.type === 'linear'
                          ? 'bg-[#1d7a5d] text-white shadow-sm'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Linear
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        onChange({
                          gradient: { ...design.gradient, type: 'radial' },
                        })
                      }
                      className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                        design.gradient.type === 'radial'
                          ? 'bg-[#1d7a5d] text-white shadow-sm'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      Radial
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <label className="block text-[11px] text-slate-500 mb-1">Foreground QR Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={design.dotsColor}
                    onChange={(e) => onChange({ dotsColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <input
                    type="text"
                    value={design.dotsColor}
                    onChange={(e) => onChange({ dotsColor: e.target.value })}
                    className="w-full text-xs font-mono px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Background Canvas */}
          <div className="grid sm:grid-cols-2 gap-3 items-center p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1.5">
                Background Canvas
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={design.backgroundColor}
                  disabled={design.isTransparentBg}
                  onChange={(e) => onChange({ backgroundColor: e.target.value })}
                  className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 disabled:opacity-40 shrink-0"
                />
                <input
                  type="text"
                  value={design.backgroundColor}
                  disabled={design.isTransparentBg}
                  onChange={(e) => onChange({ backgroundColor: e.target.value })}
                  className="w-full text-xs font-mono px-2 py-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg disabled:opacity-40"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:pt-4">
              <input
                type="checkbox"
                id="transp-bg"
                checked={design.isTransparentBg}
                onChange={(e) => onChange({ isTransparentBg: e.target.checked })}
                className="rounded text-indigo-600 focus:ring-indigo-500 w-4 h-4 cursor-pointer"
              />
              <label htmlFor="transp-bg" className="text-xs text-slate-700 dark:text-slate-300 font-medium cursor-pointer">
                Transparent Background (PNG & SVG)
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Shapes & Patterns with Graphical Previews */}
      {activeTab === 'shapes' && (
        <div className="space-y-5">
          {/* Body Dots Style with SVG Graphics */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              1. Data Matrix Module Pattern
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {dotStyles.map((item) => {
                const isSelected = design.dotsType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => onChange({ dotsType: item.type })}
                    className={`p-2.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between min-h-[74px] ${
                      isSelected
                        ? 'bg-[#1d7a5d]/5 dark:bg-[#1d7a5d]/15 border-[#1d7a5d] text-[#1d7a5d] dark:text-[#93d3b1] shadow-sm ring-1 ring-[#1d7a5d]/30'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      {/* Mini visual module matrix */}
                      <svg className="w-6 h-6 text-current" viewBox="0 0 24 24" fill="currentColor">
                        {item.type === 'extra-rounded' && (
                          <>
                            <rect x="2" y="2" width="8" height="8" rx="3.5" />
                            <rect x="14" y="2" width="8" height="8" rx="3.5" />
                            <rect x="2" y="14" width="8" height="8" rx="3.5" />
                            <rect x="14" y="14" width="8" height="8" rx="3.5" />
                          </>
                        )}
                        {item.type === 'rounded' && (
                          <>
                            <rect x="2" y="2" width="8" height="8" rx="2" />
                            <rect x="14" y="2" width="8" height="8" rx="2" />
                            <rect x="2" y="14" width="8" height="8" rx="2" />
                            <rect x="14" y="14" width="8" height="8" rx="2" />
                          </>
                        )}
                        {item.type === 'dots' && (
                          <>
                            <circle cx="6" cy="6" r="4" />
                            <circle cx="18" cy="6" r="4" />
                            <circle cx="6" cy="18" r="4" />
                            <circle cx="18" cy="18" r="4" />
                          </>
                        )}
                        {item.type === 'classy' && (
                          <>
                            <path d="M6 2L10 6L6 10L2 6Z" />
                            <path d="M18 2L22 6L18 10L14 6Z" />
                            <path d="M6 14L10 18L6 22L2 18Z" />
                            <path d="M18 14L22 18L18 22L14 18Z" />
                          </>
                        )}
                        {item.type === 'classy-rounded' && (
                          <>
                            <rect x="2" y="2" width="8" height="8" rx="4" />
                            <rect x="14" y="2" width="8" height="8" rx="1" />
                            <rect x="2" y="14" width="8" height="8" rx="1" />
                            <rect x="14" y="14" width="8" height="8" rx="4" />
                          </>
                        )}
                        {item.type === 'square' && (
                          <>
                            <rect x="2" y="2" width="8" height="8" />
                            <rect x="14" y="2" width="8" height="8" />
                            <rect x="2" y="14" width="8" height="8" />
                            <rect x="14" y="14" width="8" height="8" />
                          </>
                        )}
                      </svg>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#1d7a5d] dark:text-[#93d3b1]" />}
                    </div>
                    <div>
                      <div className="text-xs font-bold truncate">{item.label}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 truncate">{item.desc}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Corner Square (Outer Eye Frame) with SVGs */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              2. Corner Outer Frame Style
            </label>
            <div className="grid grid-cols-3 gap-2">
              {cornerSquareStyles.map((item) => {
                const isSelected = design.cornersSquareType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => onChange({ cornersSquareType: item.type })}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#1d7a5d]/5 dark:bg-[#1d7a5d]/15 border-[#1d7a5d] text-[#1d7a5d] dark:text-[#93d3b1] font-semibold shadow-sm ring-1 ring-[#1d7a5d]/30'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <svg className="w-7 h-7 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      {item.type === 'extra-rounded' && (
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                      )}
                      {item.type === 'dot' && (
                        <circle cx="12" cy="12" r="9" />
                      )}
                      {item.type === 'square' && (
                        <rect x="3" y="3" width="18" height="18" rx="0" />
                      )}
                    </svg>
                    <span className="text-xs font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Corner Dot (Inner Eye) with SVGs */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              3. Corner Inner Eye Dot
            </label>
            <div className="grid grid-cols-2 gap-2">
              {cornerDotStyles.map((item) => {
                const isSelected = design.cornersDotType === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => onChange({ cornersDotType: item.type })}
                    className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer flex flex-col items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#1d7a5d]/5 dark:bg-[#1d7a5d]/15 border-[#1d7a5d] text-[#1d7a5d] dark:text-[#93d3b1] font-semibold shadow-sm ring-1 ring-[#1d7a5d]/30'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <svg className="w-7 h-7 text-current" viewBox="0 0 24 24" fill="currentColor">
                      {item.type === 'dot' && <circle cx="12" cy="12" r="6" />}
                      {item.type === 'square' && <rect x="6" y="6" width="12" height="12" />}
                    </svg>
                    <span className="text-xs font-bold">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Corner Eye Accent Colors */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
              Corner Eye Accent Colors
            </label>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Outer Frame Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={design.cornersSquareColor}
                    onChange={(e) => onChange({ cornersSquareColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <input
                    type="text"
                    value={design.cornersSquareColor}
                    onChange={(e) => onChange({ cornersSquareColor: e.target.value })}
                    className="w-full text-xs font-mono px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Inner Eye Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={design.cornersDotColor}
                    onChange={(e) => onChange({ cornersDotColor: e.target.value })}
                    className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 shrink-0"
                  />
                  <input
                    type="text"
                    value={design.cornersDotColor}
                    onChange={(e) => onChange({ cornersDotColor: e.target.value })}
                    className="w-full text-xs font-mono px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Professional Frames & "Scan Me" Badges */}
      {activeTab === 'frames' && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Select Frame Style
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {frameOptions.map((opt) => {
                const isSelected = design.frame.style === opt.style;
                return (
                  <button
                    key={opt.style}
                    type="button"
                    onClick={() =>
                      onChange({
                        frame: { ...design.frame, style: opt.style },
                      })
                    }
                    className={`p-3 rounded-2xl border text-left transition-all cursor-pointer min-h-[72px] flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#1d7a5d]/5 dark:bg-[#1d7a5d]/15 border-[#1d7a5d] text-[#1d7a5d] dark:text-[#93d3b1] shadow-sm ring-1 ring-[#1d7a5d]/30'
                        : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-xs font-bold">{opt.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#1d7a5d] dark:text-[#93d3b1]" />}
                    </div>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">{opt.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {design.frame.style !== 'none' && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Call-to-Action Text
                </label>
                <input
                  type="text"
                  value={design.frame.text}
                  maxLength={30}
                  onChange={(e) =>
                    onChange({
                      frame: { ...design.frame, text: e.target.value.toUpperCase() },
                    })
                  }
                  placeholder="e.g. SCAN ME"
                  className="w-full text-xs font-bold uppercase tracking-wider px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl"
                />

                {/* Suggestions pills */}
                <div className="flex flex-wrap gap-1.5 mt-2.5">
                  {suggestedFrameTexts.map((txt) => (
                    <button
                      key={txt}
                      type="button"
                      onClick={() =>
                        onChange({
                          frame: { ...design.frame, text: txt },
                        })
                      }
                      className="px-2 py-1 rounded-lg text-[10px] font-medium bg-slate-200/70 dark:bg-slate-700/70 text-slate-700 dark:text-slate-300 hover:bg-[#1d7a5d]/10 dark:hover:bg-[#1d7a5d]/20 hover:text-[#1d7a5d] transition-colors cursor-pointer"
                    >
                      {txt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Frame Colors */}
              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Frame Banner Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={design.frame.color}
                      onChange={(e) =>
                        onChange({
                          frame: { ...design.frame, color: e.target.value },
                        })
                      }
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <input
                      type="text"
                      value={design.frame.color}
                      onChange={(e) =>
                        onChange({
                          frame: { ...design.frame, color: e.target.value },
                        })
                      }
                      className="w-full text-xs font-mono px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-500 mb-1">Badge Text Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={design.frame.textColor}
                      onChange={(e) =>
                        onChange({
                          frame: { ...design.frame, textColor: e.target.value },
                        })
                      }
                      className="w-8 h-8 rounded-lg cursor-pointer border border-slate-200 dark:border-slate-700 shrink-0"
                    />
                    <input
                      type="text"
                      value={design.frame.textColor}
                      onChange={(e) =>
                        onChange({
                          frame: { ...design.frame, textColor: e.target.value },
                        })
                      }
                      className="w-full text-xs font-mono px-2 py-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 4: Logo Integration */}
      {activeTab === 'logo' && (
        <div className="space-y-5">
          {/* Upload Custom Logo */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Upload Custom Logo
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept="image/png, image/jpeg, image/svg+xml, image/webp"
              className="hidden"
            />
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-dashed border-[#1d7a5d]/50 hover:border-[#1d7a5d] bg-[#1d7a5d]/5 dark:bg-[#1d7a5d]/10 text-[#1d7a5d] dark:text-[#93d3b1] text-xs font-semibold transition-colors cursor-pointer"
              >
                <Upload className="w-4 h-4" />
                <span>Upload Logo (PNG, SVG, JPG)</span>
              </button>

              {design.logoUrl && (
                <button
                  type="button"
                  onClick={handleRemoveLogo}
                  className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-rose-200 dark:border-rose-900 bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-semibold hover:bg-rose-100 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Remove Logo</span>
                </button>
              )}
            </div>
          </div>

          {/* Preset Logos */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Or Choose a Pre-tuned Brand Icon
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {PRESET_LOGOS.map((logo) => {
                const isSelected = design.logoUrl === logo.dataUrl;
                return (
                  <button
                    key={logo.id}
                    type="button"
                    onClick={() => {
                      onChange({
                        logoUrl: logo.dataUrl,
                        errorCorrectionLevel: 'H',
                      });
                      onToast('success', `Added ${logo.name} logo to center!`);
                    }}
                    className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#1d7a5d] bg-[#1d7a5d]/5 dark:bg-[#1d7a5d]/15 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <img src={logo.dataUrl} alt={logo.name} className="w-7 h-7 object-contain" />
                    <span className="text-[11px] font-medium text-slate-700 dark:text-slate-300 truncate w-full text-center">
                      {logo.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Logo Sliders */}
          {design.logoUrl && (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Logo Size Proportion</span>
                  <span className="font-mono text-slate-500">{Math.round(design.logoSize * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.15"
                  max="0.45"
                  step="0.02"
                  value={design.logoSize}
                  onChange={(e) => onChange({ logoSize: parseFloat(e.target.value) })}
                  className="w-full accent-[#1d7a5d] cursor-pointer"
                />
              </div>

              <div>
                <div className="flex items-center justify-between text-xs mb-1.5">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Logo Padding / Margin</span>
                  <span className="font-mono text-slate-500">{design.logoMargin}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="1"
                  value={design.logoMargin}
                  onChange={(e) => onChange({ logoMargin: parseInt(e.target.value) })}
                  className="w-full accent-[#1d7a5d] cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 text-xs text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 p-2.5 rounded-xl border border-emerald-500/20">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Error correction automatically set to High (30%) to guarantee scannability with logo center.</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 5: Advanced Options */}
      {activeTab === 'advanced' && (
        <div className="space-y-4">
          {/* Error Correction Level */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Reed-Solomon Error Correction Level
              </label>
              <span className="text-xs text-slate-400 font-mono">
                Recovery Buffer
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { level: 'L' as ErrorCorrectionLevel, label: 'L (7%)', desc: 'Lowest redundancy' },
                { level: 'M' as ErrorCorrectionLevel, label: 'M (15%)', desc: 'Standard business' },
                { level: 'Q' as ErrorCorrectionLevel, label: 'Q (25%)', desc: 'High resilience' },
                { level: 'H' as ErrorCorrectionLevel, label: 'H (30%)', desc: 'Max (Logos & print)' },
              ].map((item) => (
                <button
                  key={item.level}
                  type="button"
                  onClick={() => onChange({ errorCorrectionLevel: item.level })}
                  className={`p-2.5 sm:p-2 rounded-xl border text-center transition-all cursor-pointer min-h-[46px] ${
                    design.errorCorrectionLevel === item.level
                      ? 'bg-[#1d7a5d]/5 dark:bg-[#1d7a5d]/15 border-[#1d7a5d] text-[#1d7a5d] dark:text-[#93d3b1] font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-slate-400">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Margin / Quiet Zone */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Quiet Zone / Margin</span>
              <span className="font-mono text-slate-500">{design.margin}px</span>
            </div>
            <input
              type="range"
              min="0"
              max="35"
              step="5"
              value={design.margin}
              onChange={(e) => onChange({ margin: parseInt(e.target.value) })}
              className="w-full accent-[#1d7a5d] cursor-pointer h-2"
            />
          </div>

          {/* Export Resolution Size */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Export Resolution Dimensions
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { size: 320, label: '320px', desc: 'Web & Email' },
                { size: 600, label: '600px', desc: 'Flyers & Menus' },
                { size: 1200, label: '1200px', desc: 'HD Print & Posters' },
                { size: 2000, label: '2000px', desc: 'Billboards & Vinyl' },
              ].map((item) => (
                <button
                  key={item.size}
                  type="button"
                  onClick={() => onChange({ size: item.size })}
                  className={`p-2.5 sm:p-2 rounded-xl border text-center transition-all cursor-pointer min-h-[46px] ${
                    design.size === item.size
                      ? 'bg-[#1d7a5d]/5 dark:bg-[#1d7a5d]/15 border-[#1d7a5d] text-[#1d7a5d] dark:text-[#93d3b1] font-bold'
                      : 'border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  <div className="text-xs font-bold">{item.label}</div>
                  <div className="text-[10px] text-slate-400">{item.desc}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
