import React, { useState, useMemo } from "react";
import {
  Printer,
  FileDown,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Download,
  Copy,
  Layers,
  Settings2,
  FileText,
  HelpCircle,
  Eye,
  RefreshCw,
  Zap,
  Cpu,
  PlusCircle,
  ArrowLeft,
} from "lucide-react";
import { Question, ExamType, SubjectType, DifficultyLevel, LanguageMode } from "../types";
import { CHAPTERS_DATA, getSubjectsForExam } from "../data/chaptersData";
import { generateProceduralQuestions } from "../utils/proceduralQuestionEngine";

interface PdfBankGeneratorViewProps {
  currentExam: ExamType;
  questions: Question[];
  language: LanguageMode;
  onAddQuestions?: (newQuestions: Question[]) => void;
  onBack?: () => void;
}

export const PdfBankGeneratorView: React.FC<PdfBankGeneratorViewProps> = ({
  currentExam,
  questions,
  language: initialLanguage,
  onAddQuestions,
  onBack,
}) => {
  // Config states
  const [selectedExam, setSelectedExam] = useState<ExamType>(currentExam);
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | "All">("All");
  const [selectedChapter, setSelectedChapter] = useState<string>("All");
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel | "All">("All");
  const [limitCount, setLimitCount] = useState<number>(25);
  const [docFormat, setDocFormat] = useState<"full_bank" | "question_paper" | "solution_book">("full_bank");
  const [docLanguage, setDocLanguage] = useState<LanguageMode>("bilingual");
  
  // Custom Institute branding (defaults to user's class)
  const [instituteName, setInstituteName] = useState<string>("मी मराठीवाला क्लासेस, अंबड (Mi Marathiwala Classes)");
  const [docTitle, setDocTitle] = useState<string>("MHT-CET / NEET / JEE 10,00,000+ Unlimited MCQ Question Bank");
  const [testTime, setTestTime] = useState<string>("60 Mins");
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  
  const [copiedStatus, setCopiedStatus] = useState<boolean>(false);
  const [proceduralBatchSize, setProceduralBatchSize] = useState<number>(50);
  const [proceduralNotice, setProceduralNotice] = useState<string | null>(null);

  const availableSubjects = useMemo(() => getSubjectsForExam(selectedExam), [selectedExam]);

  const availableChapters = useMemo(() => {
    return CHAPTERS_DATA.filter((ch) => {
      const matchExam = ch.exams.includes(selectedExam);
      const matchSubject = selectedSubject === "All" || ch.subject === selectedSubject;
      return matchExam && matchSubject;
    });
  }, [selectedExam, selectedSubject]);

  // Handle Dynamic Procedural Generation (10,00,000+ Engine)
  const handleGenerateProceduralBatch = () => {
    const newQs = generateProceduralQuestions(selectedExam, selectedSubject, proceduralBatchSize);
    if (onAddQuestions) {
      onAddQuestions(newQs);
      setProceduralNotice(`✅ ${newQs.length} नवीन अल्गोरिदम प्रश्न (Physics, Chem, Maths, Bio) यशस्वीरीत्या ॲपमध्ये आणि PDF बँकेत जोडले गेले!`);
      setTimeout(() => setProceduralNotice(null), 4000);
    }
  };

  // Filtered questions
  const filteredQuestions = useMemo(() => {
    return questions.filter((q) => {
      if (q.exam !== selectedExam) return false;
      if (selectedSubject !== "All" && q.subject !== selectedSubject) return false;
      if (selectedChapter !== "All" && q.chapter !== selectedChapter) return false;
      if (selectedDifficulty !== "All" && q.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [questions, selectedExam, selectedSubject, selectedChapter, selectedDifficulty]);

  const displayedQuestions = useMemo(() => {
    if (limitCount === 0) return filteredQuestions;
    return filteredQuestions.slice(0, limitCount);
  }, [filteredQuestions, limitCount]);

  // Trigger Print to PDF
  const handlePrint = () => {
    window.print();
  };

  // Generate Raw HTML (matching user's WeasyPrint script)
  const generateRawHtmlString = () => {
    let itemsHtml = "";
    displayedQuestions.forEach((q, idx) => {
      const qText = docLanguage === "en" ? q.questionText : docLanguage === "mr" ? (q.questionTextMr || q.questionText) : `${q.questionText} <br><i style="color:#475569; font-size: 0.95em;">${q.questionTextMr || ""}</i>`;
      
      const optA = docLanguage === "mr" ? (q.optionsMr?.[0] || q.options[0]) : q.options[0];
      const optB = docLanguage === "mr" ? (q.optionsMr?.[1] || q.options[1]) : q.options[1];
      const optC = docLanguage === "mr" ? (q.optionsMr?.[2] || q.options[2]) : q.options[2];
      const optD = docLanguage === "mr" ? (q.optionsMr?.[3] || q.options[3]) : q.options[3];

      const ansChar = String.fromCharCode(65 + q.correctOption);
      const expText = docLanguage === "mr" ? (q.explanationMr || q.explanation) : q.explanation;

      itemsHtml += `
      <div class="q-box" style="border: 1px solid #cbd5e1; padding: 14px; margin-bottom: 16px; border-radius: 8px; page-break-inside: avoid;">
        <div style="font-weight: bold; color: #1e3a8a; margin-bottom: 8px; font-size: 11pt;">
          Q${idx + 1}. [${q.subject} - ${q.chapter}] ${qText}
        </div>
        <div style="margin-left: 15px; margin-bottom: 10px; font-size: 10.5pt;">
          <div style="margin-bottom: 4px;"><b>(A)</b> ${optA}</div>
          <div style="margin-bottom: 4px;"><b>(B)</b> ${optB}</div>
          <div style="margin-bottom: 4px;"><b>(C)</b> ${optC}</div>
          <div style="margin-bottom: 4px;"><b>(D)</b> ${optD}</div>
        </div>
        ${
          docFormat !== "question_paper"
            ? `
        <div style="background-color: #ecfdf5; border-left: 4px solid #10b981; padding: 8px 12px; margin-top: 8px; font-size: 10pt;">
          <span style="font-weight: bold; color: #047857;">उत्तर: (${ansChar}) ${q.options[q.correctOption]}</span><br>
          ${q.formula ? `<b>सूत्र:</b> <code style="background:#e2e8f0; padding:2px 4px;">${q.formula}</code><br>` : ""}
          <b>स्पष्टीकरण:</b> ${expText}
        </div>`
            : ""
        }
      </div>`;
    });

    const subjectColor = 
      selectedSubject === "Chemistry" ? "#117a65" :
      selectedSubject === "Biology" ? "#d35400" :
      selectedSubject === "Mathematics" ? "#1a5276" : "#1e3a8a";

    return `<!DOCTYPE html>
<html lang="mr">
<head>
  <meta charset="UTF-8">
  <title>${docTitle}</title>
  <style>
    @page { size: A4; margin: 15mm; }
    body { font-family: system-ui, -apple-system, sans-serif; color: #0f172a; line-height: 1.4; }
    .header { text-align: center; border-bottom: 3px solid ${subjectColor}; padding-bottom: 10px; margin-bottom: 20px; }
    .header h1 { color: ${subjectColor}; margin: 0; font-size: 20pt; }
    .header p { color: #475569; margin: 4px 0 0 0; font-size: 11pt; font-weight: bold; }
    .meta { display: flex; justify-content: space-between; margin-bottom: 15px; font-size: 10pt; color: #64748b; }
    .q-box { border: 1px solid #e0e0e0; padding: 12px; margin-bottom: 15px; border-radius: 6px; page-break-inside: avoid; background-color: #fff; }
    .q-title { font-weight: bold; color: ${subjectColor}; margin-bottom: 8px; font-size: 11pt; }
    .options { margin-left: 15px; margin-bottom: 10px; }
    .opt { margin-bottom: 4px; }
    .ans-box { background-color: #f4f6f7; border-left: 4px solid #27ae60; padding: 8px 12px; margin-top: 8px; font-size: 9.5pt; }
    .ans-title { font-weight: bold; color: #27ae60; }
  </style>
</head>
<body>
  <div class="header">
    <h1>${instituteName} : ${selectedSubject}</h1>
    <p>${docTitle}</p>
    <p style="font-size:10pt; color:#666;">${selectedExam} • ${selectedChapter === "All" ? "सर्व चॅप्टर्स (Full Syllabus)" : selectedChapter} • एकूण प्रश्न: ${displayedQuestions.length}</p>
  </div>
  ${itemsHtml}
</body>
</html>`;
  };

  const handleCopyHtml = () => {
    const html = generateRawHtmlString();
    navigator.clipboard.writeText(html);
    setCopiedStatus(true);
    setTimeout(() => setCopiedStatus(false), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-900 text-white rounded-3xl p-6 sm:p-8 shadow-md relative overflow-hidden print:hidden">
        <div className="relative z-10 space-y-3 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/30"
                title="मागे जा"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-400" />
                <span>← मागे जा</span>
              </button>
            )}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>१०,००,०००+ (1 Million+) अमर्यादित अल्गोरिदम प्रश्न बँक इंजिन</span>
            </div>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            MCQ बँक व अमर्यादित प्रश्न जनरेटर
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Physics, Chemistry, Maths आणि Biology चे प्रश्न A4 फॉरमॅटमध्ये एका क्लिकवर टेस्ट पेपर, उत्तरांसह बुकलेट किंवा अमर्यादित MCQ बँकेच्या स्वरूपात प्रिंट व सेव्ह करा.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={handlePrint}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>🖨️ PDF डाउनलोड / प्रिंट करा (Print to PDF)</span>
            </button>
            <button
              onClick={handleCopyHtml}
              className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Copy className="w-4 h-4" />
              <span>{copiedStatus ? "✅ HTML कॉपी झाले!" : "HTML कोड कॉपी करा"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 10,00,000+ Procedural Batch Generator Bar */}
      <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-white rounded-2xl border border-indigo-200 p-5 space-y-4 shadow-xs print:hidden">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-indigo-100 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-sm shadow-xs">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                १०,००,०००+ अल्गोरिदम प्रश्न निर्मिती (Instant Procedural Engine)
              </h3>
              <p className="text-xs text-slate-600">
                प्रत्येक विषयाच्या आणि चॅप्टरच्या सूत्रानुसार संख्या व पर्यायांसह अमर्यादित नवनवीन प्रश्न तयार करा.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold text-indigo-700 bg-indigo-100/80 px-3 py-1 rounded-full">
            Infinity Generator Active
          </span>
        </div>

        {proceduralNotice && (
          <div className="p-3 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{proceduralNotice}</span>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="font-bold text-slate-700">एकाच वेळी किती प्रश्न हवेत?</span>
            {[25, 50, 100, 200, 500].map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setProceduralBatchSize(num)}
                className={`px-3 py-1.5 rounded-lg font-bold border transition-all cursor-pointer ${
                  proceduralBatchSize === num
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-xs"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                +{num} प्रश्न
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={handleGenerateProceduralBatch}
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs shadow-md flex items-center gap-2 transition-all cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>⚡ +{proceduralBatchSize} प्रश्न लगेच जनरेट करा (Generate & Add)</span>
          </button>
        </div>
      </div>

      {/* Configuration Controls Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-5 shadow-xs print:hidden">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
            <Settings2 className="w-4 h-4 text-blue-600" />
            <span>PDF स्वरूप आणि फिल्टर पर्याय (PDF Configuration)</span>
          </span>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            निवडलेले प्रश्न: {displayedQuestions.length} / {filteredQuestions.length}
          </span>
        </div>

        {/* Grid 1: Exam, Subject, Chapter, Difficulty */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
          {/* Exam */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">परीक्षा (Exam):</label>
            <select
              value={selectedExam}
              onChange={(e) => {
                setSelectedExam(e.target.value as ExamType);
                setSelectedSubject("All");
                setSelectedChapter("All");
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
            >
              <option value="MHT_CET">MHT-CET (Engineering / Pharmacy)</option>
              <option value="NEET">NEET (Medical UG)</option>
              <option value="JEE_MAIN">JEE Main (IIT / NIT)</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">विषय (Subject):</label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                setSelectedSubject(e.target.value as any);
                setSelectedChapter("All");
              }}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
            >
              <option value="All">सर्व विषय (All Subjects)</option>
              {availableSubjects.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>
          </div>

          {/* Chapter */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">अध्याय (Chapter):</label>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
            >
              <option value="All">सर्व चॅप्टर्स (Full Syllabus)</option>
              {availableChapters.map((ch) => (
                <option key={ch.name} value={ch.name}>
                  {ch.name}
                </option>
              ))}
            </select>
          </div>

          {/* Question Limit */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">प्रश्नांची संख्या (Limit):</label>
            <select
              value={limitCount}
              onChange={(e) => setLimitCount(Number(e.target.value))}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
            >
              <option value={10}>१० प्रश्न (Speed Drill)</option>
              <option value={25}>२५ प्रश्न (Standard Worksheet)</option>
              <option value={50}>५० प्रश्न (Full Chapter Mock)</option>
              <option value={100}>१०० प्रश्न (Comprehensive Test)</option>
              <option value={0}>सर्व उपलब्ध प्रश्न (All in Pool)</option>
            </select>
          </div>
        </div>

        {/* Grid 2: Doc Format, Language, Branding */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
          {/* Format */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">दस्तऐवज प्रकार (Doc Format):</label>
            <select
              value={docFormat}
              onChange={(e) => setDocFormat(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
            >
              <option value="full_bank">📖 संपूर्ण MCQ बँक (प्रश्ने + उत्तरे + स्पष्टीकरण)</option>
              <option value="question_paper">📝 टेस्ट पेपर (केवळ प्रश्न - विद्यार्थ्यांसाठी)</option>
              <option value="solution_book">🔑 उत्तरतालिका व सोल्युशन्स (Answer Key)</option>
            </select>
          </div>

          {/* Language */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">भाषा (Language):</label>
            <select
              value={docLanguage}
              onChange={(e) => setDocLanguage(e.target.value as any)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
            >
              <option value="bilingual">द्विभाषिक (English + Marathi)</option>
              <option value="en">English Only</option>
              <option value="mr">मराठी माध्यम (Marathi Only)</option>
            </select>
          </div>

          {/* Class Name */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">क्लास / संस्थेचे नाव (Header):</label>
            <input
              type="text"
              value={instituteName}
              onChange={(e) => setInstituteName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-bold"
            />
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* PRINTABLE / PREVIEW DOCUMENT CANVAS (A4 Format)           */}
      {/* ======================================================== */}
      <div
        id="printable-document-canvas"
        className="bg-white rounded-2xl border-2 border-slate-300 p-6 sm:p-10 shadow-sm space-y-6 print:border-none print:shadow-none print:p-0"
      >
        {/* Document Header (Matching WeasyPrint Python template) */}
        <div className="text-center border-b-2 border-blue-900 pb-4 space-y-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-blue-950 uppercase tracking-tight">
            {instituteName}
          </h1>
          <h2 className="text-base sm:text-lg font-bold text-rose-900">{docTitle}</h2>
          <p className="text-xs sm:text-sm font-semibold text-slate-600">
            {selectedExam} • {selectedSubject === "All" ? "Physics | Chemistry | Mathematics / Biology" : selectedSubject} • {selectedChapter === "All" ? "Complete Syllabus" : selectedChapter}
          </p>

          {/* Test Paper Metadata Header (if Question Paper format) */}
          {docFormat === "question_paper" && (
            <div className="pt-3 flex flex-wrap items-center justify-between text-xs font-bold text-slate-700 border-t border-dashed border-slate-300 mt-3">
              <span>विद्यार्थ्याचे नाव: _______________________________</span>
              <span>रोल नं: _______</span>
              <span>वेळ: {testTime}</span>
              <span>एकूण गुण: {displayedQuestions.length * (selectedExam === "MHT_CET" && selectedSubject === "Mathematics" ? 2 : 4)}</span>
            </div>
          )}
        </div>

        {/* Questions List (Matching .q-box styling from WeasyPrint template) */}
        <div className="space-y-4">
          {displayedQuestions.length === 0 ? (
            <div className="p-8 text-center text-xs text-slate-500 font-medium">
              निवडलेल्या निकषांनुसार कोणतेही प्रश्न सापडले नाहीत. कृपया फिल्टर बदला.
            </div>
          ) : (
            displayedQuestions.map((q, index) => {
              const qNumber = index + 1;
              const qText =
                docLanguage === "en"
                  ? q.questionText
                  : docLanguage === "mr"
                  ? q.questionTextMr || q.questionText
                  : q.questionText;

              const qTextMr = docLanguage === "bilingual" ? q.questionTextMr : null;

              const optA = docLanguage === "mr" ? q.optionsMr?.[0] || q.options[0] : q.options[0];
              const optB = docLanguage === "mr" ? q.optionsMr?.[1] || q.options[1] : q.options[1];
              const optC = docLanguage === "mr" ? q.optionsMr?.[2] || q.options[2] : q.options[2];
              const optD = docLanguage === "mr" ? q.optionsMr?.[3] || q.options[3] : q.options[3];

              const ansLetter = String.fromCharCode(65 + q.correctOption);

              return (
                <div
                  key={q.id || index}
                  className="p-4 rounded-xl border border-slate-300 bg-white space-y-3 break-inside-avoid print:border-slate-400 print:mb-4"
                  style={{ pageBreakInside: "avoid" }}
                >
                  {/* Question Title */}
                  <div className="text-xs sm:text-sm font-bold text-slate-900 leading-relaxed">
                    <span className="text-blue-900 font-extrabold mr-1.5">Q{qNumber}.</span>
                    <span className="text-[11px] bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded mr-2 font-semibold">
                      [{q.subject} - {q.chapter}]
                    </span>
                    <span>{qText}</span>
                    {qTextMr && (
                      <div className="mt-1 text-slate-700 text-xs font-normal italic">
                        {qTextMr}
                      </div>
                    )}
                  </div>

                  {/* Options 4 Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-medium text-slate-800 ml-2">
                    <div className="flex items-center gap-1.5">
                      <b className="w-5 text-slate-900 font-extrabold">(A)</b>
                      <span>{optA}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <b className="w-5 text-slate-900 font-extrabold">(B)</b>
                      <span>{optB}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <b className="w-5 text-slate-900 font-extrabold">(C)</b>
                      <span>{optC}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <b className="w-5 text-slate-900 font-extrabold">(D)</b>
                      <span>{optD}</span>
                    </div>
                  </div>

                  {/* Detailed Solution Box (Matching WeasyPrint .ans-box) */}
                  {docFormat !== "question_paper" && (
                    <div className="p-3 rounded-lg bg-emerald-50/80 border-l-4 border-emerald-600 text-xs space-y-1 text-slate-800 mt-2">
                      <div className="font-extrabold text-emerald-900 flex items-center justify-between">
                        <span>
                          उत्तर: ({ansLetter}) {q.options[q.correctOption]}
                        </span>
                        {q.pyqYear && (
                          <span className="text-[10px] bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded font-mono">
                            {q.pyqYear}
                          </span>
                        )}
                      </div>
                      {q.formula && (
                        <div className="text-[11px] font-mono text-indigo-900">
                          <strong>सूत्र:</strong> {q.formula}
                        </div>
                      )}
                      <div className="text-[11px] text-slate-700 leading-relaxed">
                        <strong>स्पष्टीकरण:</strong>{" "}
                        {docLanguage === "mr" ? q.explanationMr || q.explanation : q.explanation}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="text-center border-t border-slate-200 pt-4 text-[11px] text-slate-500 font-medium">
          {instituteName} • NEET · JEE · MHT-CET Complete 25,000 MCQ Bank Platform • Page 1
        </div>
      </div>
    </div>
  );
};
