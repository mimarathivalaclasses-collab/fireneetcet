import React, { useState, useMemo } from "react";
import {
  BarChart3,
  TrendingUp,
  Award,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  Target,
  Flame,
  AlertCircle,
  BookOpen,
  ArrowLeft,
  Zap,
  HelpCircle,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  AreaChart,
  Area,
} from "recharts";
import { TestResultData, ExamType, SubjectType } from "../types";

interface AnalyticsViewProps {
  testHistory: TestResultData[];
  practiceStats: {
    totalAttempted: number;
    totalCorrect: number;
    totalWrong: number;
    subjectWise: Record<string, { attempted: number; correct: number }>;
  };
  onReviewTest: (test: TestResultData) => void;
  onClearHistory: () => void;
  onGoToPractice: (subject?: string, chapter?: string) => void;
  onBack?: () => void;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({
  testHistory,
  practiceStats,
  onReviewTest,
  onClearHistory,
  onGoToPractice,
  onBack,
}) => {
  const [activeAnalysisTab, setActiveAnalysisTab] = useState<"strength_weakness" | "chart_view" | "history">("strength_weakness");

  const totalQuestionsPracticed = practiceStats.totalAttempted;
  const overallPracticeAccuracy =
    practiceStats.totalAttempted > 0
      ? Math.round((practiceStats.totalCorrect / practiceStats.totalAttempted) * 100)
      : 0;

  // Calculate average mock test score percentage
  const avgTestScore =
    testHistory.length > 0
      ? Math.round(
          testHistory.reduce((acc, curr) => acc + curr.percentage, 0) / testHistory.length
        )
      : 0;

  const subjects: SubjectType[] = ["Physics", "Chemistry", "Mathematics", "Biology"];

  // Prepare Subject Recharts Data
  const subjectChartData = subjects.map((sub) => {
    const data = practiceStats.subjectWise[sub] || { attempted: 0, correct: 0 };
    const wrong = data.attempted - data.correct;
    const accuracy = data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0;
    return {
      name: sub,
      Practice: data.attempted,
      Correct: data.correct,
      Wrong: wrong,
      accuracy: accuracy,
    };
  });

  // Radar chart data for Subject Balance
  const radarData = subjects.map((sub) => {
    const data = practiceStats.subjectWise[sub] || { attempted: 0, correct: 0 };
    const acc = data.attempted > 0 ? Math.round((data.correct / data.attempted) * 100) : 0;
    return {
      subject: sub,
      accuracy: acc > 0 ? acc : 10,
      fullMark: 100,
    };
  });

  // Mock test score trend data
  const testTrendData = [...testHistory].reverse().map((t, idx) => ({
    name: `T${idx + 1}`,
    title: t.title,
    score: t.percentage,
    accuracy: t.accuracy,
  }));

  // Dynamic Chapter Performance calculated from actual test history and practice
  const CHAPTER_DIAGNOSTICS = useMemo(() => {
    const chapterMap = new Map<string, { subject: SubjectType; chapter: string; attempted: number; correct: number }>();

    // 1. Gather all question answers from actual test history
    testHistory.forEach((test) => {
      if (Array.isArray(test.questions)) {
        test.questions.forEach((q) => {
          if (!q?.chapter) return;
          const key = `${q.subject || "Physics"}__${q.chapter}`;
          const current = chapterMap.get(key) || {
            subject: (q.subject || "Physics") as SubjectType,
            chapter: q.chapter,
            attempted: 0,
            correct: 0,
          };
          const userAns = test.userAnswers?.[q.id];
          if (userAns !== undefined) {
            current.attempted += 1;
            if (userAns === q.correctOption) {
              current.correct += 1;
            }
          }
          chapterMap.set(key, current);
        });
      }
    });

    // If student has taken tests on specific chapters, display their real chapters!
    if (chapterMap.size > 0) {
      return Array.from(chapterMap.values())
        .sort((a, b) => b.attempted - a.attempted)
        .slice(0, 10)
        .map((item) => {
          const acc = item.attempted > 0 ? Math.round((item.correct / item.attempted) * 100) : 0;
          const status: "Strong" | "Moderate" | "Weak" =
            acc >= 70 ? "Strong" : acc >= 40 ? "Moderate" : "Weak";
          const rec =
            status === "Strong"
              ? `Excellent Accuracy (${acc}%)! Maintain time management and regular formula revision.`
              : status === "Moderate"
              ? `Moderate Accuracy (${acc}%) · Re-solve concepts and PYQs from this chapter.`
              : `Low Accuracy (${acc}%) · High-priority revision and formula practice required.`;

          return {
            subject: item.subject,
            chapter: item.chapter,
            chapterMr: item.chapter,
            accuracy: acc,
            status,
            recommendation: rec,
          };
        });
    }

    // Default High-Yield Chapters with live subject stats fallback
    return [
      {
        subject: "Physics" as SubjectType,
        chapter: "Rotational Dynamics",
        chapterMr: "परिवलन गतीशास्त्र",
        accuracy: practiceStats.subjectWise["Physics"]?.attempted > 0
          ? Math.round((practiceStats.subjectWise["Physics"].correct / practiceStats.subjectWise["Physics"].attempted) * 100)
          : 0,
        status: (practiceStats.subjectWise["Physics"]?.attempted > 0 && (practiceStats.subjectWise["Physics"].correct / practiceStats.subjectWise["Physics"].attempted) >= 0.7)
          ? ("Strong" as const)
          : practiceStats.subjectWise["Physics"]?.attempted > 0
          ? ("Weak" as const)
          : ("Moderate" as const),
        recommendation: practiceStats.subjectWise["Physics"]?.attempted > 0
          ? "As per practice accuracy: Maintain consistency in PYQs and formulas"
          : "Practice not started yet · Start practicing now",
      },
      {
        subject: "Chemistry" as SubjectType,
        chapter: "Chemical Thermodynamics",
        chapterMr: "रासायनिक उष्मागतिकी",
        accuracy: practiceStats.subjectWise["Chemistry"]?.attempted > 0
          ? Math.round((practiceStats.subjectWise["Chemistry"].correct / practiceStats.subjectWise["Chemistry"].attempted) * 100)
          : 0,
        status: (practiceStats.subjectWise["Chemistry"]?.attempted > 0 && (practiceStats.subjectWise["Chemistry"].correct / practiceStats.subjectWise["Chemistry"].attempted) >= 0.7)
          ? ("Strong" as const)
          : practiceStats.subjectWise["Chemistry"]?.attempted > 0
          ? ("Weak" as const)
          : ("Moderate" as const),
        recommendation: practiceStats.subjectWise["Chemistry"]?.attempted > 0
          ? "Maintain regular practice of Enthalpy and State Functions formulas"
          : "Practice not started yet · Start practicing now",
      },
      {
        subject: "Mathematics" as SubjectType,
        chapter: "Vectors & 3D Geometry",
        chapterMr: "सदिश व त्रिमितीय भूमिती",
        accuracy: practiceStats.subjectWise["Mathematics"]?.attempted > 0
          ? Math.round((practiceStats.subjectWise["Mathematics"].correct / practiceStats.subjectWise["Mathematics"].attempted) * 100)
          : 0,
        status: (practiceStats.subjectWise["Mathematics"]?.attempted > 0 && (practiceStats.subjectWise["Mathematics"].correct / practiceStats.subjectWise["Mathematics"].attempted) >= 0.7)
          ? ("Strong" as const)
          : practiceStats.subjectWise["Mathematics"]?.attempted > 0
          ? ("Weak" as const)
          : ("Moderate" as const),
        recommendation: practiceStats.subjectWise["Mathematics"]?.attempted > 0
          ? "Improve practice of Dot & Cross Product formulas and time management"
          : "Practice not started yet · Start practicing now",
      },
      {
        subject: "Biology" as SubjectType,
        chapter: "Genetics & Molecular Basis",
        chapterMr: "आनुवंशिकी आणि रेण्वीय आधार",
        accuracy: practiceStats.subjectWise["Biology"]?.attempted > 0
          ? Math.round((practiceStats.subjectWise["Biology"].correct / practiceStats.subjectWise["Biology"].attempted) * 100)
          : 0,
        status: (practiceStats.subjectWise["Biology"]?.attempted > 0 && (practiceStats.subjectWise["Biology"].correct / practiceStats.subjectWise["Biology"].attempted) >= 0.7)
          ? ("Strong" as const)
          : practiceStats.subjectWise["Biology"]?.attempted > 0
          ? ("Weak" as const)
          : ("Moderate" as const),
        recommendation: practiceStats.subjectWise["Biology"]?.attempted > 0
          ? "Revise NCERT diagrams, DNA Replication and Translation steps"
          : "Practice not started yet · Start practicing now",
      },
    ];
  }, [testHistory, practiceStats]);

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6 animate-in fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3 py-1 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer border border-slate-300 mr-1"
                title="मागे जा"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-purple-700" />
                <span>← Back</span>
              </button>
            )}
            <BarChart3 className="w-6 h-6 text-purple-700" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Study Analytics & Strengths/Weaknesses Dashboard
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Your subject-wise accuracy, Recharts data visualization and chapters requiring more practice.
          </p>
        </div>

        {testHistory.length > 0 && (
          <button
            onClick={onClearHistory}
            className="px-3.5 py-1.5 rounded-xl border border-rose-200 bg-rose-50 text-rose-700 hover:bg-rose-100 font-black text-xs transition-colors cursor-pointer"
          >
            Reset History
          </button>
        )}
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Practiced */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-2 shadow-xs hover:border-purple-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-slate-500 uppercase">Total Questions Solved</span>
            <div className="w-8 h-8 rounded-xl bg-purple-100 flex items-center justify-center">
              <Target className="w-4 h-4 text-purple-700" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 font-mono-numbers">
            {totalQuestionsPracticed}
          </div>
          <p className="text-[11px] text-slate-400">Practice + Mock Tests Combined</p>
        </div>

        {/* Practice Accuracy */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-2 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-slate-500 uppercase">Practice Accuracy</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-emerald-700" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 font-mono-numbers">
            {overallPracticeAccuracy}%
          </div>
          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div
              className="bg-emerald-500 h-1.5 rounded-full"
              style={{ width: `${overallPracticeAccuracy}%` }}
            ></div>
          </div>
        </div>

        {/* Tests Given */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-2 shadow-xs hover:border-indigo-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-slate-500 uppercase">Mock Tests Taken</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center">
              <Award className="w-4 h-4 text-indigo-700" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-700 font-mono-numbers">
            {testHistory.length}
          </div>
          <p className="text-[11px] text-slate-400">Completed Assessments</p>
        </div>

        {/* Avg Mock Score */}
        <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-2 shadow-xs hover:border-amber-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-black text-slate-500 uppercase">Avg Test Score</span>
            <div className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center">
              <Flame className="w-4 h-4 text-amber-600" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600 font-mono-numbers">
            {avgTestScore}%
          </div>
          <p className="text-[11px] text-slate-400">Target: 85%+ CET/NEET/JEE</p>
        </div>
      </div>

      {/* Analysis View Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          onClick={() => setActiveAnalysisTab("strength_weakness")}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
            activeAnalysisTab === "strength_weakness"
              ? "bg-purple-700 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          🎯 Strength & Weakness
        </button>
        <button
          onClick={() => setActiveAnalysisTab("chart_view")}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
            activeAnalysisTab === "chart_view"
              ? "bg-purple-700 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          📊 Visual Charts
        </button>
        <button
          onClick={() => setActiveAnalysisTab("history")}
          className={`px-4 py-2 rounded-2xl text-xs font-black transition-all cursor-pointer ${
            activeAnalysisTab === "history"
              ? "bg-purple-700 text-white shadow-xs"
              : "bg-slate-100 hover:bg-slate-200 text-slate-700"
          }`}
        >
          📝 Mock Test History ({testHistory.length})
        </button>
      </div>

      {/* Tab 1: Strength & Weakness Diagnostic Cards */}
      {activeAnalysisTab === "strength_weakness" && (
        <div className="space-y-6">
          {/* Highlight Focus Banner for Weak Topics */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-rose-500/10 via-amber-500/10 to-purple-500/10 border border-rose-200/80 flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-rose-700 font-black text-xs uppercase">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>Topics Requiring Immediate Review</span>
              </div>
              <h3 className="text-base font-black text-slate-900">
                Solve at least 15-20 practice questions daily for topics with low accuracy.
              </h3>
            </div>
            <button
              onClick={() => onGoToPractice()}
              className="px-4 py-2 rounded-2xl bg-purple-700 hover:bg-purple-800 text-white font-black text-xs shadow-md transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Open Practice Mode</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Diagnostic Chapters Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {CHAPTER_DIAGNOSTICS.map((item, idx) => (
              <div
                key={idx}
                className={`p-5 rounded-3xl border-2 transition-all bg-white space-y-3 ${
                  item.status === "Weak"
                    ? "border-rose-300 hover:border-rose-400 shadow-xs"
                    : item.status === "Moderate"
                    ? "border-amber-200 hover:border-amber-300 shadow-xs"
                    : "border-emerald-200 hover:border-emerald-300 shadow-xs"
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase bg-slate-100 text-slate-700">
                      {item.subject}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        item.status === "Weak"
                          ? "bg-rose-100 text-rose-700 border border-rose-200"
                          : item.status === "Moderate"
                          ? "bg-amber-100 text-amber-700 border border-amber-200"
                          : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                      }`}
                    >
                      {item.status === "Weak"
                        ? "⚠️ Weak Topic"
                        : item.status === "Moderate"
                        ? "⚡ Moderate"
                        : "✅ Strong Topic"}
                    </span>
                  </div>
                  <span
                    className={`text-sm font-black font-mono-numbers ${
                      item.status === "Weak"
                        ? "text-rose-600"
                        : item.status === "Moderate"
                        ? "text-amber-600"
                        : "text-emerald-600"
                    }`}
                  >
                    {item.accuracy}% Accuracy
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-black text-slate-900">{item.chapter}</h4>
                  <p className="text-xs text-slate-500 font-medium">{item.chapterMr}</p>
                </div>

                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      item.status === "Weak"
                        ? "bg-rose-500"
                        : item.status === "Moderate"
                        ? "bg-amber-500"
                        : "bg-emerald-500"
                    }`}
                    style={{ width: `${item.accuracy}%` }}
                  ></div>
                </div>

                <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                  💡 <strong>Guidance:</strong> {item.recommendation}
                </p>

                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-bold">
                    {item.status === "Weak" ? "Revision Priority: High" : "Regular Review"}
                  </span>
                  <button
                    onClick={() => onGoToPractice(item.subject, item.chapter)}
                    className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-purple-100 hover:text-purple-700 text-slate-700 text-xs font-black transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Practice Now</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Visual Recharts Section */}
      {activeAnalysisTab === "chart_view" && (
        <div className="space-y-6">
          {/* Recharts Bar Chart: Subject Attempted vs Correct vs Wrong */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-black text-slate-900">
                  Subject-Wise Performance (Correct vs Incorrect)
                </h3>
                <p className="text-xs text-slate-500">Attempted, Correct and Wrong questions per subject</p>
              </div>
            </div>

            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={subjectChartData} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} fontWeight={700} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f172a",
                      color: "#fff",
                      borderRadius: "12px",
                      fontSize: "12px",
                      fontWeight: 700,
                    }}
                  />
                  <Legend />
                  <Bar dataKey="Correct" fill="#10b981" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Wrong" fill="#f43f5e" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Side by side: Radar Balance & Mock Test Progression Trend */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Subject Balance Radar Chart */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-black text-slate-900">
                Radar Balance Chart (Accuracy by Subject)
              </h3>
              <p className="text-xs text-slate-500">Radar map to maintain balanced study across all subjects</p>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" stroke="#475569" fontSize={12} fontWeight={700} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Accuracy (%)"
                      dataKey="accuracy"
                      stroke="#7c3aed"
                      fill="#8b5cf6"
                      fillOpacity={0.5}
                    />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Mock Test Score Trend Area Chart */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs space-y-3">
              <h3 className="text-sm font-black text-slate-900">
                Test Score Progression
              </h3>
              <p className="text-xs text-slate-500">Percentage score trend in previous tests (%)</p>

              {testTrendData.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center text-center p-4 space-y-2">
                  <Clock className="w-8 h-8 text-slate-300" />
                  <p className="text-xs text-slate-500 font-bold">
                    Your progression chart will appear here after you take a mock test.
                  </p>
                </div>
              ) : (
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={testTrendData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#7c3aed" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={12} />
                      <YAxis stroke="#64748b" fontSize={12} domain={[0, 100]} />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="score"
                        stroke="#7c3aed"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#scoreColor)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Mock Test History Table */}
      {activeAnalysisTab === "history" && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-5 shadow-xs">
          <h3 className="text-sm font-black text-slate-900 uppercase tracking-wider">
            Recent Test Attempts
          </h3>

          {testHistory.length === 0 ? (
            <div className="text-center py-8 space-y-3">
              <Clock className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs text-slate-500 font-bold">
                No mock tests taken yet. Go to 'Mock Test' tab to start your first test!
              </p>
              <button
                onClick={() => onGoToPractice()}
                className="px-4 py-2 rounded-2xl bg-purple-700 text-white text-xs font-black shadow-xs hover:bg-purple-800 transition-colors cursor-pointer"
              >
                <span>Start Practice</span>
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-black uppercase">
                  <tr>
                    <th className="py-3.5 px-4">Test Name</th>
                    <th className="py-3.5 px-4">Exam</th>
                    <th className="py-3.5 px-4">Marks</th>
                    <th className="py-3.5 px-4">Accuracy</th>
                    <th className="py-3.5 px-4">Time</th>
                    <th className="py-3.5 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {testHistory.map((t) => (
                    <tr key={t.testId} className="hover:bg-slate-50 transition-colors">
                      <td className="py-3 px-4 font-black text-slate-900">{t.title}</td>
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-purple-50 text-purple-700 border border-purple-200">
                          {t.exam}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-black text-slate-900">
                        {t.score} / {t.maxMarks} ({t.percentage}%)
                      </td>
                      <td className="py-3 px-4 font-black text-emerald-600">{t.accuracy}%</td>
                      <td className="py-3 px-4 text-slate-500">
                        {Math.round(t.timeTakenSeconds / 60)} min.
                      </td>
                      <td className="py-3 px-4 text-right">
                        <button
                          onClick={() => onReviewTest(t)}
                          className="px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs transition-colors cursor-pointer"
                        >
                          View Explanation
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
