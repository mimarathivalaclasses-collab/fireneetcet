import React from "react";
import {
  BookOpen,
  Play,
  Zap,
  FileText,
  FileCheck,
  ChevronRight,
  CircleDot,
  AlertTriangle,
  Printer,
  Gift,
  Trophy,
  Target,
  Sparkles,
  Award,
  Clock,
  ArrowRight,
} from "lucide-react";
import { ExamType, LanguageMode, NavigationTab, StudentUser } from "../types";

interface HomeGuidanceViewProps {
  currentExam: ExamType;
  onSelectExam: (exam: ExamType) => void;
  language: LanguageMode;
  onNavigate: (tab: NavigationTab) => void;
  currentUser?: StudentUser | null;
  trialSecondsRemaining?: number;
  onOpenAdminDashboard?: () => void;
}

export const HomeGuidanceView: React.FC<HomeGuidanceViewProps> = ({
  currentExam,
  onSelectExam,
  onNavigate,
  currentUser,
}) => {
  const isDemoUser = currentUser?.id?.startsWith("demo_user_");
  const hasTestActivity = (currentUser?.totalTestsTaken || 0) > 0;

  // फक्त मुख्य अधिकृत अभ्यास आणि सराव पर्याय (Clean, accessible, direct)
  const mainStudyOptions = [
    {
      id: "main-grand-tests",
      title: "🏆 ग्रँड टेस्ट्स (Full Exam Mock)",
      subBadge: currentExam === "NEET" ? "१८० प्रश्न • ७२० गुण" : "पूर्ण शिफ्ट्स • १०० MCQs",
      desc: currentExam === "NEET"
        ? "NEET पॅटर्न: Physics 45, Chem 45, Botany 45, Zoology 45"
        : "MHT-CET / JEE पॅटर्न: PCM व PCB संपूर्ण मॉक टेस्ट्स",
      action: () => onNavigate("grand_tests"),
      bg: "bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60 hover:border-amber-500 shadow-xs",
      iconBg: "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950",
      icon: Trophy,
      btnText: "ग्रँड टेस्ट सुरू करा",
      btnColor: "bg-amber-500 hover:bg-amber-600 text-slate-950 font-black",
    },
    {
      id: "main-chapter-practice",
      title: "🎯 चॅप्टरनिहाय सराव (Chapter MCQs)",
      subBadge: "विषयानुसार अधिकृत प्रश्न",
      desc: "Physics, Chemistry, Maths व Biology चॅप्टरनुसार प्रश्न सोडवा व सराव करा",
      action: () => onNavigate("mock_test"),
      bg: "bg-blue-50/80 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 hover:border-blue-500 shadow-xs",
      iconBg: "bg-blue-600 text-white",
      icon: Play,
      btnText: "सराव सुरू करा",
      btnColor: "bg-blue-600 hover:bg-blue-700 text-white font-bold",
    },
    {
      id: "main-notes",
      title: "📚 रिव्हिजन नोट्स (Revision Notes)",
      subBadge: "हाय-यिल्ड मुद्दे & ट्रिक्स",
      desc: "सर्व विषयांचे संक्षिप्त पॉईंट्स, कन्सेप्ट्स व फॉर्म्युला टेबल्स",
      action: () => onNavigate("notes"),
      bg: "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 hover:border-emerald-500 shadow-xs",
      iconBg: "bg-emerald-600 text-white",
      icon: BookOpen,
      btnText: "नोट्स वाचा",
      btnColor: "bg-emerald-600 hover:bg-emerald-700 text-white font-bold",
    },
    {
      id: "main-pyq",
      title: "📝 मागील प्रश्नपत्रिका (PYQs 2019-2025)",
      subBadge: "अधिकृत बोर्ड व CET प्रश्न",
      desc: "मागील वर्षांमध्ये विचारलेले सर्व अस्सल प्रश्न आणि त्यांचे स्पष्टीकरण",
      action: () => onNavigate("pyq"),
      bg: "bg-purple-50/80 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 hover:border-purple-500 shadow-xs",
      iconBg: "bg-purple-600 text-white",
      icon: FileCheck,
      btnText: "PYQ सोडवा",
      btnColor: "bg-purple-600 hover:bg-purple-700 text-white font-bold",
    },
    {
      id: "main-formulas",
      title: "⚡ महत्त्वाची सूत्रे (Formulas & Tricks)",
      subBadge: "क्विक रिव्हिजन शीट",
      desc: "Physics, Chemistry व Maths सर्व आवश्यक सूत्रे एका क्लिकवर",
      action: () => onNavigate("formulas"),
      bg: "bg-orange-50/80 dark:bg-orange-950/40 border-orange-200 dark:border-orange-800 hover:border-orange-500 shadow-xs",
      iconBg: "bg-orange-500 text-white",
      icon: Zap,
      btnText: "सूत्रे पहा",
      btnColor: "bg-orange-500 hover:bg-orange-600 text-white font-bold",
    },
  ];

  // साधी आणि सुटसुटीत इतर साधने
  const quickTools = [
    {
      title: "डिजिटल OMR",
      icon: CircleDot,
      desc: "OMR शीटवर गोल रंगवण्याचा सराव",
      action: () => onNavigate("omr"),
    },
    {
      title: "माझ्या चुकांची वही",
      icon: AlertTriangle,
      desc: "चुकलेल्या प्रश्नांचा पुन्हा सराव",
      action: () => onNavigate("mistakes"),
    },
    {
      title: "PDF प्रिंट बँक",
      icon: Printer,
      desc: "ऑफलाईन प्रॅक्टिससाठी PDF प्रिंट",
      action: () => onNavigate("pdf_bank"),
    },
    {
      title: "प्रश्नसंग्रह (MCQs)",
      icon: FileText,
      desc: "हजारो प्रश्नांचा मोठा संग्रह",
      action: () => onNavigate("all_questions"),
    },
    {
      title: "रेफर करा & कमवा",
      icon: Gift,
      desc: "मित्रांना जोडा आणि मिळवा कमिशन",
      action: () => onNavigate("refer_earn"),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-5 pb-24">
      {/* १. Study Center Hero Banner with Welcome & Quick Target Selector */}
      <div className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-950 to-blue-950 text-white rounded-3xl p-5 sm:p-7 shadow-lg border border-indigo-800/40">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-1/3 -mb-10 w-48 h-48 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-black border border-white/15">
              <Sparkles className="w-3.5 h-3.5" />
              <span>महाराष्ट्र अधिकृत स्टडी सेंटर & टेस्ट पोर्टल</span>
            </div>
            
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white leading-tight">
              नमस्ते, {currentUser?.name || "विद्यार्थी मित्र"}! 👋
            </h1>
            
            <p className="text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              MHT-CET, NEET व JEE परीक्षेसाठी १० अस्सल ग्रँड टेस्ट्स, चॅप्टरवाईज सराव आणि हाय-यिल्ड रिव्हिजन नोट्स.
            </p>

            {currentUser && !isDemoUser && (
              <div className="inline-flex items-center gap-2 pt-1 text-xs font-bold text-emerald-300">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>विद्यार्थी सदस्यत्व: सक्रिय (Full Access Unlocked)</span>
              </div>
            )}
          </div>

          {/* Exam Selection Badge Selector */}
          <div className="bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 flex flex-col gap-2 shrink-0">
            <span className="text-[11px] font-bold text-indigo-200 uppercase tracking-wider text-center">
              लक्ष्य परीक्षा निवडा:
            </span>
            <div className="flex items-center gap-1.5">
              {(["MHT_CET", "NEET", "JEE"] as ExamType[]).map((ex) => (
                <button
                  key={ex}
                  type="button"
                  onClick={() => onSelectExam(ex)}
                  className={`px-3.5 py-2 text-xs font-black rounded-xl transition-all cursor-pointer ${
                    currentExam === ex
                      ? "bg-amber-400 text-slate-950 shadow-md scale-105"
                      : "bg-white/10 text-white hover:bg-white/20"
                  }`}
                >
                  {ex === "MHT_CET" ? "🎯 MHT-CET" : ex === "NEET" ? "🩺 NEET" : "⚡ JEE"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Student Test Performance Tracker inside Hero */}
        {currentUser && hasTestActivity && (
          <div className="mt-5 pt-4 border-t border-white/15 grid grid-cols-3 gap-2 sm:gap-4 text-center">
            <div className="bg-white/5 rounded-xl p-2.5 backdrop-blur-xs border border-white/10">
              <span className="block text-[11px] text-indigo-200 font-medium">एकूण सोडवलेले प्रश्न</span>
              <strong className="text-base sm:text-lg font-black text-amber-300 font-mono-numbers">
                {currentUser.totalQuestionsSolved || 0}
              </strong>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 backdrop-blur-xs border border-white/10">
              <span className="block text-[11px] text-indigo-200 font-medium">एकूण अचूकता</span>
              <strong className="text-base sm:text-lg font-black text-emerald-300 font-mono-numbers">
                {currentUser.overallAccuracy || 0}%
              </strong>
            </div>
            <div className="bg-white/5 rounded-xl p-2.5 backdrop-blur-xs border border-white/10">
              <span className="block text-[11px] text-indigo-200 font-medium">पूर्ण झालेल्या टेस्ट्स</span>
              <strong className="text-base sm:text-lg font-black text-white font-mono-numbers">
                {currentUser.totalTestsTaken || 0}
              </strong>
            </div>
          </div>
        )}
      </div>

      {/* ३. मुख्य सराव कार्ड्स (Clean & Spacious) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {mainStudyOptions.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={item.action}
              className={`p-4 sm:p-5 rounded-2xl border-2 ${item.bg} transition-all duration-200 cursor-pointer hover:shadow-md flex flex-col justify-between`}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg} shadow-xs`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                      {item.title}
                    </h2>
                  </div>
                  <span className="inline-block mt-0.5 text-[10px] font-bold px-2 py-0.5 bg-white/80 dark:bg-slate-800/80 rounded-md text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {item.subBadge}
                  </span>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="mt-3.5 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                  सराव सुरू करा
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    item.action();
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 cursor-pointer ${item.btnColor}`}
                >
                  <span>{item.btnText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ४. इतर अभ्यास साधने */}
      <div className="space-y-2.5 pt-1">
        <h2 className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400">
          इतर उपयुक्त साधने:
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {quickTools.map((t, idx) => {
            const Icon = t.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={t.action}
                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl hover:border-indigo-400 hover:shadow-xs transition-all flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {t.title}
                </span>
                <span className="text-[10px] text-slate-400 dark:text-slate-500 line-clamp-1">
                  {t.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

