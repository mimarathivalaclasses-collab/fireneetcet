import React, { useEffect, useState } from "react";
import { ShieldAlert, Lock, Smartphone } from "lucide-react";
import { StudentUser } from "../types";

interface SecurityWatermarkProps {
  currentUser: StudentUser | null;
  deviceId: string;
}

export const SecurityWatermark: React.FC<SecurityWatermarkProps> = ({
  currentUser,
  deviceId,
}) => {
  const [showSecurityWarning, setShowSecurityWarning] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>("");

  useEffect(() => {
    // 1. Prevent Right Click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      triggerWarning("⚠️ सुरक्षित सामग्री: स्क्रीनशॉट किंवा कॉपी करण्यास मनाई आहे.");
    };

    // 2. Detect Screenshot and Print keyboard shortcuts
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen key
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        e.preventDefault();
        triggerWarning("⚠️ स्क्रीनशॉट प्रतिबंधित आहे (Screenshot Prohibited).");
      }
      // Ctrl+P / Cmd+P (Print)
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        // Let it handle inside our dedicated PDF buttons, but block raw browser print if needed
      }
      // Ctrl+Shift+S, Win+Shift+S, Cmd+Shift+3/4
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === "s" || e.key === "S" || e.key === "3" || e.key === "4")
      ) {
        triggerWarning("⚠️ स्क्रीन कॅप्चर प्रतिबंधित आहे.");
      }
    };

    // 3. Visibility change / Tab blur protection
    const handleVisibilityChange = () => {
      if (document.hidden) {
        // App went to background
      }
    };

    const triggerWarning = (msg: string) => {
      setWarningMessage(msg);
      setShowSecurityWarning(true);
      setTimeout(() => {
        setShowSecurityWarning(false);
      }, 3500);
    };

    document.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keyup", handleKeyDown);
    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keyup", handleKeyDown);
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  const watermarkText = currentUser
    ? `${currentUser.name} • ${currentUser.mobile} • ${currentUser.examTarget} • ${deviceId.slice(-6)}`
    : `MIMARATHIVALA EXAM PREP • ${deviceId.slice(-8)} • PROTECTED`;

  return (
    <>
      {/* Floating subtle watermark for anti-leak protection */}
      <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden select-none opacity-[0.06] flex flex-wrap items-center justify-around gap-20 p-8">
        {Array.from({ length: 12 }).map((_, idx) => (
          <div
            key={idx}
            className="transform -rotate-25 text-xs sm:text-sm font-extrabold text-slate-900 tracking-wider font-mono whitespace-nowrap"
          >
            {watermarkText}
          </div>
        ))}
      </div>

      {/* Security alert toast if screenshot attempt is detected */}
      {showSecurityWarning && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-slate-900/95 backdrop-blur-md text-white border-2 border-red-500/80 px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 animate-pulse" />
            <div className="text-xs font-bold">{warningMessage}</div>
          </div>
        </div>
      )}
    </>
  );
};
