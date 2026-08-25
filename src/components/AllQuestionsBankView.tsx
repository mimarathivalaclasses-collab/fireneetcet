import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Search,
  Filter,
  CheckCircle2,
  Bookmark,
  BookmarkCheck,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Layers,
  Award,
  Play,
  RotateCcw,
  Zap,
  HelpCircle,
  Clock,
  Eye,
  EyeOff,
  Download,
  Printer,
  FileText,
  ArrowLeft,
} from "lucide-react";
import { ExamType, SubjectType, Question, LanguageMode, DifficultyLevel } from "../types";
import { getSubjectsForExam, CHAPTERS_DATA } from "../data/chaptersData";
import { printQuestionsBankReport } from "../utils/pdfExport";

interface AllQuestionsBankViewProps {
  currentExam: ExamType;
  questions: Question[];
  language: LanguageMode;
  onToggleBookmark: (question: Question) => void;
  bookmarkedIds: Set<string>;
  onStartPracticeWithQuestion?: (question: Question) => void;
  onBack?: () => void;
}

export const AllQuestionsBankView: React.FC<AllQuestionsBankViewProps> = ({
  currentExam,
  questions,
  language,
  onToggleBookmark,
  bookmarkedIds,
  onStartPracticeWithQuestion,
  onBack,
}) => {
  const [selectedExamFilter, setSelectedExamFilter] = useState<ExamType | "All">(currentExam);
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | "All">("All");
  const [selectedChapter, setSelectedChapter] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | "All">("All");
  const [selectedSource, setSelectedSource] = useState<"All" | "PYQ" | "Master">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedExplanations, setExpandedExplanations] = useState<Record<string, boolean>>({});
  const [showAllExplanations, setShowAllExplanations] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 15;

  const availableSubjects = useMemo(() => {
    if (selectedExamFilter === "All") {
      return ["Physics", "Chemistry", "Mathematics", "Biology"] as SubjectType[];
    }
    return getSubjectsForExam(selectedExamFilter);
  }, [selectedExamFilter]);

  // Exam specific chapters
  const availableChapters = useMemo(() => {
    return CHAPTERS_DATA.filter((ch) => {
      const matchExam = selectedExamFilter === "All" || ch.exams.includes(selectedExamFilter);
      const matchSubject = selectedSubject === "All" || ch.subject === selectedSubject;
      return matchExam && matchSubject;
    });
  }, [selectedExamFilter, selectedSubject]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (selectedExamFilter !== "All" && q.exam !== selectedExamFilter) return false;
      if (selectedSubject !== "All" && q.subject !== selectedSubject) return false;
      if (selectedChapter !== "All" && q.chapter !== selectedChapter) return false;
      if (selectedDifficulty !== "All" && q.difficulty !== selectedDifficulty) return false;
      if (selectedSource === "PYQ" && !q.pyqYear) return false;
      if (selectedSource === "Master" && q.pyqYear) return false;

      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const textEn = q.questionText.toLowerCase();
        const textMr = (q.questionTextMr || "").toLowerCase();
        const chap = q.chapter.toLowerCase();
        const topic = (q.topic || "").toLowerCase();
        const expl = q.explanation.toLowerCase();
        const explMr = (q.explanationMr || "").toLowerCase();
        const optionsStr = q.options.join(" ").toLowerCase();

        return (
          textEn.includes(query) ||
          textMr.includes(query) ||
          chap.includes(query) ||
          topic.includes(query) ||
          expl.includes(query) ||
          explMr.includes(query) ||
          optionsStr.includes(query)
        );
      }

      return true;
    });
  }, [questions, selectedExamFilter, selectedSubject, selectedChapter, selectedDifficulty, selectedSource, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage) || 1;
  const paginatedQuestions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredQuestions.slice(start, start + itemsPerPage);
  }, [filteredQuestions, currentPage]);

  const toggleExplanation = (id: string) => {
    setExpandedExplanations((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleToggleAllExplanations = () => {
    const nextState = !showAllExplanations;
    setShowAllExplanations(nextState);
    const newMap: Record<string, boolean> = {};
    if (nextState) {
      paginatedQuestions.forEach((q) => {
        newMap[q.id] = true;
      });
    }
    setExpandedExplanations(newMap);
  };

  // Reset filters
  const handleResetFilters = () => {
    setSelectedSubject("All");
    setSelectedChapter("All");
    setSelectedDifficulty("All");
    setSelectedSource("All");
    setSearchQuery("");
    setCurrentPage(1);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in">
      {/* Top Hero Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-blue-950 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/30"
                title="मागे जा"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-indigo-300" />
                <span>← मागे जा</span>
              </button>
            )}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
              <span>अधिकृत संपूर्ण प्रश्नसंच (Official Master Question Repository)</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {currentExam} संपूर्ण प्रश्नसंच व स्पष्टीकरणे
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            येथे ॲपमधील सर्व प्रश्न, अचूक उत्तरे, मराठी व इंग्रजी अनुवाद, सूत्रे आणि पायरीनुसार स्पष्टीकरणे एकाच ठिकाणी उपलब्ध आहेत. कोणताही प्रश्न सहज शोधा आणि त्याचा अभ्यास करा.
          </p>

          {/* Key Counter Badges */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <div className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-extrabold flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-300" />
              <span>
                एकूण प्रश्न: <strong className="text-white">{filteredQuestions.length}</strong>
                <span className="text-slate-300 font-normal"> / {questions.length} (एकूण बॅंक)</span>
              </span>
            </div>
            {availableSubjects.map((sub) => {
              const count = questions.filter(
                (q) => (selectedExamFilter === "All" || q.exam === selectedExamFilter) && q.subject === sub
              ).length;
              return (
                <div
                  key={sub}
                  className="px-3 py-1.5 rounded-xl bg-white/10 border border-white/20 text-xs font-semibold text-slate-200"
                >
                  {sub}: <strong className="text-white">{count}</strong>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="प्रश्नाचा कोणताही शब्द, चॅप्टर, सूत्र किंवा संकल्पना शोधा (Search in English or Marathi)..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3 pt-1">
          {/* Exam Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              परीक्षा (Exam):
            </label>
            <select
              value={selectedExamFilter}
              onChange={(e) => {
                setSelectedExamFilter(e.target.value as any);
                setSelectedSubject("All");
                setSelectedChapter("All");
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-semibold"
            >
              <option value="All">सर्व परीक्षा (All Exams Bank)</option>
              <option value="MHT_CET">MHT-CET</option>
              <option value="NEET">NEET (Medical)</option>
              <option value="JEE_MAIN">JEE Main (Engineering)</option>
            </select>
          </div>

          {/* Subject Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              विषय (Subject):
            </label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value as any);
                setSelectedChapter("All");
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-semibold"
            >
              <option value="All">सर्व विषय (All Subjects)</option>
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              चॅप्टर / टॉपिक (Chapter):
            </label>
            <select
              value={selectedChapter}
              onChange={(e) => {
                setSelectedChapter(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-semibold truncate"
            >
              <option value="All">सर्व चॅप्टर्स (All Chapters)</option>
              {availableChapters.map((ch) => (
                <option key={ch.name} value={ch.name}>
                  {ch.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              काठिण्य पातळी (Difficulty):
            </label>
            <select
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-semibold"
            >
              <option value="All">सर्व स्तर (All Levels)</option>
              <option value="Easy">सोपे (Easy)</option>
              <option value="Medium">मध्यम (Medium)</option>
              <option value="Hard">कठीण (Hard)</option>
            </select>
          </div>

          {/* Source / PYQ Filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-600 mb-1">
              प्रकार (Source Type):
            </label>
            <select
              value={selectedSource}
              onChange={(e) => {
                setSelectedSource(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 font-semibold"
            >
              <option value="All">सर्व प्रश्न (All Questions)</option>
              <option value="PYQ">मागील वर्षांचे प्रश्न (PYQs Only)</option>
              <option value="Master">मास्टर सराव प्रश्न (Master Bank)</option>
            </select>
          </div>
        </div>

        {/* Toolbar Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="text-xs text-slate-600 font-medium flex items-center gap-2">
            <span>
              एकूण सापडलेले प्रश्न: <strong className="text-slate-900">{filteredQuestions.length}</strong>
            </span>
            <span>•</span>
            <span>
              पान {currentPage} / {totalPages}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* PDF Export Button */}
            <button
              id="btn-export-question-bank-pdf"
              onClick={() => {
                const title =
                  selectedExamFilter === "All"
                    ? "MHT-CET • NEET • JEE Main Question Bank"
                    : `${selectedExamFilter} Question Bank`;
                printQuestionsBankReport(filteredQuestions, title, language);
              }}
              className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              title="सध्या फिल्टर केलेले सर्व प्रश्न आणि स्पष्टीकरणे PDF मध्ये सेव्ह / प्रिंट करा"
            >
              <Download className="w-3.5 h-3.5" />
              <span>प्रश्नसंच PDF डाऊनलोड करा ({filteredQuestions.length})</span>
            </button>

            <button
              onClick={handleToggleAllExplanations}
              className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {showAllExplanations ? (
                <>
                  <EyeOff className="w-3.5 h-3.5" />
                  <span>सर्व स्पष्टीकरणे लपवा</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5" />
                  <span>सर्व स्पष्टीकरणे उघडा</span>
                </>
              )}
            </button>

            {(selectedSubject !== "All" ||
              selectedChapter !== "All" ||
              selectedDifficulty !== "All" ||
              selectedSource !== "All" ||
              searchQuery) && (
              <button
                onClick={handleResetFilters}
                className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>फिल्टर्स रिसेट करा</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Questions List */}
      {paginatedQuestions.length === 0 ? (
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4 shadow-xs">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <HelpCircle className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800">
            निवडलेल्या निकषांनुसार एकही प्रश्न सापडला नाही
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            कृपया वेगळा विषय, चॅप्टर निवडा किंवा सर्च क्वेरी साफ करा.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors cursor-pointer"
          >
            सर्व प्रश्न दाखवा
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {paginatedQuestions.map((q, idx) => {
            const globalIndex = (currentPage - 1) * itemsPerPage + idx + 1;
            const isBookmarked = bookmarkedIds.has(q.id);
            const isExplanationOpen = expandedExplanations[q.id] ?? showAllExplanations;

            const isMr = language === "mr";
            const isEn = language === "en";
            const isBilingual = language === "bilingual";

            return (
              <div
                key={q.id}
                id={`q-card-${q.id}`}
                className="bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 p-5 space-y-4 shadow-xs transition-all hover:shadow-md"
              >
                {/* Card Header & Badges */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 text-white font-extrabold text-xs flex items-center justify-center font-mono-numbers">
                      #{globalIndex}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 font-extrabold text-xs border border-indigo-100">
                      {q.subject}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-bold text-[11px]">
                      {q.chapter}
                    </span>
                    {q.topic && (
                      <span className="hidden sm:inline-block px-2 py-0.5 rounded-md bg-slate-50 text-slate-500 text-[10px] font-medium border border-slate-100">
                        {q.topic}
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        q.difficulty === "Easy"
                          ? "bg-emerald-50 text-emerald-700"
                          : q.difficulty === "Medium"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {q.difficulty}
                    </span>
                    {q.pyqYear && (
                      <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-extrabold text-[10px] border border-purple-100">
                        {q.pyqYear}
                      </span>
                    )}
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={() => onToggleBookmark(q)}
                    className={`p-2 rounded-xl border transition-all cursor-pointer ${
                      isBookmarked
                        ? "bg-amber-50 border-amber-300 text-amber-600"
                        : "bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                    }`}
                    title={isBookmarked ? "सेव्ह केलेले काढून टाका" : "हा प्रश्न सेव्ह (Bookmark) करा"}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 fill-amber-500 text-amber-600" />
                    ) : (
                      <Bookmark className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* Question Statement */}
                <div className="space-y-2">
                  {/* Marathi Text */}
                  {(isBilingual || isMr) && q.questionTextMr && (
                    <p className="text-sm sm:text-base font-bold text-slate-900 leading-relaxed">
                      {q.questionTextMr}
                    </p>
                  )}

                  {/* English Text */}
                  {(isBilingual || isEn || !q.questionTextMr) && (
                    <p
                      className={`text-xs sm:text-sm leading-relaxed ${
                        isBilingual && q.questionTextMr
                          ? "text-slate-600 font-medium italic"
                          : "text-slate-900 font-bold text-sm sm:text-base"
                      }`}
                    >
                      {q.questionText}
                    </p>
                  )}
                </div>

                {/* 4 Options Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map((optEn, optIdx) => {
                    const isCorrect = q.correctOption === optIdx;
                    const optMr = q.optionsMr ? q.optionsMr[optIdx] : optEn;
                    const letter = String.fromCharCode(65 + optIdx);

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border transition-all flex items-start gap-2.5 ${
                          isCorrect
                            ? "bg-emerald-50/90 border-emerald-400 text-emerald-950 font-semibold shadow-xs"
                            : "bg-slate-50/80 border-slate-200 text-slate-700"
                        }`}
                      >
                        <span
                          className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center shrink-0 mt-0.5 ${
                            isCorrect
                              ? "bg-emerald-600 text-white"
                              : "bg-slate-200 text-slate-700"
                          }`}
                        >
                          {letter}
                        </span>

                        <div className="space-y-0.5 flex-1 text-xs sm:text-sm">
                          {(isBilingual || isMr) && optMr && (
                            <div className={isCorrect ? "font-bold text-emerald-950" : "text-slate-800"}>
                              {optMr}
                            </div>
                          )}
                          {(isBilingual || isEn || !optMr) && (
                            <div
                              className={`text-[11px] ${
                                isCorrect ? "text-emerald-800 font-semibold" : "text-slate-500"
                              }`}
                            >
                              {optEn}
                            </div>
                          )}
                        </div>

                        {isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation Toggle & Content */}
                <div className="pt-2 border-t border-slate-100">
                  <button
                    onClick={() => toggleExplanation(q.id)}
                    className="w-full py-2 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold flex items-center justify-between transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-1.5 text-indigo-700">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                      <span>
                        {isExplanationOpen ? "सविस्तर स्पष्टीकरण व सूत्र लपवा" : "सविस्तर स्पष्टीकरण, सूत्र व पायऱ्या बघा"}
                      </span>
                    </span>
                    {isExplanationOpen ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>

                  {/* Expanded Explanation Box */}
                  {isExplanationOpen && (
                    <div className="mt-3 p-4 rounded-xl bg-gradient-to-br from-indigo-50/60 to-slate-50 border border-indigo-200 space-y-3 text-xs animate-in fade-in">
                      {/* Formula if present */}
                      {q.formula && (
                        <div className="p-2.5 rounded-lg bg-white border border-indigo-100 space-y-1">
                          <span className="text-[10px] font-extrabold uppercase text-indigo-900 block tracking-wider">
                            महत्त्वाचे सूत्र (Formula):
                          </span>
                          <code className="text-xs font-mono font-bold text-indigo-700 block">
                            {q.formula}
                          </code>
                        </div>
                      )}

                      {/* Explanation Texts */}
                      <div className="space-y-2 leading-relaxed">
                        {q.explanationMr && (
                          <div>
                            <span className="font-bold text-slate-900 block mb-0.5">
                              मराठी स्पष्टीकरण (Step-by-step Solution):
                            </span>
                            <p className="text-slate-700 text-[11px] sm:text-xs">
                              {q.explanationMr}
                            </p>
                          </div>
                        )}

                        {q.explanation && (
                          <div>
                            <span className="font-bold text-slate-900 block mb-0.5">
                              English Solution:
                            </span>
                            <p className="text-slate-600 text-[11px]">
                              {q.explanation}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <button
            onClick={() => {
              setCurrentPage((p) => Math.max(1, p - 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-800 text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            ← मागील पान (Previous)
          </button>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => i + 1).map((pg) => (
              <button
                key={pg}
                onClick={() => {
                  setCurrentPage(pg);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  currentPage === pg
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200"
                }`}
              >
                {pg}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setCurrentPage((p) => Math.min(totalPages, p + 1));
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-xs font-bold transition-all cursor-pointer disabled:cursor-not-allowed"
          >
            पुढील पान (Next) →
          </button>
        </div>
      )}
    </div>
  );
};
