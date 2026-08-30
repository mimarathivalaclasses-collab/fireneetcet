import React, { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  Search,
  Filter,
  ArrowUpDown,
  BookOpen,
  Trophy,
  Activity,
  Share2,
  Calendar,
  Layers,
  ChevronRight,
  Sparkles,
  MessageCircle,
  Eye,
  RefreshCw,
  X,
} from "lucide-react";
import { StudentUser, StudentTestSubmission, ExamType } from "../types";

interface AdminStudentProgressViewProps {
  students: StudentUser[];
  testSubmissions: StudentTestSubmission[];
  onRefresh?: () => void;
}

export const AdminStudentProgressView: React.FC<AdminStudentProgressViewProps> = ({
  students,
  testSubmissions,
  onRefresh,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [examFilter, setExamFilter] = useState<string>("ALL");
  const [activityFilter, setActivityFilter] = useState<"ALL" | "ACTIVE" | "INACTIVE">("ALL");
  const [sortBy, setSortBy] = useState<"tests" | "accuracy" | "questions" | "score" | "recent">("tests");
  const [selectedStudent, setSelectedStudent] = useState<StudentUser | null>(null);

  // Group submissions by student mobile or ID for fast lookup
  const submissionsByStudent = useMemo(() => {
    const map = new Map<string, StudentTestSubmission[]>();
    testSubmissions.forEach((sub) => {
      const key = sub.studentMobile || sub.studentId;
      if (key) {
        const list = map.get(key) || [];
        list.push(sub);
        map.set(key, list);
      }
    });
    return map;
  }, [testSubmissions]);

  // Aggregate student statistics
  const studentsWithStats = useMemo(() => {
    return students.map((std) => {
      const studentSubs = submissionsByStudent.get(std.mobile) || submissionsByStudent.get(std.id) || [];
      const totalTests = Math.max(std.totalTestsTaken || 0, studentSubs.length);
      
      let totalQuestions = std.totalQuestionsSolved || 0;
      let totalCorrect = std.totalCorrect || 0;
      let totalWrong = std.totalWrong || 0;
      let highestScore = std.highestScore || 0;

      studentSubs.forEach((sub) => {
        totalQuestions = Math.max(totalQuestions, totalQuestions + (sub.totalQuestions || 0));
        totalCorrect += sub.correctCount || 0;
        totalWrong += sub.wrongCount || 0;
        if (sub.score > highestScore) highestScore = sub.score;
      });

      // If we only have student object values
      if (studentSubs.length === 0) {
        totalQuestions = std.totalQuestionsSolved || 0;
        totalCorrect = std.totalCorrect || 0;
        totalWrong = std.totalWrong || 0;
        highestScore = std.highestScore || 0;
      }

      const calculatedAccuracy = totalQuestions > 0
        ? Math.round((totalCorrect / totalQuestions) * 100)
        : (std.overallAccuracy || 0);

      return {
        ...std,
        totalTestsTaken: totalTests,
        totalQuestionsSolved: totalQuestions,
        totalCorrect,
        totalWrong,
        overallAccuracy: calculatedAccuracy,
        highestScore,
        submissions: studentSubs.sort((a, b) => (b.submittedAt || 0) - (a.submittedAt || 0)),
      };
    });
  }, [students, submissionsByStudent]);

  // Global KPIs
  const totalGlobalTests = useMemo(() => {
    return studentsWithStats.reduce((acc, curr) => acc + curr.totalTestsTaken, 0);
  }, [studentsWithStats]);

  const totalGlobalQuestions = useMemo(() => {
    return studentsWithStats.reduce((acc, curr) => acc + curr.totalQuestionsSolved, 0);
  }, [studentsWithStats]);

  const totalGlobalCorrect = useMemo(() => {
    return studentsWithStats.reduce((acc, curr) => acc + (curr.totalCorrect || 0), 0);
  }, [studentsWithStats]);

  const activeSolversCount = useMemo(() => {
    return studentsWithStats.filter((s) => s.totalTestsTaken > 0).length;
  }, [studentsWithStats]);

  const averageGlobalAccuracy = useMemo(() => {
    const active = studentsWithStats.filter((s) => s.totalQuestionsSolved > 0);
    if (active.length === 0) return 0;
    const sum = active.reduce((acc, curr) => acc + curr.overallAccuracy, 0);
    return Math.round(sum / active.length);
  }, [studentsWithStats]);

  const topPerformer = useMemo(() => {
    const active = [...studentsWithStats].filter((s) => s.totalTestsTaken > 0);
    if (active.length === 0) return null;
    return active.sort((a, b) => b.overallAccuracy - a.overallAccuracy || b.totalTestsTaken - a.totalTestsTaken)[0];
  }, [studentsWithStats]);

  // Filter and sort students
  const filteredStudents = useMemo(() => {
    return studentsWithStats
      .filter((std) => {
        const q = searchQuery.toLowerCase().trim();
        const matchesSearch = !q || std.name.toLowerCase().includes(q) || std.mobile.includes(q);
        const matchesExam = examFilter === "ALL" || std.examTarget === examFilter;
        const matchesActivity =
          activityFilter === "ALL"
            ? true
            : activityFilter === "ACTIVE"
            ? std.totalTestsTaken > 0
            : std.totalTestsTaken === 0;

        return matchesSearch && matchesExam && matchesActivity;
      })
      .sort((a, b) => {
        if (sortBy === "tests") return b.totalTestsTaken - a.totalTestsTaken;
        if (sortBy === "accuracy") return b.overallAccuracy - a.overallAccuracy;
        if (sortBy === "questions") return b.totalQuestionsSolved - a.totalQuestionsSolved;
        if (sortBy === "score") return b.highestScore - a.highestScore;
        return (b.lastLoginAt || 0) - (a.lastLoginAt || 0);
      });
  }, [studentsWithStats, searchQuery, examFilter, activityFilter, sortBy]);

  // WhatsApp Share Student Performance
  const shareStudentProgressWhatsApp = (std: typeof studentsWithStats[0]) => {
    if (!std.mobile) return;
    const cleanNumber = std.mobile.replace(/\D/g, "");
    const formattedNumber = cleanNumber.length === 10 ? `91${cleanNumber}` : cleanNumber;
    const message = encodeURIComponent(
      `📊 *विद्यार्थी प्रगती व सराव अहवाल (Performance Card)*\n\n` +
      `👤 *विद्यार्थी:* ${std.name}\n` +
      `📱 *मोबाईल:* ${std.mobile}\n` +
      `🎯 *टारगेट परीक्षा:* ${std.examTarget}\n\n` +
      `📝 *एकूण सोडवलेल्या टेस्ट्स:* ${std.totalTestsTaken}\n` +
      `🔢 *एकूण सोडवलेले MCQs:* ${std.totalQuestionsSolved}\n` +
      `✅ *बरोबर उत्तरे:* ${std.totalCorrect || 0}\n` +
      `❌ *चूक उत्तरे:* ${std.totalWrong || 0}\n` +
      `🎯 *एकूण अचूकता (Accuracy):* ${std.overallAccuracy}%\n` +
      `🏆 *कमाल गुण:* ${std.highestScore}\n\n` +
      `💡 *मार्गदर्शन:* सातत्यपूर्ण सराव आणि मागील वर्षांच्या प्रश्नांचे (PYQs) विश्लेषण करून अचूकता ९०%+ पर्यंत वाढवा!\n` +
      `— *Mi Marathi Vala Classes / सराव कट्टा*`
    );
    window.open(`https://wa.me/${formattedNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="space-y-4">
      {/* 1. Global KPI Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">एकूण पूर्ण टेस्ट्स</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{totalGlobalTests}</h3>
            <p className="text-[10px] text-emerald-600 font-bold mt-0.5">
              {activeSolversCount} विद्यार्थी सक्रिय सराव करत आहेत
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black">
            <Trophy className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">सोडवलेले एकूण MCQs</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{totalGlobalQuestions}</h3>
            <p className="text-[10px] text-indigo-600 font-bold mt-0.5">
              {totalGlobalCorrect} बरोबर उत्तरे
            </p>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-black">
            <BookOpen className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">सरासरी अचूकता</p>
            <h3 className="text-2xl font-black text-slate-900 mt-0.5">{averageGlobalAccuracy}%</h3>
            <div className="w-24 bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
              <div
                className={`h-full rounded-full ${
                  averageGlobalAccuracy >= 70 ? "bg-emerald-500" : averageGlobalAccuracy >= 40 ? "bg-amber-500" : "bg-rose-500"
                }`}
                style={{ width: `${averageGlobalAccuracy}%` }}
              />
            </div>
          </div>
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-black">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">टॉप परफॉर्मर</p>
            {topPerformer ? (
              <>
                <h4 className="text-sm font-black text-slate-900 truncate max-w-[130px] mt-0.5">
                  {topPerformer.name}
                </h4>
                <p className="text-[10px] font-bold text-amber-700">
                  {topPerformer.totalTestsTaken} टेस्ट्स • {topPerformer.overallAccuracy}%
                </p>
              </>
            ) : (
              <p className="text-xs text-slate-400 mt-1">सराव सुरू आहे...</p>
            )}
          </div>
          <div className="w-11 h-11 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black">
            <Award className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* 2. Search, Filters & Sorters */}
      <div className="bg-white p-3.5 rounded-2xl border border-slate-200 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-2.5">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="विद्यार्थ्याचे नाव किंवा मोबाईल नंबरने शोधा..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 text-xs outline-none focus:border-indigo-500 bg-slate-50 focus:bg-white"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={examFilter}
            onChange={(e) => setExamFilter(e.target.value)}
            className="px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700 outline-none"
          >
            <option value="ALL">सर्व परीक्षा</option>
            <option value="MHT_CET">MHT-CET</option>
            <option value="NEET">NEET</option>
            <option value="JEE_MAIN">JEE Main</option>
          </select>

          <select
            value={activityFilter}
            onChange={(e) => setActivityFilter(e.target.value as any)}
            className="px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-white text-slate-700 outline-none"
          >
            <option value="ALL">सर्व विद्यार्थी ({students.length})</option>
            <option value="ACTIVE">सक्रिय सराव करणारे ({activeSolversCount})</option>
            <option value="INACTIVE">कसोटी न दिलेले ({students.length - activeSolversCount})</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-2.5 py-2 rounded-xl border border-slate-200 text-xs font-bold bg-indigo-50 text-indigo-900 outline-none"
          >
            <option value="tests">सर्वात जास्त टेस्ट्स</option>
            <option value="accuracy">उत्कृष्ट अचूकता (%)</option>
            <option value="questions">सर्वाधिक सोडवलेले MCQs</option>
            <option value="score">कमाल गुण (Highest)</option>
            <option value="recent">नुकतेच सक्रिय</option>
          </select>

          {onRefresh && (
            <button
              onClick={onRefresh}
              className="p-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 cursor-pointer"
              title="डेटा रिफ्रेश"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 3. Student Progress Grid */}
      {filteredStudents.length === 0 ? (
        <div className="bg-white rounded-2xl p-8 text-center border border-slate-200 text-slate-500 text-xs space-y-2">
          <Activity className="w-8 h-8 text-slate-400 mx-auto" />
          <p className="font-bold text-slate-800">कोणतेही विद्यार्थी आढळले नाहीत.</p>
          <p className="text-slate-400">कृपया सर्च किंवा फिल्टर निकष बदलून पहा.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredStudents.map((std) => (
            <div
              key={std.id}
              className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between space-y-3 hover:border-indigo-300 transition-all"
            >
              {/* Header */}
              <div className="space-y-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-black text-slate-900">{std.name}</h4>
                      {std.totalTestsTaken >= 5 && (
                        <span className="px-1.5 py-0.2 rounded-md bg-amber-100 text-amber-800 text-[10px] font-black">
                          🔥 Star
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 font-mono">📱 {std.mobile}</p>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-indigo-50 text-indigo-700">
                    {std.examTarget}
                  </span>
                </div>

                {/* Performance Metrics Box */}
                <div className="bg-slate-50 rounded-xl p-3 space-y-2 border border-slate-100">
                  <div className="grid grid-cols-3 gap-1 text-center">
                    <div className="p-1 rounded-lg bg-white border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">एकूण टेस्ट्स</p>
                      <p className="text-sm font-black text-indigo-600">{std.totalTestsTaken}</p>
                    </div>
                    <div className="p-1 rounded-lg bg-white border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">सोडवलेले Qs</p>
                      <p className="text-sm font-black text-slate-800">{std.totalQuestionsSolved}</p>
                    </div>
                    <div className="p-1 rounded-lg bg-white border border-slate-100">
                      <p className="text-[9px] font-bold text-slate-400 uppercase">अचूकता</p>
                      <p
                        className={`text-sm font-black ${
                          std.overallAccuracy >= 70
                            ? "text-emerald-600"
                            : std.overallAccuracy >= 40
                            ? "text-amber-600"
                            : "text-rose-600"
                        }`}
                      >
                        {std.overallAccuracy}%
                      </p>
                    </div>
                  </div>

                  {/* Accuracy Bar */}
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 mb-1">
                      <span>अचूकता प्रगती</span>
                      <span>
                        ✅ {std.totalCorrect || 0} बरोबर • ❌ {std.totalWrong || 0} चूक
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden flex">
                      <div
                        className="bg-emerald-500 h-full"
                        style={{
                          width: `${
                            std.totalQuestionsSolved > 0
                              ? ((std.totalCorrect || 0) / std.totalQuestionsSolved) * 100
                              : 0
                          }%`,
                        }}
                      />
                      <div
                        className="bg-rose-400 h-full"
                        style={{
                          width: `${
                            std.totalQuestionsSolved > 0
                              ? ((std.totalWrong || 0) / std.totalQuestionsSolved) * 100
                              : 0
                          }%`,
                        }}
                      />
                    </div>
                  </div>

                  {/* Recent Test Snippet */}
                  {std.submissions && std.submissions.length > 0 && (
                    <div className="pt-1.5 border-t border-slate-200/60 text-[10px] text-slate-600 flex items-center justify-between">
                      <span className="truncate max-w-[170px] font-medium">
                        शेवटची: {std.submissions[0].testTitle}
                      </span>
                      <span className="font-mono font-bold text-indigo-600">
                        {std.submissions[0].score}/{std.submissions[0].totalQuestions * (std.submissions[0].examType === "NEET" ? 4 : 2)} गुण
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-1.5 pt-2 border-t border-slate-100">
                <button
                  onClick={() => setSelectedStudent(std)}
                  className="flex-1 py-1.5 px-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>तपशीलवार निकाल पहा</span>
                </button>
                <button
                  onClick={() => shareStudentProgressWhatsApp(std)}
                  className="p-1.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 cursor-pointer"
                  title="WhatsApp वर प्रगती अहवाल पाठवा"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Detailed Student Test History Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-70 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-black text-white text-lg">
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-base font-black">{selectedStudent.name}</h3>
                  <p className="text-xs text-slate-300 font-mono">
                    📱 {selectedStudent.mobile} • 🎯 {selectedStudent.examTarget}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Performance Summary Banner */}
            <div className="bg-indigo-50 px-6 py-3 border-b border-indigo-100 grid grid-cols-4 gap-2 text-center text-xs">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">एकूण टेस्ट्स</p>
                <p className="text-base font-black text-indigo-700">{selectedStudent.totalTestsTaken}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">सोडवलेले Qs</p>
                <p className="text-base font-black text-slate-900">{selectedStudent.totalQuestionsSolved}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">अचूकता %</p>
                <p className="text-base font-black text-emerald-600">{selectedStudent.overallAccuracy}%</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase">कमाल गुण</p>
                <p className="text-base font-black text-amber-700">{selectedStudent.highestScore}</p>
              </div>
            </div>

            {/* Test Submissions List */}
            <div className="p-6 overflow-y-auto space-y-3 flex-1">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-slate-700 uppercase tracking-wide">
                  सोडवलेल्या सर्व टेस्ट्सचा इतिहास ({selectedStudent.submissions?.length || 0})
                </h4>
                <button
                  onClick={() => shareStudentProgressWhatsApp(selectedStudent as any)}
                  className="px-3 py-1 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>WhatsApp वर निकाल पाठवा</span>
                </button>
              </div>

              {!selectedStudent.submissions || selectedStudent.submissions.length === 0 ? (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-slate-500 text-xs">
                  <Clock className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="font-bold text-slate-800">विद्यार्थ्याने अद्याप कोणतीही पूर्ण टेस्ट सबमिट केलेली नाही.</p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    विद्यार्थ्याने ॲपमध्ये ग्रँड टेस्ट किंवा मॉक टेस्ट सबमिट केल्यावर येथे रिअल-टाईम निकाल दिसेल.
                  </p>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {selectedStudent.submissions.map((sub, idx) => (
                    <div
                      key={sub.id || idx}
                      className="p-3.5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2 hover:border-indigo-300 transition-all"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 text-[10px] font-black flex items-center justify-center shrink-0">
                              {idx + 1}
                            </span>
                            <h5 className="text-xs font-black text-slate-900">{sub.testTitle}</h5>
                          </div>
                          <p className="text-[11px] text-slate-500 mt-0.5 ml-7">
                            विषय: <strong>{sub.subject}</strong> • परीक्षा: <strong>{sub.examType}</strong>
                          </p>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-sm font-black text-indigo-600 font-mono">
                            {sub.score} / {sub.totalMarks || sub.totalQuestions * 2} गुण
                          </span>
                          <p className="text-[10px] font-bold text-emerald-600">
                            {sub.accuracy}% अचूकता
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-4 gap-1 ml-7 bg-slate-50 p-2 rounded-xl text-[10px] text-center font-bold text-slate-600">
                        <div>एकूण प्रश्न: <strong>{sub.totalQuestions}</strong></div>
                        <div className="text-emerald-700">बरोबर: <strong>{sub.correctCount}</strong></div>
                        <div className="text-rose-700">चूक: <strong>{sub.wrongCount}</strong></div>
                        <div className="text-slate-500">वेळ: <strong>{Math.round((sub.timeSpentSeconds || 0) / 60)} मि.</strong></div>
                      </div>

                      <div className="text-[10px] text-slate-400 ml-7 flex items-center justify-between pt-1">
                        <span>
                          📅 {new Date(sub.submittedAt).toLocaleString("mr-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-bold">
                          पूर्ण झाली ✅
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold cursor-pointer"
              >
                बंद करा
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
