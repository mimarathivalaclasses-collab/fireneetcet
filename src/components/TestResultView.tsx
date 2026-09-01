import React, { useEffect, useState, useMemo } from "react";
import confetti from "canvas-confetti";
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  BookOpen,
  ArrowRight,
  Sparkles,
  HelpCircle,
  Lightbulb,
  Bookmark,
  Award,
  Filter,
  Download,
  Printer,
  FileText,
  Zap,
  Gauge,
  AlertTriangle,
  MessageCircle,
  Share2,
  Volume2,
  VolumeX,
} from "lucide-react";
import { TestResultData, LanguageMode, Question } from "../types";
import { printTestResultReport } from "../utils/pdfExport";
import { speakExplanation, stopExplanation } from "../utils/audioSpeechHelper";

interface TestResultViewProps {
  result: TestResultData;
  language: LanguageMode;
  onRetakeTest: () => void;
  onBackToPractice: () => void;
  onToggleBookmark: (question: Question) => void;
  onGoToMistakes?: () => void;
  bookmarkedIds: Set<string>;
}

export const TestResultView: React.FC<TestResultViewProps> = ({
  result,
  language,
  onRetakeTest,
  onBackToPractice,
  onToggleBookmark,
  onGoToMistakes,
  bookmarkedIds,
}) => {
  const [filterType, setFilterType] = useState<"all" | "correct" | "wrong" | "unattempted">("all");
  const [playingQId, setPlayingQId] = useState<string | null>(null);

  useEffect(() => {
    // Fire celebratory confetti if score percentage >= 60%
    if (result.percentage >= 60) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    }

    return () => {
      stopExplanation();
    };
  }, [result.percentage]);

  const formatSeconds = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins} मि. ${s} से.`;
  };

  const handleDownloadPdf = () => {
    printTestResultReport(result, language);
  };

  const handlePrintPdf = () => {
    printTestResultReport(result, language);
  };

  // 1-Click WhatsApp Parent Share
  const handleShareWithParents = () => {
    let studentName = "विद्यार्थी";
    try {
      const userRaw = localStorage.getItem("mcq_current_user_v1");
      if (userRaw) {
        const u = JSON.parse(userRaw);
        if (u.name) studentName = u.name;
      }
    } catch {}

    const appraisalMsg =
      result.percentage >= 80
        ? "🌟 अप्रतिम कामगिरी! पालकांनी विद्यार्थ्याचे कौतुक करावे."
        : result.percentage >= 60
        ? "👍 चांगला प्रयत्न! नियमित सरावाने अजून चांगले गुण मिळतील."
        : "💡 सराव वाढवण्याची गरज आहे. कमजोर विषयांवर विशेष लक्ष द्यावे.";

    const message = `📊 *अभ्यास मित्र - टेस्ट निकाल अहवाल* 🎯
👤 *विद्यार्थी:* ${studentName}
📚 *परीक्षा:* ${result.exam} (${result.title})
📅 *दिनांक:* ${new Date(result.completedAt || Date.now()).toLocaleDateString("mr-IN")}
----------------------------------------
🏆 *मिळालेले गुण:* ${result.score} / ${result.maxMarks} (${result.percentage}%)
✅ *बरोबर उत्तरे:* ${result.correct} / ${result.totalQuestions}
❌ *चुकीची उत्तरे:* ${result.wrong}
⚪ *न सोडवलेले:* ${result.unattempted}
🎯 *अचूकता (Accuracy):* ${result.accuracy}%
⏱️ *घेतलेला वेळ:* ${formatSeconds(result.timeTakenSeconds)}
----------------------------------------
💬 *संदेश:* ${appraisalMsg}

🔗 *ऑनलाइन सराव सुरू ठेवा:* ${window.location.origin}`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  // Audio Speech Explanation
  const handleToggleAudio = (q: Question) => {
    if (playingQId === q.id) {
      stopExplanation();
      setPlayingQId(null);
    } else {
      const textToSpeak = q.explanationMr
        ? `प्रश्न स्पष्टीकरण: ${q.explanationMr}`
        : `Explanation: ${q.explanation}`;

      const isMr = Boolean(q.explanationMr);

      speakExplanation(textToSpeak, {
        lang: isMr ? "mr-IN" : "en-IN",
        onStart: () => setPlayingQId(q.id),
        onEnd: () => setPlayingQId(null),
        onError: () => setPlayingQId(null),
      });
    }
  };

  // Speed & Time Management Analytics
  const timeAnalytics = useMemo(() => {
    const attemptedCount = result.attempted || 1;
    const avgSecondsPerQ = Math.round(result.timeTakenSeconds / attemptedCount);

    let overtimeCount = 0; // > 90s
    let rapidGuessCount = 0; // < 10s
    let optimalCount = 0; // 10s - 90s

    result.questions.forEach((q) => {
      const timeSpent = result.timeSpentPerQuestion?.[q.id] || avgSecondsPerQ;
      if (timeSpent > 90) overtimeCount++;
      else if (timeSpent < 10 && result.userAnswers[q.id] !== undefined) rapidGuessCount++;
      else if (result.userAnswers[q.id] !== undefined) optimalCount++;
    });

    return {
      avgSecondsPerQ,
      overtimeCount,
      rapidGuessCount,
      optimalCount,
    };
  }, [result]);

  // Filter questions according to selection
  const filteredReviewQuestions = result.questions.filter((q) => {
    const userAns = result.userAnswers[q.id];
    if (filterType === "correct") return userAns === q.correctOption;
    if (filterType === "wrong") return userAns !== undefined && userAns !== q.correctOption;
    if (filterType === "unattempted") return userAns === undefined;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Top Action Bar with PDF Export Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-50 text-red-600 flex items-center justify-center font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">मॉक टेस्ट निकाल व स्पष्टीकरण PDF</div>
            <div className="text-[11px] text-slate-500">सर्व प्रश्न, योग्य उत्तरे आणि स्टेप-बाय-स्टेप स्पष्टीकरणे PDF मध्ये सेव्ह करा</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="btn-download-pdf"
            onClick={handleDownloadPdf}
            className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>PDF डाउनलोड करा (Download PDF)</span>
          </button>

          <button
            id="btn-print-pdf"
            onClick={handlePrintPdf}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <Printer className="w-4 h-4 text-amber-400" />
            <span>प्रिंट करा (Print Report)</span>
          </button>
        </div>
      </div>

      <div id="printable-test-report" className="space-y-8 bg-white p-2 sm:p-4 rounded-3xl">
        {/* Scorecard Hero Banner matching Rocket App Screen 4 */}
        <div className="bg-gradient-to-r from-[#292bb2] via-[#3a3dc7] to-[#4e51ec] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-indigo-700/40">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left">
              <span className="text-xs text-indigo-200 uppercase tracking-wider font-bold">
                Your Score
              </span>
              <div className="text-4xl sm:text-5xl font-black text-white font-mono-numbers leading-none">
                {result.score} <span className="text-xl sm:text-2xl text-indigo-200 font-medium">/ {result.maxMarks}</span>
              </div>
              <p className="text-xs sm:text-sm text-indigo-100/90 font-medium pt-1 max-w-md">
                {result.percentage >= 75
                  ? `Excellent! You scored higher than ${Math.min(99, Math.max(50, result.percentage + 10))}% of students.`
                  : result.percentage >= 50
                  ? `Good effort! You scored higher than ${result.percentage}% of students.`
                  : "Keep practicing! Review detailed solutions below to improve your score."}
              </p>
            </div>

            {/* Radial Percentile Gauge */}
            <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 min-w-[160px]">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-white/20 stroke-current"
                    strokeWidth="8"
                    fill="transparent"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    className="text-emerald-400 stroke-current drop-shadow-md"
                    strokeWidth="8"
                    strokeDasharray={`${2 * Math.PI * 40}`}
                    strokeDashoffset={`${2 * Math.PI * 40 * (1 - result.accuracy / 100)}`}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-lg font-black text-white font-mono-numbers leading-tight">
                    {result.accuracy}%
                  </span>
                  <span className="text-[9px] font-bold text-indigo-200">
                    Percentile
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 4 KPI Metrics Strip (Correct, Incorrect, Unattempted, Accuracy) */}
          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-white/15">
            <div className="bg-white/10 rounded-2xl p-3 text-center backdrop-blur-xs">
              <span className="text-[11px] text-indigo-200 block font-bold uppercase">Correct</span>
              <strong className="text-emerald-300 text-xl font-black font-mono-numbers">
                {result.correct}
              </strong>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 text-center backdrop-blur-xs">
              <span className="text-[11px] text-indigo-200 block font-bold uppercase">Incorrect</span>
              <strong className="text-rose-300 text-xl font-black font-mono-numbers">
                {result.wrong}
              </strong>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 text-center backdrop-blur-xs">
              <span className="text-[11px] text-indigo-200 block font-bold uppercase">Unattempted</span>
              <strong className="text-amber-300 text-xl font-black font-mono-numbers">
                {result.unattempted}
              </strong>
            </div>
            <div className="bg-white/10 rounded-2xl p-3 text-center backdrop-blur-xs">
              <span className="text-[11px] text-indigo-200 block font-bold uppercase">Accuracy</span>
              <strong className="text-white text-xl font-black font-mono-numbers">
                {result.accuracy}%
              </strong>
            </div>
          </div>
        </div>

        {/* Subject-Wise Performance Breakdown matching Screen 4 */}
        {result.subjectBreakdown.length > 0 && (
          <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-sm sm:text-base font-black text-slate-900">
                Subject Wise Performance
              </h3>
              <span className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer">
                View Detailed
              </span>
            </div>

            <div className="space-y-4 pt-1">
              {result.subjectBreakdown.map((sub, idx) => {
                const colors = [
                  { bar: "bg-blue-600", text: "text-blue-600" },
                  { bar: "bg-emerald-500", text: "text-emerald-600" },
                  { bar: "bg-teal-500", text: "text-teal-600" },
                  { bar: "bg-orange-500", text: "text-orange-600" },
                ];
                const color = colors[idx % colors.length];

                return (
                  <div key={sub.subject} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs sm:text-sm">
                      <span className="font-bold text-slate-800">{sub.subject}</span>
                      <div className="flex items-center gap-2 font-mono-numbers">
                        <span className="font-bold text-slate-700">
                          {sub.score}/{sub.maxScore}
                        </span>
                        <span className={`font-black ${color.text}`}>
                          {sub.accuracy}%
                        </span>
                      </div>
                    </div>
                    {/* Linear bar */}
                    <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                      <div
                        className={`${color.bar} h-2 rounded-full transition-all duration-700`}
                        style={{ width: `${Math.max(8, sub.accuracy)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Speedometer & Time Management Analysis Widget */}
        <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Gauge className="w-5 h-5 text-amber-400" />
              <h3 className="text-sm font-bold tracking-tight">
                वेळ व वेग मॅनेजमेंट विश्लेषण (Speedometer & Pacing Analytics)
              </h3>
            </div>
            <span className="text-xs text-slate-400 font-mono-numbers">
              सरासरी वेग: <strong className="text-white">{timeAnalytics.avgSecondsPerQ} सेकंद / प्रश्न</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-slate-400 font-medium">आदर्श वेगातील प्रश्न (10s - 90s)</span>
                <div className="text-base font-extrabold text-emerald-400 font-mono-numbers mt-0.5">
                  {timeAnalytics.optimalCount} प्रश्न 🟢
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-slate-400 font-medium">जास्त वेळ घेतलेले प्रश्न (&gt; 90s)</span>
                <div className="text-base font-extrabold text-red-400 font-mono-numbers mt-0.5">
                  {timeAnalytics.overtimeCount} प्रश्न 🔴
                </div>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
              <div>
                <span className="text-slate-400 font-medium">अति-जलद उत्तरे (&lt; 10s)</span>
                <div className="text-base font-extrabold text-amber-400 font-mono-numbers mt-0.5">
                  {timeAnalytics.rapidGuessCount} प्रश्न ⚡
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action CTA Buttons */}
        <div className="flex flex-wrap gap-3 no-print">
          {/* Prominent WhatsApp Share with Parents Button */}
          <button
            id="btn-share-parents-whatsapp"
            onClick={handleShareWithParents}
            className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer animate-pulse"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>पालकांना निकाल WhatsApp करा (Share with Parents)</span>
          </button>

          <button
            id="btn-retake-test"
            onClick={onRetakeTest}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>पुन्हा टेस्ट द्या (Retake Test)</span>
          </button>

          {result.wrong > 0 && onGoToMistakes && (
            <button
              onClick={onGoToMistakes}
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
            >
              <AlertTriangle className="w-4 h-4 text-yellow-300" />
              <span>चुकलेले {result.wrong} प्रश्न एरर नोटबुकमध्ये पाहा</span>
            </button>
          )}

          <button
            id="btn-back-practice"
            onClick={onBackToPractice}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>सराव मोडवर जा (Back to Practice)</span>
          </button>

          <button
            id="btn-download-pdf-secondary"
            onClick={handleDownloadPdf}
            className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold text-xs border border-slate-300 shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4 text-red-600" />
            <span>PDF डाउनलोड (Download PDF)</span>
          </button>
        </div>

        {/* Question-By-Question Detailed Solutions Review */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                प्रश्नोत्तरे व सविस्तर स्पष्टीकरणे (Solutions Review)
              </h3>
              <p className="text-xs text-slate-500">
                प्रत्येक प्रश्नाचे योग्य उत्तर, सूत्र आणि स्टेप-बाय-स्टेप स्पष्टीकरण तपासा.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs no-print">
              <button
                onClick={() => setFilterType("all")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterType === "all" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600"
                }`}
              >
                सर्व ({result.questions.length})
              </button>
              <button
                onClick={() => setFilterType("wrong")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterType === "wrong" ? "bg-rose-600 text-white shadow-xs" : "text-rose-700"
                }`}
              >
                चुकीचे ({result.wrong})
              </button>
              <button
                onClick={() => setFilterType("correct")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterType === "correct" ? "bg-emerald-600 text-white shadow-xs" : "text-emerald-700"
                }`}
              >
                बरोबर ({result.correct})
              </button>
              <button
                onClick={() => setFilterType("unattempted")}
                className={`px-3 py-1 rounded-lg font-semibold transition-all ${
                  filterType === "unattempted" ? "bg-slate-700 text-white shadow-xs" : "text-slate-600"
                }`}
              >
                न सोडवलेले ({result.unattempted})
              </button>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-6">
            {filteredReviewQuestions.map((q, idx) => {
              const userAns = result.userAnswers[q.id];
              const isAnsCorrect = userAns === q.correctOption;
              const isUnattempted = userAns === undefined;
              const isBookmarked = bookmarkedIds.has(q.id);

              return (
                <div
                  key={q.id}
                  className={`p-5 sm:p-6 rounded-2xl border-2 space-y-4 ${
                    isAnsCorrect
                      ? "bg-emerald-50/30 border-emerald-200"
                      : isUnattempted
                      ? "bg-slate-50/60 border-slate-200"
                      : "bg-rose-50/30 border-rose-200"
                  }`}
                >
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
                        प्रश्न {idx + 1}
                      </span>
                      <span className="font-semibold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
                        {q.subject}
                      </span>
                      <span className="text-slate-500 font-medium">{q.chapter}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {/* Question Timing Badge */}
                      {result.timeSpentPerQuestion?.[q.id] !== undefined && (
                        <span
                          className={`px-2 py-0.5 rounded-md font-mono-numbers text-[11px] font-bold flex items-center gap-1 ${
                            result.timeSpentPerQuestion[q.id] > 90
                              ? "bg-red-100 text-red-800 border border-red-200"
                              : result.timeSpentPerQuestion[q.id] < 15
                              ? "bg-amber-100 text-amber-800 border border-amber-200"
                              : "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          <span>{result.timeSpentPerQuestion[q.id]}s</span>
                          {result.timeSpentPerQuestion[q.id] > 90 && <span className="text-[10px]">⚠️ जास्त वेळ</span>}
                        </span>
                      )}

                      <span
                        className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] flex items-center gap-1 ${
                          isAnsCorrect
                            ? "bg-emerald-100 text-emerald-800"
                            : isUnattempted
                            ? "bg-slate-200 text-slate-700"
                            : "bg-rose-100 text-rose-800"
                        }`}
                      >
                        {isAnsCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>बरोबर</span>
                          </>
                        ) : isUnattempted ? (
                          <span>न सोडवलेले</span>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            <span>चुकीचे</span>
                          </>
                        )}
                      </span>

                      <button
                        onClick={() => onToggleBookmark(q)}
                        className={`p-1.5 rounded-lg border text-xs no-print ${
                          isBookmarked
                            ? "bg-amber-100 text-amber-800 border-amber-300"
                            : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                        }`}
                        title="बुकमार्क करा"
                      >
                        <Bookmark className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Question Text */}
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-slate-900 leading-relaxed">
                      {q.questionText}
                    </div>
                    {q.questionTextMr && (
                      <div className="text-xs text-slate-700 bg-amber-50/60 p-2.5 rounded-lg border border-amber-100">
                        <strong>मराठी:</strong> {q.questionTextMr}
                      </div>
                    )}
                  </div>

                  {/* Options List with Results */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {q.options.map((opt, optI) => {
                      const optLetter = String.fromCharCode(65 + optI);
                      const isCorrectOpt = optI === q.correctOption;
                      const isUserChoice = userAns === optI;

                      let optBg = "bg-white border-slate-200 text-slate-700";
                      if (isCorrectOpt) {
                        optBg = "bg-emerald-100 border-emerald-400 text-emerald-950 font-bold";
                      } else if (isUserChoice) {
                        optBg = "bg-rose-100 border-rose-400 text-rose-950 font-bold";
                      }

                      return (
                        <div
                          key={optI}
                          className={`p-3 rounded-xl border flex items-start gap-2.5 ${optBg}`}
                        >
                          <span className="font-bold shrink-0">{optLetter}.</span>
                          <div className="flex-1 leading-snug">
                            <div>{opt}</div>
                            {q.optionsMr?.[optI] && (
                              <div className="text-[11px] opacity-80">({q.optionsMr[optI]})</div>
                            )}
                          </div>
                          {isCorrectOpt && (
                            <span className="text-[10px] uppercase font-bold text-emerald-800 bg-emerald-200/80 px-1.5 py-0.5 rounded-sm shrink-0">
                              योग्य उत्तर
                            </span>
                          )}
                          {isUserChoice && !isCorrectOpt && (
                            <span className="text-[10px] uppercase font-bold text-rose-800 bg-rose-200/80 px-1.5 py-0.5 rounded-sm shrink-0">
                              तुमची निवड
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Detailed Solution Box */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
                      <div className="flex items-center gap-1.5 font-bold text-slate-800">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                        <span>सविस्तर स्पष्टीकरण (Step-by-step Solution):</span>
                      </div>

                      {/* Listen to Audio Explanation Button */}
                      <button
                        type="button"
                        onClick={() => handleToggleAudio(q)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                          playingQId === q.id
                            ? "bg-rose-600 text-white animate-pulse"
                            : "bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200"
                        }`}
                      >
                        {playingQId === q.id ? (
                          <>
                            <VolumeX className="w-3.5 h-3.5" />
                            <span>ऑडिओ थांबवा (Stop)</span>
                          </>
                        ) : (
                          <>
                            <Volume2 className="w-3.5 h-3.5 text-indigo-600" />
                            <span>🔊 स्पष्टीकरण ऐका (Listen Explanation)</span>
                          </>
                        )}
                      </button>
                    </div>

                    {q.formula && (
                      <div className="p-2 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 font-mono text-[11px]">
                        <strong>सूत्र (Formula):</strong> {q.formula}
                      </div>
                    )}

                    <p className="text-slate-700 leading-relaxed">{q.explanation}</p>

                    {q.explanationMr && (
                      <p className="text-slate-800 bg-amber-50/40 p-2.5 rounded-lg border border-amber-100 leading-relaxed">
                        <strong className="text-amber-900">मराठी स्पष्टीकरण:</strong> {q.explanationMr}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
