import React, { useState, useEffect } from "react";
import { Wifi, WifiOff, CheckCircle2 } from "lucide-react";
import { triggerHaptic } from "../utils/haptics";

export const NetworkStatusPill: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(() => {
    return typeof navigator !== "undefined" ? navigator.onLine : true;
  });
  const [showReconnectedBanner, setShowReconnectedBanner] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setShowReconnectedBanner(true);
      triggerHaptic("success");
      const timer = setTimeout(() => {
        setShowReconnectedBanner(false);
      }, 4000);
      return () => clearTimeout(timer);
    };

    const handleOffline = () => {
      setIsOnline(false);
      triggerHaptic("warning");
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline && !showReconnectedBanner) {
    return null;
  }

  return (
    <aside
      aria-label="Network Status Announcement"
      className="fixed top-14 sm:top-16 inset-x-0 z-50 flex justify-center px-4 pointer-events-none transition-all duration-300 animate-in fade-in slide-in-from-top-2"
    >
      <div
        className={`pointer-events-auto flex items-center gap-2.5 px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-md border ${
          isOnline
            ? "bg-emerald-500/95 text-white border-emerald-400"
            : "bg-rose-600/95 text-white border-rose-400 animate-pulse"
        }`}
      >
        {isOnline ? (
          <>
            <Wifi className="w-3.5 h-3.5" />
            <span>इंटरनेट परत सुरू झाले (Online)</span>
            <CheckCircle2 className="w-3.5 h-3.5 ml-1" />
          </>
        ) : (
          <>
            <WifiOff className="w-3.5 h-3.5" />
            <span>ऑफलाइन मोड (Offline) - सेव्ह केलेला सराव व नोट्स उपलब्ध</span>
          </>
        )}
      </div>
    </aside>
  );
};
