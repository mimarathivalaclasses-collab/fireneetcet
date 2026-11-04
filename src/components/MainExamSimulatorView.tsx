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
  NEET_180_GRAND_TEST_ITEM,
  NEET_180_FULL_QUESTIONS,
  SPECIAL_1_GRAND_TEST_ITEM,
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
      title: test.title,
      exam: test.exam,
      subject: "All",
      durationMinutes: test.durationMinutes,
      questionCount: test.totalQuestions,
      selectedQuestions: generatedQuestions,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8 animate-in fade-in">
      {/* Clean Student Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          {onBack && (
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer"
              title="Go back"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}
          <div>
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-6 h-6 text-amber-500" />
              <span>🏆 Grand Tests (Full Length Mock Tests)</span>
            </h1>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Official full-length practice papers for NEET (180 Qs • 720 Marks), MHT-CET, and JEE Main
            </p>
          </div>
        </div>
      </div>

      {/* Featured Test Banners */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Special 1 (100 Questions PCMB Grand Test) */}
        <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 rounded-3xl p-6 border-2 border-indigo-500/50 shadow-2xl text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 fill-slate-950" />
                🔥 Special 1 (Combined 100 Qs)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/30 border border-indigo-400/40 text-indigo-200 text-[10px] font-black">
                MHT-CET / NEET / JEE
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-slate-300 text-[10px] font-bold">
                120 Min • 100 Qs
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              ⭐ Special 1 Grand Mock Test (100 Questions)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Physics (25 Qs), Chemistry (25 Qs), Biology (25 Qs), Maths (25 Qs). A premium set of 100 high-quality questions with accurate explanations!
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs text-indigo-200">
              <span className="flex items-center gap-1 font-semibold bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                Physics 25
              </span>
              <span className="flex items-center gap-1 font-semibold bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                Chemistry 25
              </span>
              <span className="flex items-center gap-1 font-semibold bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                Biology 25
              </span>
              <span className="flex items-center gap-1 font-semibold bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" />
                Maths 25
              </span>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-2.5 pt-5">
            <button
              onClick={() => handleLaunchTest(SPECIAL_1_GRAND_TEST_ITEM)}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-98"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start Special 1 Test →</span>
            </button>
            <button
              onClick={() => setActiveInstructionModal(SPECIAL_1_GRAND_TEST_ITEM)}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-white/20"
            >
              <Info className="w-3.5 h-3.5 text-indigo-300" />
              <span>Rules</span>
            </button>
          </div>
        </div>

        {/* Featured NEET 180 Questions Official Mock Banner */}
        <div className="bg-gradient-to-br from-emerald-950 via-slate-900 to-teal-950 rounded-3xl p-6 border-2 border-emerald-500/50 shadow-2xl text-white relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-emerald-500 text-slate-950 text-[11px] font-black uppercase tracking-wider flex items-center gap-1 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                🌿 NEET Official (180 Qs / 720 Marks)
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black">
                +4 / -1 Marking
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-emerald-200 text-[10px] font-bold">
                200 Min (3:20:00)
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              🌿 NEET Full Mock Test — 180 Questions
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
              Physics (45 Qs), Chemistry (45 Qs), Botany (45 Qs), Zoology (45 Qs) total 180 questions and 720 marks. Accurate answers with full explanations!
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs text-emerald-300">
              <span className="flex items-center gap-1 font-semibold bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Physics 45 Qs
              </span>
              <span className="flex items-center gap-1 font-semibold bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Chemistry 45 Qs
              </span>
              <span className="flex items-center gap-1 font-semibold bg-white/5 px-2 py-1 rounded-lg border border-white/5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Biology 90 Qs
              </span>
            </div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-2.5 pt-5">
            <button
              onClick={() => handleLaunchTest(NEET_180_GRAND_TEST_ITEM)}
              className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer hover:scale-[1.02] active:scale-98"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              <span>Start NEET 180 Qs Test →</span>
            </button>
            <button
              onClick={() => setActiveInstructionModal(NEET_180_GRAND_TEST_ITEM)}
              className="py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all border border-white/20"
            >
              <Info className="w-3.5 h-3.5 text-emerald-300" />
              <span>Rules</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filters & Search Bar */}
      <div className="space-y-3 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by shift, exam or subject (e.g. PCM Shift 1, NEET 720, JEE, COEP)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 outline-none"
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

          <div className="text-xs font-bold text-slate-600 dark:text-slate-400 whitespace-nowrap">
            Total Papers: <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">{filteredTests.length} available</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 mr-1 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
              <span>Pattern:</span>
            </span>

            {([
              { key: "All", label: "All 110+ Papers" },
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
                    : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="text-xs text-slate-500 font-semibold">
              Page {currentPage} / {totalPages}
            </div>
          )}
        </div>
      </div>

      {/* 100+ Grand Test Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {paginatedTests.map((test) => {
          const pastResult = getTestPastResult(test.title);

          return (
            <div
              key={test.id}
              className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between space-y-5 relative overflow-hidden group hover:border-indigo-400"
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
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-1 leading-snug group-hover:text-indigo-600 transition-colors">
                      {test.title}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={() => setActiveInstructionModal(test)}
                  title="View rules and instructions"
                  className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-indigo-50 dark:hover:bg-indigo-900/40 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-300 flex items-center justify-center transition-all cursor-pointer shrink-0"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>

              {/* Stats Strip */}
              <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-center">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Total Marks</span>
                  <span className="text-sm font-black text-slate-900 dark:text-white font-mono-numbers">
                    {test.totalMarks} Marks
                  </span>
                </div>
                <div className="border-x border-slate-200 dark:border-slate-700">
                  <span className="text-[10px] text-slate-400 block font-medium">Duration</span>
                  <span className="text-sm font-black text-indigo-700 dark:text-indigo-300 font-mono-numbers">
                    {test.durationMinutes} min
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Questions</span>
                  <span className="text-sm font-black text-emerald-700 dark:text-emerald-400 font-mono-numbers">
                    {test.totalQuestions} Qs
                  </span>
                </div>
              </div>

              {/* Target & Marking Rule */}
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between p-2 rounded-xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 text-amber-900 dark:text-amber-200">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Target className="w-3.5 h-3.5 text-amber-600" />
                    <span>Target Percentile:</span>
                  </div>
                  <span className="font-extrabold text-amber-800 dark:text-amber-400">{test.targetPercentileGoal}</span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 px-1">
                  <span>
                    Marking:{" "}
                    <strong className="text-slate-800 dark:text-slate-200">
                      +{test.markingScheme.correct} Correct{" "}
                      {test.markingScheme.mathsCorrect ? `(Maths +${test.markingScheme.mathsCorrect}) ` : ""}
                      {test.markingScheme.incorrect !== 0
                        ? `| ${test.markingScheme.incorrect} Incorrect`
                        : "| No Negative"}
                    </strong>
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 font-semibold">
                    {test.subjectsIncluded.join(" • ")}
                  </span>
                </div>
              </div>

              {/* Past attempt badge if exists */}
              {pastResult && (
                <div className="p-3 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-900/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <div className="text-xs">
                      <span className="text-indigo-900 dark:text-indigo-200 font-bold">Last Score: </span>
                      <strong className="text-indigo-700 dark:text-indigo-300 font-mono-numbers">
                        {pastResult.score}/{pastResult.maxMarks} ({pastResult.percentage}%)
                      </strong>
                    </div>
                  </div>
                  {onViewPastResult && (
                    <button
                      onClick={() => onViewPastResult(pastResult)}
                      className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
                    >
                      View Result →
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
                    {pastResult ? "Retake Exam" : "Start Exam"}
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
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer shadow-xs"
          >
            ← Previous
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
                      : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer shadow-xs"
          >
            Next →
          </button>
        </div>
      )}

      {/* Real Exam Instructions Modal */}
      {activeInstructionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {activeInstructionModal.title}
                  </h3>
                  <span className="text-xs text-slate-500">
                    {activeInstructionModal.exam} Official Exam Pattern & Rules
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveInstructionModal(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 flex items-center justify-center cursor-pointer font-bold"
              >
                ✕
              </button>
            </div>

            {/* Instructions placeholder - as we removed instructionsMr */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Exam Instructions:
              </h4>
              <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                <li className="flex items-start gap-2">
                   <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">1</span>
                   <span>Read all questions carefully before answering.</span>
                </li>
                <li className="flex items-start gap-2">
                   <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">2</span>
                   <span>Each correct answer will award marks as per the scheme.</span>
                </li>
                <li className="flex items-start gap-2">
                   <span className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">3</span>
                   <span>Maintain academic integrity and focus during the exam.</span>
                </li>
              </ul>
            </div>

            {/* Target colleges */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs">
              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Building className="w-4 h-4 text-indigo-600" />
                <span>Target Colleges:</span>
              </div>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {activeInstructionModal.predictedCollegeTargets.map((c, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-medium"
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
                className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs cursor-pointer"
              >
                Close
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
                <span>Start Exam Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
