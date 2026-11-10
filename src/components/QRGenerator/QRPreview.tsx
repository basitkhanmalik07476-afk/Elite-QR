import React, { useEffect, useRef, useState } from 'react';
import QRCodeStyling, { Options } from 'qr-code-styling';
import confetti from 'canvas-confetti';
import {
  Download,
  Copy,
  Check,
  BookmarkPlus,
  ShieldCheck,
  FileImage,
  FileType,
  Sparkles,
  Maximize2,
  AlertTriangle,
  Eye,
  CreditCard,
  Store,
} from 'lucide-react';
import { QRDesignConfig, QRType } from '../../types';

interface QRPreviewProps {
  payload: string;
  displayTitle: string;
  type: QRType;
  design: QRDesignConfig;
  onSaveHistory: (previewDataUrl?: string) => boolean;
  onToast: (type: 'success' | 'error' | 'info', message: string) => void;
}

export const QRPreview: React.FC<QRPreviewProps> = ({
  payload,
  displayTitle,
  type,
  design,
  onSaveHistory,
  onToast,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mockupContainerRef = useRef<HTMLDivElement>(null);
  const qrCodeRef = useRef<QRCodeStyling | null>(null);
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'studio' | 'card-mockup' | 'stand-mockup'>('studio');

  // Optical contrast calculator
  const getContrastRatio = (hex1: string, hex2: string): number => {
    const getLum = (hex: string) => {
      const clean = hex.replace('#', '');
      const r = parseInt(clean.substring(0, 2), 16) / 255;
      const g = parseInt(clean.substring(2, 4), 16) / 255;
      const b = parseInt(clean.substring(4, 6), 16) / 255;
      const a = [r, g, b].map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
      return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
    };
    try {
      const lum1 = getLum(hex1);
      const lum2 = getLum(hex2);
      const brightest = Math.max(lum1, lum2);
      const darkest = Math.min(lum1, lum2);
      return (brightest + 0.05) / (darkest + 0.05);
    } catch {
      return 8.5;
    }
  };

  const contrastScore = getContrastRatio(
    design.gradient.enabled ? design.gradient.color1 : design.dotsColor,
    design.backgroundColor
  );

  // Generate options for qr-code-styling
  const getQROptions = (isExport = false, exportSize?: number): Options => {
    const size = isExport ? exportSize || design.size : 260;

    const dotsOptions: any = {
      type: design.dotsType,
    };

    if (design.gradient.enabled) {
      dotsOptions.gradient = {
        type: design.gradient.type,
        rotation: (design.gradient.rotation * Math.PI) / 180,
        colorStops: [
          { offset: 0, color: design.gradient.color1 },
          { offset: 1, color: design.gradient.color2 },
        ],
      };
    } else {
      dotsOptions.color = design.dotsColor;
    }

    return {
      width: size,
      height: size,
      type: 'canvas',
      data: payload || 'https://example.com',
      image: design.logoUrl,
      margin: design.margin,
      qrOptions: {
        typeNumber: 0,
        mode: 'Byte',
        errorCorrectionLevel: design.errorCorrectionLevel,
      },
      imageOptions: {
        hideBackgroundDots: true,
        imageSize: design.logoSize,
        margin: design.logoMargin,
        crossOrigin: 'anonymous',
      },
      dotsOptions,
      backgroundOptions: {
        color: design.isTransparentBg ? 'transparent' : design.backgroundColor,
      },
      cornersSquareOptions: {
        type: design.cornersSquareType,
        color: design.cornersSquareColor,
      },
      cornersDotOptions: {
        type: design.cornersDotType,
        color: design.cornersDotColor,
      },
    };
  };

  // Mount & sync QR code canvas
  useEffect(() => {
    const activeContainer = viewMode === 'studio' ? containerRef.current : mockupContainerRef.current;
    if (!activeContainer) return;

    if (!qrCodeRef.current) {
      const qrCode = new QRCodeStyling(getQROptions(false));
      qrCodeRef.current = qrCode;
    } else {
      qrCodeRef.current.update(getQROptions(false));
    }

    activeContainer.innerHTML = '';
    qrCodeRef.current.append(activeContainer);
  }, [payload, design, viewMode]);

  // Confetti trigger
  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 55,
        spread: 65,
        origin: { y: 0.8 },
        colors: ['#4f46e5', '#06b6d4', '#10b981', '#f59e0b', '#ec4899'],
      });
    } catch {
      // safe fallback
    }
  };

  const getSafeFileName = (extension: string) => {
    const cleanType = type.toLowerCase();
    const timestamp = Date.now().toString().slice(-6);
    return `quickqr-${cleanType}-${timestamp}.${extension}`;
  };

  // Render framed composite canvas for downloads when frame is enabled
  const generateFramedCanvas = async (rawQRBlob: Blob, qrDimension: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(rawQRBlob);
      const releaseObjectUrl = () => URL.revokeObjectURL(objectUrl);
      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          if (!ctx) throw new Error('Could not render the QR frame in this browser.');

          const padding = Math.round(qrDimension * 0.08);
          const frameHeight = Math.round(qrDimension * 0.22);

          if (design.frame.style === 'bottom-badge') {
            canvas.width = qrDimension + padding * 2;
            canvas.height = qrDimension + padding * 2 + frameHeight;

            // Background Card
            ctx.fillStyle = design.backgroundColor || '#ffffff';
            ctx.beginPath();
            ctx.roundRect(0, 0, canvas.width, canvas.height, 24);
            ctx.fill();

            // Draw QR in upper portion
            ctx.drawImage(img, padding, padding, qrDimension, qrDimension);

            // Draw Bottom Pill Badge
            const badgeWidth = Math.round(canvas.width * 0.75);
            const badgeHeight = Math.round(frameHeight * 0.65);
            const badgeX = (canvas.width - badgeWidth) / 2;
            const badgeY = qrDimension + padding + Math.round((frameHeight - badgeHeight) / 2);

            ctx.fillStyle = design.frame.color || '#4f46e5';
            ctx.beginPath();
            ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, badgeHeight / 2);
            ctx.fill();

            // Draw Text
            ctx.fillStyle = design.frame.textColor || '#ffffff';
            ctx.font = `bold ${Math.round(badgeHeight * 0.42)}px Plus Jakarta Sans, Arial, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(design.frame.text || 'SCAN ME', canvas.width / 2, badgeY + badgeHeight / 2);
          } else if (design.frame.style === 'top-header') {
            canvas.width = qrDimension + padding * 2;
            canvas.height = qrDimension + padding * 2 + frameHeight;

            ctx.fillStyle = design.backgroundColor || '#ffffff';
            ctx.beginPath();
            ctx.roundRect(0, 0, canvas.width, canvas.height, 24);
            ctx.fill();

            // Draw Top Header Bar
            ctx.fillStyle = design.frame.color || '#4f46e5';
            ctx.beginPath();
            ctx.roundRect(0, 0, canvas.width, frameHeight, [24, 24, 0, 0]);
            ctx.fill();

            // Header text
            ctx.fillStyle = design.frame.textColor || '#ffffff';
            ctx.font = `bold ${Math.round(frameHeight * 0.38)}px Plus Jakarta Sans, Arial, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(design.frame.text || 'SCAN FOR MENU', canvas.width / 2, frameHeight / 2);

            // Draw QR underneath
            ctx.drawImage(img, padding, frameHeight + padding, qrDimension, qrDimension);
          } else if (design.frame.style === 'minimal-card') {
            canvas.width = qrDimension + padding * 2;
            canvas.height = qrDimension + padding * 2 + Math.round(frameHeight * 0.7);

            ctx.fillStyle = design.backgroundColor || '#ffffff';
            ctx.beginPath();
            ctx.roundRect(0, 0, canvas.width, canvas.height, 24);
            ctx.fill();

            // Border outline
            ctx.strokeStyle = design.frame.color || '#4f46e5';
            ctx.lineWidth = 6;
            ctx.beginPath();
            ctx.roundRect(3, 3, canvas.width - 6, canvas.height - 6, 22);
            ctx.stroke();

            ctx.drawImage(img, padding, padding, qrDimension, qrDimension);

            // Label
            ctx.fillStyle = design.frame.color || '#4f46e5';
            ctx.font = `bold ${Math.round(frameHeight * 0.32)}px Plus Jakarta Sans, Arial, sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(design.frame.text || 'SCAN ME', canvas.width / 2, qrDimension + padding + frameHeight * 0.35);
          } else if (design.frame.style === 'ticket') {
            const ticketHeight = Math.round(frameHeight * 0.7);
            canvas.width = qrDimension + padding * 2;
            canvas.height = qrDimension + padding * 2 + ticketHeight;

            ctx.fillStyle = design.backgroundColor || '#ffffff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, padding, padding, qrDimension, qrDimension);

            const dividerY = qrDimension + padding + Math.round(ticketHeight * 0.12);
            ctx.strokeStyle = '#cbd5e1';
            ctx.lineWidth = Math.max(2, Math.round(qrDimension * 0.002));
            ctx.setLineDash([Math.round(qrDimension * 0.015), Math.round(qrDimension * 0.01)]);
            ctx.beginPath();
            ctx.moveTo(padding, dividerY);
            ctx.lineTo(canvas.width - padding, dividerY);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.fillStyle = design.frame.color || '#4f46e5';
            ctx.font = `bold ${Math.round(frameHeight * 0.28)}px Plus Jakarta Sans, Arial, sans-serif`;
            ctx.textBaseline = 'middle';
            ctx.textAlign = 'left';
            ctx.fillText(design.frame.text || 'TICKET SCAN', padding, dividerY + Math.round(ticketHeight * 0.4));
            ctx.textAlign = 'right';
            ctx.fillText('● ● ●', canvas.width - padding, dividerY + Math.round(ticketHeight * 0.4));
          } else {
            throw new Error('Unsupported QR frame style.');
          }

          canvas.toBlob((blob) => {
            releaseObjectUrl();
            if (blob) resolve(blob);
            else reject(new Error('Could not encode the framed QR image.'));
          }, 'image/png');
        } catch (err) {
          releaseObjectUrl();
          reject(err);
        }
      };
      img.onerror = () => {
        releaseObjectUrl();
        reject(new Error('Could not load QR image for framing.'));
      };
      img.src = objectUrl;
    });
  };

  const toBlob = (data: any): Blob => {
    if (data instanceof Blob) return data;
    return new Blob([data], { type: 'image/png' });
  };

  const blobToDataUrl = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') resolve(reader.result);
        else reject(new Error('Could not read the generated image.'));
      };
      reader.onerror = () => reject(reader.error ?? new Error('Could not read the generated image.'));
      reader.onabort = () => reject(new Error('Reading the generated image was aborted.'));
      reader.readAsDataURL(blob);
    });

  // Download Handlers
  const handleDownload = async (ext: 'png' | 'svg' | 'jpeg') => {
    setDownloading(ext);
    try {
      const exportQR = new QRCodeStyling(getQROptions(true, design.size));

      if (design.frame.style === 'none' || ext === 'svg') {
        // Pure SVG or unframed
        const filename = `quickqr-${type}-${Date.now().toString().slice(-6)}`;
        await exportQR.download({ name: filename, extension: ext });
      } else {
        // Framed Raster Download
        const rawData = await exportQR.getRawData('png');
        if (!rawData) throw new Error('Could not render QR canvas');
        const rawBlob = toBlob(rawData);
        const finalBlob = await generateFramedCanvas(rawBlob, design.size);

        const url = URL.createObjectURL(finalBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = getSafeFileName(ext);
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      }

      triggerConfetti();
      const frameNote =
        ext === 'svg' && design.frame.style !== 'none'
          ? ' SVG includes the QR only; use PNG, JPEG, or PDF to include the selected frame.'
          : '';
      onToast('success', `Exported ${ext.toUpperCase()} successfully (${design.size}x${design.size}px)!${frameNote}`);
    } catch (err) {
      console.error('Download error:', err);
      onToast('error', `Failed to download ${ext.toUpperCase()}. Please try again.`);
    } finally {
      setDownloading(null);
    }
  };

  const handleDownloadPDF = async () => {
    setDownloading('pdf');
    try {
      const { jsPDF } = await import('jspdf');
      const exportSize = 1000;
      const exportQR = new QRCodeStyling(getQROptions(true, exportSize));
      const rawData = await exportQR.getRawData('png');
      if (!rawData) throw new Error('Could not generate image data');
      const rawBlob = toBlob(rawData);

      const finalBlob = design.frame.style !== 'none' ? await generateFramedCanvas(rawBlob, 1000) : rawBlob;
      const dataUrl = await blobToDataUrl(finalBlob);
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Top accent line
      pdf.setFillColor(79, 70, 229);
      pdf.rect(0, 0, 210, 8, 'F');

      // Header Title
      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(22);
      pdf.setTextColor(15, 23, 42);
      pdf.text('QuickQR Code Print Document', 105, 30, { align: 'center' });

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(10);
      pdf.setTextColor(100, 116, 139);
      const dateStr = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      pdf.text(`Generated on ${dateStr} · Type: ${type.toUpperCase()}`, 105, 37, { align: 'center' });

      // Centered QR Code
      const maxImageSize = 125;
      const padding = Math.round(exportSize * 0.08);
      const frameHeight = Math.round(exportSize * 0.22);
      const imageWidthPx = design.frame.style === 'none' ? exportSize : exportSize + padding * 2;
      const imageHeightPx =
        design.frame.style === 'none'
          ? exportSize
          : imageWidthPx + Math.round(
              design.frame.style === 'bottom-badge' || design.frame.style === 'top-header'
                ? frameHeight
                : frameHeight * 0.7
            );
      const imageRatio = imageHeightPx / imageWidthPx;
      const imageWidth = Math.min(maxImageSize, maxImageSize / imageRatio);
      const imageHeight = imageWidth * imageRatio;
      pdf.addImage(dataUrl, 'PNG', (210 - imageWidth) / 2, 48, imageWidth, imageHeight);

      // Content description box
      pdf.setFillColor(248, 250, 252);
      pdf.roundedRect(30, 185, 150, 28, 3, 3, 'F');
      pdf.setDrawColor(226, 232, 240);
      pdf.roundedRect(30, 185, 150, 28, 3, 3, 'S');

      pdf.setFont('helvetica', 'bold');
      pdf.setFontSize(10);
      pdf.setTextColor(30, 41, 59);
      pdf.text(`Target: ${displayTitle.length > 55 ? displayTitle.slice(0, 52) + '...' : displayTitle}`, 35, 195);

      pdf.setFont('helvetica', 'normal');
      pdf.setFontSize(8.5);
      pdf.setTextColor(100, 116, 139);
      const displayPayload = payload.length > 80 ? payload.slice(0, 77) + '...' : payload;
      pdf.text(`Payload: ${displayPayload}`, 35, 203);

      // Footer instructions
      pdf.setFontSize(9);
      pdf.setTextColor(148, 163, 184);
      pdf.text('Generated in your browser · Test contrast before printing', 105, 230, { align: 'center' });

      pdf.save(getSafeFileName('pdf'));
      triggerConfetti();
      onToast('success', 'Generated print-ready PDF document successfully!');
    } catch (err) {
      console.error('PDF generation error:', err);
      onToast('error', 'Failed to generate PDF. Please try again.');
    } finally {
      setDownloading(null);
    }
  };

  // Copy to clipboard
  const handleCopy = async () => {
    try {
      if (qrCodeRef.current) {
        const rawData = await qrCodeRef.current.getRawData('png');
        if (rawData && navigator.clipboard && window.ClipboardItem) {
          const rawBlob = toBlob(rawData);
          const finalBlob = design.frame.style !== 'none' ? await generateFramedCanvas(rawBlob, 600) : rawBlob;
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': finalBlob }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
          onToast('success', 'Copied styled QR code image to clipboard!');
          return;
        }
      }
      await navigator.clipboard.writeText(payload);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
      onToast('success', 'Copied QR payload to clipboard!');
    } catch (err) {
      console.warn('Failed to copy QR content', err);
      onToast('error', 'Could not copy QR content. Check clipboard permissions and try again.');
    }
  };

  // Save to history
  const handleSaveToHistory = async () => {
    let previewUrl: string | undefined;
    if (qrCodeRef.current) {
      try {
        const rawData = await qrCodeRef.current.getRawData('png');
        if (rawData) {
          const blob = toBlob(rawData);
          previewUrl = await blobToDataUrl(blob);
        }
      } catch (err) {
        console.warn('Could not create QR history preview', err);
      }
    }

    if (onSaveHistory(previewUrl)) {
      onToast('success', 'Saved to your recent QR history!');
    } else {
      onToast('error', 'Could not save QR history. Browser storage may be full or unavailable.');
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 sm:p-6 lg:p-7 shadow-lg shadow-indigo-500/5 flex flex-col items-center w-full max-w-full">
      {/* Top Card Header */}
      <div className="w-full flex items-center justify-between pb-3 mb-4 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
            Real-Time QR Preview
          </span>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 p-0.5 bg-slate-100 dark:bg-slate-800 rounded-lg text-[11px] font-medium">
          <button
            type="button"
            onClick={() => setViewMode('studio')}
            className={`px-2 py-1 rounded-md transition-all cursor-pointer ${
              viewMode === 'studio'
                ? 'bg-white dark:bg-slate-900 text-[#1d7a5d] dark:text-[#93d3b1] font-bold shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Studio
          </button>
          <button
            type="button"
            onClick={() => setViewMode('card-mockup')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer ${
              viewMode === 'card-mockup'
                ? 'bg-white dark:bg-slate-900 text-[#1d7a5d] dark:text-[#93d3b1] font-bold shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <CreditCard className="w-3 h-3" />
            <span className="hidden min-[475px]:inline">Card Mockup</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode('stand-mockup')}
            className={`flex items-center gap-1 px-2 py-1 rounded-md transition-all cursor-pointer ${
              viewMode === 'stand-mockup'
                ? 'bg-white dark:bg-slate-900 text-[#1d7a5d] dark:text-[#93d3b1] font-bold shadow-sm'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Store className="w-3 h-3" />
            <span className="hidden min-[475px]:inline">Table Stand</span>
          </button>
        </div>
      </div>

      {/* Main Preview Container with 3D / Mockup Mode */}
      {viewMode === 'studio' && (
        <div className="relative w-full max-w-[320px] mx-auto p-4 sm:p-6 rounded-3xl bg-slate-50/90 dark:bg-slate-950/70 border border-slate-200/90 dark:border-slate-800 flex flex-col items-center justify-center transition-all duration-300 overflow-hidden shadow-inner">
          {/* Framed Header (Top Header Style) */}
          {design.frame.style === 'top-header' && (
            <div
              className="w-full py-2 px-3 rounded-xl mb-3 text-center text-xs font-bold uppercase tracking-wider shadow-sm animate-in fade-in duration-200"
              style={{
                backgroundColor: design.frame.color || '#4f46e5',
                color: design.frame.textColor || '#ffffff',
              }}
            >
              {design.frame.text || 'SCAN FOR MENU'}
            </div>
          )}

          {/* Canvas Box */}
          <div
            className={`flex items-center justify-center max-w-full p-2 rounded-2xl transition-all duration-300 ${
              design.frame.style === 'minimal-card'
                ? 'border-2 shadow-sm'
                : ''
            }`}
            style={{
              borderColor: design.frame.style === 'minimal-card' ? design.frame.color || '#4f46e5' : undefined,
            }}
          >
            <div
              ref={containerRef}
              className="flex items-center justify-center max-w-full [&>canvas]:max-w-full [&>canvas]:w-auto [&>canvas]:h-auto [&>canvas]:rounded-xl [&>canvas]:shadow-sm"
            />
          </div>

          {/* Framed Footer (Bottom Badge Style) */}
          {design.frame.style === 'bottom-badge' && (
            <div
              className="mt-3 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm text-center animate-in fade-in duration-200"
              style={{
                backgroundColor: design.frame.color || '#4f46e5',
                color: design.frame.textColor || '#ffffff',
              }}
            >
              {design.frame.text || 'SCAN ME'}
            </div>
          )}

          {/* Minimal Card Label */}
          {design.frame.style === 'minimal-card' && (
            <div
              className="mt-2 text-[11px] font-bold uppercase tracking-wider text-center"
              style={{ color: design.frame.color || '#4f46e5' }}
            >
              {design.frame.text || 'SCAN ME'}
            </div>
          )}

          {/* Ticket Style */}
          {design.frame.style === 'ticket' && (
            <div className="w-full mt-3 pt-2 border-t border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="font-bold text-slate-800 dark:text-slate-200">{design.frame.text || 'TICKET SCAN'}</span>
              <span>● ● ●</span>
            </div>
          )}
        </div>
      )}

      {/* Business Card Mockup View */}
      {viewMode === 'card-mockup' && (
        <div className="w-full max-w-[320px] aspect-[1.75/1] rounded-2xl bg-gradient-to-tr from-slate-900 via-slate-800 to-indigo-950 p-4 border border-slate-700 shadow-xl flex items-center justify-between text-white relative overflow-hidden qr-card-3d">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-xl pointer-events-none" />
          <div className="flex flex-col justify-between h-full z-10 pr-2">
            <div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-indigo-400">Executive Pass</div>
              <div className="text-sm font-black tracking-tight mt-0.5">Apex Business</div>
              <div className="text-[10px] text-slate-400">Digital Identity Card</div>
            </div>
            <div className="text-[9px] font-mono text-slate-400">
              ID: #EQR-2026
            </div>
          </div>

          <div className="w-24 h-24 bg-white p-1.5 rounded-xl shadow-md shrink-0 flex items-center justify-center">
            <div
              ref={mockupContainerRef}
              className="flex h-full w-full items-center justify-center [&>canvas]:!h-full [&>canvas]:!w-full [&>canvas]:max-w-full [&>canvas]:rounded-md"
            />
          </div>
        </div>
      )}

      {/* Table Stand Mockup View */}
      {viewMode === 'stand-mockup' && (
        <div className="w-full max-w-[280px] rounded-2xl bg-gradient-to-b from-white to-slate-100 dark:from-slate-800 dark:to-slate-900 p-5 border-4 border-slate-200 dark:border-slate-700 shadow-2xl flex flex-col items-center text-center relative qr-card-3d">
          <div className="w-12 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mb-3" />
          <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-1">
            {design.frame.text || 'TABLE #14'}
          </div>
          <div className="text-[10px] text-slate-500 mb-3">Scan camera for contactless digital menu</div>

          <div className="w-28 h-28 bg-white p-2 rounded-xl border border-slate-200 shadow-inner flex items-center justify-center">
            <div
              ref={mockupContainerRef}
              className="flex h-full w-full items-center justify-center [&>canvas]:!h-full [&>canvas]:!w-full [&>canvas]:max-w-full [&>canvas]:rounded-md"
            />
          </div>

          <div className="mt-4 px-3 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-bold">
            Wi-Fi Connected · Instant Menu
          </div>
        </div>
      )}

      {/* Scannability & Contrast Quality Gauge */}
      <div className="w-full max-w-[320px] mt-3 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5">
          {contrastScore >= 4.5 ? (
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
          )}
          <span className="font-semibold text-slate-800 dark:text-slate-200">
            {contrastScore >= 7 ? 'Optimal Scannability' : contrastScore >= 4.5 ? 'Good Contrast' : 'Low Contrast'}
          </span>
        </div>
        <div className="flex items-center gap-1 font-mono text-[11px] text-slate-500">
          <span>Contrast:</span>
          <span className={`font-bold ${contrastScore >= 4.5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
            {contrastScore.toFixed(1)}:1
          </span>
        </div>
      </div>

      {/* Title & Payload Details */}
      <div className="w-full text-center mt-3 mb-4 px-2">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-xs mx-auto">
          {displayTitle}
        </h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 font-mono truncate max-w-xs mx-auto mt-0.5">
          {payload}
        </p>
      </div>

      {/* Action Utility Buttons (Copy & Save) */}
      <div className="w-full grid grid-cols-2 gap-2 mb-4">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-xs font-semibold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer min-h-[44px]"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500 shrink-0" /> : <Copy className="w-4 h-4 text-slate-400 shrink-0" />}
          <span className="truncate">{copied ? 'Copied!' : 'Copy'}</span>
        </button>

        <button
          type="button"
          onClick={handleSaveToHistory}
          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-[#1d7a5d]/30 dark:border-[#1d7a5d]/50 hover:bg-[#1d7a5d]/5 dark:hover:bg-[#1d7a5d]/10 text-xs font-semibold text-[#1d7a5d] dark:text-[#93d3b1] transition-colors cursor-pointer min-h-[44px]"
        >
          <BookmarkPlus className="w-4 h-4 text-[#1d7a5d] shrink-0" />
          <span className="truncate">Save History</span>
        </button>
      </div>

      {/* Main Download Section */}
      <div className="w-full pt-3.5 border-t border-slate-100 dark:border-slate-800">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
          <span>High-Resolution Formats</span>
          <span className="font-mono text-indigo-600 dark:text-indigo-400">
            {design.size}px
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {/* PNG */}
          <button
            type="button"
            onClick={() => handleDownload('png')}
            disabled={downloading !== null}
            className="primary-action flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-xs font-bold cursor-pointer min-h-[44px]"
          >
            <Download className="w-4 h-4 shrink-0" />
            <span className="truncate">PNG Image</span>
          </button>

          {/* SVG */}
          <button
            type="button"
            onClick={() => handleDownload('svg')}
            disabled={downloading !== null}
            className="flex items-center justify-center gap-1.5 py-3 px-3 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 min-h-[44px]"
          >
            <FileType className="w-4 h-4 text-indigo-500 shrink-0" />
            <span className="truncate">Vector SVG</span>
          </button>

          {/* JPEG */}
          <button
            type="button"
            onClick={() => handleDownload('jpeg')}
            disabled={downloading !== null}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer disabled:opacity-50 min-h-[44px]"
          >
            <FileImage className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="truncate">JPEG Photo</span>
          </button>

          {/* PDF */}
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={downloading !== null}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer disabled:opacity-50 min-h-[44px]"
          >
            <Maximize2 className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="truncate">Print PDF</span>
          </button>
        </div>
      </div>
    </div>
  );
};
