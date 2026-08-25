import React, { useState } from "react";
import {
  Building2,
  CheckCircle2,
  Sparkles,
  Users,
  ShieldCheck,
  Zap,
  ArrowRight,
  ArrowLeft,
  X,
  Share2,
  Copy,
  Gift,
  HelpCircle,
  FileSpreadsheet,
  BarChart3,
  ExternalLink,
  Lock,
  Phone,
  Timer,
} from "lucide-react";
import { InstituteProfile, LanguageMode } from "../types";
import {
  getAllInstitutes,
  saveAllInstitutes,
  setStoredLoggedInstituteStudent,
} from "../data/coachingInstitutesData";

interface ClassesInfoRegistrationViewProps {
  language: LanguageMode;
  onBack?: () => void;
  onOpenPortal: () => void;
  onSelectInstitute: (institute: InstituteProfile) => void;
}

export const ClassesInfoRegistrationView: React.FC<ClassesInfoRegistrationViewProps> = ({
  language,
  onBack,
  onOpenPortal,
  onSelectInstitute,
}) => {
  // Demo Institute: PLPC Classes Ambad
  const PLPC_AMBAD_INSTITUTE: InstituteProfile = {
    id: "inst_plpc_ambad",
    name: "PLPC Classes, Ambad (Jalna)",
    nameMr: "पी. एल. पी. सी. क्लासेस, अंबड (जि. जालना)",
    instituteCode: "PLPC-AMBAD",
    directorName: "प्रा. डी. के. सर (Director - PLPC Classes)",
    contactNumber: "+91 93072 20454",
    city: "अंबड (जि. जालना, महाराष्ट्र)",
    adminPasscode: "plpc123",
    maxStudentsLimit: 2000,
    batches: [
      "PLPC 12th Toppers Super-50 (PCM)",
      "PLPC Target NEET 650+ Medico",
      "PLPC MHT-CET 99+ Percentile",
      "PLPC 11th Science Foundation Star",
    ],
    bannerNotice: "PLPC Classes CBT Portal: Weekly Grand Mock Test is LIVE every Sunday 10:00 AM.",
    bannerNoticeMr: "📢 पी. एल. पी. सी. क्लासेस ऑनलाईन टेस्ट पॅनल: सर्व बॅचेससाठी दर रविवारी सकाळी १०:०० वाजता महा-मॉक टेस्ट सुरू आहे!",
    createdAt: 1704067200000,
  };

  // Registration Form State
  const [instName, setInstName] = useState("");
  const [instNameMr, setInstNameMr] = useState("");
  const [directorName, setDirectorName] = useState("");
  const [contactMobile, setContactMobile] = useState("");
  const [city, setCity] = useState("");
  const [passcode, setPasscode] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState<InstituteProfile | null>(null);

  // Referral Link Generator
  const [refClassCode, setRefClassCode] = useState("PLPC-AMBAD");
  const [copiedRefLink, setCopiedRefLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const classesRefLink = `${window.location.origin}${window.location.pathname}?ref_class=${refClassCode}`;

  const handleCopyRefLink = () => {
    navigator.clipboard.writeText(classesRefLink);
    setCopiedRefLink(true);
    setTimeout(() => setCopiedRefLink(false), 3000);
  };

  const handleLaunchPlpcDemo = () => {
    const all = getAllInstitutes();
    let plpc = all.find((i) => i.instituteCode === "PLPC-AMBAD");
    if (!plpc) {
      plpc = PLPC_AMBAD_INSTITUTE;
      all.unshift(plpc);
      saveAllInstitutes(all);
    }
    sessionStorage.setItem("mhtcet_active_whitelabel_institute_v1", JSON.stringify(plpc));
    onSelectInstitute(plpc);
    onOpenPortal();
  };

  const handleRegisterInstitute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!instName.trim() || !contactMobile.trim() || !directorName.trim()) {
      alert("कृपया क्लासेसचे नाव, संचालकांचे नाव आणि मोबाईल नंबर भरा.");
      return;
    }

    const cleanCode = instName
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, "")
      .slice(0, 8) || `CLS${Math.floor(1000 + Math.random() * 9000)}`;

    const newProfile: InstituteProfile = {
      id: `inst_${Date.now()}`,
      name: instName.trim(),
      nameMr: instNameMr.trim() || instName.trim(),
      instituteCode: cleanCode,
      directorName: `संचालक: ${directorName.trim()}`,
      contactNumber: contactMobile.trim(),
      city: city.trim() || "महाराष्ट्र",
      adminPasscode: passcode.trim() || "123456",
      maxStudentsLimit: 2000,
      batches: [
        "12th Science Toppers (PCM)",
        "Target NEET Super-30 (PCB)",
        "MHT-CET FastTrack Crash Batch",
      ],
      bannerNotice: `Welcome to ${instName.trim()} CBT Portal. Attempt all weekly tests regularly.`,
      bannerNoticeMr: `📢 ${instNameMr.trim() || instName.trim()} च्या सर्व बॅचेससाठी ऑनलाईन सराव व टेस्ट सिरीज सुरू झाली आहे.`,
      createdAt: Date.now(),
    };

    const all = getAllInstitutes();
    all.push(newProfile);
    saveAllInstitutes(all);
    sessionStorage.setItem("mhtcet_active_whitelabel_institute_v1", JSON.stringify(newProfile));

    setRegistrationSuccess(newProfile);
    onSelectInstitute(newProfile);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 px-3 sm:px-6">
      {/* Top Banner with Close Button */}
      <div className="bg-gradient-to-br from-purple-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-purple-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              {onBack && (
                <button
                  id="btn-classes-info-close"
                  onClick={onBack}
                  className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/20"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                  <span>← मुख्य पानावर जा (Close)</span>
                </button>
              )}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-black border border-purple-400/30">
                <Building2 className="w-3.5 h-3.5 text-amber-300" />
                <span>व्हाईट-लेबल कोचिंग अकॅडमी सिस्टीम · ₹४९९/वर्ष</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              महाराष्ट्रातील कोचिंग क्लासेससाठी स्वतःचे ऑनलाईन CBT ॲप
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              तुमच्या क्लासचे नाव, लोगो आणि स्वतंत्र विद्यार्थी पोर्टल. २००० विद्यार्थी क्षमता, स्वतःच्या टेस्ट्स, इन्स्टंट रँकिंग आणि पालकांसाठी WhatsApp प्रोग्रेस रिपोर्ट.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={handleLaunchPlpcDemo}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 fill-slate-950" />
              <span>PLPC Classes अंबड डेमो पहा</span>
            </button>
            <button
              onClick={onOpenPortal}
              className="px-5 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-black text-xs uppercase tracking-wider border border-white/20 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-purple-300" />
              <span>क्लासेस पोर्टल उघडा</span>
            </button>
          </div>
        </div>
      </div>

      {/* 40% Referral Program Highlight Banner */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 text-white rounded-3xl p-5 sm:p-6 shadow-lg border border-emerald-400/40 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-white text-[11px] font-black">
              <Gift className="w-3.5 h-3.5 text-amber-300" />
              <span>क्लासेस रेफरल पार्टनर प्रोग्राम · थेट ४०% कमिशन</span>
            </div>
            <h2 className="text-lg sm:text-xl font-black">
              इतर कोचिंग क्लासेसना जोडा आणि मिळवा थेट ४०% कमिशन (₹२०० प्रति क्लास)!
            </h2>
            <p className="text-xs sm:text-sm text-emerald-50">
              तुमच्या ओळखीतील इतर सायन्स अकॅडमी, ज्युनिअर कॉलेज किंवा क्लासेसना तुमची रेफर लिंक पाठवा. त्यांनी ₹४९९ मध्ये ॲप ॲक्टिव्हेट केल्यास तुम्हाला थेट ₹२०० रोख किंवा UPI वर मिळतील.
            </p>
          </div>

          <div className="bg-white/15 backdrop-blur-md p-3.5 rounded-2xl border border-white/25 text-center min-w-[140px]">
            <div className="text-[10px] text-emerald-100 uppercase font-bold">थेट परतावा</div>
            <div className="text-2xl font-black text-amber-300 font-mono-numbers">४०%</div>
            <div className="text-[11px] font-bold text-white">₹२०० / क्लास</div>
          </div>
        </div>

        {/* Classes Referral Link Box */}
        <div className="pt-2 border-t border-white/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <div className="flex-1 flex items-center gap-2 bg-white/10 px-3.5 py-2.5 rounded-2xl border border-white/20">
            <span className="text-xs text-white/80 font-bold shrink-0">रेफर लिंक:</span>
            <span className="font-mono text-xs text-white truncate flex-1">{classesRefLink}</span>
          </div>
          <button
            onClick={handleCopyRefLink}
            className="px-4 py-2.5 rounded-2xl bg-white text-emerald-950 hover:bg-emerald-50 font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shrink-0 shadow-sm"
          >
            {copiedRefLink ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>लिंक कॉपी झाली!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-emerald-700" />
                <span>क्लासेस लिंक कॉपी करा</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center font-black">
            <Building2 className="w-5 h-5 text-purple-700" />
          </div>
          <h3 className="font-black text-sm text-slate-900">१. संपूर्ण व्हाईट-लेबल ब्रँडिंग</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            तुमच्या क्लासचे नाव, लोगो, संपर्क नंबर आणि संचालक नाव ॲपवर अग्रक्रमाने दिसेल. विद्यार्थ्यांना हे तुमचेच ॲप असल्याचा अनुभव मिळतो.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center font-black">
            <FileSpreadsheet className="w-5 h-5 text-indigo-700" />
          </div>
          <h3 className="font-black text-sm text-slate-900">२. ५ मिनिटांत टेस्ट तयार करा</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Excel अपलोड, Word पेस्ट किंवा आमच्या १२,५०,०००+ प्रश्न बँकेतून ५ सेकंदांत नवीन मॉक टेस्ट, चॅप्टर टेस्ट तयार करा.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-2.5">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-black">
            <BarChart3 className="w-5 h-5 text-emerald-700" />
          </div>
          <h3 className="font-black text-sm text-slate-900">३. रँक, ॲक्युरसी व पालकांसाठी रिपोर्ट</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            टेस्ट संपताच क्लासची गुणवत्ता यादी (Leaderboard) आणि विद्यार्थ्यांचा विषयनिहाय स्कोर रिपोर्ट WhatsApp वर शेअर करता येतो.
          </p>
        </div>
      </div>

      {/* PLPC Classes Ambad Spotlight Card */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-indigo-50 via-purple-50 to-white border-2 border-indigo-300 shadow-md space-y-4">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="space-y-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white">
              लाईव्ह डेमो इन्स्टिट्यूट
            </span>
            <h3 className="text-lg font-black text-indigo-950">
              पी. एल. पी. सी. क्लासेस, अंबड (जि. जालना)
            </h3>
            <p className="text-xs text-slate-600 font-medium">
              संचालक: प्रा. डी. के. सर · कोड: <strong className="font-mono text-purple-900">PLPC-AMBAD</strong> · पासवर्ड: <strong className="font-mono text-purple-900">plpc123</strong>
            </p>
          </div>
          <button
            onClick={handleLaunchPlpcDemo}
            className="px-4 py-2.5 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>PLPC क्लासेस मोडमध्ये ॲप पहा</span>
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div className="p-3 rounded-2xl bg-white border border-indigo-100 text-center">
            <span className="text-[10px] text-slate-500 block">विद्यार्थी संख्या</span>
            <span className="font-black text-slate-900 text-base font-mono-numbers">२०००+</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-indigo-100 text-center">
            <span className="text-[10px] text-slate-500 block">बॅचेस</span>
            <span className="font-black text-slate-900 text-base font-mono-numbers">४ बॅचेस</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-indigo-100 text-center">
            <span className="text-[10px] text-slate-500 block">ऑनलाईन टेस्ट्स</span>
            <span className="font-black text-slate-900 text-base font-mono-numbers">साप्ताहिक CBT</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-indigo-100 text-center">
            <span className="text-[10px] text-slate-500 block">३० मिनिटे ट्रायल</span>
            <span className="font-black text-emerald-700 text-base">मोफत</span>
          </div>
        </div>
      </div>

      {/* Classes Registration Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-lg space-y-6">
        <div className="border-b pb-4">
          <h2 className="text-xl font-black text-slate-900">
            नवीन कोचिंग क्लासेस नोंदणी फॉर्म (Class Registration)
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            ३० मिनिटे मोफत ट्रायल सुरू करण्यासाठी फॉर्म भरा. कोणतीही आगाऊ फी किंवा क्रेडिट कार्ड आवश्यक नाही.
          </p>
        </div>

        {registrationSuccess ? (
          <div className="p-6 rounded-3xl bg-emerald-50 border-2 border-emerald-300 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-black text-base text-emerald-950">
                  अभिनंदन! {registrationSuccess.nameMr} ची नोंदणी यशस्वी झाली आहे!
                </h3>
                <p className="text-xs text-emerald-800">
                  तुमचा इन्स्टिट्यूट कोड: <strong className="font-mono">{registrationSuccess.instituteCode}</strong> · ॲडमिन पासवर्ड: <strong className="font-mono">{registrationSuccess.adminPasscode}</strong>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  onSelectInstitute(registrationSuccess);
                  onOpenPortal();
                }}
                className="px-5 py-3 rounded-2xl bg-emerald-700 hover:bg-emerald-800 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>क्लासेस डॅशबोर्ड उघडा</span>
              </button>
              <button
                onClick={() => {
                  const link = `${window.location.origin}${window.location.pathname}?class=${registrationSuccess.instituteCode}`;
                  navigator.clipboard.writeText(link);
                  alert(`विद्यार्थी लॉगिन लिंक कॉपी झाली:\n${link}`);
                }}
                className="px-4 py-3 rounded-2xl bg-white border border-emerald-300 text-emerald-950 font-bold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Copy className="w-4 h-4 text-emerald-700" />
                <span>विद्यार्थी डायरेक्ट लिंक कॉपी करा</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleRegisterInstitute} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  क्लासेस / अकॅडमीचे पूर्ण नाव (English): *
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. Shree Science Academy"
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
                  placeholder="उदा. श्री सायन्स अकॅडमी"
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
                  placeholder="उदा. प्रा. ए. के. पाटील सर"
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
                  शहर / जिल्हा (City):
                </label>
                <input
                  type="text"
                  placeholder="उदा. पुणे / लातूर / संभाजीनगर"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-purple-600 font-bold text-xs outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-black text-slate-700 block mb-1">
                क्लासेस ॲडमिन पासवर्ड तयार करा (Passcode):
              </label>
              <input
                type="text"
                placeholder="उदा. 2026 किंवा आपला मोबाईल नंबर"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full max-w-sm px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-purple-600 font-mono font-bold text-xs outline-none"
              />
            </div>

            <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 text-xs text-purple-950 leading-relaxed">
              ✨ <strong>३० मिनिटे फ्री ट्रायल:</strong> फॉर्म सबमिट करताच तुमच्या क्लासेसचे स्वतंत्र पोर्टल आणि विद्यार्थी डायरेक्ट लिंक तयार होईल.
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="submit"
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-800 hover:from-purple-800 hover:to-indigo-900 text-white font-black text-xs uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center gap-2"
              >
                <Building2 className="w-4 h-4" />
                <span>क्लासेस नोंदणी करा व ३० मिनिटे ट्रायल सुरू करा</span>
              </button>
              {onBack && (
                <button
                  type="button"
                  onClick={onBack}
                  className="px-4 py-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
                >
                  रद्द करा
                </button>
              )}
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
