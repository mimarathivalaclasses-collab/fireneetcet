import { AchievementBadge, TestResultData } from "../types";

const STREAK_KEY = "mimarathi_study_streak_v2";

export interface DailyStreakData {
  currentStreak: number;
  lastActiveDate: string; // YYYY-MM-DD
  totalDaysActive: number;
  longestStreak: number;
}

export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getYesterdayDateString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getDailyStreak(): DailyStreakData {
  try {
    const raw = localStorage.getItem(STREAK_KEY);
    if (raw) {
      const parsed: DailyStreakData = JSON.parse(raw);
      const today = getTodayDateString();
      const yesterday = getYesterdayDateString();

      // If last active was before yesterday, streak is broken
      if (parsed.lastActiveDate !== today && parsed.lastActiveDate !== yesterday) {
        return {
          currentStreak: 0,
          lastActiveDate: parsed.lastActiveDate,
          totalDaysActive: parsed.totalDaysActive || 0,
          longestStreak: parsed.longestStreak || 0,
        };
      }
      return parsed;
    }
  } catch (e) {
    console.error("Error reading streak", e);
  }

  return {
    currentStreak: 1, // Start with 1 on first active visit
    lastActiveDate: getTodayDateString(),
    totalDaysActive: 1,
    longestStreak: 1,
  };
}

export function recordDailyActivity(): { streak: DailyStreakData; isNewDay: boolean } {
  const today = getTodayDateString();
  const yesterday = getYesterdayDateString();
  let current = getDailyStreak();
  let isNewDay = false;

  if (current.lastActiveDate === today) {
    // Already recorded for today
    return { streak: current, isNewDay: false };
  }

  isNewDay = true;
  let newStreak = 1;

  if (current.lastActiveDate === yesterday) {
    newStreak = (current.currentStreak || 0) + 1;
  } else {
    newStreak = 1;
  }

  const updated: DailyStreakData = {
    currentStreak: newStreak,
    lastActiveDate: today,
    totalDaysActive: (current.totalDaysActive || 0) + 1,
    longestStreak: Math.max(newStreak, current.longestStreak || 0),
  };

  try {
    localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Error saving streak", e);
  }

  return { streak: updated, isNewDay: true };
}

export function getAchievementBadges(
  totalAttempted: number,
  totalCorrect: number,
  testHistory: TestResultData[] = [],
  streakDays: number = 0,
  bookmarksCount: number = 0
): AchievementBadge[] {
  // Check for perfect score test
  const hasPerfectScore = testHistory.some(
    (t) => (t.totalQuestions > 0 && t.correct === t.totalQuestions) || t.accuracy === 100
  );

  const grandTestsAttempted = testHistory.filter(
    (t) => t.title && t.title.toLowerCase().includes("grand")
  ).length;

  const rawBadges: AchievementBadge[] = [
    {
      id: "badge-100-mcq",
      code: "MCQ_100",
      title: "100 Questions Solved",
      titleMr: "शतकवीर (१०० प्रश्न सोडवले)",
      description: "Successfully solved 100 practice multiple choice questions.",
      descriptionMr: "सराव पद्धतीमध्ये १०० पेक्षा अधिक प्रश्न यशस्वीपणे सोडवले.",
      icon: "Award",
      color: "from-amber-400 to-orange-500",
      category: "practice",
      isUnlocked: totalAttempted >= 100,
      targetCount: 100,
      currentCount: Math.min(totalAttempted, 100),
      progress: Math.min(100, Math.round((totalAttempted / 100) * 100)),
    },
    {
      id: "badge-perfect-score",
      code: "PERFECT_SCORE",
      title: "Perfect Mock Test Score",
      titleMr: "अचूक निशाणा (१००% अचूकता)",
      description: "Achieved 100% accuracy or full marks in any Mock Test / Grand Test.",
      descriptionMr: "कोणत्याही मॉक टेस्टमध्ये १००% अचूकता किंवा पैकीच्या पैकी गुण मिळवले.",
      icon: "Target",
      color: "from-emerald-400 to-teal-500",
      category: "accuracy",
      isUnlocked: hasPerfectScore,
      targetCount: 1,
      currentCount: hasPerfectScore ? 1 : 0,
      progress: hasPerfectScore ? 100 : 0,
    },
    {
      id: "badge-7-day-streak",
      code: "STREAK_7",
      title: "7-Day Study Streak",
      titleMr: "अखंड सराव (७ दिवस सलग अभ्यास)",
      description: "Maintained a continuous 7-day practice streak without missing a day.",
      descriptionMr: "दररोज ॲपवर येऊन सलग ७ दिवस न चुकता सराव चालू ठेवला.",
      icon: "Flame",
      color: "from-rose-500 to-orange-500",
      category: "streak",
      isUnlocked: streakDays >= 7,
      targetCount: 7,
      currentCount: Math.min(streakDays, 7),
      progress: Math.min(100, Math.round((streakDays / 7) * 100)),
    },
    {
      id: "badge-500-mcq",
      code: "MCQ_500",
      title: "500 Master Challenger",
      titleMr: "महा-सराव सम्राट (५०० प्रश्न)",
      description: "Attempted 500+ questions across Physics, Chemistry, Math & Biology.",
      descriptionMr: "५०० हून अधिक प्रश्नांचा सराव पूर्ण केला.",
      icon: "Trophy",
      color: "from-purple-500 to-indigo-600",
      category: "practice",
      isUnlocked: totalAttempted >= 500,
      targetCount: 500,
      currentCount: Math.min(totalAttempted, 500),
      progress: Math.min(100, Math.round((totalAttempted / 500) * 100)),
    },
    {
      id: "badge-grand-test",
      code: "GRAND_WARRIOR",
      title: "Grand Mock Simulator",
      titleMr: "ग्रँड टेस्ट वीर",
      description: "Attempted at least 1 full-length real exam simulator test.",
      descriptionMr: "किमान १ संपूर्ण ३ तासांचा ग्रँड रियल टेस्ट सिम्युलेटर सोडवला.",
      icon: "Zap",
      color: "from-blue-500 to-cyan-500",
      category: "grand_test",
      isUnlocked: grandTestsAttempted >= 1 || testHistory.length >= 1,
      targetCount: 1,
      currentCount: Math.max(grandTestsAttempted, testHistory.length > 0 ? 1 : 0),
      progress: testHistory.length > 0 ? 100 : 0,
    },
    {
      id: "badge-bookmarks-25",
      code: "REVISION_CHAMP",
      title: "Formula & Question Collector",
      titleMr: "रिव्हिजन मास्टर (२५ प्रश्न सेव्ह)",
      description: "Bookmarked 25+ tricky questions for rapid exam revision.",
      descriptionMr: "महत्वाच्या २५ प्रश्नांची रिव्हिजन यादी तयार केली.",
      icon: "Bookmark",
      color: "from-indigo-400 to-purple-500",
      category: "special",
      isUnlocked: bookmarksCount >= 25,
      targetCount: 25,
      currentCount: Math.min(bookmarksCount, 25),
      progress: Math.min(100, Math.round((bookmarksCount / 25) * 100)),
    },
  ];

  return rawBadges;
}
