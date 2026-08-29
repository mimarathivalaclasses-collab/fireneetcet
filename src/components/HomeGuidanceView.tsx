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

  // फक्त मुख्य अधिकृत अभ्यास आणि सराव पर्याय (No generated fake mock tests)
  const mainStudyOptions = [
    {
      id: "main-grand-tests",
      title: "🏆 ग्रँड टेस्ट्स (NEET १८० प्रश्न • ७२० गुण / CET)",
      desc: "NEET Full Mock Test (Physics 45, Chem 45, Botany 45, Zoology 45) + MHT-CET Full Shifts",
      action: () => onNavigate("grand_tests"),
      bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-700/60 hover:border-amber-500 shadow-xs",
      iconBg: "bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950",
      icon: Trophy,
      btnText: "ग्रँड टेस्ट द्या",
      btnColor: "bg-amber-500 hover:bg-amber-600 text-slate-950 font-black",
    },
    {
      id: "main-chapter-practice",
      title: "विषय व चॅप्टरनिहाय सराव",
      desc: "Physics, Chemistry, Maths व Bio चॅप्टरनुसार अधिकृत प्रश्न सराव",
      action: () => onNavigate("mock_test"),
      bg: "bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800 hover:border-blue-500",
      iconBg: "bg-blue-600 text-white",
      icon: Play,
      btnText: "सराव सुरू करा",
      btnColor: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    {
      id: "main-pyq",
      title: "मागील अधिकृत प्रश्नपत्रिका (PYQ)",
      desc: "२०१९ ते २०२५ पर्यंतचे सर्व अधिकृत बोर्ड व CET प्रश्न आणि उत्तरे",
      action: () => onNavigate("pyq"),
      bg: "bg-purple-50 dark:bg-purple-950/40 border-purple-200 dark:border-purple-800 hover:border-purple-500",
      iconBg: "bg-purple-600 text-white",
      icon: FileCheck,
      btnText: "PYQ सोडवा",
      btnColor: "bg-purple-600 hover:bg-purple-700 text-white",
    },
    {
      id: "main-notes",
      title: "रिव्हिजन नोट्स (Revision Notes)",
      desc: "सर्व विषयांच्या संक्षिप्त हाय-यिल्ड नोट्स आणि कन्सेप्ट्स",
      action: () => onNavigate("notes"),
      bg: "bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 hover:border-emerald-500",
      iconBg: "bg-emerald-600 text-white",
      icon: BookOpen,
      btnText: "नोट्स वाचा",
      btnColor: "bg-emerald-600 hover:bg-emerald-700 text-white",
    },
    {
      id: "main-formulas",
      title: "महत्त्वाची सूत्रे (Formulas & Tricks)",
      desc: "Physics, Chemistry व Maths सर्व आवश्यक सूत्रे व शॉर्ट ट्रिक्स",
      action: () => onNavigate("formulas"),
      bg: "bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 hover:border-amber-500",
      iconBg: "bg-amber-500 text-slate-950",
      icon: Zap,
      btnText: "सूत्रे पहा",
      btnColor: "bg-amber-500 hover:bg-amber-600 text-slate-950",
    },
  ];

  // साधी आणि सुटसुटीत इतर साधने
  const quickTools = [
    {
      title: "डिजिटल OMR",
      icon: CircleDot,
      action: () => onNavigate("omr"),
    },
    {
      title: "माझ्या चुकांची वही",
      icon: AlertTriangle,
      action: () => onNavigate("mistakes"),
    },
    {
      title: "PDF प्रिंट बँक",
      icon: Printer,
      action: () => onNavigate("pdf_bank"),
    },
    {
      title: "प्रश्नसंग्रह (MCQ)",
      icon: FileText,
      action: () => onNavigate("all_questions"),
    },
    {
      title: "रेफर करा & कमवा",
      icon: Gift,
      action: () => onNavigate("refer_earn"),
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-6 py-4 space-y-6 pb-24">
      {/* १. स्वच्छ व सोपे हेडर */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <span>नमस्कार, {currentUser?.name || "विद्यार्थी मित्र"}!</span>
            {currentUser && !isDemoUser ? (
              <span className="px-2 py-0.5 text-xs bg-emerald-100 text-emerald-800 rounded-full font-medium">
                सक्रिय
              </span>
            ) : null}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            कोणता सराव करायचा आहे ते निवडा:
          </p>
        </div>

        {/* परीक्षा स्विच बटन्स */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
          {(["MHT_CET", "NEET", "JEE"] as ExamType[]).map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => onSelectExam(ex)}
              className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                currentExam === ex
                  ? "bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900"
              }`}
            >
              {ex === "MHT_CET" ? "MHT-CET" : ex}
            </button>
          ))}
        </div>
      </div>

      {/* २. फक्त ४ मुख्य सराव कार्ड्स */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {mainStudyOptions.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={item.action}
              className={`p-5 rounded-2xl border-2 ${item.bg} transition-all duration-200 cursor-pointer hover:shadow-md flex flex-col justify-between`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${item.iconBg} shadow-sm`}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  क्लिक करा
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    item.action();
                  }}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${item.btnColor}`}
                >
                  <span>{item.btnText}</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* ३. इतर अभ्यास साधने */}
      <div className="space-y-3 pt-2">
        <h2 className="text-sm font-bold text-slate-700 dark:text-slate-300">
          इतर साधने:
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {quickTools.map((t, idx) => {
            const Icon = t.icon;
            return (
              <button
                key={idx}
                type="button"
                onClick={t.action}
                className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:border-indigo-500 hover:shadow-xs transition-all flex flex-col items-center justify-center text-center gap-1.5 cursor-pointer"
              >
                <Icon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                  {t.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
