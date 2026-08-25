import React, { useState, useEffect } from "react";
import {
  Timer,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Bookmark,
  RotateCcw,
  Send,
  Flag,
  Languages,
} from "lucide-react";
import { Question, ExamType, SubjectType, LanguageMode, TestResultData, SubjectResult } from "../types";
import { getMarkingScheme } from "../data/chaptersData";

interface ActiveTestViewProps {
  testConfig: {
    title: string;
    exam: ExamType;
    subject: SubjectType | "All";
    durationMinutes: number;
    selectedQuestions: Question[];
    perQuestionTimerSeconds?: number;
    enforcePerQuestionTimer?: boolean;
    instituteName?: string;
  };
  language: LanguageMode;
  onFinishTest: (result: TestResultData) => void;
  onCancelTest: () => void;
}

export const ActiveTestView: React.FC<ActiveTestViewProps> = ({
  testConfig,
  language: initialLanguage,
  onFinishTest,
  onCancelTest,
}) => {
  const { title, exam, durationMinutes, selectedQuestions, perQuestionTimerSeconds, enforcePerQuestionTimer, instituteName } = testConfig;

  // Local language toggle during test
  const [language, setLanguage] = useState<LanguageMode>(initialLanguage);

  // Time state
  const totalSeconds = durationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState<number>(totalSeconds);

  // Question navigation
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  // Per-question countdown state
  const [questionSecondsRemaining, setQuestionSecondsRemaining] = useState<number>(
    perQuestionTimerSeconds && perQuestionTimerSeconds > 0 ? perQuestionTimerSeconds : 0
  );

  // Answers & Status
  // status map: 'answered' | 'marked_for_review' | 'not_answered' | 'not_visited'
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [questionStatuses, setQuestionStatuses] = useState<
    Record<string, "answered" | "marked_for_review" | "answered_marked" | "not_answered" | "not_visited">
  >(() => {
    const init: any = {};
    selectedQuestions.forEach((q, i) => {
      init[q.id] = i === 0 ? "not_answered" : "not_visited";
    });
    return init;
  });

  // Track time spent per question
  const [timeSpent, setTimeSpent] = useState<Record<string, number>>({});

  // Reset per question timer when index changes
  useEffect(() => {
    if (perQuestionTimerSeconds && perQuestionTimerSeconds > 0) {
      setQuestionSecondsRemaining(perQuestionTimerSeconds);
    }
  }, [currentIndex, perQuestionTimerSeconds]);

  // Submit confirmation modal state
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // Main Timer Interval
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest(); // Auto submit on timer expiration
          return 0;
        }
        return prev - 1;
      });

      // Track per-question countdown if configured
      if (perQuestionTimerSeconds && perQuestionTimerSeconds > 0) {
        setQuestionSecondsRemaining((prevQ) => {
          if (prevQ <= 1) {
            // If enforce auto-advance is on and there are more questions
            if (enforcePerQuestionTimer && currentIndex < selectedQuestions.length - 1) {
              navigateTo(currentIndex + 1);
              return perQuestionTimerSeconds;
            }
            return 0;
          }
          return prevQ - 1;
        });
      }

      // Track active question time
      const currentQ = selectedQuestions[currentIndex];
      if (currentQ) {
        setTimeSpent((prev) => ({
          ...prev,
          [currentQ.id]: (prev[currentQ.id] || 0) + 1,
        }));
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentIndex, selectedQuestions, perQuestionTimerSeconds, enforcePerQuestionTimer]);

  const currentQ = selectedQuestions[currentIndex];

  // Mark current as visited when navigating
  const navigateTo = (index: number) => {
    if (index < 0 || index >= selectedQuestions.length) return;
    const targetQ = selectedQuestions[index];
    setQuestionStatuses((prev) => {
      const currentStatus = prev[targetQ.id];
      if (currentStatus === "not_visited") {
        return { ...prev, [targetQ.id]: "not_answered" };
      }
      return prev;
    });
    setCurrentIndex(index);
  };

  // Handle Option selection in current question
  const handleSelectOption = (optionIndex: number) => {
    if (!currentQ) return;
    setUserAnswers((prev) => ({ ...prev, [currentQ.id]: optionIndex }));
  };

  // Clear Response
  const handleClearResponse = () => {
    if (!currentQ) return;
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQ.id];
      return copy;
    });
    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQ.id]: "not_answered",
    }));
  };

  // Save & Next
  const handleSaveAndNext = () => {
    if (!currentQ) return;
    const isAnswered = userAnswers[currentQ.id] !== undefined;

    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQ.id]: isAnswered ? "answered" : "not_answered",
    }));

    if (currentIndex < selectedQuestions.length - 1) {
      navigateTo(currentIndex + 1);
    }
  };

  // Mark for Review & Next
  const handleMarkForReviewAndNext = () => {
    if (!currentQ) return;
    const isAnswered = userAnswers[currentQ.id] !== undefined;

    setQuestionStatuses((prev) => ({
      ...prev,
      [currentQ.id]: isAnswered ? "answered_marked" : "marked_for_review",
    }));

    if (currentIndex < selectedQuestions.length - 1) {
      navigateTo(currentIndex + 1);
    }
  };

  // Submit test and calculate final scores
  const handleSubmitTest = () => {
    let totalScore = 0;
    let maxMarks = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;

    // Subject level maps
    const subjectMap: Record<
      string,
      { total: number; attempted: number; correct: number; wrong: number; score: number; maxScore: number }
    > = {};

    selectedQuestions.forEach((q) => {
      const marking = getMarkingScheme(exam, q.subject);
      maxMarks += marking.correctMarks;

      if (!subjectMap[q.subject]) {
        subjectMap[q.subject] = { total: 0, attempted: 0, correct: 0, wrong: 0, score: 0, maxScore: 0 };
      }
      subjectMap[q.subject].total += 1;
      subjectMap[q.subject].maxScore += marking.correctMarks;

      const userAns = userAnswers[q.id];
      if (userAns === undefined) {
        unattemptedCount += 1;
      } else if (userAns === q.correctOption) {
        correctCount += 1;
        totalScore += marking.correctMarks;
        subjectMap[q.subject].attempted += 1;
        subjectMap[q.subject].correct += 1;
        subjectMap[q.subject].score += marking.correctMarks;
      } else {
        wrongCount += 1;
        totalScore += marking.negativeMarks;
        subjectMap[q.subject].attempted += 1;
        subjectMap[q.subject].wrong += 1;
        subjectMap[q.subject].score += marking.negativeMarks;
      }
    });

    const attemptedCount = correctCount + wrongCount;
    const accuracy = attemptedCount > 0 ? Math.round((correctCount / attemptedCount) * 100) : 0;
    const percentage = maxMarks > 0 ? Math.round((Math.max(0, totalScore) / maxMarks) * 100) : 0;

    const subjectBreakdown: SubjectResult[] = Object.keys(subjectMap).map((subKey) => {
      const s = subjectMap[subKey];
      return {
        subject: subKey as SubjectType,
        totalQuestions: s.total,
        attempted: s.attempted,
        correct: s.correct,
        wrong: s.wrong,
        unattempted: s.total - s.attempted,
        score: s.score,
        maxScore: s.maxScore,
        accuracy: s.attempted > 0 ? Math.round((s.correct / s.attempted) * 100) : 0,
      };
    });

    const resultData: TestResultData = {
      testId: `test_${Date.now()}`,
      title,
      exam,
      totalQuestions: selectedQuestions.length,
      attempted: attemptedCount,
      correct: correctCount,
      wrong: wrongCount,
      unattempted: unattemptedCount,
      score: totalScore,
      maxMarks,
      percentage,
      accuracy,
      timeTakenSeconds: totalSeconds - secondsRemaining,
      subjectBreakdown,
      completedAt: Date.now(),
      questions: selectedQuestions,
      userAnswers,
      timeSpentPerQuestion: timeSpent,
    };

    onFinishTest(resultData);
  };

  // Format time remaining
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const isLowTime = secondsRemaining < 300; // < 5 mins

  // Count summaries for palette
  const countAnswered = Object.values(questionStatuses).filter(
    (s) => s === "answered" || s === "answered_marked"
  ).length;
  const countMarked = Object.values(questionStatuses).filter((s) => s === "marked_for_review").length;
  const countNotAnswered = Object.values(questionStatuses).filter((s) => s === "not_answered").length;
  const countNotVisited = Object.values(questionStatuses).filter((s) => s === "not_visited").length;

  const currentMarking = currentQ ? getMarkingScheme(exam, currentQ.subject) : null;

  return (
    <div className="min-h-[calc(100vh-120px)] bg-slate-100 flex flex-col font-sans">
      {/* Top Test Header Bar */}
      <header className="bg-white text-slate-900 px-4 sm:px-8 py-3.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-lg text-xs font-black bg-indigo-50 text-indigo-700 border border-indigo-200 tracking-wide uppercase">
            {exam === "MHT_CET" ? "MHT-CET" : exam === "JEE_MAIN" ? "JEE Main" : exam}
          </span>
          <h1 className="text-base sm:text-lg font-black text-slate-900 tracking-tight">
            {title || "JEE / CET / NET Mock Test"}
          </h1>
        </div>

        {/* Center: Countdown Timer */}
        <div className="flex flex-wrap items-center gap-2">
          <div
            id="timer"
            className={`flex items-center gap-2 px-4 py-2 rounded-xl font-mono text-sm sm:text-base font-black shadow-xs transition-all ${
              isLowTime
                ? "bg-rose-50 text-rose-700 border-2 border-rose-400 animate-pulse"
                : "bg-indigo-50 text-indigo-700 border border-indigo-200"
            }`}
          >
            <Timer className="w-4 h-4 text-indigo-600" />
            <span>वेळ: {formatTime(secondsRemaining)}</span>
          </div>

          {perQuestionTimerSeconds && perQuestionTimerSeconds > 0 ? (
            <div
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-mono text-xs sm:text-sm font-black border transition-all ${
                questionSecondsRemaining <= 10
                  ? "bg-rose-600 text-white border-rose-400 animate-bounce shadow-md"
                  : questionSecondsRemaining <= 20
                  ? "bg-amber-500 text-slate-950 border-amber-300 shadow-xs"
                  : "bg-indigo-600 text-white border-indigo-400 shadow-xs"
              }`}
            >
              <span>⏱️ प्रश्न वेळ:</span>
              <span className="text-sm font-black underline">{questionSecondsRemaining}s</span>
              {enforcePerQuestionTimer && (
                <span className="text-[9px] px-1 py-0.2 bg-black/30 rounded font-normal uppercase">Auto-Next</span>
              )}
            </div>
          ) : null}
        </div>

        {/* Right: Language switch & Submit trigger */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language toggle */}
          <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200 text-xs">
            <button
              onClick={() => setLanguage("bilingual")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                language === "bilingual" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              द्विभाषिक
            </button>
            <button
              onClick={() => setLanguage("mr")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                language === "mr" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              मराठी
            </button>
            <button
              onClick={() => setLanguage("en")}
              className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                language === "en" ? "bg-indigo-600 text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              English
            </button>
          </div>

          <button
            id="btn-submit-test-header"
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>सबमिट करा</span>
          </button>
        </div>
      </header>

      {/* Main Test Container */}
      <div className="max-w-[1400px] w-full mx-auto p-3 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
        {/* Left 3 cols: Question Area */}
        <div className="lg:col-span-3 flex flex-col justify-between bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
          {/* Question Sub-header */}
          <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-black text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-200 shadow-2xs">
                प्रश्न {currentIndex + 1} / {selectedQuestions.length}
              </span>
              <span className="font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                {currentQ.subject}
              </span>
              <span className="text-slate-500 font-medium">{currentQ.chapter}</span>
            </div>

            {currentMarking && (
              <div className="text-[11px] font-bold text-slate-600 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                बरोबर: <span className="text-emerald-600 font-black">+{currentMarking.correctMarks}</span> | चूक:{" "}
                <span className="text-rose-600 font-black">{currentMarking.negativeMarks}</span>
              </div>
            )}
          </div>

          {/* Question Content */}
          <div className="p-5 sm:p-8 space-y-6 flex-1 overflow-y-auto">
            {/* Question Text */}
            <div className="space-y-3">
              {(language === "en" || language === "bilingual") && (
                <div className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed" id="question-text">
                  प्रश्न् {currentIndex + 1}: {currentQ.questionText}
                </div>
              )}

              {(language === "mr" || language === "bilingual") && currentQ.questionTextMr && (
                <div className="text-base sm:text-lg font-semibold text-slate-800 bg-amber-50/60 p-4 rounded-xl border border-amber-200/80 leading-relaxed">
                  <span className="text-xs font-bold text-amber-900 block mb-1">मराठी भाषांतर:</span>
                  प्रश्न् {currentIndex + 1}: {currentQ.questionTextMr}
                </div>
              )}
            </div>

            {/* Options List */}
            <div className="space-y-3 pt-2" id="options-list">
              {currentQ.options.map((optText, optIdx) => {
                const optLetter = String.fromCharCode(65 + optIdx);
                const isSelected = userAnswers[currentQ.id] === optIdx;
                const optMrText = currentQ.optionsMr?.[optIdx];

                return (
                  <button
                    key={optIdx}
                    id={`test-opt-${optIdx}`}
                    onClick={() => handleSelectOption(optIdx)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3.5 cursor-pointer ${
                      isSelected
                        ? "bg-indigo-50/90 border-indigo-600 text-indigo-950 font-bold shadow-xs scale-[1.005]"
                        : "bg-slate-50/70 border-slate-200 hover:bg-slate-100 hover:border-indigo-300 text-slate-800"
                    }`}
                  >
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-xs shrink-0 border transition-all ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                          : "bg-white text-slate-700 border-slate-300"
                      }`}
                    >
                      {optLetter}
                    </span>
                    <div className="space-y-0.5 flex-1">
                      <div className="text-sm sm:text-base font-medium leading-snug">{optText}</div>
                      {language !== "en" && optMrText && optMrText !== optText && (
                        <div className="text-xs text-slate-600 font-normal">({optMrText})</div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Solution / Explanation Section Below Options */}
            <div className="mt-4 pt-4 border-t border-slate-100">
              <details className="group rounded-2xl bg-slate-50 border border-slate-200 overflow-hidden">
                <summary className="px-4 py-3 text-xs font-black text-indigo-900 bg-indigo-50/70 hover:bg-indigo-100/80 cursor-pointer flex items-center justify-between transition-colors select-none">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">✓</span>
                    <span>योग्य उत्तर व सविस्तर स्पष्टीकरण (Solution & Explanation)</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-indigo-200 text-indigo-900 font-bold group-open:rotate-180 transition-transform">
                    ▼
                  </span>
                </summary>
                <div className="p-4 sm:p-5 space-y-3 bg-white text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700">योग्य पर्याय:</span>
                    <span className="px-2.5 py-0.5 rounded-lg bg-emerald-100 text-emerald-950 font-black font-mono">
                      पर्याय ({String.fromCharCode(65 + currentQ.correctOption)}) - {currentQ.options[currentQ.correctOption]}
                    </span>
                  </div>

                  {currentQ.formula && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 font-mono text-xs">
                      <strong>सूत्र (Formula): </strong> {currentQ.formula}
                    </div>
                  )}

                  <div className="space-y-1.5 text-slate-700 leading-relaxed">
                    <p className="font-bold text-slate-900">स्पष्टीकरण:</p>
                    <p>{currentQ.explanation}</p>
                    {currentQ.explanationMr && currentQ.explanationMr !== currentQ.explanation && (
                      <p className="pt-1.5 text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                        {currentQ.explanationMr}
                      </p>
                    )}
                  </div>
                </div>
              </details>
            </div>
          </div>

          {/* Test Action Controls Bar (btn-group) */}
          <div className="bg-slate-50 border-t border-slate-200 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                id="btn-clear-response"
                onClick={handleClearResponse}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
                <span>पुसून टाका (Clear)</span>
              </button>

              <button
                id="btn-mark-review"
                onClick={handleMarkForReviewAndNext}
                className="px-3.5 py-2.5 rounded-xl bg-purple-50 border border-purple-200 text-purple-700 hover:bg-purple-100 text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <Flag className="w-3.5 h-3.5 text-purple-600" />
                <span>रिव्ह्यूसाठी ठेवा (Review)</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                id="btn-test-prev"
                disabled={currentIndex === 0}
                onClick={() => navigateTo(currentIndex - 1)}
                className="px-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-800 text-xs font-bold hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1 transition-all cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>मागील (Prev)</span>
              </button>

              <button
                id="btn-save-next"
                onClick={handleSaveAndNext}
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-black shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <span>पुढील (Next & Save)</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right 1 col: Question Status Palette */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-xs">
            <h4 className="text-xs font-black text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-2">
              प्रश्न पॅनल (Question Palette)
            </h4>

            {/* Questions Grid (5-column grid) */}
            <div className="pt-1">
              <div className="grid grid-cols-5 gap-2.5 max-h-72 overflow-y-auto pr-1" id="palette-grid">
                {selectedQuestions.map((q, idx) => {
                  const status = questionStatuses[q.id] || "not_visited";
                  const isCurrent = idx === currentIndex;

                  let btnStyle = "bg-white text-slate-700 border border-slate-300 hover:border-indigo-400";

                  if (status === "answered") {
                    btnStyle = "bg-emerald-600 text-white font-black border-emerald-600 shadow-2xs";
                  } else if (status === "answered_marked") {
                    btnStyle = "bg-purple-600 text-white font-black border-purple-600 shadow-2xs";
                  } else if (status === "marked_for_review") {
                    btnStyle = "bg-purple-100 text-purple-900 font-black border-purple-300";
                  } else if (status === "not_answered") {
                    btnStyle = "bg-rose-50 text-rose-700 font-bold border-rose-300";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => navigateTo(idx)}
                      className={`relative aspect-square rounded-lg text-xs font-bold flex items-center justify-center transition-all cursor-pointer ${btnStyle} ${
                        isCurrent ? "ring-2 ring-indigo-600 ring-offset-2 scale-105" : ""
                      }`}
                    >
                      {idx + 1}
                      {status === "answered_marked" && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full ring-2 ring-white"></span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Legend */}
            <div className="pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-emerald-600 border border-emerald-600"></span>
                <span>सोडवलेले प्रश्न (Answered)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-white border border-slate-300"></span>
                <span>न सोडवलेले (Unanswered)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 rounded-sm bg-purple-100 border border-purple-300"></span>
                <span>रिव्ह्यूसाठी (Marked for Review)</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-3 border-t border-slate-100">
              <button
                id="btn-final-submit"
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>अंतिम टेस्ट सबमिट करा</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-slate-200 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  तुम्हाला टेस्ट सबमिट करायची आहे का?
                </h3>
                <p className="text-xs text-slate-500">
                  एकदा सबमिट केल्यावर निकाल व सविस्तर स्पष्टीकरणे दिसतील.
                </p>
              </div>
            </div>

            {/* Summary details */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-slate-600">एकूण प्रश्न:</span>
                <strong className="text-slate-900">{selectedQuestions.length}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-emerald-700 font-medium">सोडवलेले प्रश्न (Answered):</span>
                <strong className="text-emerald-700 font-bold">{countAnswered}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200/60">
                <span className="text-purple-700 font-medium">रिव्ह्यूसाठी चिन्हांकित:</span>
                <strong className="text-purple-700 font-bold">{countMarked}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-rose-700 font-medium">न सोडवलेले प्रश्न:</span>
                <strong className="text-rose-700 font-bold">{countNotAnswered + countNotVisited}</strong>
              </div>
            </div>

            {/* Modal actions */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setShowSubmitModal(false)}
                className="py-2.5 px-4 rounded-xl bg-slate-100 text-slate-700 font-semibold text-xs hover:bg-slate-200 transition-colors"
              >
                टेस्ट सुरू ठेवा (Resume)
              </button>
              <button
                onClick={handleSubmitTest}
                className="py-2.5 px-4 rounded-xl bg-emerald-600 text-white font-bold text-xs hover:bg-emerald-700 shadow-md transition-colors"
              >
                होय, सबमिट करा (Submit)
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
