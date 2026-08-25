import React, { useState, useEffect } from "react";
import {
  PlusCircle,
  FileJson,
  Download,
  Upload,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookOpen,
  Sparkles,
  Zap,
  Layers,
  Copy,
  ArrowRight,
  RefreshCw,
  Share2,
} from "lucide-react";
import { Question, ExamType, SubjectType, DifficultyLevel } from "../types";
import { CHAPTERS_DATA, getSubjectsForExam, getApplicableExamsForSubject } from "../data/chaptersData";
import { parseRawQuestionText, parseBulkRawQuestions, ParsedQuestionDraft } from "../utils/questionParser";

interface AddQuestionViewProps {
  currentExam: ExamType;
  onAddQuestion: (question: Question) => void;
  onBulkImport: (questions: Question[]) => void;
  allQuestions: Question[];
  onBackToPractice: () => void;
}

export const AddQuestionView: React.FC<AddQuestionViewProps> = ({
  currentExam,
  onAddQuestion,
  onBulkImport,
  allQuestions,
  onBackToPractice,
}) => {
  const [activeTab, setActiveTab] = useState<"smart" | "single" | "bulk">("smart");

  // Multi-Exam Auto Broadcast Selection
  const [selectedExams, setSelectedExams] = useState<ExamType[]>([currentExam]);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState<boolean>(true);

  // Quick Smart Paste State
  const [smartPasteText, setSmartPasteText] = useState<string>("");
  const [parsedDraft, setParsedDraft] = useState<ParsedQuestionDraft | null>(null);
  const [smartParseSuccess, setSmartParseSuccess] = useState<string | null>(null);

  // Single Question Form State
  const [exam, setExam] = useState<ExamType>(currentExam);
  const [subject, setSubject] = useState<SubjectType>("Physics");
  const [chapter, setChapter] = useState<string>("Rotational Dynamics");
  const [customChapter, setCustomChapter] = useState<string>("");
  const [topic, setTopic] = useState<string>("");
  const [difficulty, setDifficulty] = useState<DifficultyLevel>("Medium");
  const [pyqYear, setPyqYear] = useState<string>("");

  const [questionText, setQuestionText] = useState<string>("");
  const [questionTextMr, setQuestionTextMr] = useState<string>("");

  const [options, setOptions] = useState<[string, string, string, string]>([
    "",
    "",
    "",
    "",
  ]);
  const [optionsMr, setOptionsMr] = useState<[string, string, string, string]>([
    "",
    "",
    "",
    "",
  ]);
  const [correctOption, setCorrectOption] = useState<number>(0);

  const [explanation, setExplanation] = useState<string>("");
  const [explanationMr, setExplanationMr] = useState<string>("");
  const [formula, setFormula] = useState<string>("");

  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  // Bulk Import State
  const [jsonInput, setJsonInput] = useState<string>("");
  const [bulkStatus, setBulkStatus] = useState<string | null>(null);

  // When subject changes, automatically calculate applicable exams for common subject sync
  useEffect(() => {
    if (autoSyncEnabled) {
      const applicable = getApplicableExamsForSubject(subject);
      setSelectedExams(applicable);
    }
  }, [subject, autoSyncEnabled]);

  const availableSubjects = getSubjectsForExam(exam);
  const availableChapters = CHAPTERS_DATA.filter(
    (ch) => ch.exams.some((e) => selectedExams.includes(e)) && ch.subject === subject
  );

  const toggleExamSelection = (eVal: ExamType) => {
    if (selectedExams.includes(eVal)) {
      if (selectedExams.length > 1) {
        setSelectedExams(selectedExams.filter((e) => e !== eVal));
      }
    } else {
      setSelectedExams([...selectedExams, eVal]);
    }
  };

  const handleOptionChange = (index: number, val: string) => {
    setOptions((prev) => {
      const copy = [...prev] as [string, string, string, string];
      copy[index] = val;
      return copy;
    });
  };

  const handleOptionMrChange = (index: number, val: string) => {
    setOptionsMr((prev) => {
      const copy = [...prev] as [string, string, string, string];
      copy[index] = val;
      return copy;
    });
  };

  // Smart Parse Single / Multi
  const handleRunSmartParse = () => {
    setSmartParseSuccess(null);
    setFormError(null);

    if (!smartPasteText.trim()) {
      setFormError("कृपया मजकूर (MCQ Text) पेस्ट करा.");
      return;
    }

    const parsed = parseRawQuestionText(smartPasteText, currentExam);
    if (!parsed) {
      setFormError("मजकूर वाचताना त्रुटी आली. कृपया प्रश्न आणि पर्याय (A, B, C, D) स्पष्ट आहेत का ते तपासा.");
      return;
    }

    setParsedDraft(parsed);
    setSubject(parsed.detectedSubject);
    setChapter(parsed.detectedChapter);
    setQuestionText(parsed.questionText);
    setQuestionTextMr(parsed.questionTextMr || parsed.questionText);
    setOptions(parsed.options);
    setOptionsMr(parsed.optionsMr || parsed.options);
    setCorrectOption(parsed.correctOption);
    setExplanation(parsed.explanation);
    setExplanationMr(parsed.explanationMr || "");
    setFormula(parsed.formula || "");
    setPyqYear(parsed.pyqYear || "");

    const applicable = getApplicableExamsForSubject(parsed.detectedSubject);
    setSelectedExams(applicable);

    setSmartParseSuccess(
      `यशस्वी! विषय '${parsed.detectedSubject}' आणि चॅप्टर '${parsed.detectedChapter}' आपोआप ओळखले गेले. लागू परीक्षा: ${applicable.join(", ")}`
    );
  };

  // Submit and broadcast to all selected exams
  const handleSubmitBroadcast = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    if (!questionText.trim()) {
      setFormError("कृपया मुख्य प्रश्न वाक्य प्रविष्ट करा.");
      return;
    }

    if (options.some((opt) => !opt.trim())) {
      setFormError("कृपया सर्व ४ पर्याय (A, B, C, D) प्रविष्ट करा.");
      return;
    }

    const finalChapter = customChapter.trim() ? customChapter.trim() : chapter;
    const baseId = `custom_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;

    // Create 1 question object for each selected exam so it lives seamlessly in all pools
    const createdQuestions: Question[] = selectedExams.map((targetExam, idx) => ({
      id: `${baseId}_${targetExam.toLowerCase()}_${idx}`,
      exam: targetExam,
      subject,
      chapter: finalChapter,
      topic: topic.trim() || undefined,
      difficulty,
      questionText: questionText.trim(),
      questionTextMr: questionTextMr.trim() || questionText.trim(),
      options: [options[0].trim(), options[1].trim(), options[2].trim(), options[3].trim()],
      optionsMr: [
        optionsMr[0].trim() || options[0].trim(),
        optionsMr[1].trim() || options[1].trim(),
        optionsMr[2].trim() || options[2].trim(),
        optionsMr[3].trim() || options[3].trim(),
      ],
      correctOption,
      explanation:
        explanation.trim() ||
        "योग्य उत्तर पर्याय " + String.fromCharCode(65 + correctOption) + " आहे.",
      explanationMr: explanationMr.trim() || undefined,
      formula: formula.trim() || undefined,
      pyqYear: pyqYear.trim() || undefined,
      isCustom: true,
      createdAt: Date.now(),
    }));

    // Add to pool
    if (createdQuestions.length === 1) {
      onAddQuestion(createdQuestions[0]);
    } else {
      onBulkImport(createdQuestions);
    }

    const examNames = selectedExams.join(", ");
    setFormSuccess(
      `हा प्रश्न ${examNames} या सर्व (${selectedExams.length}) परीक्षांच्या सराव, टेस्ट व PYQ बँकेत आपोआप सिंक झाला!`
    );

    // Reset inputs
    setSmartPasteText("");
    setParsedDraft(null);
    setQuestionText("");
    setQuestionTextMr("");
    setOptions(["", "", "", ""]);
    setOptionsMr(["", "", "", ""]);
    setExplanation("");
    setExplanationMr("");
    setFormula("");
    setPyqYear("");
  };

  const handleExportJson = () => {
    const dataStr =
      "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allQuestions, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `all_exams_question_pool_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImportJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (!Array.isArray(parsed)) {
        setBulkStatus("त्रुटी: JSON हे प्रश्नांची Array (List) असणे आवश्यक आहे.");
        return;
      }

      const validList: Question[] = [];
      parsed.forEach((item: any, idx: number) => {
        if (item.questionText && Array.isArray(item.options) && item.options.length === 4) {
          const itemSubject: SubjectType = item.subject || subject;
          const targetExams: ExamType[] = autoSyncEnabled
            ? getApplicableExamsForSubject(itemSubject)
            : [item.exam || exam];

          targetExams.forEach((tExam, tIdx) => {
            validList.push({
              id: item.id ? `${item.id}_${tExam}` : `import_${Date.now()}_${idx}_${tIdx}`,
              exam: tExam,
              subject: itemSubject,
              chapter: item.chapter || "General",
              topic: item.topic,
              difficulty: item.difficulty || "Medium",
              questionText: item.questionText,
              questionTextMr: item.questionTextMr || item.questionText,
              options: item.options,
              optionsMr: item.optionsMr || item.options,
              correctOption: typeof item.correctOption === "number" ? item.correctOption : 0,
              explanation: item.explanation || "No explanation provided.",
              explanationMr: item.explanationMr,
              formula: item.formula,
              pyqYear: item.pyqYear,
              isCustom: true,
              createdAt: Date.now(),
            });
          });
        }
      });

      if (validList.length === 0) {
        setBulkStatus("त्रुटी: एकही वैध प्रश्न सापडला नाही. कृपया फॉरमॅट तपासा.");
        return;
      }

      onBulkImport(validList);
      setBulkStatus(
        `यशस्वी! एकूण ${validList.length} प्रश्न सर्व संबंधित परीक्षांमध्ये (NEET/JEE/CET) आपोआप विभागून जोडले गेले.`
      );
      setJsonInput("");
    } catch (e: any) {
      setBulkStatus("अवैध JSON डेटा: " + e.message);
    }
  };

  // Sample templates for testing 1-click paste
  const fillSampleSmartText = () => {
    setSmartPasteText(`Q. A particle of mass m is executing uniform circular motion of radius r with speed v. The centripetal acceleration is:
(A) v^2 / r
(B) v / r^2
(C) v * r
(D) zero
Ans: A
Formula: a_c = v^2 / r
Exp: Centripetal acceleration is directed towards the center and has magnitude v^2/r.`);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-1">
            {onBackToPractice && (
              <button
                onClick={onBackToPractice}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer border border-slate-300 mr-1"
                title="मागे जा"
              >
                <ArrowRight className="w-3.5 h-3.5 rotate-180 text-emerald-600" />
                <span>← मागे जा</span>
              </button>
            )}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-extrabold">
              <Zap className="w-3.5 h-3.5 text-emerald-700" />
              <span>कॉमन विषय ऑटो-सिंक सिस्टीम (Multi-Exam Auto Sync Active)</span>
            </div>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900">
            नवीन प्रश्न डेटा जोडा (Smart Question Entry)
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            भौतिकशास्त्र (Physics), रसायनशास्त्र (Chemistry), गणित (Maths) किंवा जीवशास्त्र (Biology) मध्ये प्रश्न टाकल्यास तो आपोआप सर्व परीक्षांमध्ये (NEET + JEE + CET) सिंक होतो.
          </p>
        </div>

        {/* Tab Switcher: Smart vs Single vs Bulk */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
          <button
            onClick={() => setActiveTab("smart")}
            className={`px-3 py-1.5 rounded-lg font-bold flex items-center gap-1.5 transition-all ${
              activeTab === "smart"
                ? "bg-emerald-600 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>१-क्लिक ऑटो पेस्ट (Smart Paste)</span>
          </button>
          <button
            onClick={() => setActiveTab("single")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === "single"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            मॅन्युअल फॉर्म (Single Form)
          </button>
          <button
            onClick={() => setActiveTab("bulk")}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              activeTab === "bulk"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            बल्क JSON / बॅकअप
          </button>
        </div>
      </div>

      {/* Auto-Sync Exam Destination Bar */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-wrap items-center justify-between gap-3 text-xs shadow-xs">
        <div className="flex items-center gap-2">
          <Share2 className="w-4 h-4 text-blue-600 shrink-0" />
          <div>
            <span className="font-bold text-slate-900 block">
              हा प्रश्न कुठे कुठे सेव्ह करायचा आहे? (Target Exams):
            </span>
            <span className="text-[11px] text-slate-600">
              {subject === "Physics" || subject === "Chemistry"
                ? "Physics आणि Chemistry हे NEET, JEE आणि MHT-CET या तिन्ही परीक्षांसाठी कॉमन आहेत."
                : subject === "Mathematics"
                ? "Mathematics हे JEE Main आणि MHT-CET दोन्हीसाठी कॉमन आहे."
                : "Biology हे NEET आणि MHT-CET (PCB) दोन्हीसाठी कॉमन आहे."}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {(["NEET", "JEE_MAIN", "MHT_CET"] as ExamType[]).map((eType) => {
            const isChecked = selectedExams.includes(eType);
            return (
              <button
                key={eType}
                type="button"
                onClick={() => toggleExamSelection(eType)}
                className={`px-3 py-1.5 rounded-lg font-bold border transition-all text-xs flex items-center gap-1.5 ${
                  isChecked
                    ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                    : "bg-white text-slate-600 border-slate-300 hover:bg-slate-50"
                }`}
              >
                {isChecked && <CheckCircle2 className="w-3.5 h-3.5 text-white" />}
                <span>{eType === "JEE_MAIN" ? "JEE Main" : eType === "MHT_CET" ? "MHT-CET" : "NEET"}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Global Success / Error Feedback */}
      {formSuccess && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{formSuccess}</span>
        </div>
      )}

      {formError && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium animate-in fade-in">
          {formError}
        </div>
      )}

      {/* TAB 1: SMART 1-CLICK TEXT PASTE */}
      {activeTab === "smart" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-slate-800">
                WhatsApp, पुस्तकातील किंवा Word मधील प्रश्न येथे पेस्ट करा:
              </label>
              <button
                type="button"
                onClick={fillSampleSmartText}
                className="text-[11px] font-bold text-blue-600 hover:underline flex items-center gap-1"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>नमुना प्रश्न पेस्ट करून बघा</span>
              </button>
            </div>
            <textarea
              rows={6}
              value={smartPasteText}
              onChange={(e) => setSmartPasteText(e.target.value)}
              placeholder="उदा.
Q. The magnetic field at the centre of a circular coil of radius r carrying current I is:
(A) mu_0 * I / (2 * r)
(B) mu_0 * I / (4 * pi * r)
(C) 2 * mu_0 * I / r
(D) zero
Ans: A
Exp: Standard formula for circular coil magnetic field is B = mu_0 * I / (2 * r)."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs font-mono text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-hidden leading-relaxed"
            />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleRunSmartParse}
              className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-colors"
            >
              <Zap className="w-4 h-4 fill-white" />
              <span>स्मार्ट ऑटो-पार्स करा (Auto-Parse Question)</span>
            </button>
          </div>

          {smartParseSuccess && (
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 text-xs font-semibold">
              {smartParseSuccess}
            </div>
          )}

          {/* Parsed Preview Card */}
          {parsedDraft && (
            <div className="p-5 rounded-2xl bg-slate-50 border-2 border-emerald-400 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-extrabold text-emerald-800 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>पार्स झालेला प्रश्न पूर्वावलोकन (Preview)</span>
                </span>
                <span className="text-xs bg-slate-200 text-slate-800 px-2.5 py-0.5 rounded-full font-bold">
                  {subject} • {chapter}
                </span>
              </div>

              <div className="text-xs text-slate-900 font-bold">
                {questionText}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {options.map((opt, i) => (
                  <div
                    key={i}
                    className={`p-2.5 rounded-lg border flex items-center gap-2 ${
                      correctOption === i
                        ? "bg-emerald-100/70 border-emerald-400 font-bold text-emerald-950"
                        : "bg-white border-slate-200 text-slate-700"
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-slate-900 text-white text-[10px] flex items-center justify-center font-bold">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                    {correctOption === i && (
                      <span className="ml-auto text-[10px] bg-emerald-600 text-white px-2 py-0.5 rounded-md">
                        योग्य उत्तर
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {explanation && (
                <div className="text-[11px] bg-white p-3 rounded-lg border border-slate-200 text-slate-700">
                  <strong>स्पष्टीकरण:</strong> {explanation}
                </div>
              )}

              {/* 1-Click Broadcast Button */}
              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleSubmitBroadcast()}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-all"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    सर्व ({selectedExams.length}) परीक्षांमध्ये सेव्ह करा (Save to All Selected Exams)
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("single")}
                  className="px-4 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold text-xs transition-colors"
                >
                  फॉर्ममध्ये फेरबदल करा (Edit in Form)
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: MANUAL SINGLE FORM */}
      {activeTab === "single" && (
        <form
          onSubmit={handleSubmitBroadcast}
          className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs"
        >
          {/* Metadata Selector Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
            {/* Subject */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">विषय (Subject):</label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
              >
                <option value="Physics">Physics (भौतिकशास्त्र - Common)</option>
                <option value="Chemistry">Chemistry (रसायनशास्त्र - Common)</option>
                <option value="Mathematics">Mathematics (गणित)</option>
                <option value="Biology">Biology (जीवशास्त्र)</option>
              </select>
            </div>

            {/* Chapter */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">अध्याय (Chapter):</label>
              <select
                value={chapter}
                onChange={(e) => setChapter(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
              >
                {availableChapters.map((ch) => (
                  <option key={ch.name} value={ch.name}>
                    {ch.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">काठिण्य पातळी:</label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-medium"
              >
                <option value="Easy">सोपे (Easy)</option>
                <option value="Medium">मध्यम (Medium)</option>
                <option value="Hard">कठीण (Hard)</option>
              </select>
            </div>
          </div>

          {/* Optional Chapter Custom and PYQ Tag */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                किंवा स्वतःचे चॅप्टर नाव (Custom Chapter):
              </label>
              <input
                type="text"
                value={customChapter}
                onChange={(e) => setCustomChapter(e.target.value)}
                placeholder="उदा. Magnetism and Matter"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                PYQ वर्ष टॅग (उदा. NEET 2024 / MHT-CET 2023):
              </label>
              <input
                type="text"
                value={pyqYear}
                onChange={(e) => setPyqYear(e.target.value)}
                placeholder="उदा. NEET 2023 / CET 2024"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
          </div>

          {/* Question Statements */}
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                प्रश्न वाक्य (English / Main Question): *
              </label>
              <textarea
                required
                rows={2}
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                placeholder="Type the question here..."
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                मराठी भाषांतर (Marathi Translation - Optional):
              </label>
              <textarea
                rows={2}
                value={questionTextMr}
                onChange={(e) => setQuestionTextMr(e.target.value)}
                placeholder="येथे मराठीत प्रश्न टाइप करा..."
                className="w-full bg-amber-50/40 border border-amber-200 rounded-xl p-3 text-xs sm:text-sm text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-hidden"
              />
            </div>
          </div>

          {/* 4 Options Grid */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold text-slate-800">
              ४ पर्याय आणि योग्य उत्तर निवडा (4 Options & Correct Answer): *
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {[0, 1, 2, 3].map((optI) => {
                const optLetter = String.fromCharCode(65 + optI);
                const isCorrect = correctOption === optI;

                return (
                  <div
                    key={optI}
                    className={`p-3.5 rounded-xl border-2 space-y-2 transition-all ${
                      isCorrect
                        ? "bg-emerald-50/70 border-emerald-400"
                        : "bg-slate-50 border-slate-200"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold w-6 h-6 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs">
                          {optLetter}
                        </span>
                        <span className="font-bold text-slate-700">पर्याय {optLetter}</span>
                      </div>

                      <label className="flex items-center gap-1.5 cursor-pointer text-[11px] font-bold text-emerald-800">
                        <input
                          type="radio"
                          name="correctOptionRadio"
                          checked={isCorrect}
                          onChange={() => setCorrectOption(optI)}
                          className="text-emerald-600 focus:ring-emerald-500"
                        />
                        <span>योग्य उत्तर आहे</span>
                      </label>
                    </div>

                    <input
                      type="text"
                      required
                      value={options[optI]}
                      onChange={(e) => handleOptionChange(optI, e.target.value)}
                      placeholder={`Option ${optLetter} in English`}
                      className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                    />
                    <input
                      type="text"
                      value={optionsMr[optI]}
                      onChange={(e) => handleOptionMrChange(optI, e.target.value)}
                      placeholder={`पर्याय ${optLetter} मराठीत (पर्यायी)`}
                      className="w-full bg-white border border-amber-200 rounded-lg px-3 py-1.5 text-xs text-slate-800"
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation & Formula */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                महत्त्वाचे सूत्र (Formula - Optional):
              </label>
              <input
                type="text"
                value={formula}
                onChange={(e) => setFormula(e.target.value)}
                placeholder="उदा. F = (G * m1 * m2) / r^2"
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800 font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                सविस्तर इंग्रजी स्पष्टीकरण (Explanation):
              </label>
              <textarea
                rows={2}
                value={explanation}
                onChange={(e) => setExplanation(e.target.value)}
                placeholder="Step-by-step mathematical or conceptual explanation..."
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              मराठी स्पष्टीकरण (Marathi Step-by-Step Explanation):
            </label>
            <textarea
              rows={2}
              value={explanationMr}
              onChange={(e) => setExplanationMr(e.target.value)}
              placeholder="मराठीत उत्तर स्पष्ट करा..."
              className="w-full bg-amber-50/40 border border-amber-200 rounded-xl p-3 text-xs text-slate-900"
            />
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-3 border-t border-slate-100">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span>
                सर्व ({selectedExams.length}) परीक्षांमध्ये सेव्ह करा (Save Question)
              </span>
            </button>

            <button
              type="button"
              onClick={onBackToPractice}
              className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors"
            >
              सराव मोडवर परत जा
            </button>
          </div>
        </form>
      )}

      {/* TAB 3: BULK JSON IMPORT / EXPORT */}
      {activeTab === "bulk" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                बल्क प्रश्न इम्पोर्ट किंवा बॅकअप एक्स्पोर्ट
              </h3>
              <p className="text-xs text-slate-500">
                JSON फाईलद्वारे एकाच वेळी शेकडो प्रश्न ॲपमध्ये अपलोड करा किंवा सेव्ह केलेला सर्व डेटा डाऊनलोड करा.
              </p>
            </div>

            <button
              onClick={handleExportJson}
              className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>सर्व प्रश्न डाऊनलोड करा (Export JSON)</span>
            </button>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold text-slate-700">
              येथे JSON पेस्ट करा (Paste Question Array JSON):
            </label>
            <textarea
              rows={8}
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              placeholder={`[
  {
    "subject": "Physics",
    "chapter": "Electrostatics",
    "difficulty": "Medium",
    "questionText": "What is the electric field inside a charged spherical conductor?",
    "questionTextMr": "विद्युतभारित गोलाकार वाहकाच्या आत विद्युत क्षेत्र किती असते?",
    "options": ["Zero", "Maximum", "Infinite", "Depends on radius"],
    "optionsMr": ["शून्य", "कमाल", "अनंत", "त्रिज्येवर अवलंबून"],
    "correctOption": 0,
    "explanation": "Electric field inside a conductor in electrostatic equilibrium is always zero.",
    "explanationMr": "संतुलनावस्थेत वाहकाच्या आतील विद्युत क्षेत्र नेहमी शून्य असते."
  }
]`}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 font-mono text-xs text-slate-800 focus:ring-2 focus:ring-blue-500 focus:outline-hidden"
            />
          </div>

          {bulkStatus && (
            <div
              className={`p-4 rounded-xl text-xs font-bold ${
                bulkStatus.startsWith("यशस्वी")
                  ? "bg-emerald-50 border border-emerald-200 text-emerald-800"
                  : "bg-rose-50 border border-rose-200 text-rose-800"
              }`}
            >
              {bulkStatus}
            </div>
          )}

          <button
            onClick={handleImportJson}
            disabled={!jsonInput.trim()}
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-2 transition-colors disabled:opacity-50"
          >
            <Upload className="w-4 h-4" />
            <span>इम्पोर्ट करा व ऑटो-सिंक करा (Import & Auto-Sync)</span>
          </button>
        </div>
      )}
    </div>
  );
};
