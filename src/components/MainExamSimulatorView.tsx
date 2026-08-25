import React, { useState, useMemo } from "react";
import {
  Trophy,
  Timer,
  Play,
  Award,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Clock,
  Sparkles,
  BookOpen,
  Zap,
  Target,
  BarChart3,
  Sliders,
  Download,
  Printer,
  ChevronRight,
  Flame,
  ShieldCheck,
  Building,
  GraduationCap,
  Percent,
  Compass,
  ArrowRight,
  RotateCcw,
  Star,
  Info,
  ArrowLeft,
  Search,
} from "lucide-react";
import {
  ExamType,
  SubjectType,
  LanguageMode,
  Question,
  TestResultData,
  GrandMockTestItem,
} from "../types";
import {
  GRAND_MOCK_TESTS,
  ALL_GRAND_MOCK_TESTS,
  calculatePredictedRealExamScore,
  buildGrandMockQuestionSet,
} from "../data/grandMockTestsData";

interface MainExamSimulatorViewProps {
  currentExam: ExamType;
  language: LanguageMode;
  questions: Question[];
  testHistory: TestResultData[];
  onStartGrandTest: (config: {
    title: string;
    exam: ExamType;
    subject: SubjectType | "All";
    durationMinutes: number;
    questionCount: number;
    selectedQuestions: Question[];
  }) => void;
  onViewPastResult?: (result: TestResultData) => void;
  onBack?: () => void;
}

export const MainExamSimulatorView: React.FC<MainExamSimulatorViewProps> = ({
  currentExam,
  language,
  questions,
  testHistory,
  onStartGrandTest,
  onViewPastResult,
  onBack,
}) => {
  const [selectedExamFilter, setSelectedExamFilter] = useState<"All" | ExamType>("All");
  const [selectedDifficultyFilter, setSelectedDifficultyFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 12;

  const [activeInstructionModal, setActiveInstructionModal] = useState<GrandMockTestItem | null>(null);

  // Score Calculator Interactive Widget State
  const [calcExam, setCalcExam] = useState<ExamType>(currentExam);
  const [calcRawScore, setCalcRawScore] = useState<number>(
    currentExam === "NEET" ? 620 : currentExam === "MHT_CET" ? 155 : 175
  );

  // Filtered 100+ Grand Tests
  const filteredTests = useMemo(() => {
    return ALL_GRAND_MOCK_TESTS.filter((test) => {
      const matchExam = selectedExamFilter === "All" || test.exam === selectedExamFilter;
      const matchDiff =
        selectedDifficultyFilter === "All" || test.difficulty === selectedDifficultyFilter;
      const matchSearch =
        !searchQuery ||
        test.titleMr.toLowerCase().includes(searchQuery.toLowerCase()) ||
        test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (test.group && test.group.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchExam && matchDiff && matchSearch;
    });
  }, [selectedExamFilter, selectedDifficultyFilter, searchQuery]);

  const totalPages = Math.ceil(filteredTests.length / itemsPerPage) || 1;
  const paginatedTests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTests.slice(start, start + itemsPerPage);
  }, [filteredTests, currentPage, itemsPerPage]);

  // Find past attempts for each test
  const getTestPastResult = (testTitle: string): TestResultData | undefined => {
    return testHistory.find((h) => h.title.toLowerCase().includes(testTitle.toLowerCase()));
  };

  // Calculator Result
  const maxScoreForCalc = calcExam === "NEET" ? 720 : calcExam === "MHT_CET" ? 200 : 300;
  const calcPrediction = useMemo(() => {
    return calculatePredictedRealExamScore(calcExam, calcRawScore, maxScoreForCalc);
  }, [calcExam, calcRawScore, maxScoreForCalc]);

  const handleLaunchTest = (test: GrandMockTestItem) => {
    const generatedQuestions = buildGrandMockQuestionSet(test, questions);
    onStartGrandTest({
      title: test.titleMr,
      exam: test.exam,
      subject: "All",
      durationMinutes: test.durationMinutes,
      questionCount: test.totalQuestions,
      selectedQuestions: generatedQuestions,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-in fade-in">
      {/* 1. Hero Banner */}
      <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border border-indigo-500/20">
        <div className="absolute -right-16 -top-16 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-20 -bottom-20 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/30"
                title="मागे जा"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                <span>← मागे जा</span>
              </button>
            )}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 text-amber-300 text-xs font-bold border border-amber-500/30 shadow-xs">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>NTA व State CET Cell अधिकृत पॅटर्न सिम्युलेटर</span>
              <span className="bg-amber-400 text-slate-950 px-2 py-0.2 rounded-full text-[10px] font-black uppercase">
                100+ Grand Tests
              </span>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                मुख्य परीक्षा सिम्युलेटर (100+ Full Grand Tests)
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                प्रत्यक्ष परीक्षेसारखा हुबेहूब अनुभव देणारे १००+ ग्रँड पेपर्स! MHT-CET (PCM/PCB), NEET-UG आणि JEE Main चे रिअल शिफ्ट पेपर्स, निगेटिव्ह मार्किंग, अचूक टाइमर, राज्यस्तरीय संभाव्य रँक, पर्सेंटाईल व कॉलेज प्रवेशाचा अचूक अंदाज.
              </p>
            </div>

            {/* Quick Stats Pill */}
            <div className="grid grid-cols-3 gap-2 bg-white/5 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center shrink-0">
              <div className="px-2">
                <span className="text-[10px] text-slate-400 block font-semibold">एकूण ग्रँड पेपर्स</span>
                <span className="text-xl font-black text-amber-400 font-mono-numbers">110+ पेपर्स</span>
              </div>
              <div className="px-2 border-x border-white/10">
                <span className="text-[10px] text-slate-400 block font-semibold">पॅटर्न</span>
                <span className="text-xl font-black text-emerald-400 font-mono-numbers">१००% Real</span>
              </div>
              <div className="px-2">
                <span className="text-[10px] text-slate-400 block font-semibold">रँक प्रेडिक्शन</span>
                <span className="text-xl font-black text-cyan-300 font-mono-numbers">AI Enabled</span>
              </div>
            </div>
          </div>

          {/* Exam Badges Strip */}
          <div className="pt-3 flex flex-wrap items-center gap-2 border-t border-white/10 text-xs">
            <span className="text-slate-400 font-bold">समाविष्ट परीक्षा पॅटर्न:</span>
            <span className="px-2.5 py-1 rounded-lg bg-orange-500/20 text-orange-200 border border-orange-400/30 font-bold">
              🔥 MHT-CET (200 Marks • PCM / PCB)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 font-bold">
              🌿 NEET-UG (720 Marks • +4/-1)
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-200 border border-blue-400/30 font-bold">
              ⚡ JEE Main (300 Marks • +4/-1)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Interactive Real Exam Rank & Percentile Predictor Widget */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-900 to-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-indigo-500/30 shadow-xl space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-800/60 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
              <Percent className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-white">
                थेट संभाव्य रँक व पर्सेंटाईल कॅल्क्युलेटर (Live Rank & College Predictor)
              </h2>
              <p className="text-xs text-indigo-200">
                तुमचे अपेक्षित गुण निवडा आणि प्रत्यक्ष परीक्षेत मिळणारा अंदाजित पर्सेंटाईल व संभाव्य कॉलेज तपासा.
              </p>
            </div>
          </div>

          {/* Exam selector buttons */}
          <div className="flex items-center gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-indigo-700/50">
            {([
              { key: "MHT_CET" as ExamType, label: "MHT-CET" },
              { key: "NEET" as ExamType, label: "NEET" },
              { key: "JEE_MAIN" as ExamType, label: "JEE Main" },
            ]).map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setCalcExam(item.key);
                  if (item.key === "NEET") setCalcRawScore(620);
                  else if (item.key === "MHT_CET") setCalcRawScore(155);
                  else setCalcRawScore(175);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  calcExam === item.key
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "text-indigo-300 hover:text-white"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Slider & Dynamic Prediction Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Left: Interactive Score Slider */}
          <div className="lg:col-span-6 space-y-4 bg-slate-950/40 p-4 sm:p-5 rounded-2xl border border-indigo-800/40">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-300">
                {calcExam} चाचणीत मिळालेले अंदाजित गुण:
              </span>
              <div className="text-2xl font-black text-amber-400 font-mono-numbers">
                {calcRawScore}{" "}
                <span className="text-xs text-slate-400 font-normal">/ {maxScoreForCalc}</span>
              </div>
            </div>

            <input
              type="range"
              min={0}
              max={maxScoreForCalc}
              value={calcRawScore}
              onChange={(e) => setCalcRawScore(Number(e.target.value))}
              className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />

            <div className="flex justify-between text-[11px] text-slate-400 font-mono-numbers">
              <span>0 Marks</span>
              <span>
                {Math.round(maxScoreForCalc / 2)} Marks (50%)
              </span>
              <span>{maxScoreForCalc} Max</span>
            </div>
          </div>

          {/* Right: Predicted Results Box */}
          <div className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
              <span className="text-[11px] text-indigo-200 block font-semibold">अंदाजित पर्सेंटाईल</span>
              <div className="text-xl sm:text-2xl font-black text-emerald-400 font-mono-numbers mt-1">
                {calcPrediction.predictedPercentile}%
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center">
              <span className="text-[11px] text-indigo-200 block font-semibold">महाराष्ट्र राज्य रँक</span>
              <div className="text-base sm:text-lg font-black text-amber-300 font-mono-numbers mt-1">
                {calcPrediction.estimatedStateRank}
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 text-center col-span-2 sm:col-span-1">
              <span className="text-[11px] text-indigo-200 block font-semibold">All India रँक</span>
              <div className="text-base sm:text-lg font-black text-cyan-300 font-mono-numbers mt-1">
                {calcPrediction.estimatedAllIndiaRank}
              </div>
            </div>

            <div className="col-span-2 sm:col-span-3 bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-2xl flex items-center gap-2.5 text-xs text-emerald-200">
              <GraduationCap className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <strong className="text-white">संभाव्य कॉलेज प्रवेश: </strong>
                <span>{calcPrediction.admissionChance}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Filters & Search Bar */}
      <div className="space-y-3 bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="शिफ्ट, परीक्षा किंवा विषयानुसार शोधा (उदा. PCM Shift 1, NEET 720, JEE, COEP)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-xs text-slate-900 placeholder:text-slate-400 outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>

          <div className="text-xs font-bold text-slate-600 whitespace-nowrap">
            एकूण पेपर्स: <span className="text-indigo-600 font-extrabold">{filteredTests.length} पेपर्स उपलब्ध</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>पॅटर्न:</span>
            </span>

            {([
              { key: "All", label: "सर्व 110+ पेपर्स (All)" },
              { key: "MHT_CET", label: "MHT-CET (PCM/PCB)" },
              { key: "NEET", label: "NEET-UG (720 Marks)" },
              { key: "JEE_MAIN", label: "JEE Main (300 Marks)" },
            ] as const).map((item) => (
              <button
                key={item.key}
                onClick={() => {
                  setSelectedExamFilter(item.key as "All" | ExamType);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedExamFilter === item.key
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="text-xs text-slate-500 font-semibold">
              पान {currentPage} / {totalPages}
            </div>
          )}
        </div>
      </div>

      {/* 4. 100+ Grand Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedTests.map((test) => {
          const pastResult = getTestPastResult(test.titleMr) || getTestPastResult(test.title);

          return (
            <div
              key={test.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between space-y-5 relative overflow-hidden group hover:border-indigo-400"
            >
              {/* Top Strip */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-700 text-white flex items-center justify-center font-black text-sm shadow-md shrink-0">
                    #{test.testNumber < 10 ? `0${test.testNumber}` : test.testNumber}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                          test.exam === "MHT_CET" || test.exam === "MHT-CET"
                            ? "bg-orange-100 text-orange-800 border border-orange-200"
                            : test.exam === "NEET"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                        }`}
                      >
                        {test.exam} {test.group ? `(${test.group})` : ""}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                        {test.difficulty}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 mt-1 leading-snug group-hover:text-indigo-600 transition-colors">
                      {test.titleMr}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setActiveInstructionModal(test)}
                  title="नियम व सूचना पहा"
                  className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 flex items-center justify-center transition-all cursor-pointer shrink-0"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                {test.descriptionMr}
              </p>

              {/* Stats Strip */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 p-3 rounded-2xl border border-slate-100 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">एकूण गुण</span>
                  <span className="text-sm font-black text-slate-900 font-mono-numbers">
                    {test.totalMarks} Marks
                  </span>
                </div>
                <div className="border-x border-slate-200">
                  <span className="text-[10px] text-slate-400 block font-medium">कालावधी</span>
                  <span className="text-sm font-black text-indigo-700 font-mono-numbers">
                    {test.durationMinutes} मि.
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">एकूण प्रश्न</span>
                  <span className="text-sm font-black text-emerald-700 font-mono-numbers">
                    {test.totalQuestions} प्रश्न
                  </span>
                </div>
              </div>

              {/* Target & Marking Rule */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/70 border border-amber-200/60 text-amber-900">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Target className="w-3.5 h-3.5 text-amber-600" />
                    <span>लक्ष्य पर्सेंटाईल:</span>
                  </div>
                  <span className="font-extrabold text-amber-800">{test.targetPercentileGoal}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 px-1">
                  <span>
                    मार्क पद्धत:{" "}
                    <strong className="text-slate-800">
                      +{test.markingScheme.correct} बरोबर{" "}
                      {test.markingScheme.mathsCorrect ? `(Maths +${test.markingScheme.mathsCorrect}) ` : ""}
                      {test.markingScheme.incorrect !== 0
                        ? `| ${test.markingScheme.incorrect} चूक`
                        : "| No Negative"}
                    </strong>
                  </span>
                  <span className="text-emerald-700 font-semibold">
                    {test.subjectsIncluded.join(" • ")}
                  </span>
                </div>
              </div>

              {/* Past attempt badge if exists */}
              {pastResult && (
                <div className="p-3 rounded-2xl bg-indigo-50/80 border border-indigo-200 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
                    <div className="text-xs">
                      <span className="text-indigo-900 font-bold">मागील स्कोअर: </span>
                      <strong className="text-indigo-700 font-mono-numbers">
                        {pastResult.score}/{pastResult.maxMarks} ({pastResult.percentage}%)
                      </strong>
                    </div>
                  </div>
                  {onViewPastResult && (
                    <button
                      onClick={() => onViewPastResult(pastResult)}
                      className="text-[11px] font-bold text-indigo-600 hover:underline cursor-pointer"
                    >
                      निकाल पहा →
                    </button>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  id={`btn-start-grand-test-${test.testNumber}`}
                  onClick={() => handleLaunchTest(test)}
                  className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white font-extrabold text-xs sm:text-sm shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer group-hover:scale-[1.01]"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>
                    {pastResult ? "पुन्हा परीक्षा द्या (Re-take Test)" : "मुख्य परीक्षा सुरू करा (Start Exam)"}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer shadow-xs"
          >
            ← मागील पान
          </button>

          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(totalPages, 7) }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-xl text-xs font-black transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            {totalPages > 7 && (
              <span className="text-xs text-slate-400 font-bold px-1">... {totalPages}</span>
            )}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 cursor-pointer shadow-xs"
          >
            पुढील पान →
          </button>
        </div>
      )}

      {/* 5. Real Exam Instructions Modal */}
      {activeInstructionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">
                    {activeInstructionModal.titleMr}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {activeInstructionModal.exam} अधिकृत परीक्षा नियमावली व स्वरूप
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveInstructionModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 flex items-center justify-center cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            {/* Instructions list */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                महत्त्वाच्या सूचना (Exam Instructions):
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {activeInstructionModal.instructionsMr.map((inst, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target colleges */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <div className="font-bold text-slate-900 flex items-center gap-1.5">
                <Building className="w-4 h-4 text-indigo-600" />
                <span>संभाव्य टार्गेट कॉलेजेस (Target Colleges):</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeInstructionModal.predictedCollegeTargets.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-700 text-[11px] font-medium"
                  >
                    🏛️ {c}
                  </span>
                ))}
              </div>
            </div>

            {/* Modal Buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setActiveInstructionModal(null)}
                className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                बंद करा (Close)
              </button>

              <button
                onClick={() => {
                  const targetTest = activeInstructionModal;
                  setActiveInstructionModal(null);
                  handleLaunchTest(targetTest);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>आत्ताच परीक्षा सुरू करा (Start Exam Now)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
