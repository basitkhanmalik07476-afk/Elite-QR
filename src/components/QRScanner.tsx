import React, { useState, useRef, useEffect, useCallback } from 'react';
import jsQR from 'jsqr';
import {
  Camera,
  Upload,
  RefreshCw,
  Flashlight,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  Wifi,
  Mail,
  Phone,
  Contact,
  MapPin,
  Sparkles,
  StopCircle,
} from 'lucide-react';
import { parseScannedData, ParsedScannedContent } from '../utils/qrPayloads';

interface QRScannerProps {
  onToast: (type: 'success' | 'error' | 'info', message: string) => void;
  onUseInGenerator?: (payload: string) => void;
}

export const QRScanner: React.FC<QRScannerProps> = ({ onToast, onUseInGenerator }) => {
  const [activeTab, setActiveTab] = useState<'camera' | 'upload'>('camera');
  const [scanning, setScanning] = useState(false);
  const [facingMode, setFacingMode] = useState<'environment' | 'user'>('environment');
  const [torchOn, setTorchOn] = useState(false);
  const [scannedResult, setScannedResult] = useState<string | null>(null);
  const [parsedResult, setParsedResult] = useState<ParsedScannedContent | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Stop camera stream safely
  const stopCamera = useCallback(() => {
    if (animationFrameId.current) {
      cancelAnimationFrame(animationFrameId.current);
      animationFrameId.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setScanning(false);
    setTorchOn(false);
  }, []);

  // Continuous frame scanning loop
  const scanFrame = useCallback(() => {
    if (!videoRef.current || !canvasRef.current || !scanning) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    if (video.readyState === video.HAVE_ENOUGH_DATA && ctx) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height, {
        inversionAttempts: 'dontInvert',
      });

      if (code && code.data) {
        // Scanned successfully!
        const raw = code.data;
        setScannedResult(raw);
        setParsedResult(parseScannedData(raw));
        stopCamera();
        onToast('success', 'QR Code successfully scanned!');
        return;
      }
    }

    if (scanning) {
      animationFrameId.current = requestAnimationFrame(scanFrame);
    }
  }, [scanning, stopCamera, onToast]);

  // Start Camera
  const startCamera = async () => {
    stopCamera();
    setCameraError(null);

    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera access is not supported by this browser.');
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: facingMode },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.setAttribute('playsinline', 'true');
        await videoRef.current.play();
        setScanning(true);
      }
    } catch (err: any) {
      console.warn('Camera error:', err);
      let msg = 'Could not access camera. Please verify camera permissions in your browser.';
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        msg = 'Camera permission was denied. Please allow camera access in browser site settings.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        msg = 'No camera device found on this system.';
      }
      setCameraError(msg);
      setScanning(false);
      onToast('error', msg);
    }
  };

  // Kick off frame loop when scanning starts
  useEffect(() => {
    if (scanning) {
      animationFrameId.current = requestAnimationFrame(scanFrame);
    }
    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [scanning, scanFrame]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  // Switch camera front/rear
  const handleSwitchCamera = () => {
    const next = facingMode === 'environment' ? 'user' : 'environment';
    setFacingMode(next);
    if (scanning) {
      setTimeout(() => startCamera(), 100);
    }
  };

  // Torch toggle (if supported by browser/device)
  const handleToggleTorch = async () => {
    if (!streamRef.current) return;
    const track = streamRef.current.getVideoTracks()[0];
    if (track && (track.getCapabilities as any)?.()?.torch) {
      try {
        await (track as any).applyConstraints({
          advanced: [{ torch: !torchOn }],
        });
        setTorchOn(!torchOn);
      } catch {
        onToast('info', 'Torch not supported on this device');
      }
    } else {
      onToast('info', 'Torch control is not supported on this camera device');
    }
  };

  // Decode from file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target?.result as string;
      setImagePreview(dataUrl);

      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;
        ctx.drawImage(img, 0, 0);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code && code.data) {
          setScannedResult(code.data);
          setParsedResult(parseScannedData(code.data));
          onToast('success', 'QR Code image decoded successfully!');
        } else {
          onToast('error', 'No QR code detected in the uploaded image. Try an image with higher contrast or clear focus.');
        }
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  // Copy scanned content
  const handleCopyScanned = async (textToCopy?: string) => {
    const target = textToCopy || scannedResult;
    if (!target) return;
    try {
      await navigator.clipboard.writeText(target);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onToast('success', 'Copied to clipboard!');
    } catch {
      onToast('error', 'Failed to copy to clipboard.');
    }
  };

  return (
    <section id="scanner" className="py-16 md:py-24 bg-slate-100/60 dark:bg-slate-900/40 relative border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            <span>High-Speed Optical Decoder</span>
            <span aria-hidden="true">·</span>
            <span>Zero Upload to Cloud</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Universal QR Code Scanner
          </h2>
          <p className="mt-2 text-base text-slate-600 dark:text-slate-300">
            Scan live using your device camera or upload an image file to decode instantly.
          </p>
        </div>

        {/* Scanner Card */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          {/* Scanner Mode Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800">
            <button
              onClick={() => {
                setActiveTab('camera');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'camera'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/30 dark:bg-indigo-950/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Camera className="w-4 h-4" />
              <span>Camera Live Scan</span>
            </button>
            <button
              onClick={() => {
                stopCamera();
                setActiveTab('upload');
              }}
              className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-4 text-xs sm:text-sm font-semibold transition-colors cursor-pointer ${
                activeTab === 'upload'
                  ? 'border-b-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 bg-indigo-50/30 dark:bg-indigo-950/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload Image File</span>
            </button>
          </div>

          <div className="p-4 sm:p-6 lg:p-8">
            {/* TAB 1: Camera Scanner */}
            {activeTab === 'camera' && (
              <div className="flex flex-col items-center w-full">
                <div className="relative w-full max-w-sm sm:max-w-md aspect-square bg-slate-950 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-800 shadow-inner">
                  {/* Video Viewport */}
                  <video
                    ref={videoRef}
                    className={`w-full h-full object-cover ${scanning ? 'block' : 'hidden'}`}
                    muted
                  />
                  {/* Invisible canvas for reading frame data */}
                  <canvas ref={canvasRef} className="hidden" />

                  {/* Laser scan animation when actively scanning */}
                  {scanning && (
                    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-10">
                      {/* Targeting Reticle Corners */}
                      <div className="w-full h-full border-2 border-indigo-400/40 rounded-2xl relative">
                        <div className="absolute -top-1 -left-1 w-6 h-6 border-t-4 border-l-4 border-indigo-400 rounded-tl-lg" />
                        <div className="absolute -top-1 -right-1 w-6 h-6 border-t-4 border-r-4 border-indigo-400 rounded-tr-lg" />
                        <div className="absolute -bottom-1 -left-1 w-6 h-6 border-b-4 border-l-4 border-indigo-400 rounded-bl-lg" />
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 border-b-4 border-r-4 border-indigo-400 rounded-br-lg" />
                        {/* Scanning Laser */}
                        <div className="absolute inset-x-2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-md shadow-cyan-400 animate-scan" />
                      </div>
                    </div>
                  )}

                  {/* Idle Camera Placeholder */}
                  {!scanning && (
                    <div className="flex flex-col items-center text-center p-4 sm:p-6 text-slate-400 w-full">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 sm:mb-4 text-indigo-400 shadow-lg">
                        <Camera className="w-7 h-7 sm:w-8 sm:h-8" />
                      </div>
                      <p className="text-sm font-semibold text-slate-200 mb-1">Camera is currently idle</p>
                      <p className="text-xs text-slate-400 max-w-xs mb-4 sm:mb-5">
                        Tap below to grant camera access and align any QR code within the frame.
                      </p>
                      <button
                        type="button"
                        onClick={startCamera}
                        className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 shadow-lg shadow-indigo-500/20 text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer min-h-[46px]"
                      >
                        <Camera className="w-4 h-4" />
                        <span>Start Camera Scanner</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Camera Controls when running */}
                {scanning && (
                  <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mt-4 w-full">
                    <button
                      type="button"
                      onClick={stopCamera}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900 text-xs font-semibold cursor-pointer min-h-[44px]"
                    >
                      <StopCircle className="w-4 h-4 shrink-0" />
                      <span>Stop Camera</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleSwitchCamera}
                      className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 text-xs font-semibold cursor-pointer min-h-[44px]"
                    >
                      <RefreshCw className="w-3.5 h-3.5 shrink-0" />
                      <span>Flip ({facingMode === 'environment' ? 'Rear' : 'Front'})</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleToggleTorch}
                      className={`flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold cursor-pointer border min-h-[44px] ${
                        torchOn
                          ? 'bg-amber-100 dark:bg-amber-950 text-amber-600 border-amber-300'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <Flashlight className="w-3.5 h-3.5 shrink-0" />
                      <span>Torch {torchOn ? 'ON' : 'OFF'}</span>
                    </button>
                  </div>
                )}

                {/* Camera error notification */}
                {cameraError && (
                  <div className="mt-4 flex items-center gap-2 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 max-w-md w-full">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{cameraError}</span>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: Image File Upload Scanner */}
            {activeTab === 'upload' && (
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/png, image/jpeg, image/jpg, image/webp"
                  className="hidden"
                />

                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full max-w-md aspect-video sm:aspect-square bg-slate-50 dark:bg-slate-950/40 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-indigo-500 dark:hover:border-indigo-400 rounded-2xl flex flex-col items-center justify-center p-6 text-center cursor-pointer transition-colors"
                >
                  {imagePreview ? (
                    <div className="space-y-3 flex flex-col items-center">
                      <img
                        src={imagePreview}
                        alt="Uploaded QR Preview"
                        className="max-h-48 rounded-lg shadow-sm object-contain"
                      />
                      <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold underline">
                        Choose a different image
                      </span>
                    </div>
                  ) : (
                    <>
                      <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-3">
                        <Upload className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-1">
                        Click to browse or drag & drop image
                      </p>
                      <p className="text-xs text-slate-500">Supports PNG, JPG, JPEG, WebP</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {/* SCANNED RESULT DISPLAY */}
            {scannedResult && (
              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 animate-in fade-in slide-in-from-bottom-2">
                <div className="p-5 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200/80 dark:border-indigo-900/60">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-indigo-100 dark:border-indigo-900/50">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                      <span className="text-xs font-bold uppercase tracking-wider text-indigo-950 dark:text-indigo-300">
                        Decoded Content
                      </span>
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300">
                      Type: {parsedResult?.type.toUpperCase() || 'RAW'}
                    </span>
                  </div>

                  {/* Primary text content */}
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-slate-900 dark:text-white break-all">
                      {parsedResult?.title || scannedResult}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono break-all mt-1 bg-white/70 dark:bg-slate-900/70 p-2.5 rounded-lg border border-slate-200/60 dark:border-slate-800">
                      {scannedResult}
                    </p>
                  </div>

                  {/* Parsed key-value details (e.g. for Wi-Fi or vCard) */}
                  {parsedResult?.details && (
                    <div className="grid sm:grid-cols-2 gap-2 mb-4 text-xs bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800">
                      {Object.entries(parsedResult.details).map(([key, val]) => (
                        <div key={key} className="flex items-center justify-between py-1 border-b sm:border-b-0 border-slate-100 dark:border-slate-800">
                          <span className="text-slate-500 font-medium">{key}:</span>
                          <span className="text-slate-900 dark:text-white font-mono font-semibold">{val}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Action buttons */}
                  <div className="flex flex-wrap items-center gap-2.5 pt-2">
                    {/* Copy to clipboard */}
                    <button
                      type="button"
                      onClick={() => handleCopyScanned()}
                      className="flex items-center gap-2 py-2 px-3.5 rounded-xl text-xs font-semibold bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                    >
                      {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                      <span>{copied ? 'Copied!' : 'Copy Content'}</span>
                    </button>

                    {/* Open action link if available */}
                    {parsedResult?.actionUrl && (
                      <a
                        href={parsedResult.actionUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-500 text-white shadow-sm transition-colors cursor-pointer"
                      >
                        <ExternalLink className="w-4 h-4" />
                        <span>{parsedResult.actionLabel || 'Open Link'}</span>
                      </a>
                    )}

                    {/* Copy Wi-Fi password specifically */}
                    {parsedResult?.type === 'wifi' && parsedResult.details?.Password && (
                      <button
                        type="button"
                        onClick={() => handleCopyScanned(parsedResult.details?.Password)}
                        className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-semibold bg-cyan-600 hover:bg-cyan-500 text-white cursor-pointer"
                      >
                        <Wifi className="w-4 h-4" />
                        <span>Copy Wi-Fi Password</span>
                      </button>
                    )}

                    {parsedResult?.type === 'payment' && parsedResult.details?.['Account / Payment ID'] && (
                      <button
                        type="button"
                        onClick={() => handleCopyScanned(parsedResult.details?.['Account / Payment ID'])}
                        className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white cursor-pointer"
                      >
                        <Copy className="w-4 h-4" />
                        <span>Copy Account / Payment ID</span>
                      </button>
                    )}

                    {/* Load into QR Generator */}
                    {onUseInGenerator && (
                      <button
                        type="button"
                        onClick={() => onUseInGenerator(scannedResult)}
                        className="flex items-center gap-1.5 py-2 px-3.5 rounded-xl text-xs font-semibold bg-slate-800 dark:bg-slate-700 hover:bg-slate-700 text-white cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span>Load into Generator</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
