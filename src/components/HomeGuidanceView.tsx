import React, { useState } from "react";
import {
  Compass,
  BookOpen,
  Calendar,
  Timer,
  CircleDot,
  AlertTriangle,
  Zap,
  FileText,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Lock,
  Smartphone,
  ArrowRight,
  Target,
  Award,
  GraduationCap,
  HelpCircle,
  Lightbulb,
  Clock,
  LogIn,
  Trophy,
  Building2,
  KeyRound,
  Gift,
  Share2,
  Star,
  Layers,
  History,
  CheckSquare,
  Flame,
  FileSpreadsheet,
  Printer,
  ChevronRight,
} from "lucide-react";
import { ExamType, LanguageMode, NavigationTab, StudentUser } from "../types";
import { formatTrialTime } from "../utils/deviceSecurity";

interface HomeGuidanceViewProps {
  currentExam: ExamType;
  language: LanguageMode;
  onNavigate: (tab: NavigationTab) => void;
  currentUser: StudentUser | null;
  trialSecondsRemaining: number;
  onOpenAuthModal: () => void;
  onOpenPaymentModal?: () => void;
  onOpenAdminDashboard?: () => void;
}

export const HomeGuidanceView: React.FC<HomeGuidanceViewProps> = ({
  currentExam,
  language,
  onNavigate,
  currentUser,
  trialSecondsRemaining,
  onOpenAuthModal,
  onOpenPaymentModal,
  onOpenAdminDashboard,
}) => {
  const [activeBannerIndex, setActiveBannerIndex] = useState<number>(0);

  const banners = [
    {
      badge: "🔥 विशेष मर्यादित ऑफर • 90% OFF",
      title: "MHT-CET • NEET • JEE संपूर्ण सराव संच",
      subtitle: "मूळ फी ₹२९९ ऐवजी फक्त ₹२९ मध्ये! २५,०००+ प्रश्न, १० Grand Tests आणि नोट्स.",
      ctaText: "फक्त ₹२९ मध्ये सुरू करा",
      action: () => (onOpenPaymentModal ? onOpenPaymentModal() : onNavigate("grand_tests")),
      bgGradient: "from-slate-900 via-indigo-950 to-slate-900",
      accentColor: "text-amber-400",
    },
    {
      badge: "🎁 रेफर आणि कमवा • १००% फी रिफंड",
      title: "१० मित्रांना रेफर करा आणि १००% फी परत मिळवा!",
      subtitle: "तुमच्या मित्रांना ॲप शेअर करा. १० विद्यार्थ्यांनी नोंदणी करताच तुमची ₹२९ फी पूर्ण परत मिळेल.",
      ctaText: "रेफरल लिंक मिळवा",
      action: () => onNavigate("refer_earn"),
      bgGradient: "from-emerald-950 via-teal-900 to-slate-900",
      accentColor: "text-emerald-300",
    },
    {
      badge: "🏫 कोचिंग क्लासेस • अर्धा तास मोफत चाचणी",
      title: "कोचिंग क्लासेस टेस्ट सिस्टीम (२००० विद्यार्थी क्षमता)",
      subtitle: "आपल्या क्लासच्या नावाने व लोगोसह साप्ताहिक परीक्षा घ्या. ३० मिनिटे फ्री डेमो उपलब्ध!",
      ctaText: "क्लासेस नोंदणी करा",
      action: () => onNavigate("classes_portal"),
      bgGradient: "from-purple-950 via-indigo-950 to-slate-900",
      accentColor: "text-purple-300",
    },
  ];

  const handleShareApp = () => {
    const shareText = `🎯 MHT-CET, NEET & JEE Main सराव ॲप! \n🔥 फक्त ₹२९ मध्ये (मूळ ₹२९९) २५,०००+ प्रश्न, १० Grand Tests, सराव व नोट्स!\n🎁 १० मित्रांना रेफर करा आणि १००% फी रिफंड मिळवा!\n👉 आत्ताच सुरू करा: ${window.location.origin}`;
    if (navigator.share) {
      navigator.share({
        title: "MHT-CET • NEET • JEE सराव ॲप",
        text: shareText,
        url: window.location.origin,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      alert("ॲप शेअर लिंक कॉपी झाली आहे! आपण WhatsApp वर पाठवू शकता.");
    }
  };

  const handleRateUs = () => {
    alert("⭐⭐⭐⭐⭐ \n\nधन्यवाद! आपले ५-स्टार रेटिंग आमच्यासाठी खूप मोलाचे आहे. आपले मत 9307220454 वर WhatsApp द्वारे नक्की कळवा.");
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 animate-in fade-in">
      {/* PROMINENT 'REFER & EARN' 90% DISCOUNT PROMOTIONAL BANNER */}
      <div
        id="banner-refer-earn-promo"
        className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 p-5 sm:p-6 text-slate-950 shadow-xl border-2 border-amber-300"
      >
        <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-slate-950 text-white text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <Gift className="w-3.5 h-3.5 text-amber-400" />
                <span>🎁 रेफर करा आणि १००% फी परत मिळवा</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-rose-700 text-[11px] font-black uppercase shadow-xs">
                ⚡ 90% OFF महा-सवलत
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white drop-shadow-xs">
              MHT-CET · NEET · JEE संपूर्ण ॲप फक्त{" "}
              <span className="line-through text-amber-200/90 text-lg sm:text-xl font-bold ml-1 mr-1.5">
                ₹२९९
              </span>
              <span className="bg-slate-950 text-amber-300 px-2.5 py-0.5 rounded-xl text-xl sm:text-2xl font-black inline-block font-mono-numbers shadow-md">
                ₹२९
              </span>
            </h3>

            <p className="text-amber-100 text-xs sm:text-sm font-medium leading-relaxed">
              आपल्या १० मित्रांना ॲप शेअर करा. १० मित्रांनी नोंदणी करताच आपली ₹२९ फी पूर्ण <strong>१००% परत (Full Refund)</strong> मिळेल!
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
            <button
              id="btn-home-refer-earn-cta"
              onClick={() => onNavigate("refer_earn")}
              className="flex-1 md:flex-initial px-6 py-3.5 rounded-2xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-105 border border-amber-400/40"
            >
              <Gift className="w-4 h-4 text-amber-400" />
              <span>रेफरल पोर्टल उघडा & कमवा</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
            <button
              onClick={handleShareApp}
              className="px-4 py-3.5 rounded-2xl bg-white/20 hover:bg-white/30 text-white font-black text-xs flex items-center justify-center gap-1.5 backdrop-blur-xs transition-colors cursor-pointer border border-white/30"
              title="मित्र-मैत्रिणींना लिंक शेअर करा"
            >
              <Share2 className="w-4 h-4" />
              <span>शेअर</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. Top Carousel / Announcement Banner Section */}
      <div
        className={`rounded-3xl bg-linear-to-br ${banners[activeBannerIndex].bgGradient} text-white p-5 sm:p-8 shadow-xl border border-slate-800 relative overflow-hidden transition-all duration-300`}
      >
        <div className="absolute -top-10 -right-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-3">
          {/* Top Status & Indicator Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border border-white/20">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {banners[activeBannerIndex].badge}
            </span>

            {/* Carousel Navigation Dots */}
            <div className="flex items-center gap-1.5">
              {banners.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveBannerIndex(i)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeBannerIndex === i ? "w-6 bg-amber-400" : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Banner Title & Description */}
          <div>
            <h2 className="text-xl sm:text-3xl font-black tracking-tight leading-snug">
              {banners[activeBannerIndex].title}
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed font-medium max-w-2xl">
              {banners[activeBannerIndex].subtitle}
            </p>
          </div>

          {/* Pricing Highlight Pill & CTA */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={banners[activeBannerIndex].action}
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-102"
            >
              <span>{banners[activeBannerIndex].ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Special Price Tag */}
            <div className="px-3.5 py-2 rounded-xl bg-white/10 border border-white/20 flex items-center gap-2 text-xs font-bold">
              <span className="line-through text-slate-400 text-xs">₹२९९</span>
              <span className="text-amber-300 font-black text-sm">₹२९ फक्त</span>
              <span className="px-1.5 py-0.2 rounded bg-rose-600 text-white text-[9px] font-black uppercase">
                ९०% सूट
              </span>
            </div>

            {/* User Account / Trial State Pill */}
            {currentUser ? (
              <div className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{currentUser.name} (प्रमाणित खाते)</span>
              </div>
            ) : (
              <button
                onClick={onOpenAuthModal}
                className="px-3 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-400/40 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Clock className="w-4 h-4 text-amber-400 animate-pulse" />
                <span>मोफत चाचणी: {formatTrialTime(trialSecondsRemaining)} शिल्लक</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. Structured Grid of Square Menu Buttons (Mobile App Style) */}
      <div>
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <h3 className="text-base sm:text-lg font-black tracking-tight text-slate-900">
              अभ्यास व सराव विभाग (Menu Hub)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-bold">
            टार्गेट: <span className="text-indigo-600 font-black">{currentExam}</span>
          </span>
        </div>

        {/* 4-column or 2-column square grid layout matching reference UI */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {/* Button 1: Previous Year Papers (PYQ) */}
          <div
            id="home-btn-pyq"
            onClick={() => onNavigate("pyq")}
            className="group p-4 rounded-2xl bg-white hover:bg-emerald-50/50 border border-slate-200 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between aspect-square"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <History className="w-6 h-6" />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 font-black uppercase font-mono">
                2019-2025
              </span>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-800 transition-colors leading-tight">
                मागील वर्षांच्या प्रश्नपत्रिका
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                Previous Year Papers
              </p>
            </div>
          </div>

          {/* Button 2: Topic-wise Mock Tests */}
          <div
            id="home-btn-mock-test"
            onClick={() => onNavigate("mock_test")}
            className="group p-4 rounded-2xl bg-white hover:bg-blue-50/50 border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between aspect-square"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 font-black uppercase">
                १०-१०० Marks
              </span>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 group-hover:text-blue-800 transition-colors leading-tight">
                घटकनिहाय सराव चाचण्या
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                Topic-wise Mock Tests
              </p>
            </div>
          </div>

          {/* Button 3: Premium Mock Tests (10 Grand Mocks) */}
          <div
            id="home-btn-grand-tests"
            onClick={() => onNavigate("grand_tests")}
            className="group p-4 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border border-amber-300 hover:border-amber-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between aspect-square"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-500 text-slate-950 flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <Trophy className="w-6 h-6 text-slate-950" />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-200 text-slate-950 font-black uppercase font-mono">
                १० संच
              </span>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 group-hover:text-amber-900 transition-colors leading-tight">
                प्रीमियम ग्रँड टेस्ट्स
              </h4>
              <p className="text-[11px] text-amber-800 mt-0.5 font-medium">
                10 Real Exam Simulators
              </p>
            </div>
          </div>

          {/* Button 4: Study Material & Short Notes */}
          <div
            id="home-btn-notes"
            onClick={() => onNavigate("notes")}
            className="group p-4 rounded-2xl bg-white hover:bg-indigo-50/50 border border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between aspect-square"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-900 font-black uppercase">
                PDF Ready
              </span>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 group-hover:text-indigo-800 transition-colors leading-tight">
                अभ्यास साहित्य व नोट्स
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                Study Material & Formulas
              </p>
            </div>
          </div>

          {/* Button 5: Live Tests & Digital OMR Sheet */}
          <div
            id="home-btn-omr"
            onClick={() => onNavigate("omr")}
            className="group p-4 rounded-2xl bg-white hover:bg-rose-50/50 border border-slate-200 hover:border-rose-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between aspect-square"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-rose-100 text-rose-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <CircleDot className="w-6 h-6" />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-900 font-black uppercase">
                OMR सराव
              </span>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 group-hover:text-rose-800 transition-colors leading-tight">
                लाईव्ह टेस्ट व OMR शीट
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                Live Tests & OMR Practice
              </p>
            </div>
          </div>

          {/* Button 6: Refer & Earn (10 Referrals = 100% Refund) */}
          <div
            id="home-btn-refer-earn"
            onClick={() => onNavigate("refer_earn")}
            className="group p-4 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border border-emerald-300 hover:border-emerald-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between aspect-square"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-emerald-600 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <Gift className="w-6 h-6" />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-950 font-black uppercase">
                १००% रिफंड
              </span>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 group-hover:text-emerald-950 transition-colors leading-tight">
                रेफर आणि मिळवा
              </h4>
              <p className="text-[11px] text-emerald-800 mt-0.5 font-medium">
                १० मित्रांना जोडा = फी परत
              </p>
            </div>
          </div>

          {/* Button 7: Coaching Classes Portal (30 Min Free Trial) */}
          <div
            id="home-btn-classes-portal"
            onClick={() => onNavigate("classes_portal")}
            className="group p-4 rounded-2xl bg-gradient-to-br from-purple-50 to-indigo-50 hover:from-purple-100 hover:to-indigo-100 border border-purple-300 hover:border-purple-400 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between aspect-square"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-800 text-white flex items-center justify-center group-hover:scale-105 transition-transform shadow-xs">
                <Building2 className="w-6 h-6 text-amber-300" />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-200 text-purple-950 font-black uppercase">
                ३० Min Free
              </span>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 group-hover:text-purple-950 transition-colors leading-tight">
                कोचिंग क्लासेस पोर्टल
              </h4>
              <p className="text-[11px] text-purple-800 mt-0.5 font-medium">
                २००० विद्यार्थी चाचणी पॅनल
              </p>
            </div>
          </div>

          {/* Button 8: Share & Rate App */}
          <div
            id="home-btn-share"
            onClick={handleShareApp}
            className="group p-4 rounded-2xl bg-white hover:bg-amber-50/50 border border-slate-200 hover:border-amber-300 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between aspect-square"
          >
            <div className="flex items-center justify-between">
              <div className="w-11 h-11 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                <Share2 className="w-6 h-6" />
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 font-black uppercase">
                मित्र सराव
              </span>
            </div>
            <div>
              <h4 className="text-sm font-black text-slate-900 group-hover:text-amber-900 transition-colors leading-tight">
                ॲप शेअर करा
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                Share with Friends
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Secondary Practical Utilities Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
        <button
          onClick={() => onNavigate("all_questions")}
          className="p-3 rounded-xl bg-white border border-slate-200 hover:border-indigo-300 text-left transition-all flex items-center gap-2.5 shadow-xs cursor-pointer"
        >
          <FileText className="w-4 h-4 text-indigo-600 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">सर्व प्रश्नसंच (Bank)</p>
            <p className="text-[10px] text-slate-500">२५,०००+ प्रश्न</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate("mistakes")}
          className="p-3 rounded-xl bg-white border border-slate-200 hover:border-rose-300 text-left transition-all flex items-center gap-2.5 shadow-xs cursor-pointer"
        >
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">माझ्या चुका (Mistakes)</p>
            <p className="text-[10px] text-slate-500">रिव्हिजन वही</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate("flashcards")}
          className="p-3 rounded-xl bg-white border border-slate-200 hover:border-amber-300 text-left transition-all flex items-center gap-2.5 shadow-xs cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">फ्लॅशकार्ड्स (Flashcards)</p>
            <p className="text-[10px] text-slate-500">महत्वाचे पॉइंट्स</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate("pdf_bank")}
          className="p-3 rounded-xl bg-white border border-slate-200 hover:border-emerald-300 text-left transition-all flex items-center gap-2.5 shadow-xs cursor-pointer"
        >
          <Printer className="w-4 h-4 text-emerald-600 shrink-0" />
          <div className="min-w-0">
            <p className="text-xs font-bold text-slate-900 truncate">PDF व प्रिंट जनरेटर</p>
            <p className="text-[10px] text-slate-500">Offline सराव</p>
          </div>
        </button>
      </div>

      {/* 4. Coaching Classes Special Notice & Trial Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-indigo-900 to-purple-900 text-white shadow-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-indigo-700">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-300 shrink-0" />
            <h4 className="text-sm sm:text-base font-black">
              कोचिंग क्लासेस संचालक व शिक्षकांसाठी खास सुविधा!
            </h4>
          </div>
          <p className="text-xs text-indigo-200 leading-relaxed max-w-2xl">
            आपल्या क्लासच्या नावाचे स्वतंत्र पोर्टल, Excel/Word मधून प्रश्न अपलोड, मराठी/इंग्रजी स्पष्टीकरण, आणि २००० विद्यार्थ्यांपर्यंत रँकिंग. नोंदणी करा आणि <strong>अर्धा तास मोफत चाचणी</strong> मध्ये सर्व फीचर्स तपासा!
          </p>
        </div>
        <button
          onClick={() => onNavigate("classes_portal")}
          className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 shadow-md shrink-0 transition-all cursor-pointer"
        >
          <span>क्लासेस पोर्टल उघडा</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
