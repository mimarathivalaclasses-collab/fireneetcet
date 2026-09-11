import { StudentUser } from "../types";

export const AUTH_SESSION_KEYS = {
  CURRENT_USER_PRIMARY: "mcq_app_current_user_v1",
  CURRENT_USER_STUDENT: "mcq_app_current_student_user_v1",
  TOKEN_SESSION: "abhyasmitra_auth_token_session",
  SESSION_STORAGE_KEY: "mcq_app_session_user_v1",
  ACTIVE_DEVICE_KEY: "mcq_app_device_id_v1",
};

export const AUTH_EVENT_NAME = "mcq_auth_session_changed";

/**
 * Robustly retrieves the active logged-in user from multi-layer redundant storage.
 * Checks localStorage primary, student vault, token cache, and sessionStorage.
 * Self-heals if any layer was wiped or missing.
 */
export function getUserSession(): StudentUser | null {
  try {
    const candidateKeys = [
      AUTH_SESSION_KEYS.CURRENT_USER_PRIMARY,
      AUTH_SESSION_KEYS.CURRENT_USER_STUDENT,
      AUTH_SESSION_KEYS.TOKEN_SESSION,
    ];

    let foundUser: StudentUser | null = null;

    // 1. Check local storage vaults
    for (const key of candidateKeys) {
      const raw = localStorage.getItem(key);
      if (raw) {
        try {
          const parsed = JSON.parse(raw);
          if (parsed && (parsed.id || parsed.mobile)) {
            foundUser = parsed;
            break;
          }
        } catch {
          // ignore corrupted json
        }
      }
    }

    // 2. Check session storage as fallback
    if (!foundUser) {
      const sessRaw = sessionStorage.getItem(AUTH_SESSION_KEYS.SESSION_STORAGE_KEY);
      if (sessRaw) {
        try {
          const parsed = JSON.parse(sessRaw);
          if (parsed && (parsed.id || parsed.mobile)) {
            foundUser = parsed;
          }
        } catch {
          // ignore
        }
      }
    }

    // 3. Self-healing: Ensure user is mirrored across all layers
    if (foundUser) {
      const serialized = JSON.stringify(foundUser);
      candidateKeys.forEach((key) => {
        try {
          if (localStorage.getItem(key) !== serialized) {
            localStorage.setItem(key, serialized);
          }
        } catch {}
      });
      try {
        sessionStorage.setItem(AUTH_SESSION_KEYS.SESSION_STORAGE_KEY, serialized);
      } catch {}
    }

    return foundUser;
  } catch (err) {
    console.warn("[AuthSession] Error retrieving session:", err);
    return null;
  }
}

/**
 * Saves user session across all persistent and temporary layers.
 * Triggers auth change event to notify all components.
 */
export function saveUserSession(user: StudentUser): void {
  if (!user) return;
  try {
    const serialized = JSON.stringify(user);

    // Save to all localStorage keys
    localStorage.setItem(AUTH_SESSION_KEYS.CURRENT_USER_PRIMARY, serialized);
    localStorage.setItem(AUTH_SESSION_KEYS.CURRENT_USER_STUDENT, serialized);
    localStorage.setItem(AUTH_SESSION_KEYS.TOKEN_SESSION, serialized);

    // Save to sessionStorage
    sessionStorage.setItem(AUTH_SESSION_KEYS.SESSION_STORAGE_KEY, serialized);

    // Dispatch event for reactive components
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(AUTH_EVENT_NAME, { detail: user }));
    }
  } catch (err) {
    console.error("[AuthSession] Failed to save user session:", err);
  }
}

/**
 * Safely clears user session across all storages.
 */
export function clearUserSession(): void {
  try {
    localStorage.removeItem(AUTH_SESSION_KEYS.CURRENT_USER_PRIMARY);
    localStorage.removeItem(AUTH_SESSION_KEYS.CURRENT_USER_STUDENT);
    localStorage.removeItem(AUTH_SESSION_KEYS.TOKEN_SESSION);
    sessionStorage.removeItem(AUTH_SESSION_KEYS.SESSION_STORAGE_KEY);
    sessionStorage.removeItem("mcq_admin_logged_in");

    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent(AUTH_EVENT_NAME, { detail: null }));
    }
  } catch (err) {
    console.error("[AuthSession] Failed to clear user session:", err);
  }
}
