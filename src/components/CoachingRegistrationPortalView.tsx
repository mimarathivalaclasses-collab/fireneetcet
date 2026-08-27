import React, { useState, useEffect } from "react";
import {
  Building2,
  CheckCircle2,
  Clock,
  Zap,
  ShieldCheck,
  Phone,
  MessageSquare,
  Copy,
  Lock,
  ArrowRight,
  ArrowLeft,
  KeyRound,
  AlertTriangle,
  Send,
  Sparkles,
  Users,
  FileSpreadsheet,
} from "lucide-react";
import { InstituteProfile, LanguageMode, CoachingRegistrationApplication } from "../types";
import { getAllInstitutes, saveAllInstitutes } from "../data/coachingInstitutesData";

interface CoachingRegistrationPortalViewProps {
  language: LanguageMode;
  onBack?: () => void;
  onOpenPortal: () => void;
  onSelectInstitute: (institute: InstituteProfile) => void;
  onOpenAdminDashboard?: () => void;
}

const STORAGE_COACHING_APPS = "mcq_app_coaching_registration_apps_v1";

export const CoachingRegistrationPortalView: React.FC<CoachingRegistrationPortalViewProps> = ({
  language,
  onBack,
  onOpenPortal,
  onSelectInstitute,
  onOpenAdminDashboard,
}) => {
  const UPI_ID = "9307220454@yz";
  const ADMIN_PHONE = "9307220454";

  // Form Fields
  const [instName, setInstName] = useState("");
  const [instNameMr, setInstNameMr] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [contactMobile, setContactMobile] = useState("");
  const [city, setCity] = useState("");
  const [desiredCode, setDesiredCode] = useState("");
  const [adminPasscode, setAdminPasscode] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"30_min_trial" | "annual_499">("annual_499");

  // Active Pending Application State
  const [activeApp, setActiveApp] = useState<CoachingRegistrationApplication | null>(() => {
    try {
      const raw = localStorage.getItem(STORAGE_COACHING_APPS);
      if (raw) {
        const list: CoachingRegistrationApplication[] = JSON.parse(raw);
        if (list.length > 0) {
          // Return the latest pending or active application
          return list[list.length - 1];
        }
      }
    } catch (e) {
      console.error("Error reading coaching apps", e);
    }
    return null;
  });

  // 30-Minute Timer Logic
  const [secondsRemaining, setSecondsRemaining] = useState<number>(() => {
    if (activeApp && activeApp.status !== "approved") {
      const diff = Math.floor((activeApp.timerExpiresAt - Date.now()) / 1000);
      return diff > 0 ? diff : 0;
    }
    return 1800; // 30 mins = 1800s
  });

  // UTR submission
  const [utrInput, setUtrInput] = useState("");
  const [utrSubmitted, setUtrSubmitted] = useState(false);

  // Countdown effect
  useEffect(() => {
    if (!activeApp || activeApp.status === "approved") return;

    const timer = setInterval(() => {
      const diff = Math.floor((activeApp.timerExpiresAt - Date.now()) / 1000);
      if (diff <= 0) {
        setSecondsRemaining(0);
        clearInterval(timer);
      } else {
        setSecondsRemaining(diff);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [activeApp]);

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instName.trim() || !directorName.trim() || !contactMobile.trim()) {
      alert("कृपया क्लासेसचे नाव, संचालकांचे नाव आणि मोबाईल नंबर भरा.");
      return;
    }

    if (contactMobile.trim().length < 10) {
      alert("कृपया वैध १० अंकी WhatsApp मोबाईल नंबर टाका.");
      return;
    }

    const cleanCode =
      desiredCode.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10) ||
      instName.trim().toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 8) ||
      `CLS${Math.floor(1000 + Math.random() * 9000)}`;

    const newApp: CoachingRegistrationApplication = {
      id: `coach_app_${Date.now()}`,
      instituteName: instName.trim(),
      instituteNameMr: instNameMr.trim() || instName.trim(),
      directorName: directorName.trim(),
      contactNumber: contactMobile.trim(),
      city: city.trim() || "महाराष्ट्र",
      desiredCode: cleanCode,
      adminPasscode: adminPasscode.trim() || "class2026",
      selectedPlan,
      isPaid: selectedPlan === "30_min_trial",
      isApproved: false,
      status: selectedPlan === "30_min_trial" ? "pending_approval" : "pending_payment",
      appliedAt: Date.now(),
      timerExpiresAt: Date.now() + 30 * 60 * 1000, // 30 minutes
    };

    try {
      const raw = localStorage.getItem(STORAGE_COACHING_APPS);
      const list: CoachingRegistrationApplication[] = raw ? JSON.parse(raw) : [];
      list.push(newApp);
      localStorage.setItem(STORAGE_COACHING_APPS, JSON.stringify(list));
    } catch (e) {
      console.error("Error saving coaching app", e);
    }

    setActiveApp(newApp);
    setSecondsRemaining(1800);
  };

  const handleSubmitUtr = (e: React.FormEvent) => {
    e.preventDefault();
    if (!utrInput.trim() || utrInput.trim().length < 6) {
      alert("कृपया १२ अंकी वैध UTR / Transaction ID टाका.");
      return;
    }

    if (activeApp) {
      const updatedApp: CoachingRegistrationApplication = {
        ...activeApp,
        paymentUtr: utrInput.trim(),
        status: "pending_approval",
        isPaid: true,
      };

      try {
        const raw = localStorage.getItem(STORAGE_COACHING_APPS);
        const list: CoachingRegistrationApplication[] = raw ? JSON.parse(raw) : [];
        const idx = list.findIndex((a) => a.id === activeApp.id);
        if (idx >= 0) list[idx] = updatedApp;
        else list.push(updatedApp);
        localStorage.setItem(STORAGE_COACHING_APPS, JSON.stringify(list));
      } catch (e) {
        console.error("Error updating UTR", e);
      }

      setActiveApp(updatedApp);
      setUtrSubmitted(true);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-16 px-3 sm:px-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/20 mb-2"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                <span>← मुख्य पानावर जा</span>
              </button>
            )}

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black border border-purple-400/30">
              <Building2 className="w-3.5 h-3.5 text-amber-300" />
              <span>Coaching Class Admin Sign-Up · 30-Min Approval Window</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              कोचिंग क्लासेस नोंदणी व ॲडमिन पोर्टल
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              आपल्या क्लासच्या नावाने व लोगोसह ऑनलाईन CBT टेस्ट सिस्टीम सुरू करा. २००० विद्यार्थी क्षमता, स्वतःच्या टेस्ट्स आणि पालकांसाठी इन्स्टंट रिपोर्ट.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={onOpenPortal}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 fill-slate-950" />
              <span>क्लासेस पोर्टल उघडा</span>
            </button>
            {onOpenAdminDashboard && (
              <button
                onClick={onOpenAdminDashboard}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <KeyRound className="w-3.5 h-3.5 text-amber-300" />
                <span>मास्टर ॲडमिन डॅशबोर्ड</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ACTIVE PENDING APPLICATION GATE WITH 30-MIN TIMER */}
      {activeApp && activeApp.status !== "approved" ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl space-y-6 animate-in fade-in">
          {/* Status Bar */}
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shadow-md animate-pulse">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase bg-amber-200 text-amber-900 border border-amber-300">
                  खाते मंजुरी प्रलंबित (Pending Admin Approval)
                </span>
                <h3 className="text-base font-black text-slate-900 mt-0.5">
                  {activeApp.instituteName} ({activeApp.desiredCode})
                </h3>
                <p className="text-xs text-slate-600">
                  संचालक: {activeApp.directorName} · मोबाईल: <strong>{activeApp.contactNumber}</strong>
                </p>
              </div>
            </div>

            {/* 30-Minute Countdown Clock */}
            <div className="bg-slate-900 text-white px-5 py-3 rounded-2xl text-center min-w-[150px] shadow-md border border-slate-800">
              <div className="text-[10px] uppercase font-bold text-amber-400">
                {secondsRemaining > 0 ? "३० मिनिटे पडताळणी वेळ" : "वेळ समाप्त - मॅन्युअल अप्रूव्हल आवश्यक"}
              </div>
              <div className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white">
                {formatTimer(secondsRemaining)}
              </div>
            </div>
          </div>

          {/* Block Notice if 30 min window passes */}
          {secondsRemaining === 0 ? (
            <div className="p-4 rounded-2xl bg-rose-50 border-2 border-rose-300 space-y-2">
              <div className="flex items-center gap-2 text-rose-900 font-black text-sm">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
                <span>३० मिनिटांचा ऑटो-व्हेरिफिकेशन कालावधी समाप्त झाला आहे!</span>
              </div>
              <p className="text-xs text-rose-800 leading-relaxed">
                पेमेंट कन्फर्मेशन वेळेत न आल्याने खाते सुरक्षिततेसाठी <strong>ब्लॉक स्थितीत</strong> ठेवण्यात आले आहे. खाते तात्काळ सक्रिय (Unblock & Activate) करण्यासाठी कृपया खालील बटणावरून ॲडमिनशी WhatsApp वर संपर्क साधा.
              </p>
            </div>
          ) : (
            <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-950 space-y-1.5">
              <div className="font-bold flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>३० मिनिटांत खाते सक्रिय होण्याची प्रक्रिया:</span>
              </div>
              <p className="text-slate-600 leading-relaxed">
                आपली नोंदणी ॲडमिनकडे पडताळणीसाठी पाठवली आहे. आपण ₹४९९ पेमेंट केले असल्यास खाली UTR क्रमांक प्रविष्ट करा, ज्यामुळे आपले खाते तात्काळ मंजूर केले जाईल.
              </p>
            </div>
          )}

          {/* Payment & UTR Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* UPI QR & Payment Info */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-800">१. अधिकृत फी पेमेंट (₹४९९/वर्ष):</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-black">
                  ४०% Referral Eligible
                </span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 text-center">
                <div className="text-[11px] text-slate-500 font-bold">अधिकृत क्लासेस UPI ID:</div>
                <div className="text-sm font-black font-mono text-slate-900 bg-slate-100 py-1 px-3 rounded-lg select-all">
                  {UPI_ID}
                </div>
                <div className="text-[10px] text-slate-400">GPay / PhonePe / Paytm वरून पाठवा</div>
              </div>
            </div>

            {/* UTR Submit */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-xs font-black text-slate-800 block">२. UTR / Ref No प्रविष्ट करा:</span>
              {!utrSubmitted ? (
                <form onSubmit={handleSubmitUtr} className="space-y-2">
                  <input
                    type="text"
                    placeholder="12 अंकी UTR / Transaction ID"
                    value={utrInput}
                    onChange={(e) => setUtrInput(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 font-mono font-bold text-xs outline-none focus:ring-2 focus:ring-purple-600 bg-white"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>UTR सबमिट करा</span>
                  </button>
                </form>
              ) : (
                <div className="p-3 bg-emerald-100 rounded-xl border border-emerald-300 text-xs font-bold text-emerald-950 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>UTR ({utrInput}) प्राप्त झाले. ॲडमिन पडताळणी करत आहेत.</span>
                </div>
              )}
            </div>
          </div>

          {/* WhatsApp Admin Support Button */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={`https://wa.me/91${ADMIN_PHONE}?text=${encodeURIComponent(
                `नमस्कार ॲडमिन, मी ${activeApp.directorName} (${activeApp.instituteName} - कोड: ${activeApp.desiredCode}). क्लासेस नोंदणी केली आहे. कृपया खाते अप्रूव्ह व ॲक्टिव्हेट करा.`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="flex-1 w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>ॲडमिनला WhatsApp करा (९३०७२२०४५४ - तात्काळ सक्रियतेसाठी)</span>
            </a>

            <button
              onClick={() => setActiveApp(null)}
              className="px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
            >
              नवीन फॉर्म भरा
            </button>
          </div>

          {/* Strict Admin Approval Policy Notice */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-1">
            <div className="font-bold flex items-center gap-1.5 text-slate-900">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>सुरक्षा व मंजुरी धोरण (Strict Admin Approval Policy):</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              क्लासेस नोंदणी व पोर्टल सक्रियता ही फक्त आणि फक्त <strong>मुख्य ॲडमिनद्वारे (Master Admin)</strong> पडताळणीनंतर केली जाते. कोणत्याही तात्पुरत्या किंवा अनधिकृत पद्धतीद्वारे खाते सक्रिय केले जात नाही.
            </p>
          </div>
        </div>
      ) : activeApp && activeApp.status === "approved" ? (
        /* APPROVED SUCCESS SCREEN */
        <div className="p-8 rounded-3xl bg-emerald-50 border-2 border-emerald-300 shadow-xl space-y-5 animate-in fade-in text-center">
          <div className="w-16 h-16 rounded-3xl bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-200 text-emerald-950 uppercase tracking-wider">
              सक्रिय क्लासेस खाते (Active Approved Institute)
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 pt-2">
              अभिनंदन! {activeApp.instituteName} चे पोर्टल सक्रिय झाले आहे!
            </h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto">
              इन्स्टिट्यूट कोड: <strong className="font-mono text-emerald-800">{activeApp.desiredCode}</strong> · ॲडमिन पासवर्ड: <strong className="font-mono text-emerald-800">{activeApp.adminPasscode}</strong>
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={onOpenPortal}
              className="px-6 py-3.5 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <Building2 className="w-4 h-4" />
              <span>क्लासेस ॲडमिन डॅशबोर्ड उघडा</span>
            </button>
            <button
              onClick={() => {
                const link = `${window.location.origin}${window.location.pathname}?class=${activeApp.desiredCode}`;
                navigator.clipboard.writeText(link);
                alert(`विद्यार्थी थेट लिंक कॉपी झाली:\n${link}`);
              }}
              className="px-5 py-3.5 rounded-2xl bg-white border border-emerald-300 text-emerald-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
            >
              <Copy className="w-4 h-4 text-emerald-700" />
              <span>विद्यार्थी डायरेक्ट लिंक कॉपी करा</span>
            </button>
          </div>
        </div>
      ) : (
        /* REGISTRATION FORM */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xl space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-xl font-black text-slate-900">
              नवीन क्लासेस नोंदणी फॉर्म (Class Registration)
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              नोंदणी केल्यानंतर ३० मिनिटांची पडताळणी विंडो सुरू होईल. पेमेंट पडताळणीनंतर खाते पूर्ण सक्रिय होईल.
            </p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Plan Choice */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setSelectedPlan("annual_499")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between ${
                  selectedPlan === "annual_499"
                    ? "border-purple-600 bg-purple-50/70 shadow-xs"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-slate-900">वार्षिक प्रो प्लॅन</span>
                    <span className="px-2 py-0.5 rounded-full bg-purple-600 text-white text-[9px] font-black uppercase">
                      Recommended
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    पूर्ण १ वर्ष अमर्यादित विद्यार्थी, टेस्ट्स व व्हाईट-लेबल ब्रँडिंग
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-purple-900 font-mono-numbers">₹४९९</div>
                  <div className="text-[10px] text-slate-400">/ वर्ष</div>
                </div>
              </label>

              <label
                onClick={() => setSelectedPlan("30_min_trial")}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start justify-between ${
                  selectedPlan === "30_min_trial"
                    ? "border-purple-600 bg-purple-50/70 shadow-xs"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-black text-sm text-slate-900">३० मिनिटे फ्री ट्रायल</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-black uppercase">
                      Free Trial
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    कोणतेही शुल्क नाही, तात्काळ टेस्ट सिस्टीम डेमो तपासा
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-emerald-700">मोफत</div>
                  <div className="text-[10px] text-slate-400">30 Mins</div>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  क्लासेसचे नाव (English): *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. Royal Science Academy"
                  value={instName}
                  onChange={(e) => setInstName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-purple-600 font-bold text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  क्लासेसचे नाव (मराठीत):
                </label>
                <input
                  type="text"
                  placeholder="उदा. रॉयल सायन्स अकॅडमी"
                  value={instNameMr}
                  onChange={(e) => setInstNameMr(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-purple-600 font-bold text-xs outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  संचालकांचे नाव (Director Name): *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. प्रा. आर. के. पाटील सर"
                  value={directorName}
                  onChange={(e) => setDirectorName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-purple-600 font-bold text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  मोबाईल नंबर (WhatsApp): *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="१० अंकी नंबर"
                  value={contactMobile}
                  onChange={(e) => setContactMobile(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-purple-600 font-mono font-bold text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  शहर / तालुका (City):
                </label>
                <input
                  type="text"
                  placeholder="उदा. लातूर / पुणे / कोल्हापूर"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-purple-600 font-bold text-xs outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  हवा असलेला इन्स्टिट्यूट कोड (Institute Code):
                </label>
                <input
                  type="text"
                  placeholder="उदा. ROYAL2026"
                  value={desiredCode}
                  onChange={(e) => setDesiredCode(e.target.value.toUpperCase())}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-purple-600 font-mono font-bold text-xs outline-none uppercase"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  क्लासेस ॲडमिन पासवर्ड तयार करा (Passcode):
                </label>
                <input
                  type="text"
                  placeholder="उदा. 2026 किंवा आपला मोबाईल नंबर"
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-purple-600 font-mono font-bold text-xs outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-700 via-indigo-700 to-purple-800 hover:from-purple-800 hover:to-indigo-900 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                <Building2 className="w-4 h-4" />
                <span>नोंदणी करा व ३० मिनिटे पडताळणी विंडो सुरू करा</span>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};
