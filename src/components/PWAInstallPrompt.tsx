import React, { useEffect, useState } from "react";
import { Download, Smartphone, X, Check, Share, PlusSquare, ArrowUpRight } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export const PWAInstallPrompt: React.FC<{ mini?: boolean }> = ({ mini = false }) => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(false);
  const [isIOS, setIsIOS] = useState<boolean>(false);
  const [showIOSModal, setShowIOSModal] = useState<boolean>(false);
  const [isDismissed, setIsDismissed] = useState<boolean>(false);

  useEffect(() => {
    // Check if already installed as standalone
    if (window.matchMedia("(display-mode: standalone)").matches || (window.navigator as any).standalone === true) {
      setIsInstalled(true);
      return;
    }

    // Detect iOS
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice = /iphone|ipad|ipod/.test(userAgent);
    setIsIOS(isIosDevice);

    // Listen for beforeinstallprompt (Android / Chrome)
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    // Check if app was installed
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const choice = await deferredPrompt.userChoice;
      if (choice.outcome === "accepted") {
        setIsInstalled(true);
      }
      setDeferredPrompt(null);
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Fallback for browsers that don't support beforeinstallprompt
      setShowIOSModal(true);
    }
  };

  if (isInstalled || isDismissed) return null;

  if (mini) {
    return (
      <>
        <button
          onClick={handleInstallClick}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-black transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
          title="NCJ MOCK TEST APP इन्स्टॉल करा"
        >
          <img
            src="/ncj-logo.png"
            alt="NCJ Logo"
            referrerPolicy="no-referrer"
            className="w-4 h-4 rounded-md object-cover ring-1 ring-amber-400/60"
          />
          <Download className="w-3.5 h-3.5 text-amber-400 animate-bounce" />
          <span>NCJ ॲप इन्स्टॉल करा</span>
        </button>

        {showIOSModal && (
          <IOSInstallModal onClose={() => setShowIOSModal(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/70 border-2 border-amber-500/40 text-white rounded-2xl p-3.5 sm:p-4 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3.5 relative z-30">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-12 h-12 rounded-2xl ring-2 ring-amber-400/80 shadow-lg shadow-amber-500/20 overflow-hidden shrink-0 bg-slate-950 flex items-center justify-center">
            <img
              src="/ncj-logo.png"
              alt="NCJ MOCK TEST APP"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-black text-xs sm:text-sm text-amber-300 tracking-wide">
                NCJ MOCK TEST APP
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/30 text-[10px] font-black text-amber-200">
                Official PWA
              </span>
            </div>
            <p className="text-[11px] text-slate-200 mt-0.5 font-medium">
              डाऊनलोड केल्यावर फोनवर <strong>'NCJ MOCK TEST APP'</strong> नावाने सेव्ह होईल.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleInstallClick}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/30 transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-4 h-4 text-slate-950" />
            <span>ॲप डाऊनलोड करा (Install)</span>
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-2.5 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {showIOSModal && (
        <IOSInstallModal onClose={() => setShowIOSModal(false)} />
      )}
    </>
  );
};

const IOSInstallModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-amber-500/60 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-white">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl overflow-hidden ring-2 ring-amber-400 shrink-0">
              <img
                src="/ncj-logo.png"
                alt="NCJ MOCK TEST APP"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-black text-sm text-white">NCJ MOCK TEST APP</h3>
              <p className="text-[10px] text-amber-300 font-bold">मोबाईलवर सेव्ह करा</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-slate-300">
          <p className="font-bold text-amber-300">iPhone / iPad (Safari) साठी सोप्या २ स्टेप्स:</p>
          
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-black text-xs">
              1
            </div>
            <div>
              <p className="font-bold text-white flex items-center gap-1">
                Safari ब्राऊझरमध्ये खालील <Share className="w-3.5 h-3.5 text-amber-400 inline" /> (Share) आयकॉन दाबा.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="w-6 h-6 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 font-black text-xs">
              2
            </div>
            <div>
              <p className="font-bold text-white flex items-center gap-1">
                खाली स्क्रोल करून <PlusSquare className="w-3.5 h-3.5 text-amber-400 inline" /> <strong>"Add to Home Screen"</strong> निवडा.
              </p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center gap-2.5">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>स्क्रीनवर <strong>"NCJ MOCK TEST APP"</strong> या नावाने व नवीन लोगोसह ॲप सेव्ह होईल!</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 font-black text-xs transition-all cursor-pointer shadow-md"
        >
          समजले (Got it)
        </button>
      </div>
    </div>
  );
};
