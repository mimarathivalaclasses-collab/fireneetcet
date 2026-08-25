import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Download,
  Printer,
  Search,
  Sparkles,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Layers,
  FileText,
  Bookmark,
  Share2,
  ChevronDown,
  ChevronUp,
  Cpu,
  GraduationCap,
} from "lucide-react";
import { ExamType, SubjectType, LanguageMode, TopicNote } from "../types";
import { TOPIC_NOTES_DATA } from "../data/topicNotesData";
import { printTopicNotesReport } from "../utils/pdfExport";

interface TopicNotesViewProps {
  currentExam: ExamType;
  language: LanguageMode;
  onNavigateToPractice?: (subject?: SubjectType, chapter?: string) => void;
  onBack?: () => void;
}

export const TopicNotesView: React.FC<TopicNotesViewProps> = ({
  currentExam,
  language: initialLanguage,
  onNavigateToPractice,
  onBack,
}) => {
  const [selectedExam, setSelectedExam] = useState<ExamType | "All">(currentExam);
  const [selectedSubject, setSelectedSubject] = useState<SubjectType | "All">("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [viewLanguage, setViewLanguage] = useState<LanguageMode>(initialLanguage || "bilingual");
  const [expandedNoteIds, setExpandedNoteIds] = useState<Set<string>>(
    new Set(TOPIC_NOTES_DATA.map((n) => n.id))
  );
  const [instituteName, setInstituteName] = useState<string>("Mi Marathi Vala Classes");

  // Toggle single note expansion
  const toggleExpand = (id: string) => {
    setExpandedNoteIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const expandAll = () => {
    setExpandedNoteIds(new Set(TOPIC_NOTES_DATA.map((n) => n.id)));
  };

  const collapseAll = () => {
    setExpandedNoteIds(new Set());
  };

  // Filter notes
  const filteredNotes = useMemo(() => {
    return TOPIC_NOTES_DATA.filter((note) => {
      if (selectedExam !== "All" && !note.exams.includes(selectedExam)) {
        return false;
      }
      if (selectedSubject !== "All" && note.subject !== selectedSubject) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = note.title.toLowerCase().includes(q) || note.titleMr.toLowerCase().includes(q);
        const matchChapter = note.chapter.toLowerCase().includes(q) || note.chapterMr.toLowerCase().includes(q);
        const matchSummary = note.summary.toLowerCase().includes(q) || note.summaryMr.toLowerCase().includes(q);
        const matchFormulas = note.keyFormulasTable.some(
          (f) => f.name.toLowerCase().includes(q) || f.formula.toLowerCase().includes(q)
        );
        if (!matchTitle && !matchChapter && !matchSummary && !matchFormulas) {
          return false;
        }
      }
      return true;
    });
  }, [selectedExam, selectedSubject, searchQuery]);

  const handleExportAllPdf = () => {
    printTopicNotesReport(filteredNotes, instituteName, viewLanguage);
  };

  const handleExportSinglePdf = (note: TopicNote) => {
    printTopicNotesReport([note], instituteName, viewLanguage);
  };

  const subjectsList: { id: SubjectType | "All"; label: string; labelMr: string }[] = [
    { id: "All", label: "All Subjects", labelMr: "सर्व विषय" },
    { id: "Physics", label: "Physics", labelMr: "भौतिकशास्त्र" },
    { id: "Chemistry", label: "Chemistry", labelMr: "रसायनशास्त्र" },
    { id: "Mathematics", label: "Mathematics", labelMr: "गणित" },
    { id: "Biology", label: "Biology", labelMr: "जीवशास्त्र" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner Card */}
      <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-indigo-700/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
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
              <span className="px-3 py-1 rounded-full bg-indigo-500/30 border border-indigo-400/30 text-indigo-200 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Smart Revision Notes & Formulas</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>PDF Download Ready</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-indigo-400 shrink-0" />
              <span>चॅप्टरनिहाय अभ्यास नोट्स आणि रिव्हिजन PDF</span>
            </h1>

            <p className="text-sm text-indigo-100/90 max-w-3xl leading-relaxed">
              MHT-CET, NEET आणि JEE Main साठी आवश्यक असणारे सर्व महत्त्वाचे नियम, व्याख्या, शॉर्टकट सूत्रे,
              मेमरी ट्रिक्स (Mnemonics) आणि विद्यार्थ्यांकडून वारंवार होणाऱ्या चुकांची दुरुस्ती एकाच ठिकाणी.
              प्रत्येक टॉपिकची सुंदर <strong>A4 Printable PDF</strong> थेट सेव्ह किंवा प्रिंट करा!
            </p>
          </div>

          {/* Quick PDF Action */}
          <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3 shrink-0">
            <button
              id="btn-download-all-topic-notes-pdf"
              onClick={handleExportAllPdf}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/30 hover:scale-105 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>सर्व नोट्स PDF डाऊनलोड करा ({filteredNotes.length} Chapters)</span>
            </button>

            <div className="text-xs text-indigo-200/80 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-indigo-300" />
              <span>क्लास/इन्स्टिट्यूट: <strong>{instituteName}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Filters Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
        {/* Search and Institute Name Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="input-notes-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="कोणताही टॉपिक, सूत्र किंवा संकल्पना शोधा (उदा. Banking of Roads, Nernst, Central Dogma)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Exam Filter */}
          <div className="md:col-span-3">
            <select
              id="select-notes-exam-filter"
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-bold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">सर्व परीक्षा (All Exams: MHT-CET + NEET + JEE)</option>
              <option value="MHT_CET">MHT-CET (Engineering / Pharmacy)</option>
              <option value="NEET">NEET (Medical UG)</option>
              <option value="JEE_MAIN">JEE Main (Engineering)</option>
            </select>
          </div>

          {/* Language Mode */}
          <div className="md:col-span-3">
            <select
              id="select-notes-language-mode"
              value={viewLanguage}
              onChange={(e) => setViewLanguage(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl bg-indigo-50 border border-indigo-200 text-xs text-indigo-900 font-extrabold focus:outline-hidden focus:ring-2 focus:ring-indigo-500"
            >
              <option value="bilingual">मराठी + English (द्विभाषिक नोट्स)</option>
              <option value="mr">केवळ मराठी (Marathi Only)</option>
              <option value="en">English Only</option>
            </select>
          </div>
        </div>

        {/* Subject Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            {subjectsList.map((sub) => {
              const isSelected = selectedSubject === sub.id;
              const count = TOPIC_NOTES_DATA.filter((n) => {
                const matchExam = selectedExam === "All" || n.exams.includes(selectedExam);
                const matchSub = sub.id === "All" || n.subject === sub.id;
                return matchExam && matchSub;
              }).length;

              return (
                <button
                  key={sub.id}
                  id={`btn-notes-subject-${sub.id}`}
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-indigo-600 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  <span>{sub.labelMr}</span>
                  <span
                    className={`px-1.5 py-0.2 rounded-md text-[10px] font-mono-numbers ${
                      isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-xs text-indigo-600 hover:text-indigo-800 font-bold px-2 py-1 rounded-md hover:bg-indigo-50 transition-colors"
            >
              सर्व उघडा (Expand All)
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={collapseAll}
              className="text-xs text-slate-500 hover:text-slate-700 font-bold px-2 py-1 rounded-md hover:bg-slate-100 transition-colors"
            >
              सर्व बंद करा (Collapse All)
            </button>
          </div>
        </div>
      </div>

      {/* Notes Cards List */}
      <div className="space-y-6">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">कोणतीही नोट्स सापडली नाही</h3>
            <p className="text-xs text-slate-500">कृपया तुमचे सर्च किंवा फिल्टर बदलून पुन्हा प्रयत्न करा.</p>
          </div>
        ) : (
          filteredNotes.map((note) => {
            const isExpanded = expandedNoteIds.has(note.id);
            const isMr = viewLanguage === "mr";
            const isEn = viewLanguage === "en";
            const isBilingual = viewLanguage === "bilingual";

            return (
              <div
                key={note.id}
                id={`note-card-${note.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Note Card Header */}
                <div className="p-5 bg-gradient-to-r from-slate-50 to-indigo-50/40 border-b border-slate-200/80">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-1.5">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`px-2.5 py-0.5 rounded-lg text-xs font-black ${
                            note.subject === "Physics"
                              ? "bg-blue-100 text-blue-800"
                              : note.subject === "Chemistry"
                              ? "bg-emerald-100 text-emerald-800"
                              : note.subject === "Mathematics"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {note.subject}
                        </span>

                        <span className="px-2 py-0.5 rounded-lg bg-rose-100 text-rose-800 text-[11px] font-black flex items-center gap-1">
                          <Flame className="w-3 h-3 text-rose-600" />
                          <span>{note.highYieldWeightage} Weightage</span>
                        </span>

                        <span className="text-[11px] text-slate-500 font-semibold">
                          Exams: {note.exams.join(", ")}
                        </span>
                      </div>

                      <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                        {note.chapterMr}
                      </h2>

                      <p className="text-xs text-slate-600 italic">
                        {note.title}
                      </p>
                    </div>

                    {/* Action buttons on header */}
                    <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                      {/* Export Single Note PDF */}
                      <button
                        id={`btn-export-pdf-${note.id}`}
                        onClick={() => handleExportSinglePdf(note)}
                        className="px-3.5 py-2 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
                        title="फक्त या प्रकरणाची PDF डाऊनलोड / प्रिंट करा"
                      >
                        <Printer className="w-3.5 h-3.5 text-indigo-600" />
                        <span>या चॅप्टरची PDF</span>
                      </button>

                      {/* Practice CTA */}
                      {onNavigateToPractice && (
                        <button
                          onClick={() => onNavigateToPractice(note.subject, note.chapter)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="या चॅप्टरच्या प्रश्नांचा सराव करा"
                        >
                          <span>सराव करा</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Expand / Collapse toggle */}
                      <button
                        onClick={() => toggleExpand(note.id)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title={isExpanded ? "नोट्स लपवा" : "नोट्स दाखवा"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="mt-3 bg-white/80 border border-slate-200/60 rounded-xl p-3 text-xs text-slate-700 leading-relaxed">
                    <strong className="text-slate-900 font-bold">प्रकरणाचा सारांश: </strong>
                    {isMr ? note.summaryMr : note.summary}
                    {isBilingual && (
                      <div className="text-[11px] text-slate-500 mt-1">({note.summary})</div>
                    )}
                  </div>
                </div>

                {/* Note Card Body (Collapsible) */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 space-y-6">
                    {/* Sections */}
                    <div className="space-y-4">
                      {note.sections.map((sec, idx) => (
                        <div
                          key={idx}
                          className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3"
                        >
                          <h3 className="text-sm sm:text-base font-black text-slate-900 border-b border-slate-200 pb-2">
                            {isMr || isBilingual ? sec.titleMr : ""}
                            {isBilingual && sec.title !== sec.titleMr && (
                              <span className="text-xs font-semibold text-slate-500 ml-2">
                                • {sec.title}
                              </span>
                            )}
                            {!isMr && !isBilingual && sec.title}
                          </h3>

                          {/* Points List */}
                          <ul className="space-y-2 text-xs text-slate-800">
                            {sec.points.map((pt, pIdx) => {
                              const ptMr = sec.pointsMr && sec.pointsMr[pIdx] ? sec.pointsMr[pIdx] : "";
                              return (
                                <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                                  <div>
                                    {(isBilingual || isMr) && ptMr && (
                                      <div className="font-bold text-slate-900">{ptMr}</div>
                                    )}
                                    {(isBilingual || isEn || !ptMr) && (
                                      <div
                                        className={`text-slate-600 ${
                                          isBilingual && ptMr ? "text-[11px] mt-0.5" : "font-semibold"
                                        }`}
                                      >
                                        {pt}
                                      </div>
                                    )}
                                  </div>
                                </li>
                              );
                            })}
                          </ul>

                          {/* Key Formula Box */}
                          {sec.keyFormula && (
                            <div className="bg-blue-50/80 border border-blue-200 rounded-xl p-2.5 text-xs text-blue-900 flex items-start gap-2">
                              <Sparkles className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="font-bold">महत्त्वाचे सूत्र (Formula): </strong>
                                <code className="font-mono font-bold text-blue-950 bg-blue-100/80 px-1.5 py-0.5 rounded-md">
                                  {sec.keyFormula}
                                </code>
                              </div>
                            </div>
                          )}

                          {/* Key Mnemonic Box */}
                          {sec.keyMnemonic && (
                            <div className="bg-purple-50/80 border border-purple-200 rounded-xl p-2.5 text-xs text-purple-900 flex items-start gap-2">
                              <Lightbulb className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="font-bold">💡 मेमरी ट्रिक (Mnemonic): </strong>
                                <span>{sec.keyMnemonic}</span>
                              </div>
                            </div>
                          )}

                          {/* Exam Tip */}
                          {sec.examTip && (
                            <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 flex items-start gap-2">
                              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <strong className="font-bold">🎯 परीक्षेसाठी टीप (Exam Tip): </strong>
                                <span>{isMr && sec.examTipMr ? sec.examTipMr : sec.examTip}</span>
                                {isBilingual && sec.examTipMr && (
                                  <span className="text-[11px] text-amber-800/80 ml-1">
                                    ({sec.examTip})
                                  </span>
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Key Formulas Table */}
                    {note.keyFormulasTable.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                          <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                          <span>Quick Formula Table (महत्त्वाची सूत्रे)</span>
                        </h4>

                        <div className="overflow-x-auto rounded-xl border border-slate-200">
                          <table className="w-full text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                                <th className="p-2.5">संकल्पना (Concept)</th>
                                <th className="p-2.5">सूत्र (Formula)</th>
                                <th className="p-2.5">स्पष्टीकरण (Description)</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                              {note.keyFormulasTable.map((f, fIdx) => (
                                <tr key={fIdx} className="hover:bg-slate-50">
                                  <td className="p-2.5 font-bold text-slate-900">{f.name}</td>
                                  <td className="p-2.5 font-mono font-bold text-indigo-600">
                                    {f.formula}
                                  </td>
                                  <td className="p-2.5 text-slate-600">{f.description}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {/* Common Mistakes to Avoid */}
                    {note.commonMistakesToAvoid.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="text-xs font-black uppercase tracking-wider text-rose-600 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                          <span>विद्यार्थ्यांकडून होणाऱ्या नेहमीच्या चुका व खबरदारी (Avoid Traps)</span>
                        </h4>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {note.commonMistakesToAvoid.map((m, mIdx) => (
                            <div
                              key={mIdx}
                              className="bg-rose-50/50 border border-rose-200 rounded-xl p-3 text-xs space-y-1.5"
                            >
                              <div className="text-rose-900 font-bold">
                                ❌ चूक: {isMr ? m.mistakeMr : m.mistake}
                              </div>
                              <div className="text-emerald-800 font-bold">
                                ✓ योग्य: {isMr ? m.correctionMr : m.correction}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Card Footer Single PDF Download Button */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                      <span className="text-slate-500">
                        {note.sections.length} उपविभाग • {note.keyFormulasTable.length} सूत्रे
                      </span>
                      <button
                        onClick={() => handleExportSinglePdf(note)}
                        className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>या प्रकरणाची PDF डाऊनलोड करा</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
