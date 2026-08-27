import React, { useState, useMemo } from "react";
import {
  Timer,
  Play,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  BookOpen,
  Award,
  Zap,
  Flame,
  Target,
  Shuffle,
  ShieldAlert,
  ArrowRight,
  Layers,
  Check,
  Cpu,
  BarChart2,
  ArrowLeft,
  Filter,
  History,
  TrendingUp,
  Tag,
  Star,
  FileText,
} from "lucide-react";
import { ExamType, SubjectType, Question, LanguageMode, MistakeItem, TestResultData } from "../types";
import { CHAPTERS_DATA, getSubjectsForExam, getMarkingScheme, ChapterInfo } from "../data/chaptersData";
import { buildGuaranteedNonRepeatingMock } from "../utils/proceduralQuestionEngine";

interface MockTestSetupProps {
  currentExam: ExamType;
  questions: Question[];
  language: LanguageMode;
  mistakes?: MistakeItem[];
  practiceStats?: {
    totalAttempted: number;
    totalCorrect: number;
    totalWrong: number;
    subjectWise: Record<string, { attempted: number; correct: number }>;
  };
  testHistory?: TestResultData[];
  onStartTest: (config: {
    title: string;
    exam: ExamType;
    subject: SubjectType | "All";
    chapterFilter: string;
    durationMinutes: number;
    questionCount: number;
    selectedQuestions: Question[];
  }) => void;
  onOpenAiGenerator: () => void;
  onBack?: () => void;
  onViewResult?: (res: TestResultData) => void;
}

export const MockTestSetup: React.FC<MockTestSetupProps> = ({
  currentExam,
  questions,
  language,
  mistakes = [],
  practiceStats,
  testHistory = [],
  onStartTest,
  onOpenAiGenerator,
  onBack,
  onViewResult,
}) => {
  // 3 Primary Tabs as requested: 'latest' | 'category' | 'result'
  const [activeMainTab, setActiveMainTab] = useState<"latest" | "category" | "result">("latest");

  // Category Tab Sub-States
  const [selectedSubjectCategory, setSelectedSubjectCategory] = useState<SubjectType>("Physics");
  const [selectedMarkTier, setSelectedMarkTier] = useState<number>(30);
  const [selectedCategoryChapter, setSelectedCategoryChapter] = useState<string>("All");

  const availableSubjects = useMemo(() => getSubjectsForExam(currentExam), [currentExam]);

  // Ensure selected subject is valid for current exam
  const currentCategorySubject = useMemo(() => {
    if (availableSubjects.includes(selectedSubjectCategory)) return selectedSubjectCategory;
    return availableSubjects[0] || "Physics";
  }, [availableSubjects, selectedSubjectCategory]);

  const categoryChapters = useMemo(() => {
    return CHAPTERS_DATA.filter((ch) => {
      const matchExam = ch.exams.includes(currentExam);
      const matchSubject = ch.subject === currentCategorySubject;
      return matchExam && matchSubject;
    });
  }, [currentExam, currentCategorySubject]);

  // Tier duration helper
  const getDurationForTier = (count: number): number => {
    switch (count) {
      case 10:
        return 15;
      case 20:
        return 25;
      case 30:
        return 40;
      case 50:
        return 60;
      case 70:
        return 90;
      case 90:
        return 110;
      case 100:
        return 120;
      default:
        return Math.max(15, Math.round(count * 1.25));
    }
  };

  // Launch Category Mock Test
  const handleLaunchCategoryTest = (
    subject: SubjectType,
    chapter: string,
    count: number
  ) => {
    const duration = getDurationForTier(count);
    const chosen = buildGuaranteedNonRepeatingMock(
      currentExam,
      subject,
      chapter,
      count,
      questions
    );

    const chapterDisplayName = chapter === "All" ? `All ${subject} Chapters` : chapter;
    const testTitle = `${currentExam} ${subject}: ${chapterDisplayName} (${count} MCQs / ${count} Marks - ${duration} Mins)`;

    onStartTest({
      title: testTitle,
      exam: currentExam,
      subject,
      chapterFilter: chapter,
      durationMinutes: duration,
      questionCount: chosen.length,
      selectedQuestions: chosen,
    });
  };

  // Pre-configured Latest Mock Tests List
  const latestMockTests = useMemo(() => {
    const isPCM = currentExam === "JEE_MAIN" || currentExam === "MHT_CET";
    const subjects = availableSubjects;

    const list = [
      {
        id: "mock-net-cet-jee-demo",
        title: "JEE / CET / NET Mock Test (५ नमुना प्रश्न · ४५ मिनिटे टायमर)",
        subtitle: "भौतिकशास्त्र, रसायनशास्त्र, गणित व NET अभियोग्यता वरील विशेष ५ प्रश्नांची रियल-टाइम CBT चाचणी",
        category: "Demo & Special",
        subject: "All" as const,
        chapter: "All",
        questionsCount: 5,
        durationMinutes: 45,
        totalMarks: 20,
        difficulty: "Real Exam Exact",
        attemptCount: 3450,
        badge: "Featured CBT",
      },
      {
        id: "mock-full-s1",
        title: `${currentExam} संपूर्ण अभ्यासक्रम महा-चाचणी (Full Syllabus Grand Mock - Set 1)`,
        subtitle: "संपूर्ण इयत्ता ११वी व १२वी सर्व विषयांचा एकत्रित सराव",
        category: "Full Syllabus",
        subject: "All" as const,
        chapter: "All",
        questionsCount: currentExam === "NEET" ? 180 : currentExam === "JEE_MAIN" ? 75 : 150,
        durationMinutes: currentExam === "NEET" ? 180 : currentExam === "JEE_MAIN" ? 180 : 180,
        totalMarks: currentExam === "NEET" ? 720 : currentExam === "JEE_MAIN" ? 300 : 200,
        difficulty: "Real Exam Exact",
        attemptCount: 1420,
        badge: "High Yield",
      },
      {
        id: "mock-physics-grand",
        title: `${currentExam} Physics स्पेशल चॅलेंजर चाचणी (Full Physics Mock)`,
        subtitle: "मेकॅनिक्स, इलेक्ट्रोडायनामिक्स व ऑप्टिक्स वरील सर्वोत्कृष्ट प्रश्न",
        category: "Physics",
        subject: "Physics" as SubjectType,
        chapter: "All",
        questionsCount: 50,
        durationMinutes: 60,
        totalMarks: 50,
        difficulty: "Moderate to Hard",
        attemptCount: 980,
        badge: "Trending",
      },
      {
        id: "mock-chemistry-grand",
        title: `${currentExam} Chemistry संपूर्ण स्कोअर बूस्टर (Organic + Inorganic + Physical)`,
        subtitle: "रिएक्शन्स, फॉर्म्युला व NCERT आधारित थिअरी प्रश्न",
        category: "Chemistry",
        subject: "Chemistry" as SubjectType,
        chapter: "All",
        questionsCount: 50,
        durationMinutes: 60,
        totalMarks: 50,
        difficulty: "Real Exam Exact",
        attemptCount: 1150,
        badge: "Score Booster",
      },
      {
        id: isPCM ? "mock-maths-grand" : "mock-bio-grand",
        title: isPCM
          ? `${currentExam} Mathematics हाय-स्पीड चाचणी (Calculus & Algebra)`
          : `${currentExam} Biology 360/360 बॉटनी व झूलॉजी स्पेशल`,
        subtitle: isPCM
          ? "कॅल्क्युलस, व्हेक्टर्स व ३D भूमिती वरील २ गुणांचे प्रश्न"
          : "NCERT लाइन-बाय-लाइन प्रश्न व आकृत्यांवर आधारित प्रश्न",
        category: isPCM ? "Mathematics" : "Biology",
        subject: (isPCM ? "Mathematics" : "Biology") as SubjectType,
        chapter: "All",
        questionsCount: isPCM ? 50 : 90,
        durationMinutes: isPCM ? 90 : 90,
        totalMarks: isPCM ? 100 : 360,
        difficulty: "High Rank Challenger",
        attemptCount: 1640,
        badge: "Must Attempt",
      },
      {
        id: "mock-quick-30",
        title: `${currentExam} ३० मिनिटे डेली स्पीड चॅलेंज (Daily Speed Test)`,
        subtitle: "वेळेचे अचूक नियोजन आणि उच्च अचूकतेसाठी वेगवान चाचणी",
        category: "Speed Test",
        subject: "All" as const,
        chapter: "All",
        questionsCount: 30,
        durationMinutes: 30,
        totalMarks: 30,
        difficulty: "Moderate",
        attemptCount: 2310,
        badge: "Daily Challenge",
      },
    ];

    return list;
  }, [currentExam, availableSubjects]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-4 sm:py-6 space-y-6 animate-in fade-in">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-100 text-blue-700">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                {currentExam} मॉक टेस्ट सेंटर (Mock Test Hub)
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                नवीन चाचण्या, घटकनिहाय सराव व मागील निकालांचे संपूर्ण विश्लेषण
              </p>
            </div>
          </div>
        </div>

        {onBack && (
          <button
            onClick={onBack}
            className="px-3.5 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-xs font-bold text-slate-700 flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>मागे जा</span>
          </button>
        )}
      </div>

      {/* 3 Main Reference Tabs: Latest | Category | Result */}
      <div className="flex items-center bg-slate-200/80 p-1 rounded-2xl gap-1">
        <button
          onClick={() => setActiveMainTab("latest")}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMainTab === "latest"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Latest (नवीन चाचण्या)</span>
        </button>

        <button
          onClick={() => setActiveMainTab("category")}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMainTab === "category"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Category (घटकनिहाय)</span>
        </button>

        <button
          onClick={() => setActiveMainTab("result")}
          className={`flex-1 py-2.5 rounded-xl text-xs sm:text-sm font-black transition-all flex items-center justify-center gap-2 cursor-pointer ${
            activeMainTab === "result"
              ? "bg-white text-blue-700 shadow-sm"
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <BarChart2 className="w-4 h-4 text-emerald-600" />
          <span>Result (निकाल व विश्लेषण)</span>
          {testHistory.length > 0 && (
            <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 font-mono-numbers">
              {testHistory.length}
            </span>
          )}
        </button>
      </div>

      {/* TAB 1: LATEST TESTS */}
      {activeMainTab === "latest" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>उपलब्ध ताज्या सराव चाचण्या ({latestMockTests.length})</span>
            </h3>
            <button
              onClick={onOpenAiGenerator}
              className="text-xs font-bold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 cursor-pointer"
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>AI चाचणी जनरेटर</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {latestMockTests.map((test) => {
              // Check if user has attempted this test before in testHistory
              const pastAttempt = testHistory.find((th) => th.title.includes(test.title) || th.title.includes(test.category));

              return (
                <div
                  key={test.id}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-md transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2">
                    {/* Badges Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-black uppercase tracking-wider bg-blue-100 text-blue-900 border border-blue-200">
                          {test.category}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                          {test.difficulty}
                        </span>
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          ⭐ {test.badge}
                        </span>
                      </div>

                      {/* Attempt Status Badge */}
                      {pastAttempt ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-emerald-100 text-emerald-900 border border-emerald-300 flex items-center gap-1 font-mono-numbers">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          गुण: {pastAttempt.score}/{pastAttempt.maxMarks}
                        </span>
                      ) : (
                        <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-600 border border-slate-200">
                          Not Attempted
                        </span>
                      )}
                    </div>

                    {/* Title */}
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-slate-900 leading-snug">
                        {test.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                        {test.subtitle}
                      </p>
                    </div>

                    {/* Meta info tags */}
                    <div className="flex items-center gap-3 text-xs text-slate-600 pt-1 font-medium font-mono-numbers">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        {test.durationMinutes} मिनिटे
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Target className="w-3.5 h-3.5 text-slate-400" />
                        {test.questionsCount} प्रश्न
                      </span>
                      <span>•</span>
                      <span className="text-slate-500">
                        {test.attemptCount.toLocaleString()}+ विद्यार्थ्यांनी सोडवली
                      </span>
                    </div>
                  </div>

                  {/* Start Button */}
                  <button
                    onClick={() => {
                      let chosen: typeof questions = [];
                      if (test.id === "mock-net-cet-jee-demo") {
                        const netCetJeeQuestions = questions.filter((q) => q.id.startsWith("net_cet_jee_"));
                        if (netCetJeeQuestions.length > 0) {
                          chosen = netCetJeeQuestions;
                        }
                      }
                      if (chosen.length === 0) {
                        const count = Math.min(test.questionsCount, questions.length);
                        chosen = buildGuaranteedNonRepeatingMock(
                          currentExam,
                          test.subject,
                          test.chapter,
                          count,
                          questions
                        );
                      }
                      onStartTest({
                        title: test.title,
                        exam: currentExam,
                        subject: test.subject,
                        chapterFilter: test.chapter,
                        durationMinutes: test.durationMinutes,
                        questionCount: chosen.length,
                        selectedQuestions: chosen,
                      });
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-101"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    <span>{pastAttempt ? "पुन्हा चाचणी द्या (Re-attempt)" : "चाचणी सुरू करा (Start Test)"}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: CATEGORY / TOPIC-WISE TESTS */}
      {activeMainTab === "category" && (
        <div className="space-y-5">
          {/* Subject Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {availableSubjects.map((sub) => (
              <button
                key={sub}
                onClick={() => {
                  setSelectedSubjectCategory(sub);
                  setSelectedCategoryChapter("All");
                }}
                className={`px-4 py-2 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer ${
                  currentCategorySubject === sub
                    ? "bg-slate-900 text-white shadow-sm"
                    : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {/* Mark Tier Buttons */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs space-y-2">
            <label className="text-xs font-bold text-slate-700 block">
              प्रश्नांची संख्या व गुण निवडा (Select Question Tier):
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {[10, 20, 30, 50, 70, 100].map((tier) => (
                <button
                  key={tier}
                  onClick={() => setSelectedMarkTier(tier)}
                  className={`py-2 px-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                    selectedMarkTier === tier
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  {tier} MCQs ({getDurationForTier(tier)} Min)
                </button>
              ))}
            </div>
          </div>

          {/* Chapter Wise List */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-black text-slate-900">
                {currentCategorySubject} मधील घटक (Chapters)
              </h3>
              <button
                onClick={() => handleLaunchCategoryTest(currentCategorySubject, "All", selectedMarkTier)}
                className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>सर्व घटकांची एकत्र चाचणी</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {categoryChapters.map((ch, idx) => (
                <div
                  key={`${ch.name}_${idx}`}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-bold bg-slate-100 text-slate-700">
                        {ch.subject}
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-emerald-100 text-emerald-900">
                        {ch.weightage} Weightage
                      </span>
                    </div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 mt-2 leading-tight">
                      {ch.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5">{ch.nameMr}</p>
                  </div>

                  <button
                    onClick={() => handleLaunchCategoryTest(currentCategorySubject, ch.name, selectedMarkTier)}
                    className="w-full py-2 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-blue-200 transition-colors cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>{selectedMarkTier} गुणांची चाचणी सुरू करा</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RESULTS & HISTORY */}
      {activeMainTab === "result" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">
              सोडवलेल्या सर्व चाचण्यांचा निकाल व विश्लेषण ({testHistory.length})
            </h3>
          </div>

          {testHistory.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-3xl border border-dashed border-slate-300 space-y-3">
              <History className="w-12 h-12 text-slate-400 mx-auto" />
              <h4 className="text-base font-bold text-slate-800">अद्याप कोणतीही चाचणी सोडवलेली नाही</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                नवीन चाचणी निवडून ती पूर्ण करा. तुमचा निकाल, अचूकता व विषयानुसार गुण येथे विश्लेषित दिसतील.
              </p>
              <button
                onClick={() => setActiveMainTab("latest")}
                className="px-4 py-2 rounded-xl bg-blue-600 text-white font-bold text-xs shadow-sm"
              >
                नवीन चाचणी सुरू करा
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {testHistory.map((res, index) => (
                <div
                  key={`${res.testId || "test"}_${res.completedAt || index}_${index}`}
                  className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-black bg-blue-100 text-blue-900">
                        {res.exam}
                      </span>
                      <span className="text-xs text-slate-400 font-mono-numbers">
                        {new Date(res.completedAt).toLocaleDateString("mr-IN", {
                          day: "numeric",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <h4 className="text-sm sm:text-base font-black text-slate-900">{res.title}</h4>
                    <div className="flex items-center gap-3 text-xs text-slate-600 font-medium font-mono-numbers pt-1">
                      <span>अचूकता: <strong className="text-emerald-600">{res.accuracy}%</strong></span>
                      <span>•</span>
                      <span>बरोबर: <strong className="text-emerald-600">{res.correct}</strong></span>
                      <span>•</span>
                      <span>चूक: <strong className="text-rose-600">{res.wrong}</strong></span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="text-right">
                      <div className="text-lg sm:text-xl font-black text-slate-900 font-mono-numbers">
                        {res.score} / {res.maxMarks}
                      </div>
                      <span className="text-[11px] text-slate-500 font-bold font-mono-numbers">
                        {res.percentage}% गुण
                      </span>
                    </div>

                    {onViewResult && (
                      <button
                        onClick={() => onViewResult(res)}
                        className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        विश्लेषण बघा
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
