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
  ListOrdered,
} from "lucide-react";
import { ExamType, SubjectType, LanguageMode, TopicNote } from "../types";
import { TOPIC_NOTES_DATA } from "../data/topicNotesData";
import { printTopicNotesReport } from "../utils/pdfExport";
import { Chapter100PointsSection } from "./Chapter100PointsSection";

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
  const [viewLanguage, setViewLanguage] = useState<LanguageMode>("en");
  const [onlyMvp, setOnlyMvp] = useState<boolean>(false);
  const [expandedNoteIds, setExpandedNoteIds] = useState<Set<string>>(
    new Set(TOPIC_NOTES_DATA.map((n) => n.id))
  );
  const [cardTabState, setCardTabState] = useState<Record<string, "points100" | "sections" | "formulas">>({});
  const [instituteName, setInstituteName] = useState<string>("Mi Marathiwala Classes, Ambad");

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

  const setCardTab = (noteId: string, tab: "points100" | "sections" | "formulas") => {
    setCardTabState((prev) => ({ ...prev, [noteId]: tab }));
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
      if (onlyMvp && note.highYieldWeightage !== "High") {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = note.title.toLowerCase().includes(q);
        const matchChapter = note.chapter.toLowerCase().includes(q);
        const matchSummary = note.summary.toLowerCase().includes(q);
        const matchFormulas = note.keyFormulasTable.some(
          (f) => f.name.toLowerCase().includes(q) || f.formula.toLowerCase().includes(q)
        );
        if (!matchTitle && !matchChapter && !matchSummary && !matchFormulas) {
          return false;
        }
      }
      return true;
    });
  }, [selectedExam, selectedSubject, searchQuery, onlyMvp]);

  const handleExportAllPdf = () => {
    printTopicNotesReport(filteredNotes, instituteName, viewLanguage);
  };

  const handleExportSinglePdf = (note: TopicNote) => {
    printTopicNotesReport([note], instituteName, viewLanguage);
  };

  const subjectsList: { id: SubjectType | "All"; label: string }[] = [
    { id: "All", label: "All Subjects" },
    { id: "Physics", label: "Physics" },
    { id: "Chemistry", label: "Chemistry" },
    { id: "Mathematics", label: "Mathematics" },
    { id: "Biology", label: "Biology" },
  ];

  const [quickPdfChapterId, setQuickPdfChapterId] = useState<string>(TOPIC_NOTES_DATA[0]?.id || "");

  const selectedQuickNote = useMemo(() => {
    return TOPIC_NOTES_DATA.find((n) => n.id === quickPdfChapterId) || TOPIC_NOTES_DATA[0];
  }, [quickPdfChapterId]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Top Banner Card - Saffron Theme */}
      <div className="bg-gradient-to-r from-orange-950 via-amber-900 to-stone-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-orange-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/30"
                  title="Go back"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                  <span>Back</span>
                </button>
              )}
              <span className="px-3 py-1 rounded-full bg-orange-500/30 border border-orange-400/40 text-orange-200 text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Mi Marathiwala Classes • 200 Revision Points & Formulas</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-extrabold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{TOPIC_NOTES_DATA.length} Chapters PDF Ready</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-amber-400 shrink-0" />
              <span>Chapter-Wise Revision Notes & 200 High-Yield PDFs</span>
            </h1>

            <p className="text-sm text-orange-100/90 max-w-3xl leading-relaxed">
              Comprehensive 200-point revision packs for MHT-CET, NEET, and JEE Main across Physics, Chemistry, Mathematics, and Biology. 
              Each chapter includes 200 non-repeating points, formulas, shortcut tricks, and PYQ trends. 
              <strong>Download single chapter PDFs</strong> or <strong>all chapters combined</strong> in one click!
            </p>
          </div>

          {/* Quick PDF Action */}
          <div className="flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-end gap-3 shrink-0">
            <button
              id="btn-download-all-topic-notes-pdf"
              onClick={handleExportAllPdf}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-orange-950/40 hover:scale-105 transition-all cursor-pointer border border-orange-400/30"
            >
              <Download className="w-4 h-4" />
              <span>Download All {filteredNotes.length} Chapters PDF</span>
            </button>

            <div className="text-xs text-orange-200/90 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-amber-300" />
              <span>Institute: <strong>{instituteName}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter-Wise Quick PDF Selector Bar */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 sm:p-5 border-2 border-orange-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-600 text-white flex items-center justify-center font-black shadow-xs">
              <Printer className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900">
                Select Chapter for Single Chapter PDF & Print
              </h3>
              <p className="text-xs text-slate-600">
                Choose any chapter from the list below and instantly generate its A4 PDF
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="min-w-[280px] sm:min-w-[340px]">
              <select
                id="select-quick-chapter-pdf"
                value={quickPdfChapterId}
                onChange={(e) => setQuickPdfChapterId(e.target.value)}
                className="w-full py-2 px-3 rounded-xl bg-white border border-orange-300 text-xs font-bold text-slate-800 focus:ring-2 focus:ring-orange-500 focus:outline-hidden"
              >
                {TOPIC_NOTES_DATA.map((note) => (
                  <option key={note.id} value={note.id}>
                    [{note.subject}] {note.chapter}
                  </option>
                ))}
              </select>
            </div>

            <button
              id="btn-quick-download-chapter-pdf"
              onClick={() => selectedQuickNote && handleExportSinglePdf(selectedQuickNote)}
              className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-black flex items-center gap-2 shadow-xs cursor-pointer hover:scale-105 transition-all"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Get Chapter PDF</span>
            </button>

            <button
              onClick={() => {
                const el = document.getElementById(`note-card-${quickPdfChapterId}`);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  setExpandedNoteIds((prev) => new Set([...prev, quickPdfChapterId]));
                }
              }}
              className="px-3.5 py-2 rounded-xl bg-white hover:bg-orange-100 text-orange-800 border border-orange-300 text-xs font-extrabold flex items-center gap-1.5 cursor-pointer transition-all"
            >
              <span>View Notes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Control Filters Bar */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs space-y-4">
        {/* Search and Institute Name Controls */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          {/* Search Box */}
          <div className="md:col-span-9 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              id="input-notes-search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search any topic, formula or concept (e.g. Banking of Roads, Nernst, Central Dogma)..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all font-medium"
            />
          </div>

          {/* Exam Filter */}
          <div className="md:col-span-3">
            <select
              id="select-notes-exam-filter"
              value={selectedExam}
              onChange={(e) => setSelectedExam(e.target.value as any)}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 font-bold focus:outline-hidden focus:ring-2 focus:ring-orange-500"
            >
              <option value="All">All Exams (MHT-CET + NEET + JEE)</option>
              <option value="MHT_CET">MHT-CET (Engineering / Pharmacy)</option>
              <option value="NEET">NEET (Medical UG)</option>
              <option value="JEE_MAIN">JEE Main (Engineering)</option>
            </select>
          </div>
        </div>

        {/* Subject Filter Tabs & MVP Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5">
            {subjectsList.map((sub) => {
              const isSelected = selectedSubject === sub.id;
              const count = TOPIC_NOTES_DATA.filter((n) => {
                const matchExam = selectedExam === "All" || n.exams.includes(selectedExam);
                const matchSub = sub.id === "All" || n.subject === sub.id;
                const matchMvp = !onlyMvp || n.highYieldWeightage === "High";
                return matchExam && matchSub && matchMvp;
              }).length;

              return (
                <button
                  key={sub.id}
                  id={`btn-notes-subject-${sub.id}`}
                  onClick={() => setSelectedSubject(sub.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer ${
                    isSelected
                      ? "bg-orange-600 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                >
                  <span>{sub.label}</span>
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

            {/* MVP 100% Exam Probability Quick Toggle */}
            <button
              id="btn-notes-toggle-mvp"
              type="button"
              onClick={() => setOnlyMvp(!onlyMvp)}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer border ${
                onlyMvp
                  ? "bg-gradient-to-r from-amber-500 to-rose-500 text-white border-transparent shadow-md shadow-amber-500/20 scale-105"
                  : "bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border-amber-300 dark:border-amber-700 hover:bg-amber-100"
              }`}
              title="Most MVP Chapters with 100% Exam Probability"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>🔥 100% Most MVP Chapters</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={expandAll}
              className="text-xs text-orange-600 hover:text-orange-800 font-bold px-2 py-1 rounded-md hover:bg-orange-50 transition-colors"
            >
              Expand All
            </button>
            <span className="text-slate-300">•</span>
            <button
              onClick={collapseAll}
              className="text-xs text-slate-500 hover:text-slate-700 font-bold px-2 py-1 rounded-md hover:bg-slate-100 transition-colors"
            >
              Collapse All
            </button>
          </div>
        </div>
      </div>

      {/* Notes Cards List */}
      <div className="space-y-6">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8 space-y-3">
            <BookOpen className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-bold text-slate-800">No notes found</h3>
            <p className="text-xs text-slate-500">Please try changing your search or filter.</p>
          </div>
        ) : (
          filteredNotes.map((note) => {
            const isExpanded = expandedNoteIds.has(note.id);

            return (
              <div
                key={note.id}
                id={`note-card-${note.id}`}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md transition-all overflow-hidden"
              >
                {/* Note Card Header */}
                <div className="p-5 bg-gradient-to-r from-slate-50 to-orange-50/40 border-b border-slate-200/80">
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
                        {note.chapter}
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
                        className="px-3.5 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105"
                        title="Download / Print PDF for this chapter"
                      >
                        <Printer className="w-3.5 h-3.5 text-orange-600" />
                        <span>Get PDF</span>
                      </button>

                      {/* Practice CTA */}
                      {onNavigateToPractice && (
                        <button
                          onClick={() => onNavigateToPractice(note.subject, note.chapter)}
                          className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-orange-600 text-white text-xs font-extrabold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                          title="Practice questions for this chapter"
                        >
                          <span>Practice</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      )}

                      {/* Expand / Collapse toggle */}
                      <button
                        onClick={() => toggleExpand(note.id)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                        title={isExpanded ? "Hide notes" : "Show notes"}
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
                    <strong className="text-slate-900 font-bold">Chapter Summary: </strong>
                    {note.summary}
                  </div>
                </div>

                {/* Note Card Body (Collapsible) */}
                {isExpanded && (
                  <div className="p-5 sm:p-6 space-y-6">
                    {/* Chapter Sub-Navigation Tabs */}
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          onClick={() => setCardTab(note.id, "points100")}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                            (cardTabState[note.id] || "points100") === "points100"
                              ? "bg-purple-700 text-white shadow-xs scale-105"
                              : "bg-purple-100/70 hover:bg-purple-200 text-purple-950"
                          }`}
                        >
                          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                          <span>💯 100 High-Yield Points</span>
                          <span className="bg-white/20 text-white px-1.5 py-0.2 rounded-md text-[10px] ml-0.5">
                            {note.points100?.length || 100}
                          </span>
                        </button>

                        <button
                          onClick={() => setCardTab(note.id, "sections")}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                            cardTabState[note.id] === "sections"
                              ? "bg-indigo-600 text-white shadow-xs"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                          }`}
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Detailed Analysis ({note.sections.length} Sections)</span>
                        </button>

                        <button
                          onClick={() => setCardTab(note.id, "formulas")}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 cursor-pointer ${
                            cardTabState[note.id] === "formulas"
                              ? "bg-indigo-600 text-white shadow-xs"
                              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                          }`}
                        >
                          <Cpu className="w-3.5 h-3.5" />
                          <span>Formulas & Mistakes</span>
                        </button>
                      </div>

                      <div className="text-[11px] font-bold text-slate-500 hidden sm:block">
                        100 Points Revision Pack • MHT-CET / NEET / JEE
                      </div>
                    </div>

                    {/* Tab 1: 100 Points Section */}
                    {(cardTabState[note.id] || "points100") === "points100" && (
                      <Chapter100PointsSection
                        noteId={note.id}
                        chapterTitle={note.title}
                        subject={note.subject}
                        points={note.points100 || []}
                        language="en"
                      />
                    )}

                    {/* Tab 2: Detailed Sections */}
                    {cardTabState[note.id] === "sections" && (
                      <div className="space-y-4">
                        {note.sections.map((sec, idx) => (
                          <div
                            key={idx}
                            className="bg-slate-50/70 border border-slate-200/80 rounded-2xl p-4 sm:p-5 space-y-3"
                          >
                            <h3 className="text-sm sm:text-base font-black text-slate-900 border-b border-slate-200 pb-2">
                              {sec.title}
                            </h3>

                            {/* Points List */}
                            <ul className="space-y-2 text-xs text-slate-800">
                              {sec.points.map((pt, pIdx) => {
                                return (
                                  <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 mt-1.5 shrink-0"></span>
                                    <div className="font-semibold text-slate-700">
                                      {pt}
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
                                  <strong className="font-bold">Key Formula: </strong>
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
                                  <strong className="font-bold">💡 Memory Trick (Mnemonic): </strong>
                                  <span>{sec.keyMnemonic}</span>
                                </div>
                              </div>
                            )}

                            {/* Exam Tip */}
                            {sec.examTip && (
                              <div className="bg-amber-50/80 border border-amber-200 rounded-xl p-2.5 text-xs text-amber-900 flex items-start gap-2">
                                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                                <div>
                                  <strong className="font-bold">🎯 Exam Tip: </strong>
                                  <span>{sec.examTip}</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Tab 3: Formulas & Mistakes */}
                    {cardTabState[note.id] === "formulas" && (
                      <div className="space-y-6">
                        {/* Key Formulas Table */}
                        {note.keyFormulasTable.length > 0 && (
                          <div className="space-y-2">
                            <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                              <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                              <span>Quick Formula Table</span>
                            </h4>

                            <div className="overflow-x-auto rounded-xl border border-slate-200">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead>
                                  <tr className="bg-slate-100/80 text-slate-700 font-bold border-b border-slate-200">
                                    <th className="p-2.5">Concept</th>
                                    <th className="p-2.5">Formula</th>
                                    <th className="p-2.5">Description</th>
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
                              <span>Common Mistakes & Traps to Avoid</span>
                            </h4>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              {note.commonMistakesToAvoid.map((m, mIdx) => (
                                <div
                                  key={mIdx}
                                  className="bg-rose-50/50 border border-rose-200 rounded-xl p-3 text-xs space-y-1.5"
                                >
                                  <div className="text-rose-900 font-bold">
                                    ❌ Mistake: {m.mistake}
                                  </div>
                                  <div className="text-emerald-800 font-bold">
                                    ✓ Correction: {m.correction}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Card Footer Single PDF Download Button */}
                    <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                      <span className="text-slate-500 font-semibold">
                        💯 100 Points • {note.sections.length} Sections • {note.keyFormulasTable.length} Formulas
                      </span>
                      <button
                        onClick={() => handleExportSinglePdf(note)}
                        className="px-4 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer hover:scale-105"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download 100 Points PDF</span>
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
