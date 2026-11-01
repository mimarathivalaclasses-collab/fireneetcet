/**
 * Haptic Feedback utility for native mobile feel
 * Uses Web Vibration API where supported with safe fallbacks
 */
export const triggerHaptic = (
  type: "light" | "medium" | "heavy" | "success" | "warning" | "selection" = "light"
): void => {
  if (typeof window === "undefined" || !("navigator" in window) || !("vibrate" in navigator)) {
    return;
  }

  try {
    switch (type) {
      case "selection":
        navigator.vibrate(10);
        break;
      case "light":
        navigator.vibrate(15);
        break;
      case "medium":
        navigator.vibrate(30);
        break;
      case "heavy":
        navigator.vibrate(50);
        break;
      case "success":
        navigator.vibrate([20, 40, 30]);
        break;
      case "warning":
        navigator.vibrate([40, 60, 40]);
        break;
      default:
        navigator.vibrate(15);
    }
  } catch {
    // Graceful fallback if device permissions disallow vibration
  }
};
