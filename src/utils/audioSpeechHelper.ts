// Speech Synthesis Voice Helper for Marathi & English Question Explanations

let currentUtterance: SpeechSynthesisUtterance | null = null;

// Clean text for natural Marathi & English pronunciation (strip math tags, clean LaTeX)
export const cleanTextForSpeech = (text: string, isMarathi: boolean = false): string => {
  if (!text) return "";

  let cleaned = text
    .replace(/\$\$(.*?)\$\$/g, "$1")
    .replace(/\$(.*?)\$/g, "$1")
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, isMarathi ? "$1 भागिले $2" : "$1 divided by $2")
    .replace(/\\sqrt\{([^}]+)\}/g, isMarathi ? "$1 चे वर्गमूळ" : "square root of $1")
    .replace(/\^2/g, isMarathi ? " चा वर्ग" : " squared")
    .replace(/\^3/g, isMarathi ? " चा घन" : " cubed")
    .replace(/\\theta/g, "theta")
    .replace(/\\pi/g, "pi")
    .replace(/\\times/g, isMarathi ? " गुणिले " : " times ")
    .replace(/\\pm/g, isMarathi ? " अधिक किंवा वजा " : " plus or minus ")
    .replace(/\\approx/g, isMarathi ? " अंदाजे " : " approximately ")
    .replace(/\\Delta/g, "delta")
    .replace(/\\lambda/g, "lambda")
    .replace(/\\alpha/g, "alpha")
    .replace(/\\beta/g, "beta")
    .replace(/\\gamma/g, "gamma")
    .replace(/\\mu/g, "mu")
    .replace(/\\omega/g, "omega")
    .replace(/\\sigma/g, "sigma")
    .replace(/\\circ/g, " degrees")
    .replace(/\\cdot/g, " * ")
    .replace(/\\ge/g, isMarathi ? " पेक्षा मोठे किंवा समान " : " greater than or equal to ")
    .replace(/\\le/g, isMarathi ? " पेक्षा लहान किंवा समान " : " less than or equal to ")
    .replace(/[#*`_~]/g, "")
    .trim();

  return cleaned;
};

// Play speech
export const speakExplanation = (
  text: string,
  options?: {
    lang?: "mr-IN" | "en-IN" | "hi-IN" | "en-US";
    rate?: number;
    pitch?: number;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err: any) => void;
  }
) => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    alert("तुमच्या ब्राउझरमध्ये ऑडिओ स्पीच सपोर्ट उपलब्ध नाही.");
    return;
  }

  // Cancel any active speech
  window.speechSynthesis.cancel();

  const isMr = options?.lang === "mr-IN" || options?.lang === "hi-IN";
  const cleaned = cleanTextForSpeech(text, isMr);
  if (!cleaned) return;

  const utterance = new SpeechSynthesisUtterance(cleaned);
  currentUtterance = utterance;

  // Language setup
  utterance.lang = options?.lang || "mr-IN";
  utterance.rate = options?.rate || 0.95;
  utterance.pitch = options?.pitch || 1.0;

  // Find optimal voice if available
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    const targetLang = options?.lang || "mr-IN";
    const voiceMatch =
      voices.find((v) => v.lang.toLowerCase() === targetLang.toLowerCase()) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("mr")) ||
      voices.find((v) => v.lang.toLowerCase().startsWith("hi")) ||
      voices.find((v) => v.lang.toLowerCase().includes("in")) ||
      voices[0];

    if (voiceMatch) {
      utterance.voice = voiceMatch;
    }
  }

  utterance.onstart = () => {
    if (options?.onStart) options.onStart();
  };

  utterance.onend = () => {
    currentUtterance = null;
    if (options?.onEnd) options.onEnd();
  };

  utterance.onerror = (e) => {
    currentUtterance = null;
    if (options?.onError) options.onError(e);
  };

  window.speechSynthesis.speak(utterance);
};

export const stopExplanation = () => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
  }
};

export const isSpeakingAudio = () => {
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    return window.speechSynthesis.speaking;
  }
  return false;
};
