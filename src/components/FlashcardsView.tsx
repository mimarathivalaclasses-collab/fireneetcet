import React, { useState, useMemo } from "react";
import {
  Zap,
  Sparkles,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  CheckCircle2,
  HelpCircle,
  Volume2,
  BookOpen,
  Shuffle,
  Lightbulb,
  Award,
} from "lucide-react";
import { FlashcardItem, ExamType, SubjectType, LanguageMode } from "../types";
import { FLASHCARDS_DATA } from "../data/flashcardsData";

interface FlashcardsViewProps {
  currentExam: ExamType;
  language: LanguageMode;
  onBack?: () => void;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  currentExam,
  language,
  onBack,
}) => {
  const [selectedSubject, setSelectedSubject] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [masteredCards, setMasteredCards] = useState<Set<string>>(new Set());

  // Filter flashcards matching current exam & subject
  const availableCards = useMemo(() => {
    return FLASHCARDS_DATA.filter((card) => {
      const examMatches = card.exam.includes(currentExam) || (currentExam === "MHT_CET" && card.exam.includes("MHT_CET"));
      if (!examMatches) return false;
      if (selectedSubject !== "all" && card.subject !== selectedSubject) return false;
      return true;
    });
  }, [currentExam, selectedSubject]);

  const currentCard = availableCards[currentIndex] || availableCards[0];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % availableCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + availableCards.length) % availableCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    setCurrentIndex(Math.floor(Math.random() * availableCards.length));
  };

  const toggleMastery = (id: string) => {
    setMasteredCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Text-to-speech support for rapid auditory learning
  const speakText = (text: string) => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const isCurrentMastered = currentCard ? masteredCards.has(currentCard.id) : false;
  const progressPercentage = availableCards.length > 0
    ? Math.round((masteredCards.size / availableCards.length) * 100)
    : 0;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-linear-to-r from-amber-600 via-orange-600 to-rose-700 rounded-2xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1.5">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/30"
                title="मागे जा"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-yellow-300" />
                <span>← मागे जा</span>
              </button>
            )}
            <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
              1-Minute High-Yield Flashcards
            </span>
            <span className="px-2 py-0.5 rounded-full bg-black/20 text-xs font-bold">
              {availableCards.length} कार्ड्स
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            NCERT व CET हाय-स्पीड फ्लॅशकार्ड्स
          </h1>
          <p className="text-amber-100 text-xs sm:text-sm mt-1">
            शास्त्रज्ञांची नावे, रासायनिक अभिक्रिया, सूत्रांचे शॉर्टकट्स आणि ट्रिक्सचे एका मिनिटात रिव्हिजन!
          </p>
        </div>

        {/* Mastery Counter */}
        <div className="bg-white/15 backdrop-blur-xs p-3.5 rounded-xl border border-white/20 text-center min-w-[140px]">
          <span className="text-[11px] text-amber-200 uppercase font-bold tracking-wider">रिव्हिजन पूर्णत्व</span>
          <div className="text-2xl font-extrabold text-white font-mono-numbers">{progressPercentage}%</div>
          <div className="w-full bg-black/30 h-1.5 rounded-full mt-1.5 overflow-hidden">
            <div
              className="bg-yellow-300 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-2xl border border-slate-200 shadow-xs text-xs font-semibold">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none">
          <span className="text-slate-500 font-bold mr-1">विषय:</span>
          {["all", "Biology", "Chemistry", "Physics", "Mathematics"].map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setSelectedSubject(sub);
                setCurrentIndex(0);
                setIsFlipped(false);
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedSubject === sub
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {sub === "all" ? "सर्व विषय (All)" : sub}
            </button>
          ))}
        </div>

        <button
          onClick={handleShuffle}
          className="px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer font-bold"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span>शफल (Shuffle)</span>
        </button>
      </div>

      {/* Interactive 3D Flip Flashcard */}
      {currentCard ? (
        <div className="space-y-4">
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="cursor-pointer min-h-[300px] sm:min-h-[340px] rounded-3xl bg-white border-2 border-slate-200 hover:border-amber-400 shadow-lg p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative select-none hover:shadow-xl group"
          >
            {/* Card Header */}
            <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-amber-100 text-amber-800 text-xs font-bold">
                  {currentCard.subject}
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  • {currentCard.chapter}
                </span>
                {currentCard.badge && (
                  <span className="px-2 py-0.5 rounded-md bg-red-100 text-red-800 text-[11px] font-extrabold border border-red-200">
                    ★ {currentCard.badge}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    speakText(isFlipped ? currentCard.back : currentCard.front);
                  }}
                  className="p-1.5 rounded-lg border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
                  title="ऑडिओ ऐका (Listen)"
                >
                  <Volume2 className="w-4 h-4" />
                </button>

                <span className="text-xs font-mono-numbers font-bold text-slate-400">
                  {currentIndex + 1} / {availableCards.length}
                </span>
              </div>
            </div>

            {/* Card Body (Front vs Back) */}
            <div className="py-6 space-y-3 my-auto">
              {!isFlipped ? (
                /* FRONT (Question / Concept) */
                <div className="space-y-3 text-center sm:text-left">
                  <div className="text-xs font-extrabold tracking-wider text-amber-600 uppercase flex items-center justify-center sm:justify-start gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>संकल्पना / प्रश्न (Front Side)</span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                    {currentCard.front}
                  </h3>
                  {(language === "bilingual" || language === "mr") && currentCard.frontMr && (
                    <p className="text-sm font-medium text-slate-600 leading-relaxed bg-amber-50/70 p-3 rounded-xl border border-amber-200/50">
                      <strong>मराठी:</strong> {currentCard.frontMr}
                    </p>
                  )}
                  <p className="text-xs text-slate-400 italic pt-2">
                    💡 उत्तर व स्पष्टीकरण पाहण्यासाठी कार्डवर कुठेही क्लिक करा (Click to Flip)
                  </p>
                </div>
              ) : (
                /* BACK (Answer / Explanation / Mnemonic) */
                <div className="space-y-3 text-center sm:text-left animate-in fade-in">
                  <div className="text-xs font-extrabold tracking-wider text-emerald-600 uppercase flex items-center justify-center sm:justify-start gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>उत्तर व ट्रिक्स (Back Side)</span>
                  </div>

                  <div className="text-sm sm:text-base font-semibold text-slate-900 whitespace-pre-line leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    {currentCard.back}
                  </div>

                  {(language === "bilingual" || language === "mr") && currentCard.backMr && (
                    <div className="text-xs font-medium text-slate-700 whitespace-pre-line leading-relaxed bg-amber-50/80 p-3 rounded-xl border border-amber-200">
                      <strong>मराठी सारांश:</strong>
                      <div className="mt-1">{currentCard.backMr}</div>
                    </div>
                  )}

                  {currentCard.mnemonic && (
                    <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-900 flex items-center gap-2">
                      <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
                      <span>{currentCard.mnemonic}</span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Card Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3 text-xs">
              <span className="flex items-center gap-1 font-bold text-amber-600">
                <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                <span>{isFlipped ? "प्रश्न पुन्हा पहा" : "उत्तर फ्लिप करा"}</span>
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastery(currentCard.id);
                }}
                className={`px-3 py-1.5 rounded-xl font-bold border transition-colors cursor-pointer flex items-center gap-1.5 ${
                  isCurrentMastered
                    ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                    : "bg-slate-100 border-slate-200 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                }`}
              >
                <CheckCircle2 className={`w-3.5 h-3.5 ${isCurrentMastered ? "text-emerald-700" : ""}`} />
                <span>{isCurrentMastered ? "समजले (Mastered ✓)" : "समजले म्हणून मार्क करा"}</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={handlePrev}
              className="flex-1 py-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-xs hover:bg-slate-50 flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>मागील कार्ड (Previous)</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 py-3 rounded-2xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span>पुढील कार्ड (Next)</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-800">या विषयासाठी फ्लॅशकार्ड्स उपलब्ध नाहीत</h3>
        </div>
      )}
    </div>
  );
};
