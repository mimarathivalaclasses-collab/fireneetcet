import React, { useState, useMemo, useEffect } from "react";
import {
  CheckCircle2,
  XCircle,
  Bookmark,
  BookmarkCheck,
  HelpCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  BookOpen,
  Filter,
  Search,
  Check,
  Send,
  Loader2,
  Lightbulb,
  Award,
  ArrowLeft,
  Zap,
  Layers,
  X,
  Play,
  Pause,
  Timer,
  Flame,
  BellRing,
} from "lucide-react";
import { Question, ExamType, SubjectType, DifficultyLevel, LanguageMode } from "../types";
import { CHAPTERS_DATA, getSubjectsForExam, getMarkingScheme } from "../data/chaptersData";
import { generateProceduralQuestions } from "../utils/proceduralQuestionGenerator";
import { recordDailyActivity } from "../utils/achievementSystem";

interface PracticeModeProps {
  questions: Question[];
  currentExam: ExamType;
  language: LanguageMode;
  bookmarkedIds: Set<string>;
  onToggleBookmark: (question: Question, note?: string) => void;
  onRecordAnswer?: (questionId: string, isCorrect: boolean) => void;
  onRecordAttempt?: (subject: string, isCorrect: boolean) => void;
  onRecordMistake?: (question: Question, selectedOption: number) => void;
  onOpenAiGenerator: () => void;
  onBack?: () => void;
}

export const PracticeMode: React.FC<PracticeModeProps> = ({
  questions,
  currentExam,
  language,
  bookmarkedIds,
  onToggleBookmark,
  onRecordAnswer,
  onRecordAttempt,
  onRecordMistake,
  onOpenAiGenerator,
  onBack,
}) => {
  // Filter States
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | "All">("All");
  const [selectedChapter, setSelectedChapter] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | "All">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [onlyBookmarks, setOnlyBookmarks] = useState<boolean>(false);

  // Active question index in filtered list
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // User interactions for current question
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});

  // AI Doubt Dialog State
  const [isAiDoubtOpen, setIsAiDoubtOpen] = useState<boolean>(false);
  const [doubtQuery, setDoubtQuery] = useState<string>("");
  const [aiDoubtResponse, setAiDoubtResponse] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // Bookmark note dialog state
  const [bookmarkNote, setBookmarkNote] = useState<string>("");
  const [showNoteModal, setShowNoteModal] = useState<boolean>(false);

  // Auto Question Set Generator Modal State (12,50,000+ Procedural Questions)
  const [showAutoSetModal, setShowAutoSetModal] = useState<boolean>(false);
  const [autoSubj, setAutoSubj] = useState<SubjectType>("Physics");
  const [autoCount, setAutoCount] = useState<number>(25);
  const [autoDiff, setAutoDiff] = useState<DifficultyLevel>("Medium");
  const [extraGeneratedQuestions, setExtraGeneratedQuestions] = useState<Question[]>([]);

  const handleGenerateAutoSet = () => {
    const newQs = generateProceduralQuestions(currentExam, autoSubj, autoCount, autoDiff);
    setExtraGeneratedQuestions((prev) => [...newQs, ...prev]);
    setSelectedSubject(autoSubj);
    setSelectedChapter("All");
    setSelectedDifficulty("All");
    setCurrentIndex(0);
    setShowAutoSetModal(false);
  };

  // Available subjects for current exam
  const availableSubjects = useMemo(() => getSubjectsForExam(currentExam), [currentExam]);

  // Available chapters for the selected subject and exam
  const availableChapters = useMemo(() => {
    return CHAPTERS_DATA.filter((ch) => {
      const matchExam = ch.exams.includes(currentExam);
      const matchSubject = selectedSubject === "All" || ch.subject === selectedSubject;
      return matchExam && matchSubject;
    });
  }, [currentExam, selectedSubject]);

  // Filtered Questions (combining base questions + procedural extra generated)
  const allPracticeQuestions = useMemo(() => {
    return [...extraGeneratedQuestions, ...questions];
  }, [extraGeneratedQuestions, questions]);

  const filteredQuestions = useMemo(() => {
    return allPracticeQuestions.filter((q) => {
      // Exam match
      if (q.exam !== currentExam) return false;

      // Subject match
      if (selectedSubject !== "All" && q.subject !== selectedSubject) return false;

      // Chapter match
      if (selectedChapter !== "All" && q.chapter !== selectedChapter) return false;

      // Difficulty match
      if (selectedDifficulty !== "All" && q.difficulty !== selectedDifficulty) return false;

      // Bookmarks only
      if (onlyBookmarks && !bookmarkedIds.has(q.id)) return false;

      // Search query
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchEn = q.questionText.toLowerCase().includes(query);
        const matchMr = q.questionTextMr?.toLowerCase().includes(query) || false;
        const matchChap = q.chapter.toLowerCase().includes(query);
        const matchTopic = q.topic?.toLowerCase().includes(query) || false;
        if (!matchEn && !matchMr && !matchChap && !matchTopic) return false;
      }

      return true;
    });
  }, [
    allPracticeQuestions,
    currentExam,
    selectedSubject,
    selectedChapter,
    selectedDifficulty,
    onlyBookmarks,
    bookmarkedIds,
    searchQuery,
  ]);

  // Reset index if out of bounds
  const currentQuestion = filteredQuestions[currentIndex] || filteredQuestions[0];

  // Pomodoro 25-Minute Study Timer State
  const [isPomodoroActive, setIsPomodoroActive] = useState<boolean>(false);
  const [pomodoroSeconds, setPomodoroSeconds] = useState<number>(25 * 60);
  const [isPomodoroRunning, setIsPomodoroRunning] = useState<boolean>(false);
  const [pomodoroMode, setPomodoroMode] = useState<"study" | "break">("study");

  useEffect(() => {
    let timer: any = null;
    if (isPomodoroActive && isPomodoroRunning && pomodoroSeconds > 0) {
      timer = setInterval(() => {
        setPomodoroSeconds((prev) => prev - 1);
      }, 1000);
    } else if (pomodoroSeconds === 0 && isPomodoroRunning) {
      if (pomodoroMode === "study") {
        alert("🎉 २५ मिनिटांचे सराव सत्र पूर्ण झाले! ५ मिनिटांचा ब्रेक घ्या.");
        setPomodoroMode("break");
        setPomodoroSeconds(5 * 60);
      } else {
        alert("⚡ ब्रेक संपला! नवीन २५ मिनिटांचा अभ्यास सत्र सुरू करा.");
        setPomodoroMode("study");
        setPomodoroSeconds(25 * 60);
      }
      setIsPomodoroRunning(false);
    }
    return () => clearInterval(timer);
  }, [isPomodoroActive, isPomodoroRunning, pomodoroSeconds, pomodoroMode]);

  const togglePomodoroRunning = () => {
    setIsPomodoroRunning(!isPomodoroRunning);
  };

  const resetPomodoro = () => {
    setIsPomodoroRunning(false);
    setPomodoroSeconds(pomodoroMode === "study" ? 25 * 60 : 5 * 60);
  };

  const handleOptionSelect = (optionIndex: number) => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    if (selectedAnswers[qId] !== undefined) return; // already answered

    const isCorrect = optionIndex === currentQuestion.correctOption;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optionIndex }));
    setShowExplanations((prev) => ({ ...prev, [qId]: true }));
    
    // Record daily activity streak
    recordDailyActivity();

    if (onRecordAnswer) onRecordAnswer(qId, isCorrect);
    if (onRecordAttempt) onRecordAttempt(currentQuestion.subject, isCorrect);
    if (!isCorrect && onRecordMistake) onRecordMistake(currentQuestion, optionIndex);
  };

  const handleResetCurrent = () => {
    if (!currentQuestion) return;
    const qId = currentQuestion.id;
    setSelectedAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setShowExplanations((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setAiDoubtResponse(null);
      setIsAiDoubtOpen(false);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setAiDoubtResponse(null);
      setIsAiDoubtOpen(false);
    }
  };

  const handleAskAiDoubt = async () => {
    if (!currentQuestion) return;
    setIsAiLoading(true);
    setAiDoubtResponse(null);

    try {
      const response = await fetch("/api/gemini/explain-doubt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          questionText: currentQuestion.questionText,
          options: currentQuestion.options,
          correctOption: currentQuestion.correctOption,
          userSelectedOption: selectedAnswers[currentQuestion.id],
          studentQuery: doubtQuery || "कृपया हे संकल्पना मराठीत सोप्या भाषेत समजावून सांगा आणि लक्षात ठेवण्यासाठी शॉर्टकट ट्रिक द्या.",
          language: language,
        }),
      });

      const data = await response.json();
      if (data.success && data.explanation) {
        setAiDoubtResponse(data.explanation);
      } else {
        setAiDoubtResponse("माफ करा, शंका सोडवण्यात अडचण आली. कृपया पुन्हा प्रयत्न करा.");
      }
    } catch (err) {
      setAiDoubtResponse("सर्व्हरशी संपर्क होऊ शकला नाही. कृपया इंटरनेट तपासा.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const isBookmarked = currentQuestion ? bookmarkedIds.has(currentQuestion.id) : false;
  const userAnswer = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;
  const isAnswered = userAnswer !== undefined;
  const isCorrect = isAnswered && userAnswer === currentQuestion.correctOption;
  const showExplanation = currentQuestion ? showExplanations[currentQuestion.id] : false;

  const marking = currentQuestion ? getMarkingScheme(currentExam, currentQuestion.subject) : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Filter Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        {/* Subject Selection Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-1.5">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center gap-1.5 mr-2 transition-all cursor-pointer border border-slate-300"
                title="मागे जा"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-indigo-600" />
                <span>← मागे जा</span>
              </button>
            )}
            <span className="text-xs font-bold text-slate-500 mr-1">विषय (Subject):</span>
            <button
              id="filter-subj-all"
              onClick={() => {
                setSelectedSubject("All");
                setSelectedChapter("All");
                setCurrentIndex(0);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                selectedSubject === "All"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              सर्व विषय (All)
            </button>
            {availableSubjects.map((sub) => (
              <button
                key={sub}
                id={`filter-subj-${sub.toLowerCase()}`}
                onClick={() => {
                  setSelectedSubject(sub);
                  setSelectedChapter("All");
                  setCurrentIndex(0);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  selectedSubject === sub
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {sub === "Physics"
                  ? "भौतिकशास्त्र (Physics)"
                  : sub === "Chemistry"
                  ? "रसायनशास्त्र (Chemistry)"
                  : sub === "Mathematics"
                  ? "गणित (Maths)"
                  : "जीवशास्त्र (Biology)"}
              </button>
            ))}
          </div>

          {/* Action Buttons: Pomodoro Timer, Auto Question Set Generator & AI Generator */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Pomodoro Timer Toggle */}
            <button
              id="btn-pomodoro-toggle"
              onClick={() => setIsPomodoroActive(!isPomodoroActive)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black transition-all shadow-xs cursor-pointer ${
                isPomodoroActive
                  ? "bg-gradient-to-r from-rose-600 to-orange-600 text-white ring-2 ring-rose-400"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200"
              }`}
              title="२५ मिनिटे सराव पोमोडोरो टायमर"
            >
              <Timer className={`w-4 h-4 ${isPomodoroActive ? "text-amber-300 animate-spin" : "text-slate-500"}`} />
              <span>⏱️ पोमोडोरो ({Math.floor(pomodoroSeconds / 60)}:{String(pomodoroSeconds % 60).padStart(2, "0")})</span>
            </button>

            <button
              id="btn-auto-question-set"
              onClick={() => setShowAutoSetModal(true)}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black transition-all shadow-xs cursor-pointer ring-1 ring-emerald-400"
              title="१२,५०,०००+ ऑटो प्रश्न संच तयार करा"
            >
              <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>⚡ ऑटो प्रश्न संच (12.5L+ MCQs)</span>
            </button>

            {/* Quick AI Generator Shortcut */}
            <button
              id="btn-quick-ai-gen"
              onClick={onOpenAiGenerator}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 text-xs font-bold transition-all shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-purple-600 fill-purple-200" />
              <span className="hidden sm:inline">AI सराव संच</span>
            </button>
          </div>
        </div>

        {/* Pomodoro Interactive Banner when active */}
        {isPomodoroActive && (
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 text-white flex flex-wrap items-center justify-between gap-3 border border-purple-800/60 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600/30 flex items-center justify-center border border-purple-400/40">
                <Timer className="w-5 h-5 text-amber-300 animate-pulse" />
              </div>
              <div>
                <div className="text-xs font-black text-white flex items-center gap-2">
                  <span>{pomodoroMode === "study" ? "🎯 २५ मिनिटे एकाग्र सराव सत्र (Focus Block)" : "☕ ५ मिनिटे विश्रांती (Short Break)"}</span>
                  <span className="px-2 py-0.2 rounded-full text-[9px] font-black uppercase bg-purple-500/30 text-purple-200 border border-purple-400/30">
                    {isPomodoroRunning ? "चालू आहे" : "थांबवले"}
                  </span>
                </div>
                <div className="text-[11px] text-purple-200">
                  {pomodoroMode === "study"
                    ? "सलग २५ मिनिटे पूर्ण लक्ष देऊन प्रश्न सोडवा आणि अचूकता वाढवा."
                    : "डोळ्यांना विश्रांती द्या आणि पाणी प्या."}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="text-xl font-black font-mono-numbers px-3 py-1 rounded-xl bg-black/40 text-amber-300 border border-white/10">
                {Math.floor(pomodoroSeconds / 60)}:{String(pomodoroSeconds % 60).padStart(2, "0")}
              </div>
              <button
                onClick={togglePomodoroRunning}
                className={`px-3 py-1.5 rounded-xl font-black text-xs transition-colors cursor-pointer flex items-center gap-1 ${
                  isPomodoroRunning ? "bg-amber-500 text-slate-950" : "bg-emerald-600 text-white"
                }`}
              >
                {isPomodoroRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{isPomodoroRunning ? "थांबवा" : "सुरू करा"}</span>
              </button>
              <button
                onClick={resetPomodoro}
                className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs transition-colors cursor-pointer"
                title="रिसेट"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        {/* Secondary Filters: Chapter, Difficulty, Search, Bookmarks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2 border-t border-slate-100 text-xs">
          {/* Chapter Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              अध्याय (Chapter):
            </label>
            <select
              id="filter-chapter"
              value={selectedChapter}
              onChange={(e) => {
                setSelectedChapter(e.target.value);
                setCurrentIndex(0);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">सर्व अध्याय (All Chapters)</option>
              {availableChapters.map((ch) => (
                <option key={ch.name} value={ch.name}>
                  {ch.name}
                </option>
              ))}
            </select>
          </div>

          {/* Difficulty Filter */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              काठिण्य पातळी (Difficulty):
            </label>
            <select
              id="filter-difficulty"
              value={selectedDifficulty}
              onChange={(e) => {
                setSelectedDifficulty(e.target.value as any);
                setCurrentIndex(0);
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">सर्व स्तर (All Levels)</option>
              <option value="Easy">सोपे (Easy)</option>
              <option value="Medium">मध्यम (Medium / Exam-level)</option>
              <option value="Hard">कठीण (Hard / Advanced)</option>
            </select>
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              शोध (Search keywords):
            </label>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="search-questions-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentIndex(0);
                }}
                placeholder="उदा. Rotational, Carnot, XeF4..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-8 pr-3 py-2 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Bookmarks Toggle & Stats */}
          <div className="flex items-end justify-between gap-2">
            <button
              id="filter-bookmarks-only"
              onClick={() => {
                setOnlyBookmarks(!onlyBookmarks);
                setCurrentIndex(0);
              }}
              className={`flex-1 py-2 px-3 rounded-lg border font-semibold flex items-center justify-center gap-1.5 transition-all ${
                onlyBookmarks
                  ? "bg-amber-500 text-white border-amber-600 shadow-xs"
                  : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>केवळ सेव्ह केलेले ({bookmarkedIds.size})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      {filteredQuestions.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            निवडलेल्या निकषांनुसार प्रश्न सापडले नाहीत
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            तुम्ही AI प्रश्न जनरेटर वापरून या अध्यायासाठी किंवा विषयासाठी अमर्याद नवीन प्रश्न तयार करू शकता!
          </p>
          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSelectedSubject("All");
                setSelectedChapter("All");
                setSelectedDifficulty("All");
                setSearchQuery("");
                setOnlyBookmarks(false);
              }}
              className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200"
            >
              फिल्टर्स काढा (Clear Filters)
            </button>
            <button
              onClick={onOpenAiGenerator}
              className="px-4 py-2 rounded-xl bg-purple-600 text-white font-semibold text-xs hover:bg-purple-700 shadow-xs flex items-center gap-1.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>नवीन प्रश्न तयार करा (AI Generator)</span>
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Question Main Panel (3 cols) */}
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
              {/* Question Header Status */}
              <div className="bg-slate-50/90 border-b border-slate-200 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                    प्रश्न {currentIndex + 1} / {filteredQuestions.length}
                  </span>
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                    {currentQuestion.subject}
                  </span>
                  <span
                    className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
                      currentQuestion.difficulty === "Easy"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                        : currentQuestion.difficulty === "Hard"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {currentQuestion.difficulty === "Easy"
                      ? "सोपे (Easy)"
                      : currentQuestion.difficulty === "Hard"
                      ? "कठीण (Hard)"
                      : "मध्यम (Medium)"}
                  </span>
                  {currentQuestion.pyqYear && (
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 flex items-center gap-1">
                      <Award className="w-3 h-3 text-indigo-500" />
                      <span>{currentQuestion.pyqYear}</span>
                    </span>
                  )}
                  {currentQuestion.isAiGenerated && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      <span>AI Generated</span>
                    </span>
                  )}
                </div>

                {/* Right actions: Bookmark & Reset */}
                <div className="flex items-center gap-2">
                  <button
                    id="btn-bookmark-question"
                    onClick={() => {
                      onToggleBookmark(currentQuestion);
                    }}
                    className={`p-2 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors ${
                      isBookmarked
                        ? "bg-amber-50 text-amber-700 border-amber-300"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                    }`}
                    title={isBookmarked ? "बुकमार्क काढले" : "बुकमार्क करा"}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="w-4 h-4 text-amber-600 fill-amber-600" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-slate-400" />
                    )}
                    <span className="hidden sm:inline">
                      {isBookmarked ? "बुकमार्क सेव्ह" : "सेव्ह करा"}
                    </span>
                  </button>

                  {isAnswered && (
                    <button
                      id="btn-reset-question"
                      onClick={handleResetCurrent}
                      className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-medium flex items-center gap-1"
                      title="पुन्हा प्रयत्न करा (Try Again)"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">रीसेट</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Question Statement */}
              <div className="p-5 sm:p-7 space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-medium text-slate-400">
                    अध्याय: <span className="text-slate-700 font-semibold">{currentQuestion.chapter}</span>
                    {currentQuestion.topic && (
                      <span className="ml-2 text-slate-500">• {currentQuestion.topic}</span>
                    )}
                  </div>

                  {/* Primary Language Question Text */}
                  {(language === "en" || language === "bilingual") && (
                    <div className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed">
                      {currentQuestion.questionText}
                    </div>
                  )}

                  {/* Marathi Translation if bilingual or mr */}
                  {(language === "mr" || language === "bilingual") && currentQuestion.questionTextMr && (
                    <div className="text-base sm:text-lg font-medium text-slate-800 bg-amber-50/50 p-3.5 rounded-xl border border-amber-100/80 leading-relaxed">
                      <span className="text-xs font-bold text-amber-800 block mb-1">मराठी भाषांतर:</span>
                      {currentQuestion.questionTextMr}
                    </div>
                  )}
                </div>

                {/* Options List */}
                <div className="space-y-3 pt-2">
                  {currentQuestion.options.map((optText, optIndex) => {
                    const optLetter = String.fromCharCode(65 + optIndex);
                    const isSelected = userAnswer === optIndex;
                    const isOptionCorrect = optIndex === currentQuestion.correctOption;

                    let optionStyle =
                      "bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/30 text-slate-800";
                    let badgeStyle = "bg-slate-100 text-slate-700 border-slate-200";

                    if (isAnswered) {
                      if (isOptionCorrect) {
                        optionStyle =
                          "bg-emerald-50 border-emerald-400 text-emerald-950 font-medium shadow-xs ring-1 ring-emerald-400";
                        badgeStyle = "bg-emerald-600 text-white border-emerald-600";
                      } else if (isSelected) {
                        optionStyle =
                          "bg-rose-50 border-rose-400 text-rose-950 font-medium ring-1 ring-rose-400";
                        badgeStyle = "bg-rose-600 text-white border-rose-600";
                      } else {
                        optionStyle = "bg-slate-50/60 border-slate-200 text-slate-400 opacity-60";
                        badgeStyle = "bg-slate-100 text-slate-400 border-slate-200";
                      }
                    }

                    const optMrText = currentQuestion.optionsMr?.[optIndex];

                    return (
                      <button
                        key={optIndex}
                        id={`option-btn-${optIndex}`}
                        disabled={isAnswered}
                        onClick={() => handleOptionSelect(optIndex)}
                        className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start justify-between gap-3 ${optionStyle}`}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <span
                            className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 border ${badgeStyle}`}
                          >
                            {optLetter}
                          </span>
                          <div className="space-y-1">
                            <div className="text-sm font-medium leading-snug">{optText}</div>
                            {language !== "en" && optMrText && optMrText !== optText && (
                              <div className="text-xs text-slate-600 italic">
                                ({optMrText})
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Result Icon on Answered */}
                        {isAnswered && (
                          <div className="shrink-0 pt-0.5">
                            {isOptionCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                            ) : isSelected ? (
                              <XCircle className="w-5 h-5 text-rose-600" />
                            ) : null}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Feedback Notice */}
                {isAnswered && (
                  <div
                    className={`p-4 rounded-xl border flex items-center justify-between gap-3 ${
                      isCorrect
                        ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                        : "bg-rose-50 border-rose-200 text-rose-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                      )}
                      <div>
                        <div className="text-sm font-bold">
                          {isCorrect ? "अभिनंदन! योग्य उत्तर (+4 / बरोबर)" : "चुकीचे उत्तर! (-1 / 0)"}
                        </div>
                        <div className="text-xs opacity-80">
                          योग्य उत्तर पर्याय {String.fromCharCode(65 + currentQuestion.correctOption)} आहे.
                        </div>
                      </div>
                    </div>

                    {/* Ask AI Doubt Button */}
                    <button
                      id="btn-ask-ai-doubt"
                      onClick={() => setIsAiDoubtOpen(true)}
                      className="px-3 py-1.5 rounded-lg bg-white shadow-xs border border-purple-200 text-purple-700 hover:bg-purple-50 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                      <span>शंका विचारा (AI Doubt)</span>
                    </button>
                  </div>
                )}

                {/* Step-by-Step Detailed Solution */}
                {showExplanation && (
                  <div className="mt-4 p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                    <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800">
                        <Lightbulb className="w-4 h-4 text-amber-500" />
                        <span>सविस्तर स्पष्टीकरण व सूत्र (Detailed Solution)</span>
                      </div>
                      {marking && (
                        <span className="text-[11px] font-semibold text-slate-500">
                          गुणदान पद्धती: {marking.descriptionMr}
                        </span>
                      )}
                    </div>

                    {/* Formula Callout */}
                    {currentQuestion.formula && (
                      <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-900 font-mono text-xs">
                        <span className="font-bold block text-blue-800 mb-0.5">महत्त्वाचे सूत्र (Formula):</span>
                        {currentQuestion.formula}
                      </div>
                    )}

                    {/* English Explanation */}
                    {(language === "en" || language === "bilingual") && (
                      <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                        <strong className="text-slate-900 block mb-1">Step-by-step Explanation:</strong>
                        {currentQuestion.explanation}
                      </div>
                    )}

                    {/* Marathi Explanation */}
                    {(language === "mr" || language === "bilingual") && currentQuestion.explanationMr && (
                      <div className="text-xs sm:text-sm text-slate-800 bg-amber-50/40 p-3 rounded-xl border border-amber-100 leading-relaxed">
                        <strong className="text-amber-900 block mb-1">मराठी स्पष्टीकरण (Step-by-step):</strong>
                        {currentQuestion.explanationMr}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Navigation Footer */}
              <div className="bg-slate-50 border-t border-slate-200 px-5 py-3.5 flex items-center justify-between gap-3">
                <button
                  id="btn-prev-question"
                  disabled={currentIndex === 0}
                  onClick={handlePrev}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-xs hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>मागील (Previous)</span>
                </button>

                <div className="text-xs text-slate-500 font-medium">
                  {currentIndex + 1} of {filteredQuestions.length}
                </div>

                <button
                  id="btn-next-question"
                  disabled={currentIndex === filteredQuestions.length - 1}
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-blue-600 text-white font-semibold text-xs hover:bg-blue-700 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 shadow-xs transition-colors"
                >
                  <span>पुढील (Next)</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* AI Doubt Resolution Box (When Open) */}
            {isAiDoubtOpen && (
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50/50 rounded-2xl border-2 border-purple-200 p-5 space-y-4 shadow-sm animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-600 text-white flex items-center justify-center shadow-xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-purple-950">
                        AI शंका निरसन सहाय्यक (AI Doubt Solver)
                      </h4>
                      <p className="text-[11px] text-purple-700">
                        या प्रश्नाबाबत कोणतीही शंका, शॉर्टकट ट्रिक किंवा मराठी स्पष्टीकरण विचारा
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsAiDoubtOpen(false)}
                    className="text-purple-400 hover:text-purple-700 text-xs font-bold"
                  >
                    बंद करा ✕
                  </button>
                </div>

                <div className="flex gap-2">
                  <input
                    id="ai-doubt-input"
                    type="text"
                    value={doubtQuery}
                    onChange={(e) => setDoubtQuery(e.target.value)}
                    placeholder="उदा. हे सूत्र कसे लागू केले? किंवा मला ट्रिक हवी आहे..."
                    className="flex-1 bg-white border border-purple-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !isAiLoading) handleAskAiDoubt();
                    }}
                  />
                  <button
                    id="btn-submit-ai-doubt"
                    disabled={isAiLoading}
                    onClick={handleAskAiDoubt}
                    className="px-4 py-2.5 rounded-xl bg-purple-600 text-white font-bold text-xs hover:bg-purple-700 disabled:opacity-50 flex items-center gap-1.5 shadow-xs transition-colors shrink-0"
                  >
                    {isAiLoading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Send className="w-4 h-4" />
                    )}
                    <span>विचारा</span>
                  </button>
                </div>

                {/* AI Response Box */}
                {aiDoubtResponse && (
                  <div className="bg-white rounded-xl p-4 border border-purple-200 text-xs sm:text-sm text-slate-800 space-y-2 leading-relaxed">
                    <div className="text-xs font-bold text-purple-800 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>AI मार्गदर्शक उत्तर:</span>
                    </div>
                    <div className="whitespace-pre-wrap">{aiDoubtResponse}</div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Question Palette (1 col) */}
          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  प्रश्न पॅलेट (Question Jump)
                </h4>
                <span className="text-[11px] font-semibold text-slate-500">
                  {Object.keys(selectedAnswers).length}/{filteredQuestions.length} पूर्ण
                </span>
              </div>

              {/* Grid of question buttons */}
              <div className="grid grid-cols-5 sm:grid-cols-6 lg:grid-cols-5 gap-2 max-h-72 overflow-y-auto pr-1">
                {filteredQuestions.map((q, idx) => {
                  const isCurrent = idx === currentIndex;
                  const ans = selectedAnswers[q.id];
                  const hasAnswered = ans !== undefined;
                  const isAnsCorrect = hasAnswered && ans === q.correctOption;
                  const isMarked = bookmarkedIds.has(q.id);

                  let btnBg = "bg-slate-100 text-slate-700 hover:bg-slate-200";
                  if (hasAnswered) {
                    btnBg = isAnsCorrect
                      ? "bg-emerald-600 text-white font-bold"
                      : "bg-rose-600 text-white font-bold";
                  }

                  return (
                    <button
                      key={q.id}
                      id={`jump-q-${idx}`}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsAiDoubtOpen(false);
                      }}
                      className={`relative w-9 h-9 rounded-lg text-xs font-semibold flex items-center justify-center transition-all ${btnBg} ${
                        isCurrent ? "ring-2 ring-blue-600 ring-offset-2" : ""
                      }`}
                    >
                      {idx + 1}
                      {isMarked && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-400 rounded-full ring-2 ring-white"></span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 gap-2 pt-3 border-t border-slate-100 text-[11px] text-slate-600">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-emerald-600 shrink-0"></span>
                  <span>बरोबर (Correct)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-rose-600 shrink-0"></span>
                  <span>चूक (Incorrect)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-sm bg-slate-100 border border-slate-300 shrink-0"></span>
                  <span>न सोडवलेले</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-amber-400 shrink-0"></span>
                  <span>बुकमार्क</span>
                </div>
              </div>
            </div>

            {/* Quick Tips Card */}
            <div className="bg-gradient-to-br from-blue-50 to-slate-50 rounded-2xl border border-blue-200/80 p-4 space-y-2 text-xs">
              <div className="font-bold text-blue-950 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-blue-600" />
                <span>स्मार्ट सराव टीप</span>
              </div>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                NEET आणि JEE मध्ये वेळेचे व्यवस्थापन अतिशय महत्त्वाचे आहे. प्रत्येक प्रश्नासाठी १ ते १.५ मिनिटांपेक्षा जास्त वेळ घेऊ नका.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Auto Question Set Generator Modal (12.5 Lakhs Engine) */}
      {showAutoSetModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full border border-slate-200 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-emerald-700 via-teal-800 to-slate-900 text-white p-5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-400/20 border border-amber-300/40 flex items-center justify-center text-amber-300">
                  <Zap className="w-6 h-6 fill-amber-300" />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight">
                    ऑटो प्रश्न संच जनरेटर (12.5L+ प्रश्न)
                  </h3>
                  <p className="text-xs text-emerald-200">
                    {currentExam} च्या ताज्या पॅटर्ननुसार अमर्याद सराव संच
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowAutoSetModal(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Subject Selection */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  विषय निवडा (Select Subject):
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {availableSubjects.map((sub) => (
                    <button
                      key={sub}
                      type="button"
                      onClick={() => setAutoSubj(sub)}
                      className={`p-3 rounded-xl border text-xs font-bold text-left transition-all cursor-pointer ${
                        autoSubj === sub
                          ? "bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/20"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {sub === "Physics"
                        ? "⚛️ भौतिकशास्त्र (Physics)"
                        : sub === "Chemistry"
                        ? "🧪 रसायनशास्त्र (Chemistry)"
                        : sub === "Mathematics"
                        ? "📐 गणित (Maths)"
                        : "🧬 जीवशास्त्र (Biology)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Number of Questions */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  प्रश्नांची संख्या (Number of Questions):
                </label>
                <div className="grid grid-cols-4 gap-2 font-mono-numbers">
                  {[10, 25, 50, 100].map((cnt) => (
                    <button
                      key={cnt}
                      type="button"
                      onClick={() => setAutoCount(cnt)}
                      className={`py-2 rounded-xl border text-xs font-black transition-all cursor-pointer ${
                        autoCount === cnt
                          ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                          : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {cnt} प्रश्न
                    </button>
                  ))}
                </div>
              </div>

              {/* Difficulty Level */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-2">
                  काठिण्य पातळी (Difficulty):
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["Easy", "Medium", "Hard"] as DifficultyLevel[]).map((lvl) => (
                    <button
                      key={lvl}
                      type="button"
                      onClick={() => setAutoDiff(lvl)}
                      className={`py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        autoDiff === lvl
                          ? "bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20"
                          : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                      }`}
                    >
                      {lvl === "Easy" ? "सोपे (Easy)" : lvl === "Medium" ? "मध्यम (Medium)" : "कठीण (Hard)"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Info box */}
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  हे प्रश्न अल्गोरिदमद्वारे तयार केलेले असून प्रत्येक प्रश्नाचे मराठी व इंग्रजीत सविस्तर स्पष्टीकरण आणि आवश्यक सूत्रे उपलब्ध आहेत.
                </p>
              </div>

              {/* Action Submit */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAutoSetModal(false)}
                  className="flex-1 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  रद्द करा
                </button>
                <button
                  type="button"
                  onClick={handleGenerateAutoSet}
                  className="flex-2 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white text-xs font-black shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Play className="w-4 h-4 fill-white" />
                  <span>सराव सुरू करा ({autoCount} प्रश्न)</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
