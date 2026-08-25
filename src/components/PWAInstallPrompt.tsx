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
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-300 border border-teal-400/40 text-xs font-black transition-all cursor-pointer hover:scale-105 active:scale-95 shadow-sm"
          title="Install as Android / iOS App"
        >
          <Download className="w-3.5 h-3.5 text-teal-400 animate-bounce" />
          <span>App इन्स्टॉल करा</span>
        </button>

        {showIOSModal && (
          <IOSInstallModal onClose={() => setShowIOSModal(false)} />
        )}
      </>
    );
  }

  return (
    <>
      <div className="bg-linear-to-r from-teal-900/90 via-slate-900/95 to-indigo-900/90 border border-teal-500/40 text-white rounded-2xl p-3.5 sm:p-4 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3 relative z-30">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-teal-400 to-indigo-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-teal-500/20">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-black text-xs sm:text-sm text-white">
                मोबाईल ॲप म्हणून वापरा (Add to Home Screen)
              </h4>
              <span className="px-2 py-0.5 rounded-full bg-teal-500/20 border border-teal-400/30 text-[10px] font-bold text-teal-300">
                PWA Fast
              </span>
            </div>
            <p className="text-[11px] text-slate-300">
              नेटिव्ह ॲपप्रमाणे फुलस्क्रीन सराव आणि वेगवान लोड टाईम मिळवा.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={handleInstallClick}
            className="flex-1 sm:flex-none px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 shadow-md shadow-teal-500/30 transition-all cursor-pointer active:scale-95"
          >
            <Download className="w-3.5 h-3.5" />
            <span>इन्स्टॉल करा (Install)</span>
          </button>
          <button
            onClick={() => setIsDismissed(true)}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
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
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border-2 border-teal-500/50 rounded-3xl p-6 max-w-sm w-full space-y-4 shadow-2xl text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-teal-400" />
            <h3 className="font-black text-sm text-white">ॲप मोबाईलवर इन्स्टॉल करा</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 text-xs text-slate-300">
          <p className="font-bold text-teal-300">iPhone / iPad (Safari) साठी सोप्या २ स्टेप्स:</p>
          
          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 font-black text-xs">
              1
            </div>
            <div>
              <p className="font-bold text-white flex items-center gap-1">
                Safari ब्राऊझरमध्ये खालील <Share className="w-3.5 h-3.5 text-teal-400 inline" /> (Share) आयकॉन दाबा.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0 font-black text-xs">
              2
            </div>
            <div>
              <p className="font-bold text-white flex items-center gap-1">
                खाली स्क्रोल करून <PlusSquare className="w-3.5 h-3.5 text-teal-400 inline" /> <strong>"Add to Home Screen"</strong> निवडा.
              </p>
            </div>
          </div>

          <div className="p-2.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-[11px] flex items-center gap-2">
            <Check className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>यानंतर हे ॲप तुमच्या मोबाईल होम स्क्रीनवर ॲप आयकॉनसह दिसेल!</span>
          </div>
        </div>

        <button
          onClick={onClose}
          className="w-full py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-black text-xs transition-all cursor-pointer"
        >
          समजले (Got it)
        </button>
      </div>
    </div>
  );
};
