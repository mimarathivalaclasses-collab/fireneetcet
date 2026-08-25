// Device identification and Anti-screenshot utilities

const DEVICE_ID_KEY = "mcq_app_device_id_v1";

/**
 * Get or create a unique persistent device ID for this browser / phone
 */
export function getOrCreateDeviceId(): string {
  let deviceId = localStorage.getItem(DEVICE_ID_KEY);
  if (!deviceId) {
    const randomStr = Math.random().toString(36).substring(2, 10).toUpperCase();
    const timestamp = Date.now().toString(36).toUpperCase();
    deviceId = `DEV-${randomStr}-${timestamp}`;
    localStorage.setItem(DEVICE_ID_KEY, deviceId);
  }
  return deviceId;
}

/**
 * Get readable device details (OS, Browser, Device Type)
 */
export function getDeviceName(): string {
  const ua = navigator.userAgent;
  let os = "Unknown OS";
  if (ua.indexOf("Android") !== -1) os = "Android Mobile";
  else if (ua.indexOf("iPhone") !== -1) os = "Apple iPhone";
  else if (ua.indexOf("iPad") !== -1) os = "Apple iPad";
  else if (ua.indexOf("Windows") !== -1) os = "Windows PC";
  else if (ua.indexOf("Macintosh") !== -1) os = "Mac OS";
  else if (ua.indexOf("Linux") !== -1) os = "Linux";

  let browser = "Browser";
  if (ua.indexOf("Chrome") !== -1 && ua.indexOf("Edg") === -1) browser = "Chrome";
  else if (ua.indexOf("Safari") !== -1 && ua.indexOf("Chrome") === -1) browser = "Safari";
  else if (ua.indexOf("Firefox") !== -1) browser = "Firefox";
  else if (ua.indexOf("Edg") !== -1) browser = "Edge";

  return `${os} (${browser})`;
}

/**
 * Format remaining trial seconds into mm:ss
 */
export function formatTrialTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}
