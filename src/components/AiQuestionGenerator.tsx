import React, { useState, useMemo } from "react";
import {
  Sparkles,
  Loader2,
  CheckCircle2,
  BookOpen,
  PlusCircle,
  Play,
  RotateCcw,
  Zap,
  GraduationCap,
  Lightbulb,
  ArrowLeft,
} from "lucide-react";
import { ExamType, SubjectType, DifficultyLevel, LanguageMode, Question } from "../types";
import { CHAPTERS_DATA, getSubjectsForExam } from "../data/chaptersData";

interface AiQuestionGeneratorProps {
  currentExam: ExamType;
  language: LanguageMode;
  onAddGeneratedQuestions: (newQuestions: Question[], startPracticeNow?: boolean) => void;
  onBack?: () => void;
}

export const AiQuestionGenerator: React.FC<AiQuestionGeneratorProps> = ({
  currentExam,
  language: initialLanguage,
  onAddGeneratedQuestions,
  onBack,
}) => {
  const [exam, setExam] = useState<ExamType>(currentExam);
  const [subject, setSubject] = useState<SubjectType>("Physics");
  const [chapter, setChapter] = useState<string>("All Chapters");
  const [customTopic, setCustomTopic] = useState<string>("");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("Medium");
  const [language, setLanguage] = useState<LanguageMode>(initialLanguage);
  const [count, setCount] = useState<number>(5);
  const [questionType, setQuestionType] = useState<string>("concept_and_numerical");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<Question[]>([]);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const availableSubjects = useMemo(() => getSubjectsForExam(exam), [exam]);

  const availableChapters = useMemo(() => {
    return CHAPTERS_DATA.filter((ch) => ch.exams.includes(exam) && ch.subject === subject);
  }, [exam, subject]);

  const handleGenerate = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    setIsSaved(false);

    const chapterQuery = customTopic.trim() ? customTopic.trim() : chapter;

    try {
      const response = await fetch("/api/gemini/generate-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          exam,
          subject,
          chapter: chapterQuery,
          difficulty,
          language,
          count,
          questionType,
        }),
      });

      const data = await response.json();

      if (data.success && Array.isArray(data.questions) && data.questions.length > 0) {
        setGeneratedQuestions(data.questions);
      } else {
        setErrorMsg(data.error || "प्रश्न तयार करताना त्रुटी आली. कृपया पुन्हा प्रयत्न करा.");
      }
    } catch (err: any) {
      setErrorMsg("सर्व्हरशी संपर्क होऊ शकला नाही. कृपया इंटरनेट तपासा.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveToBank = (startPractice: boolean = false) => {
    if (generatedQuestions.length === 0) return;
    onAddGeneratedQuestions(generatedQuestions, startPractice);
    setIsSaved(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-purple-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-purple-800/40">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/30"
                title="मागे जा"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                <span>← मागे जा</span>
              </button>
            )}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-xs font-semibold border border-purple-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>AI पॉवर्ड अमर्याद प्रश्न बँक (Unlimited AI Questions)</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            कोणत्याही विषयावर आणि अध्यायावर झटपट नवीन MCQs तयार करा
          </h2>
          <p className="text-xs sm:text-sm text-purple-200/90 leading-relaxed">
            NEET, JEE आणि MHT-CET साठी मराठी व इंग्रजीत सविस्तर स्टेप-बाय-स्टेप स्पष्टीकरणे, सूत्रे आणि काठिण्य पातळीसह हजारो ताजे प्रश्न जनरेट करा.
          </p>
        </div>

        <div className="absolute right-6 top-1/2 -translate-y-1/2 hidden md:block opacity-10">
          <Zap className="w-52 h-52 text-white" />
        </div>
      </div>

      {/* Generator Form */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider border-b border-slate-100 pb-3">
          नवीन प्रश्नांचे निकष निवडा (Customize Question Parameters)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
          {/* Exam Selection */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">परीक्षा (Target Exam):</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(["NEET", "JEE_MAIN", "MHT_CET"] as ExamType[]).map((e) => (
                <button
                  key={e}
                  type="button"
                  onClick={() => {
                    setExam(e);
                    // Reset subject if not available in target exam
                    const subs = getSubjectsForExam(e);
                    if (!subs.includes(subject)) {
                      setSubject(subs[0]);
                    }
                  }}
                  className={`py-2 px-1 rounded-xl font-bold border transition-all text-center ${
                    exam === e
                      ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {e === "JEE_MAIN" ? "JEE Main" : e === "MHT_CET" ? "MHT-CET" : "NEET"}
                </button>
              ))}
            </div>
          </div>

          {/* Subject Selection */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">विषय (Subject):</label>
            <select
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value as SubjectType);
                setChapter("All Chapters");
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-semibold focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter Selection */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">अध्याय (Chapter):</label>
            <select
              value={chapter}
              onChange={(e) => setChapter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 font-medium focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            >
              <option value="All Chapters">सर्व अध्याय (Mixed Chapters)</option>
              {availableChapters.map((ch) => (
                <option key={ch.name} value={ch.name}>
                  {ch.name}
                </option>
              ))}
            </select>
          </div>

          {/* Custom Specific Topic */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">
              किंवा विशिष्ट सब-टॉपिक (Optional Custom Topic):
            </label>
            <input
              type="text"
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="उदा. Rolling on incline, Cannizzaro, Integrals..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-purple-500"
            />
          </div>

          {/* Difficulty Level */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">काठिण्य पातळी (Difficulty):</label>
            <div className="grid grid-cols-3 gap-1.5">
              {(["Easy", "Medium", "Hard"] as DifficultyLevel[]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={`py-2 px-1 rounded-xl font-bold border transition-all text-center ${
                    difficulty === d
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {d === "Easy" ? "सोपे" : d === "Medium" ? "मध्यम" : "कठीण"}
                </button>
              ))}
            </div>
          </div>

          {/* Language Preference */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">भाषा (Language):</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[
                { id: "bilingual", label: "द्विभाषिक" },
                { id: "mr", label: "मराठी" },
                { id: "en", label: "English" },
              ].map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => setLanguage(l.id as any)}
                  className={`py-2 px-1 rounded-xl font-bold border transition-all text-center ${
                    language === l.id
                      ? "bg-purple-600 text-white border-purple-600 shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {l.label}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="space-y-1.5">
            <label className="block font-bold text-slate-700">प्रश्नांची संख्या (Count):</label>
            <div className="grid grid-cols-3 gap-1.5">
              {[3, 5, 10].map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setCount(c)}
                  className={`py-2 px-1 rounded-xl font-bold border transition-all text-center ${
                    count === c
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {c} MCQs
                </button>
              ))}
            </div>
          </div>

          {/* Question Type */}
          <div className="space-y-1.5 sm:col-span-2">
            <label className="block font-bold text-slate-700">प्रश्नांचे स्वरूप (Question Nature):</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setQuestionType("concept_and_numerical")}
                className={`py-2 px-3 rounded-xl font-bold border text-left transition-all ${
                  questionType === "concept_and_numerical"
                    ? "bg-purple-50 border-purple-300 text-purple-900"
                    : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                संकल्पना + संख्यात्मक (Numerical & Conceptual)
              </button>
              <button
                type="button"
                onClick={() => setQuestionType("pyq_style_high_yield")}
                className={`py-2 px-3 rounded-xl font-bold border text-left transition-all ${
                  questionType === "pyq_style_high_yield"
                    ? "bg-purple-50 border-purple-300 text-purple-900"
                    : "bg-slate-50 border-slate-200 text-slate-700"
                }`}
              >
                मागील वर्षांच्या परीक्षा पॅटर्न (PYQ High-Yield)
              </button>
            </div>
          </div>
        </div>

        {/* Generate Button */}
        <div className="pt-3 border-t border-slate-100">
          <button
            id="btn-generate-ai-mcqs"
            disabled={isLoading}
            onClick={handleGenerate}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>AI द्वारा नवीन प्रश्न तयार होत आहेत... कृपया काही सेकंद थांबा</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5 text-amber-300 fill-amber-300" />
                <span>नवीन प्रश्न जनरेट करा (Generate {count} MCQs with AI)</span>
              </>
            )}
          </button>
        </div>

        {/* Error message */}
        {errorMsg && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
            {errorMsg}
          </div>
        )}
      </div>

      {/* Generated Questions Preview */}
      {generatedQuestions.length > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <h3 className="text-base font-bold text-slate-900">
                  तयार झालेले नवीन {generatedQuestions.length} प्रश्न
                </h3>
              </div>
              <p className="text-xs text-slate-500">
                {exam} • {subject} • {chapter} ({difficulty} Level)
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                id="btn-save-ai-questions"
                disabled={isSaved}
                onClick={() => handleSaveToBank(false)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  isSaved
                    ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                    : "bg-slate-900 hover:bg-slate-800 text-white shadow-xs"
                }`}
              >
                {isSaved ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>प्रश्न बँकेत जोडले गेले!</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>प्रश्न बँकेत सेव्ह करा</span>
                  </>
                )}
              </button>

              <button
                id="btn-practice-ai-questions-now"
                onClick={() => handleSaveToBank(true)}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>आता लगेच सराव करा</span>
              </button>
            </div>
          </div>

          {/* List of generated questions */}
          <div className="space-y-6">
            {generatedQuestions.map((q, idx) => (
              <div
                key={q.id}
                className="p-5 rounded-2xl bg-purple-50/20 border border-purple-200/60 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-purple-900 bg-purple-100 px-2.5 py-0.5 rounded-md">
                    प्रश्न {idx + 1}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-500">
                    योग्य उत्तर: पर्याय {String.fromCharCode(65 + q.correctOption)}
                  </span>
                </div>

                <div className="text-sm font-semibold text-slate-900">{q.questionText}</div>
                {q.questionTextMr && (
                  <div className="text-xs text-slate-700 bg-amber-50/60 p-2.5 rounded-lg border border-amber-100">
                    <strong>मराठी:</strong> {q.questionTextMr}
                  </div>
                )}

                {/* Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {q.options.map((opt, optI) => {
                    const isCorrect = optI === q.correctOption;
                    return (
                      <div
                        key={optI}
                        className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                          isCorrect
                            ? "bg-emerald-50 border-emerald-300 text-emerald-950 font-bold"
                            : "bg-white border-slate-200 text-slate-700"
                        }`}
                      >
                        <span className="font-bold shrink-0">{String.fromCharCode(65 + optI)}.</span>
                        <span>{opt}</span>
                        {isCorrect && (
                          <span className="ml-auto text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-sm">
                            योग्य
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Formula & Solution */}
                <div className="p-3 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
                  {q.formula && (
                    <div className="font-mono text-[11px] text-blue-800 font-semibold">
                      सूत्र: {q.formula}
                    </div>
                  )}
                  <p className="text-slate-700 leading-relaxed">{q.explanation}</p>
                  {q.explanationMr && (
                    <p className="text-amber-900 bg-amber-50/50 p-2 rounded-md leading-relaxed text-[11px]">
                      {q.explanationMr}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
