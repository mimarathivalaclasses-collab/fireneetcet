import React, { useState } from "react";
import {
  Trophy,
  Medal,
  Award,
  Flame,
  Target,
  Search,
  Filter,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  Crown,
  TrendingUp,
  GraduationCap,
  Building2,
  Star,
} from "lucide-react";
import { ExamType, LeaderboardTopper, StudentUser } from "../types";

interface LeaderboardViewProps {
  currentExam: ExamType;
  currentUser: StudentUser | null;
  onBack?: () => void;
  onNavigateToPractice?: () => void;
}

// Generate rich top 50 Maharashtra toppers dataset
const MOCK_TOPPERS_DATA: LeaderboardTopper[] = [
  {
    rank: 1,
    studentId: "top-1",
    studentName: "Aditya S. Kulkarni",
    city: "पुणे (Pune)",
    exam: "MHT_CET",
    totalSolved: 1420,
    totalCorrect: 1385,
    accuracy: 97.5,
    mockAvgScore: 98.2,
    streakDays: 42,
    instituteName: "Royal Science Academy, Pune",
    badge: "CET State Rank 1 Hopeful",
  },
  {
    rank: 2,
    studentId: "top-2",
    studentName: "Shruti M. Deshmukh",
    city: "लातूर (Latur)",
    exam: "NEET",
    totalSolved: 1390,
    totalCorrect: 1342,
    accuracy: 96.5,
    mockAvgScore: 97.8,
    streakDays: 38,
    instituteName: "Latur Pattern Toppers Hub",
    badge: "NEET 700+ Contender",
  },
  {
    rank: 3,
    studentId: "top-3",
    studentName: "Omkar V. Patil",
    city: "कोल्हापूर (Kolhapur)",
    exam: "JEE_MAIN",
    totalSolved: 1310,
    totalCorrect: 1250,
    accuracy: 95.4,
    mockAvgScore: 96.5,
    streakDays: 35,
    instituteName: "Shivaji Science Circle",
    badge: "99.9+ Percentile Track",
  },
  {
    rank: 4,
    studentId: "top-4",
    studentName: "Vaishnavi G. Jadhav",
    city: "छत्रपती संभाजीनगर (Aurangabad)",
    exam: "MHT_CET",
    totalSolved: 1260,
    totalCorrect: 1198,
    accuracy: 95.1,
    mockAvgScore: 95.8,
    streakDays: 30,
    instituteName: "Marathwada Elite Batch",
  },
  {
    rank: 5,
    studentId: "top-5",
    studentName: "Prathamesh R. Shinde",
    city: "नांदेड (Nanded)",
    exam: "NEET",
    totalSolved: 1220,
    totalCorrect: 1152,
    accuracy: 94.4,
    mockAvgScore: 94.9,
    streakDays: 28,
    instituteName: "Nanded Medical Foundation",
  },
  {
    rank: 6,
    studentId: "top-6",
    studentName: "Ananya K. Joshi",
    city: "नागपूर (Nagpur)",
    exam: "JEE_MAIN",
    totalSolved: 1180,
    totalCorrect: 1110,
    accuracy: 94.1,
    mockAvgScore: 94.2,
    streakDays: 26,
    instituteName: "Vidarbha IITians Academy",
  },
  {
    rank: 7,
    studentId: "top-7",
    studentName: "Tejas B. Gaikwad",
    city: "नाशिक (Nashik)",
    exam: "MHT_CET",
    totalSolved: 1140,
    totalCorrect: 1068,
    accuracy: 93.7,
    mockAvgScore: 93.9,
    streakDays: 25,
    instituteName: "Nashik Toppers Circle",
  },
  {
    rank: 8,
    studentId: "top-8",
    studentName: "Pooja N. Chavan",
    city: "सोलापूर (Solapur)",
    exam: "NEET",
    totalSolved: 1100,
    totalCorrect: 1025,
    accuracy: 93.2,
    mockAvgScore: 93.4,
    streakDays: 23,
    instituteName: "Solapur Science Center",
  },
  {
    rank: 9,
    studentId: "top-9",
    studentName: "Sanket D. More",
    city: "सातारा (Satara)",
    exam: "MHT_CET",
    totalSolved: 1060,
    totalCorrect: 985,
    accuracy: 92.9,
    mockAvgScore: 92.8,
    streakDays: 21,
    instituteName: "Satara PCM Titans",
  },
  {
    rank: 10,
    studentId: "top-10",
    studentName: "Rutuja A. Pawar",
    city: "अमरावती (Amravati)",
    exam: "NEET",
    totalSolved: 1030,
    totalCorrect: 954,
    accuracy: 92.6,
    mockAvgScore: 92.5,
    streakDays: 20,
    instituteName: "Vidarbha Medical Forum",
  },
  ...Array.from({ length: 40 }).map((_, i) => {
    const idx = i + 11;
    const cities = ["ठाणे (Thane)", "नवी मुंबई", "सांगली", "जळगाव", "अहमदनगर", "बीड", "उस्मानाबाद", "परभणी", "धुळे", "रत्नागिरी"];
    const exams: ExamType[] = ["MHT_CET", "NEET", "JEE_MAIN"];
    const exam = exams[idx % 3];
    const total = 1000 - idx * 16;
    const correct = Math.round(total * (0.91 - idx * 0.003));
    const accuracy = Math.round((correct / total) * 1000) / 10;
    const mockScore = Math.round((accuracy - 1.2) * 10) / 10;

    return {
      rank: idx,
      studentId: `top-${idx}`,
      studentName: `विद्यार्थी ${idx} (Maharashtra Aspirant)`,
      city: cities[idx % cities.length],
      exam,
      totalSolved: total,
      totalCorrect: correct,
      accuracy,
      mockAvgScore: mockScore,
      streakDays: Math.max(3, 20 - Math.floor(idx / 3)),
      instituteName: `Institute Batch #${(idx % 8) + 1}`,
    };
  }),
];

export const LeaderboardView: React.FC<LeaderboardViewProps> = ({
  currentExam,
  currentUser,
  onBack,
  onNavigateToPractice,
}) => {
  const [selectedExamFilter, setSelectedExamFilter] = useState<ExamType | "ALL">("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredToppers = MOCK_TOPPERS_DATA.filter((item) => {
    if (selectedExamFilter !== "ALL" && item.exam !== selectedExamFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        item.studentName.toLowerCase().includes(q) ||
        item.city.toLowerCase().includes(q) ||
        (item.instituteName && item.instituteName.toLowerCase().includes(q))
      );
    }
    return true;
  });

  const getRankBadge = (rank: number) => {
    if (rank === 1) {
      return (
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-400 to-yellow-500 text-slate-950 flex items-center justify-center font-black text-sm shadow-md ring-2 ring-amber-300">
          🥇 1
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-400 text-slate-900 flex items-center justify-center font-black text-sm shadow-md ring-2 ring-slate-200">
          🥈 2
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-amber-700 to-orange-800 text-white flex items-center justify-center font-black text-sm shadow-md ring-2 ring-amber-600/40">
          🥉 3
        </div>
      );
    }
    return (
      <div className="w-8 h-8 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-black font-mono-numbers text-xs border border-slate-200">
        #{rank}
      </div>
    );
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-6 animate-in fade-in">
      {/* Hero Header Banner with Reference Style Gradient */}
      <div className="rounded-3xl bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-950 text-white p-6 sm:p-8 shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-56 h-56 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-2xl">
            {onBack && (
              <button
                onClick={onBack}
                className="px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/20 mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                <span>← मुख्य पानावर जा</span>
              </button>
            )}

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black border border-amber-400/30">
              <Crown className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Maharashtra State Hall of Fame · Top 50 Students</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              महाराष्ट्र टॉपर्स लीडरबोर्ड (Toppers Leaderboard)
            </h1>
            <p className="text-indigo-200 text-xs sm:text-sm leading-relaxed">
              सर्वाधिक अचूक उत्तरे आणि मॉक टेस्ट गुणांवर आधारित महाराष्ट्रातील सर्वोत्कृष्ट ५० विद्यार्थ्यांची रिअल-टाइम रँकिंग.
            </p>
          </div>

          {/* Current Student Quick Rank Card */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 text-white space-y-1.5 min-w-[200px]">
            <div className="text-[11px] uppercase font-bold text-amber-300 flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>तुमची सध्याची स्थिती:</span>
            </div>
            <div className="text-sm font-black text-white">
              {currentUser ? currentUser.name : "अतिथी विद्यार्थी"}
            </div>
            <div className="text-xs text-slate-300 font-mono">
              टार्गेट: <strong className="text-amber-300">{currentUser ? currentUser.examTarget : currentExam}</strong>
            </div>
            {onNavigateToPractice && (
              <button
                onClick={onNavigateToPractice}
                className="w-full mt-1 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-xs transition-colors cursor-pointer"
              >
                सराव करून रँक वाढवा ⚡
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Podium Cards for Top 3 Toppers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
        {MOCK_TOPPERS_DATA.slice(0, 3).map((topper, idx) => (
          <div
            key={topper.studentId}
            className={`p-5 rounded-3xl border-2 transition-all relative overflow-hidden ${
              topper.rank === 1
                ? "bg-gradient-to-b from-amber-500/10 via-white to-amber-50/50 border-amber-300 shadow-lg scale-102"
                : topper.rank === 2
                ? "bg-gradient-to-b from-slate-200/40 via-white to-slate-50 border-slate-300 shadow-md"
                : "bg-gradient-to-b from-orange-500/10 via-white to-orange-50/30 border-orange-300 shadow-md"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              {getRankBadge(topper.rank)}
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200">
                {topper.exam}
              </span>
            </div>

            <h3 className="text-base font-black text-slate-900 truncate">{topper.studentName}</h3>
            <p className="text-xs text-slate-500 font-medium">{topper.city}</p>

            {topper.badge && (
              <div className="mt-2 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-amber-100 text-amber-900 text-[10px] font-black">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>{topper.badge}</span>
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 mt-4 pt-3 border-t border-slate-200/80 text-center">
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">अचूक उत्तरे</span>
                <span className="text-sm font-black text-emerald-600 font-mono-numbers">
                  {topper.totalCorrect}
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">अचूकता</span>
                <span className="text-sm font-black text-slate-900 font-mono-numbers">
                  {topper.accuracy}%
                </span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 font-bold block">सलग अभ्यास</span>
                <span className="text-sm font-black text-orange-600 font-mono-numbers flex items-center justify-center gap-0.5">
                  <Flame className="w-3 h-3 fill-orange-500 text-orange-500" />
                  {topper.streakDays}d
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-3">
        {/* Exam Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(["ALL", "MHT_CET", "NEET", "JEE_MAIN"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedExamFilter(tab)}
              className={`px-3.5 py-1.5 rounded-xl font-black text-xs transition-all whitespace-nowrap cursor-pointer ${
                selectedExamFilter === tab
                  ? "bg-purple-700 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-700"
              }`}
            >
              {tab === "ALL"
                ? "सर्व परीक्षा (All Exams)"
                : tab === "MHT_CET"
                ? "MHT-CET"
                : tab === "NEET"
                ? "NEET (UG)"
                : "JEE Main"}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative flex-1 sm:max-w-xs min-w-[200px]">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="विद्यार्थी किंवा शहर शोधा..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 text-xs font-bold outline-none focus:border-purple-600 bg-slate-50"
          />
        </div>
      </div>

      {/* Full Top 50 Students Table / Card List */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 bg-slate-50/80 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-purple-700" />
            <h3 className="text-sm sm:text-base font-black text-slate-900">
              संपूर्ण टॉप ५० यादी ({filteredToppers.length} विद्यार्थी)
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-bold">
            निकष: अचूक उत्तरे + मॉक टेस्ट स्कोअर
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredToppers.map((topper) => (
            <div
              key={topper.studentId}
              className="p-3.5 sm:p-4 hover:bg-slate-50/90 transition-colors flex flex-wrap sm:flex-nowrap items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="shrink-0">{getRankBadge(topper.rank)}</div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 truncate">
                      {topper.studentName}
                    </h4>
                    <span className="px-2 py-0.2 rounded-full text-[9px] font-black uppercase bg-slate-100 text-slate-700 border border-slate-200">
                      {topper.exam}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <span>{topper.city}</span>
                    {topper.instituteName && (
                      <>
                        <span>•</span>
                        <span className="text-purple-700 font-medium truncate">
                          {topper.instituteName}
                        </span>
                      </>
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:gap-6 text-right shrink-0">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">अचूक उत्तरे</span>
                  <span className="text-xs sm:text-sm font-black text-emerald-600 font-mono-numbers">
                    {topper.totalCorrect} / {topper.totalSolved}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-slate-400 font-bold block">अचूकता</span>
                  <span className="text-xs sm:text-sm font-black text-slate-900 font-mono-numbers">
                    {topper.accuracy}%
                  </span>
                </div>

                <div className="hidden sm:block">
                  <span className="text-[10px] text-slate-400 font-bold block">सलग सराव</span>
                  <span className="text-xs sm:text-sm font-black text-orange-600 font-mono-numbers flex items-center justify-end gap-1">
                    <Flame className="w-3.5 h-3.5 fill-orange-500 text-orange-500" />
                    {topper.streakDays}d
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
