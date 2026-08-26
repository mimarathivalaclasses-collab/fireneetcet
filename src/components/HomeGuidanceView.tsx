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
  LogOut,
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
  UserCheck,
  UserPlus,
  Users,
  RefreshCw,
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
  onLogout?: () => void;
  onStartDemoTest?: (exam: ExamType, demoIndex: number) => void;
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
  onLogout,
  onStartDemoTest,
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
      badge: "💼 एजंट पार्टनर • थेट २०% कमिशन",
      title: "एजंट पार्टनर बना आणि प्रत्येक विद्यार्थी रेफरलवर ₹५.८० कमवा!",
      subtitle: "तुमचा युनिक रेफरल कोड किंवा थेट लिंक शेअर करा. किमान ₹१०० झाल्यावर थेट बँक/UPI मध्ये ट्रान्सफर करा.",
      ctaText: "एजंट पोर्टल उघडा",
      action: () => onNavigate("agent_portal"),
      bgGradient: "from-indigo-950 via-blue-950 to-slate-900",
      accentColor: "text-amber-300",
    },
  ];

  const handleShareApp = () => {
    const shareText = `🎯 MHT-CET, NEET & JEE Main सराव ॲप! \n🔥 फक्त ₹२९ मध्ये (मूळ ₹२९९) २५,०००+ प्रश्न, १० Grand Tests, सराव व नोट्स!\n🎁 १० मित्रांना रेफर करा आणि १००% फी रिफंड मिळवा!\n👉 आत्ताच सुरू करा: ${window.location.origin}`;
    if (navigator.share) {
      navigator
        .share({
          title: "MHT-CET • NEET • JEE सराव ॲप",
          text: shareText,
          url: window.location.origin,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(shareText);
      alert("ॲप शेअर लिंक कॉपी झाली आहे! आपण WhatsApp वर पाठवू शकता.");
    }
  };

  // Check if current user is a demo user
  const isDemoUser = currentUser?.id?.startsWith("demo_user_");

  // Options list configured for Vertical Strip (उभी पट्टी) Layout
  const verticalOptions = [
    {
      id: "option-pyq",
      icon: History,
      iconBg: "bg-emerald-500 text-white shadow-emerald-500/30",
      borderHover: "hover:border-emerald-400 hover:bg-emerald-50/40",
      titleMr: "मागील वर्षांच्या प्रश्नपत्रिका (PYQ)",
      titleEn: "Previous Year Question Papers",
      badge: "2019 - 2025 • स्पष्टीकरणासह",
      badgeColor: "bg-emerald-100 text-emerald-900",
      desc: "MHT-CET, NEET व JEE च्या २०१९ ते २०२५ पर्यंतच्या सर्व अधिकृत प्रश्नपत्रिका सविस्तर उत्तरांसहित आणि स्टेप-बाय-स्टेप स्पष्टीकरणासह सोडवा.",
      btnText: "प्रश्नपत्रिका सोडवा",
      action: () => onNavigate("pyq"),
    },
    {
      id: "option-mock-tests",
      icon: Layers,
      iconBg: "bg-blue-600 text-white shadow-blue-500/30",
      borderHover: "hover:border-blue-400 hover:bg-blue-50/40",
      titleMr: "घटकनिहाय सराव चाचण्या (Chapter Tests)",
      titleEn: "Topic-wise & Chapter-wise Mock Tests",
      badge: "सर्व विषय • १०-१०० Marks",
      badgeColor: "bg-blue-100 text-blue-900",
      desc: "Physics, Chemistry, Mathematics आणि Biology च्या प्रत्येक धड्याचे सविस्तर प्रश्नसंच आणि वेळेचे व्यवस्थापन शिकवणारे टेस्ट्स.",
      btnText: "सराव चाचणी सुरू करा",
      action: () => onNavigate("mock_test"),
    },
    {
      id: "option-grand-tests",
      icon: Trophy,
      iconBg: "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-amber-500/30",
      borderHover: "hover:border-amber-400 hover:bg-amber-50/40",
      titleMr: "प्रीमियम ग्रँड टेस्ट्स (१० संपूर्ण संच)",
      titleEn: "10 Full Syllabus Real Exam Simulators",
      badge: "१० संपूर्ण संच • NTA पॅटर्न",
      badgeColor: "bg-amber-100 text-amber-950 font-black",
      desc: "प्रत्यक्ष मुख्य परीक्षेसारखा हुबेहूब अनुभव देणारे १० ग्रँड टेस्ट्स, निगेटिव्ह मार्किंग, परसेंटाईल कॅल्क्युलेटर व अचूक रँक अंदाज.",
      btnText: "ग्रँड टेस्ट उघडा",
      action: () => onNavigate("grand_tests"),
      highlight: true,
    },
    {
      id: "option-study-notes",
      icon: BookOpen,
      iconBg: "bg-indigo-600 text-white shadow-indigo-500/30",
      borderHover: "hover:border-indigo-400 hover:bg-indigo-50/40",
      titleMr: "अभ्यास साहित्य व फॉर्म्युला नोट्स",
      titleEn: "Study Material, Formula Sheets & Short Notes",
      badge: "PDF रेडी • शॉर्टकट ट्रिक्स",
      badgeColor: "bg-indigo-100 text-indigo-900",
      desc: "महत्त्वाचे फॉर्म्युले, शॉर्टकट ट्रिक्स, क्विक रिव्हिजन नोट्स आणि परीक्षेच्या शेवटच्या क्षणी रिव्हिजन करण्यासाठी हँडबुक्स.",
      btnText: "नोट्स वाचा",
      action: () => onNavigate("notes"),
    },
    {
      id: "option-omr-tests",
      icon: CircleDot,
      iconBg: "bg-rose-600 text-white shadow-rose-500/30",
      borderHover: "hover:border-rose-400 hover:bg-rose-50/40",
      titleMr: "लाईव्ह टेस्ट व डिजिटल OMR शीट",
      titleEn: "Live Speed Test & Digital OMR Practice",
      badge: "OMR सराव • त्वरित निकाल",
      badgeColor: "bg-rose-100 text-rose-900",
      desc: "ऑफलाईन परीक्षेची तयारी करणाऱ्यांसाठी डिजिटल OMR बबलिंग सराव, वेळेचे टाइमर आणि टेस्ट सबमिट होताच इन्स्टंट स्कोअरकार्ड.",
      btnText: "OMR टेस्ट सुरू करा",
      action: () => onNavigate("omr"),
    },
    {
      id: "option-agent-portal",
      icon: Users,
      iconBg: "bg-indigo-600 text-white shadow-indigo-500/30",
      borderHover: "hover:border-indigo-400 hover:bg-indigo-50/40",
      titleMr: "💼 अधिकृत एजंट पार्टनर (२०% कमिशन)",
      titleEn: "Official Agent Partner (20% Earnings)",
      badge: "₹५.८०/विद्यार्थी • थेट UPI पेआऊट",
      badgeColor: "bg-indigo-100 text-indigo-950 font-black",
      desc: "आपल्या भागातील विद्यार्थ्यांना ॲप रेफर करा. प्रत्येक यशस्वी ₹२९ नोंदणीवर थेट २०% (₹५.८०) कमवा. किमान ₹१०० पूर्ण होताच थेट बँक/UPI खात्यात पैसे मिळवा.",
      btnText: "एजंट पोर्टल उघडा",
      action: () => onNavigate("agent_portal"),
      highlightPurple: true,
    },
    {
      id: "option-refer-earn",
      icon: Gift,
      iconBg: "bg-emerald-600 text-white shadow-emerald-500/30",
      borderHover: "hover:border-emerald-400 hover:bg-emerald-50/40",
      titleMr: "रेफर आणि कमवा (१००% फी रिफंड)",
      titleEn: "Refer & Earn 100% Fee Refund",
      badge: "१० रेफरल्स = १००% रिफंड",
      badgeColor: "bg-emerald-100 text-emerald-950 font-black",
      desc: "तुमच्या मित्रांना आणि क्लासमेट्सना ॲप शेअर करा. १० मित्रांनी नोंदणी करताच तुमची ₹२९ फी थेट बँक खात्यात १००% परत केली जाईल.",
      btnText: "रेफरल लिंक मिळवा",
      action: () => onNavigate("refer_earn"),
    },
    {
      id: "option-question-bank",
      icon: FileText,
      iconBg: "bg-cyan-600 text-white shadow-cyan-500/30",
      borderHover: "hover:border-cyan-400 hover:bg-cyan-50/40",
      titleMr: "सर्व प्रश्नसंच बँक (Master Question Bank)",
      titleEn: "25,000+ Question Repository & Filter",
      badge: "२५,०००+ प्रश्न • चॅप्टर फिल्टर",
      badgeColor: "bg-cyan-100 text-cyan-900",
      desc: "कोणताही धडा किंवा अवघड टॉपिक निवडून त्यावरील सर्व प्रश्नांचा सराव करा, स्पष्टीकरण पाहा आणि स्वतःची तयारी सुधारा.",
      btnText: "प्रश्न बँक उघडा",
      action: () => onNavigate("all_questions"),
    },
    {
      id: "option-mistakes-notebook",
      icon: AlertTriangle,
      iconBg: "bg-red-500 text-white shadow-red-500/30",
      borderHover: "hover:border-red-400 hover:bg-red-50/40",
      titleMr: "माझ्या चुकांची रिव्हिजन वही (Mistakes Notebook)",
      titleEn: "Auto-Saved Incorrect Questions for Revision",
      badge: "Smart Revision • ०% चुका",
      badgeColor: "bg-red-100 text-red-900",
      desc: "चाचण्या सोडवताना चुकलेले सर्व प्रश्न येथे स्वयंचलित सेव्ह होतात. परीक्षेपूर्वी या प्रश्नांचा सराव करून चुका टाळा.",
      btnText: "चुका दुरुस्त करा",
      action: () => onNavigate("mistakes"),
    },
    {
      id: "option-flashcards",
      icon: Sparkles,
      iconBg: "bg-amber-500 text-slate-950 shadow-amber-500/30",
      borderHover: "hover:border-amber-400 hover:bg-amber-50/40",
      titleMr: "फ्लॅशकार्ड्स व महत्त्वाचे पॉइंट्स (Flashcards)",
      titleEn: "High-Speed Memory & Formula Flashcards",
      badge: "जलद उजळणी • Smart Cards",
      badgeColor: "bg-amber-100 text-amber-900",
      desc: "बसमध्ये, प्रवासात किंवा मोकळ्या वेळेत ५ मिनिटांत विज्ञानाचे नियम, फॉर्म्युले आणि रिएक्शन्स तोंडपाठ करण्यासाठी सर्वोत्तम टूल.",
      btnText: "फ्लॅशकार्ड्स सुरू करा",
      action: () => onNavigate("flashcards"),
    },
    {
      id: "option-printable-pdf",
      icon: Printer,
      iconBg: "bg-teal-600 text-white shadow-teal-500/30",
      borderHover: "hover:border-teal-400 hover:bg-teal-50/40",
      titleMr: "PDF व प्रिंट जनरेटर (Printable Test Generator)",
      titleEn: "Download Printable Test Papers with Answer Keys",
      badge: "Offline सराव • OMR प्रिंट",
      badgeColor: "bg-teal-100 text-teal-900",
      desc: "घरी बसून किंवा वर्गात पेपर देण्यासाठी A4 साईझ टेस्ट पेपर, OMR शीट आणि उत्तरपत्रिका १-क्लिकमध्ये प्रिंट करा.",
      btnText: "PDF प्रिंट करा",
      action: () => onNavigate("pdf_bank"),
    },
  ];

  return (
    <div className="max-w-5xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 animate-in fade-in">
      {/* ======================================================== */}
      {/* 1. DEDICATED LOGIN & USER ACCOUNT SECTION (लॉगिन केंद्र) */}
      {/* ======================================================== */}
      <div
        id="home-login-account-panel"
        className="rounded-3xl bg-linear-to-r from-slate-950 via-indigo-950 to-slate-900 border-2 border-indigo-500/40 p-5 sm:p-6 text-white shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-60 h-60 bg-amber-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          {/* Left info: User profile or Sign-In Prompt */}
          <div className="space-y-2 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-0.5 rounded-full bg-indigo-500/25 border border-indigo-400/40 text-indigo-300 text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs">
                <LogIn className="w-3.5 h-3.5 text-amber-400" />
                <span>लॉगिन आणि खाते केंद्र (Account Portal)</span>
              </span>

              {currentUser && !isDemoUser ? (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[11px] font-black flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>सक्रिय अधिकृत खाते (Logged In)</span>
                </span>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 text-[11px] font-black flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
                  <span>मोफत डेमो: {formatTrialTime(trialSecondsRemaining)} शिल्लक</span>
                </span>
              )}
            </div>

            {currentUser && !isDemoUser ? (
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white flex items-center gap-2">
                  <span>स्वागत आहे, {currentUser.name}!</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 font-black">
                    {currentUser.examTarget || currentExam}
                  </span>
                </h3>
                <p className="text-xs sm:text-sm text-indigo-200/90 mt-1 font-medium">
                  मोबाईल: <strong className="font-mono text-white">{currentUser.mobile}</strong> • स्थिती:{" "}
                  <span className="text-emerald-400 font-bold">
                    {currentUser.isApproved ? "मंजूर (Full Access)" : "सक्रिय"}
                  </span>
                  {currentUser.instituteCode && (
                    <span className="ml-2 px-2 py-0.5 rounded bg-white/10 text-amber-300 font-mono text-xs">
                      क्लास कोड: {currentUser.instituteCode}
                    </span>
                  )}
                </p>
              </div>
            ) : (
              <div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  विद्यार्थी व शिक्षक लॉगिन (Login Portal)
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed font-medium">
                  आपल्या खात्यामध्ये लॉगिन करा किंवा नवीन नोंदणी करून <strong>२५,०००+ प्रश्न, १० Grand Tests आणि क्लासेस सिस्टीम</strong> अनलॉक करा.
                </p>
              </div>
            )}
          </div>

          {/* Right Buttons: Login, Switch Account, Logout */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0 w-full md:w-auto">
            {currentUser && !isDemoUser ? (
              <>
                <button
                  id="btn-home-switch-account"
                  onClick={onOpenAuthModal}
                  className="flex-1 md:flex-initial px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-white/20"
                  title="दुसऱ्या खात्यात लॉगिन करा"
                >
                  <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
                  <span>खाते बदला / लॉगिन</span>
                </button>

                {onOpenAdminDashboard && (
                  <button
                    onClick={onOpenAdminDashboard}
                    className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    <KeyRound className="w-3.5 h-3.5 text-amber-400" />
                    <span>मास्टर Admin</span>
                  </button>
                )}

                {onLogout && (
                  <button
                    id="btn-home-logout"
                    onClick={onLogout}
                    className="px-3.5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    title="लॉग आऊट करा"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>लॉग आऊट</span>
                  </button>
                )}
              </>
            ) : (
              <>
                <button
                  id="btn-home-login-now"
                  onClick={onOpenAuthModal}
                  className="flex-1 md:flex-initial px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-slate-950 font-black text-xs sm:text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-105"
                >
                  <LogIn className="w-4 h-4 text-slate-950" />
                  <span>आत्ताच लॉगिन करा</span>
                </button>

                <button
                  onClick={onOpenAuthModal}
                  className="px-4 py-3 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-black text-xs flex items-center justify-center gap-1.5 border border-white/20 transition-all cursor-pointer"
                >
                  <UserPlus className="w-4 h-4 text-emerald-400" />
                  <span>नवीन नोंदणी</span>
                </button>

                <button
                  onClick={() => onNavigate("agent_portal")}
                  className="px-3.5 py-3 rounded-2xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-400/30 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Users className="w-4 h-4 text-amber-400" />
                  <span>एजंट पोर्टल</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Quick Demo Test Bar for unregistered/demo users */}
        {(!currentUser || isDemoUser) && onStartDemoTest && (
          <div className="mt-4 pt-3.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="text-xs text-amber-200 font-bold">
                ⚡ विनानोंदणी थेट ३ मोफत डेमो चाचण्या सुरू करा:
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => onStartDemoTest("MHT_CET", 1)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold border border-white/20 transition-all cursor-pointer"
              >
                डेमो १: Physics & Chem
              </button>
              <button
                onClick={() => onStartDemoTest("MHT_CET", 2)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold border border-white/20 transition-all cursor-pointer"
              >
                डेमो २: Maths Sprint
              </button>
              <button
                onClick={() => onStartDemoTest("NEET", 3)}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold border border-white/20 transition-all cursor-pointer"
              >
                डेमो ३: Biology Master
              </button>
            </div>
          </div>
        )}
      </div>

      {/* PROMINENT 'REFER & EARN' 90% DISCOUNT PROMOTIONAL BANNER */}
      <div
        id="banner-refer-earn-promo"
        className="relative overflow-hidden rounded-3xl bg-linear-to-r from-amber-500 via-orange-500 to-rose-600 p-5 sm:p-6 text-slate-950 shadow-xl border-2 border-amber-300"
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

      {/* DAILY 20-QUESTION TARGET & STREAK CHALLENGE CARD */}
      <div
        id="card-daily-target-streak"
        className="rounded-3xl bg-linear-to-r from-orange-500 via-amber-500 to-yellow-500 p-4 sm:p-5 text-slate-950 shadow-lg border border-amber-300 relative overflow-hidden"
      >
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/20 rounded-full blur-xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1.5 flex-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[11px] font-black uppercase flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 text-orange-400 fill-orange-400 animate-bounce" />
                <span>दैनिक २० प्रश्न चॅलेंज</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white text-orange-800 text-[11px] font-black">
                🔥 नियमित सराव स्ट्रीक!
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-black text-slate-950">
              दररोज २० प्रश्न सोडवा आणि CET / NEET मध्ये टॉप रँक पक्की करा! 🏆
            </h3>
            <p className="text-xs text-slate-900/90 font-medium max-w-xl">
              नियमित २० प्रश्न सोडवल्याने अचूकता (Accuracy) आणि वेग (Speed) वेगाने सुधारतो.
            </p>
          </div>

          <div className="shrink-0 w-full sm:w-auto">
            <button
              onClick={() => onNavigate("mock_test")}
              className="w-full sm:w-auto px-5 py-3 rounded-2xl bg-slate-950 hover:bg-slate-900 text-amber-300 font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-105"
            >
              <Target className="w-4 h-4 text-amber-400" />
              <span>आजचे २० प्रश्न सुरू करा</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. ALL OPTIONS IN VERTICAL STRIPS (उभ्या पट्ट्यांची यादी) */}
      {/* ======================================================== */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-indigo-600 animate-pulse"></span>
            <h3 className="text-lg sm:text-xl font-black tracking-tight text-slate-900">
              सर्व अभ्यास व सराव विभाग (Menu Hub)
            </h3>
          </div>
          <span className="text-xs text-slate-600 font-bold">
            लक्ष्य परीक्षा: <span className="text-indigo-600 font-black">{currentExam}</span>
          </span>
        </div>

        {/* Vertical List of Full-Width Card Strips (उभ्या पट्ट्या) */}
        <div className="space-y-3">
          {verticalOptions.map((opt) => {
            const Icon = opt.icon;
            return (
              <div
                key={opt.id}
                id={opt.id}
                onClick={opt.action}
                className={`group p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  opt.borderHover
                } ${
                  opt.highlight
                    ? "bg-gradient-to-r from-amber-50/70 via-orange-50/50 to-white border-amber-300"
                    : opt.highlightPurple
                    ? "bg-gradient-to-r from-purple-50/70 via-indigo-50/50 to-white border-purple-300"
                    : ""
                }`}
              >
                {/* Left Section: Large Icon + Titles + Description */}
                <div className="flex items-start sm:items-center gap-4 flex-1">
                  <div
                    className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-md group-hover:scale-105 transition-transform ${opt.iconBg}`}
                  >
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>

                  <div className="space-y-1 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-base sm:text-lg font-black text-slate-900 group-hover:text-indigo-900 transition-colors">
                        {opt.titleMr}
                      </h4>
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-black uppercase ${opt.badgeColor}`}
                      >
                        {opt.badge}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 font-semibold">{opt.titleEn}</p>
                    <p className="text-xs text-slate-600 leading-relaxed font-medium line-clamp-2 sm:line-clamp-1">
                      {opt.desc}
                    </p>
                  </div>
                </div>

                {/* Right Action Button */}
                <div className="shrink-0 flex items-center justify-end sm:pl-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      opt.action();
                    }}
                    className={`w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-black flex items-center justify-center gap-1.5 shadow-sm transition-all cursor-pointer group-hover:scale-105 ${
                      opt.highlight
                        ? "bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-amber-400/30"
                        : opt.highlightPurple
                        ? "bg-purple-700 hover:bg-purple-800 text-white shadow-purple-600/30"
                        : "bg-slate-900 hover:bg-indigo-600 text-white"
                    }`}
                  >
                    <span>{opt.btnText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Agent Partner Special Notice Banner */}
      <div className="p-5 rounded-3xl bg-linear-to-r from-indigo-950 via-blue-950 to-slate-950 text-white shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-indigo-700">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-amber-300 shrink-0" />
            <h4 className="text-base sm:text-lg font-black text-white">
              अधिकृत एजंट पार्टनर बना आणि भरघोस २०% कमिशन मिळवा!
            </h4>
          </div>
          <p className="text-xs text-indigo-200 leading-relaxed max-w-2xl font-medium">
            आपल्या परिसरातील १२वी, MHT-CET, NEET व JEE विद्यार्थ्यांना ॲप रेफर करा. प्रत्येक ₹२९ नोंदणीवर <strong>₹५.८० थेट कमिशन</strong>. किमान ₹१०० पूर्ण होताच थेट बँक खात्यात / UPI मध्ये विड्रॉल!
          </p>
        </div>
        <button
          onClick={() => onNavigate("agent_portal")}
          className="px-5 py-3 rounded-2xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-lg shrink-0 transition-all cursor-pointer hover:scale-105"
        >
          <Users className="w-4 h-4 text-slate-950" />
          <span>एजंट पोर्टल उघडा</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
