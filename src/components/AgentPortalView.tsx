import React, { useState, useEffect } from "react";
import {
  Users,
  DollarSign,
  TrendingUp,
  Share2,
  Copy,
  CheckCircle2,
  QrCode,
  ArrowRight,
  ShieldCheck,
  Zap,
  Building2,
  GraduationCap,
  Sparkles,
  Lock,
  LogIn,
  UserPlus,
  Phone,
  Wallet,
  Send,
  AlertCircle,
  Clock,
  Award,
  ArrowLeft,
  Calculator,
  Download,
  MessageSquare,
  FileText,
  CreditCard,
} from "lucide-react";
import { AgentUser, AgentPayoutRequest, StudentReferralRecord } from "../types";
import {
  REFERRAL_CONFIG,
  formatInr,
  maskPhoneNumber,
  getReferredStudentsList,
  submitPayoutRequest,
  getUserPayoutsHistory,
} from "../utils/referralSystem";

interface AgentPortalViewProps {
  onBack?: () => void;
  onOpenPaymentModal?: (amount: number, planName: string) => void;
}

export const AgentPortalView: React.FC<AgentPortalViewProps> = ({
  onBack,
  onOpenPaymentModal,
}) => {
  // Active Agent Session (stored in sessionStorage / localStorage)
  const [currentAgent, setCurrentAgent] = useState<AgentUser | null>(() => {
    try {
      const stored = sessionStorage.getItem("mcq_agent_active_user");
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  // Auth Modes: "login" | "register"
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [loginMobile, setLoginMobile] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register Fields
  const [regName, setRegName] = useState("");
  const [regMobile, setRegMobile] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regCity, setRegCity] = useState("");
  const [regUpiId, setRegUpiId] = useState("");

  // Agent Dashboard Active Sub-Tab: "overview" | "students" | "withdraw" | "calculator" | "marketing"
  const [dashboardTab, setDashboardTab] = useState<
    "overview" | "students" | "withdraw" | "calculator" | "marketing"
  >("overview");

  // Referral / Payout States
  const [referredList, setReferredList] = useState<StudentReferralRecord[]>([]);
  const [myPayouts, setMyPayouts] = useState<AgentPayoutRequest[]>([]);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  // Withdrawal form (Minimum ₹100)
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutUpi, setPayoutUpi] = useState("");
  const [payoutSuccessMessage, setPayoutSuccessMessage] = useState<string | null>(null);
  const [payoutErrorMessage, setPayoutErrorMessage] = useState<string | null>(null);
  const [isSubmittingPayout, setIsSubmittingPayout] = useState(false);

  // Interactive Calculator State
  const [calcStudents, setCalcStudents] = useState<number>(50);

  // Sync Agent Data & Referrals
  useEffect(() => {
    if (currentAgent) {
      // Reload latest agent record from storage
      try {
        const raw = localStorage.getItem("mcq_app_all_agents_v1");
        if (raw) {
          const allAgents: AgentUser[] = JSON.parse(raw);
          const matched = allAgents.find((a) => a.id === currentAgent.id || a.mobile === currentAgent.mobile);
          if (matched) {
            setCurrentAgent(matched);
            sessionStorage.setItem("mcq_agent_active_user", JSON.stringify(matched));
          }
        }
      } catch {}

      // Get referred students
      const list = getReferredStudentsList(currentAgent.agentCode);
      setReferredList(list);

      // Get payouts
      const payouts = getUserPayoutsHistory(currentAgent.id);
      setMyPayouts(payouts);

      if (currentAgent.upiId && !payoutUpi) {
        setPayoutUpi(currentAgent.upiId);
      }
    }
  }, [currentAgent?.id, currentAgent?.agentCode]);

  // Handle Registration
  const handleRegisterAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName.trim() || !regMobile.trim()) {
      alert("कृपया नाव आणि मोबाईल नंबर प्रविष्ट करा.");
      return;
    }
    if (regMobile.trim().length < 10) {
      alert("कृपया वैध १० अंकी मोबाईल नंबर टाका.");
      return;
    }
    if (!regPassword.trim() || regPassword.trim().length < 4) {
      alert("कृपया किमान ४ अक्षरी पासवर्ड तयार करा.");
      return;
    }

    try {
      const raw = localStorage.getItem("mcq_app_all_agents_v1");
      const agents: AgentUser[] = raw ? JSON.parse(raw) : [];

      if (agents.find((a) => a.mobile === regMobile.trim())) {
        alert("हा मोबाईल नंबर आधीच एजंट म्हणून नोंदणीकृत आहे! कृपया लॉगिन करा.");
        setAuthMode("login");
        setLoginMobile(regMobile.trim());
        return;
      }

      const newAgentCode = `AGT-${Math.floor(1000 + Math.random() * 9000)}`;
      const newAgent: AgentUser = {
        id: `agent-${Date.now()}`,
        agentCode: newAgentCode,
        name: regName.trim(),
        mobile: regMobile.trim(),
        password: regPassword.trim(),
        city: regCity.trim() || "Maharashtra",
        upiId: regUpiId.trim() || `${regMobile.trim()}@upi`,
        commissionRate: REFERRAL_CONFIG.COMMISSION_PERCENT, // 20%
        totalEarnings: 0,
        totalPaidOut: 0,
        walletBalance: 0,
        totalStudentsReferred: 0,
        totalClassesReferred: 0,
        isApproved: true,
        status: "active",
        createdAt: Date.now(),
        lastLoginAt: Date.now(),
      };

      agents.push(newAgent);
      localStorage.setItem("mcq_app_all_agents_v1", JSON.stringify(agents));
      sessionStorage.setItem("mcq_agent_active_user", JSON.stringify(newAgent));
      setCurrentAgent(newAgent);
      setPayoutUpi(newAgent.upiId || "");
    } catch (err) {
      console.error(err);
    }
  };

  // Handle Login
  const handleLoginAgent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginMobile.trim()) {
      alert("कृपया मोबाईल नंबर टाका.");
      return;
    }

    try {
      const raw = localStorage.getItem("mcq_app_all_agents_v1");
      const agents: AgentUser[] = raw ? JSON.parse(raw) : [];
      const agent = agents.find(
        (a) => a.mobile === loginMobile.trim() || a.agentCode.toUpperCase() === loginMobile.trim().toUpperCase()
      );

      if (!agent) {
        alert("या नंबरवर एजंट खाते सापडले नाही. कृपया नवीन एजंट नोंदणी करा.");
        setAuthMode("register");
        setRegMobile(loginMobile.trim());
        return;
      }

      if (agent.password && agent.password !== loginPassword.trim()) {
        alert("चुकीचा पासवर्ड! कृपया योग्य पासवर्ड प्रविष्ट करा.");
        return;
      }

      agent.lastLoginAt = Date.now();
      localStorage.setItem("mcq_app_all_agents_v1", JSON.stringify(agents));
      sessionStorage.setItem("mcq_agent_active_user", JSON.stringify(agent));
      setCurrentAgent(agent);
      setPayoutUpi(agent.upiId || "");
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem("mcq_agent_active_user");
    setCurrentAgent(null);
  };

  // Referral URL
  const agentReferralUrl = currentAgent
    ? `${window.location.origin}${window.location.pathname}?agent=${currentAgent.agentCode}`
    : "";

  const handleCopyLink = () => {
    if (!agentReferralUrl) return;
    navigator.clipboard.writeText(agentReferralUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  const handleCopyCode = () => {
    if (!currentAgent) return;
    navigator.clipboard.writeText(currentAgent.agentCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 3000);
  };

  // Submit Payout Request (Minimum ₹100)
  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    setPayoutErrorMessage(null);
    setPayoutSuccessMessage(null);

    if (!currentAgent) return;

    const amount = Number(payoutAmount);
    const minWithdrawal = REFERRAL_CONFIG.MINIMUM_WITHDRAWAL_INR;

    if (!amount || isNaN(amount) || amount < minWithdrawal) {
      setPayoutErrorMessage(
        `किमान विड्रॉल रक्कम ₹${minWithdrawal} आहे. कृपया किमान ₹${minWithdrawal} किंवा त्यापेक्षा जास्त रक्कम टाका.`
      );
      return;
    }

    if (amount > currentAgent.walletBalance) {
      setPayoutErrorMessage(
        `तुमच्या वॉलेटमध्ये फक्त ₹${formatInr(
          currentAgent.walletBalance
        )} शिल्लक आहे. शिल्लक रकमेपेक्षा जास्त रक्कम काढता येत नाही.`
      );
      return;
    }

    if (!payoutUpi.trim()) {
      setPayoutErrorMessage("कृपया वैध UPI ID प्रविष्ट करा.");
      return;
    }

    setIsSubmittingPayout(true);

    setTimeout(() => {
      const res = submitPayoutRequest({
        userType: "agent",
        userId: currentAgent.id,
        userName: currentAgent.name,
        userMobile: currentAgent.mobile,
        userCode: currentAgent.agentCode,
        amount,
        upiId: payoutUpi.trim(),
      });

      setIsSubmittingPayout(false);

      if (res.success) {
        setPayoutSuccessMessage(res.message);
        setPayoutAmount("");
        // refresh current agent state from storage
        const stored = sessionStorage.getItem("mcq_agent_active_user");
        if (stored) {
          setCurrentAgent(JSON.parse(stored));
        }
        setMyPayouts(getUserPayoutsHistory(currentAgent.id));
      } else {
        setPayoutErrorMessage(res.message);
      }
    }, 600);
  };

  const totalStudentsCount = Math.max(
    currentAgent?.totalStudentsReferred || 0,
    referredList.length
  );
  const minWithdrawal = REFERRAL_CONFIG.MINIMUM_WITHDRAWAL_INR; // ₹100
  const walletBal = currentAgent?.walletBalance || 0;
  const canWithdraw = walletBal >= minWithdrawal;
  const remainingForWithdraw = Math.max(0, minWithdrawal - walletBal);
  const referralsNeeded = Math.ceil(remainingForWithdraw / REFERRAL_CONFIG.COMMISSION_PER_STUDENT);

  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
    agentReferralUrl
  )}`;

  const agentShareWhatsappText = `🔥 MHT-CET, NEET & JEE Main सराव ॲप (फक्त ₹२९ मध्ये)! \n✅ २५,०००+ प्रश्न, १० ग्रँड मॉक टेस्ट्स आणि मराठी/इंग्रजी स्पष्टीकरण!\n👉 लगेच सुरू करा माझ्या अधिकृत लिंकवरून:\n${agentReferralUrl}\n(किंवा नोंदणी करताना एजंट कोड वापरा: ${currentAgent?.agentCode})`;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16 px-3 sm:px-4">
      {/* 1. TOP HEADER & LOGOUT */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer border border-slate-300 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-slate-700" />
              <span>← मागे जा</span>
            </button>
          )}
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-950 font-black text-xs border border-indigo-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
            <span>अधिकृत एजंट व पार्टनर प्रोग्राम (२०% कमिशन)</span>
          </span>
        </div>

        {currentAgent && (
          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <div className="text-xs font-black text-slate-900">{currentAgent.name}</div>
              <div className="text-[10px] text-slate-500 font-mono">
                {currentAgent.agentCode} · 📱 {currentAgent.mobile}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs border border-rose-200 cursor-pointer"
            >
              लॉग आऊट
            </button>
          </div>
        )}
      </div>

      {/* 2. PROMINENT VERIFIED AGENT REFERRAL CARD (User Requirement: "refer कोडे वर कर म्हणजे त्यांना खरं वाटेल") */}
      {currentAgent && (
        <div className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-indigo-500/40 relative overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

          <div className="relative z-10 space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-indigo-500/20 pb-4">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-black border border-indigo-400/30">
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                  <span>अधिकृत एजंट पार्टनर (Official Certified Agent)</span>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
                  विद्यार्थी जोडा · प्रति रेफर ₹२९ च्या २०% (₹५.८०) थेट कमिशन!
                </h1>
              </div>

              <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/15 text-center">
                <div className="text-[10px] uppercase tracking-wider text-indigo-300 font-bold">
                  तुमचा कमिशन दर
                </div>
                <div className="text-xl sm:text-2xl font-black text-amber-300 font-mono-numbers">
                  ₹५.८० <span className="text-xs text-white font-normal">(२०%)</span>
                </div>
              </div>
            </div>

            {/* MAIN AGENT CODE DISPLAY & ACTION BUTTONS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-center">
              {/* The Big Code Badge */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-indigo-400/30 space-y-3">
                <div className="flex items-center justify-between text-xs text-indigo-300 font-bold">
                  <span>तुमचा अधिकृत एजंट रेफरल कोड (Agent Code):</span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    ✓ प्रमाणित कोड (Verified)
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex-1 min-w-[200px] bg-slate-950/85 px-4 py-3 rounded-2xl border-2 border-indigo-400/50 flex items-center justify-between shadow-inner">
                    <span className="font-mono text-xl sm:text-2xl font-black tracking-wider text-amber-300">
                      {currentAgent.agentCode}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyCode}
                      className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
                    >
                      {copiedCode ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>कॉपी झाले!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>कोड कॉपी</span>
                        </>
                      )}
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowQrModal(true)}
                    className="px-3.5 py-3 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs flex items-center gap-1.5 transition-all border border-white/20 cursor-pointer"
                    title="QR कोड पहा"
                  >
                    <QrCode className="w-4 h-4 text-amber-300" />
                    <span className="hidden sm:inline">QR कोड</span>
                  </button>
                </div>

                {/* Direct Agent Share Link */}
                <div className="space-y-1 pt-1">
                  <div className="text-[11px] text-slate-300 font-semibold">
                    तुमची थेट एजंट जॉइनिंग लिंक (Direct Link):
                  </div>
                  <div className="flex items-center gap-2 bg-slate-950/60 p-2 rounded-xl border border-slate-700">
                    <span className="flex-1 font-mono text-xs text-slate-300 truncate pl-1">
                      {agentReferralUrl}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs flex items-center gap-1 transition-all cursor-pointer shrink-0"
                    >
                      {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedLink ? "कॉपी!" : "लिंक कॉपी"}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Share Banner */}
              <div className="bg-gradient-to-br from-indigo-700 to-slate-900 rounded-2xl p-5 text-white space-y-3 text-center shadow-lg border border-indigo-400/40">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center mx-auto">
                  <Share2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-sm text-white">१-क्लिक WhatsApp शेअर</h3>
                  <p className="text-[11px] text-indigo-200 mt-0.5">
                    ग्रुप्स व मित्रांना पाठवून प्रति ॲडमिशन ₹५.८० मिळवा
                  </p>
                </div>
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    agentShareWhatsappText
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-2.5 px-4 rounded-xl bg-white text-indigo-950 font-black text-xs shadow-md hover:bg-indigo-50 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Share2 className="w-4 h-4 text-indigo-700" />
                  <span>WhatsApp वर पाठवा</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. AGENT AUTHENTICATION SCREEN (LOGIN / REGISTER) IF NOT LOGGED IN */}
      {!currentAgent && (
        <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-6">
          <div className="text-center space-y-1.5">
            <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-700 flex items-center justify-center mx-auto shadow-sm">
              <Sparkles className="w-7 h-7" />
            </div>
            <h2 className="text-xl font-black text-slate-900">
              {authMode === "login" ? "एजंट पार्टनर लॉगिन" : "नवीन एजंट नोंदणी"}
            </h2>
            <p className="text-xs text-slate-500">
              प्रत्येक विद्यार्थी सबस्क्रिप्शनवर (₹२९) थेट <strong>२०% (₹५.८०) कमिशन</strong> मिळवा
            </p>
          </div>

          <div className="flex p-1 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold">
            <button
              type="button"
              onClick={() => setAuthMode("login")}
              className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
                authMode === "login"
                  ? "bg-white text-slate-950 font-black shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              लॉगिन करा (Login)
            </button>
            <button
              type="button"
              onClick={() => setAuthMode("register")}
              className={`flex-1 py-2 rounded-xl transition-all cursor-pointer text-center ${
                authMode === "register"
                  ? "bg-white text-slate-950 font-black shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              नवीन नोंदणी (Sign Up)
            </button>
          </div>

          {authMode === "login" ? (
            <form onSubmit={handleLoginAgent} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  मोबाईल नंबर किंवा एजंट कोड:
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. 9823456789 किंवा AGT-1001"
                  value={loginMobile}
                  onChange={(e) => setLoginMobile(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-bold text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">पासवर्ड:</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                डॅशबोर्ड उघडा (Login)
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterAgent} className="space-y-3.5">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">पूर्ण नाव:</label>
                <input
                  type="text"
                  required
                  placeholder="उदा. राहुल देशमुख"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-bold text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    मोबाईल नंबर:
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="१० अंकी नंबर"
                    value={regMobile}
                    onChange={(e) => setRegMobile(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-mono font-bold text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">पासवर्ड:</label>
                  <input
                    type="password"
                    required
                    placeholder="किमान ४ अक्षरे"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    जिल्हा / शहर:
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. पुणे, लातूर"
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 text-xs outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">
                    UPI ID (कमिशनसाठी):
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. 98234@upi"
                    value={regUpiId}
                    onChange={(e) => setRegUpiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-mono text-xs outline-none"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                मोफत एजंट खाते तयार करा (Create Account)
              </button>
            </form>
          )}

          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-600 text-center">
            🔒 सुरक्षित व पारदर्शक · २४ तासांत थेट UPI वर पेमेंट
          </div>
        </div>
      )}

      {/* 4. AGENT LOGGED IN: STATS + TABS */}
      {currentAgent && (
        <>
          {/* STATS TILES (User Requirement: "त्यांनी किती refer केले हे दिसेल आणि प्रति refer agent ला 29 च्या 20 टक्के... Minimum 100 rs काढता येईल असं कर") */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* 1. Wallet Balance */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  उपलब्ध कमिशन शिल्लक
                </span>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-black">
                  <Wallet className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-emerald-950 font-mono-numbers">
                ₹{formatInr(walletBal)}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600 pt-1 border-t border-slate-100 font-medium">
                <span>किमान विड्रॉल: <strong>₹{minWithdrawal}</strong></span>
                <span
                  className={`font-black ${
                    canWithdraw ? "text-emerald-700" : "text-amber-700"
                  }`}
                >
                  {canWithdraw ? "✓ विड्रॉल पात्र" : `अजून ₹${formatInr(remainingForWithdraw)} हवे`}
                </span>
              </div>
            </div>

            {/* 2. Total Referred Students */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  एकूण रेफरल्स (Referred)
                </span>
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-black">
                  <Users className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-slate-900 font-mono-numbers">
                {totalStudentsCount} <span className="text-sm font-normal text-slate-500">विद्यार्थी</span>
              </div>
              <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-100 font-medium">
                प्रति विद्यार्थी <strong>₹५.८०</strong> कमिशन
              </div>
            </div>

            {/* 3. Total Lifetime Earnings */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  एकूण कमावलेले (Lifetime)
                </span>
                <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-black">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-amber-950 font-mono-numbers">
                ₹{formatInr(currentAgent.totalEarnings || totalStudentsCount * 5.8)}
              </div>
              <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-100 font-medium">
                २०% थेट नफा दर
              </div>
            </div>

            {/* 4. Total Paid Out */}
            <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  खात्यात जमा झालेले
                </span>
                <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-black">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
              </div>
              <div className="text-3xl font-black text-purple-950 font-mono-numbers">
                ₹{formatInr(currentAgent.totalPaidOut || 0)}
              </div>
              <div className="text-[11px] text-slate-600 pt-1 border-t border-slate-100 font-medium">
                थेट UPI / बँक ट्रान्सफर
              </div>
            </div>
          </div>

          {/* DASHBOARD NAVIGATION TABS */}
          <div className="flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200 text-xs font-bold gap-1 flex-wrap">
            <button
              type="button"
              onClick={() => setDashboardTab("overview")}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                dashboardTab === "overview"
                  ? "bg-white text-slate-950 font-black shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span>डॅशबोर्ड ओव्हरव्ह्यू</span>
            </button>

            <button
              type="button"
              onClick={() => setDashboardTab("students")}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                dashboardTab === "students"
                  ? "bg-white text-slate-950 font-black shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-4 h-4 text-indigo-600" />
              <span>रेफर केलेले विद्यार्थी ({totalStudentsCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setDashboardTab("withdraw")}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                dashboardTab === "withdraw"
                  ? "bg-white text-slate-950 font-black shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Wallet className="w-4 h-4 text-emerald-700" />
              <span>पैसे काढा (Withdraw UPI)</span>
            </button>

            <button
              type="button"
              onClick={() => setDashboardTab("calculator")}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                dashboardTab === "calculator"
                  ? "bg-white text-slate-950 font-black shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Calculator className="w-4 h-4 text-amber-600" />
              <span>कमाई कॅल्क्युलेटर</span>
            </button>

            <button
              type="button"
              onClick={() => setDashboardTab("marketing")}
              className={`flex-1 min-w-[120px] py-2.5 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                dashboardTab === "marketing"
                  ? "bg-white text-slate-950 font-black shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Share2 className="w-4 h-4 text-purple-600" />
              <span>प्रमोशन मेसेजेस</span>
            </button>
          </div>

          {/* TAB 1: OVERVIEW & FAST ACTIONS */}
          {dashboardTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* How it Works */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-indigo-600" />
                  <span>एजंट कमिशन पद्धत व नियम</span>
                </h3>

                <div className="space-y-3 text-xs text-slate-700">
                  <div className="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-200 space-y-1">
                    <div className="font-black text-indigo-950 flex items-center gap-1.5">
                      <Zap className="w-4 h-4 text-indigo-600" />
                      <span>₹२९ च्या प्रत्येक सबस्क्रिप्शनवर २०% (₹५.८०) कमिशन</span>
                    </div>
                    <p className="text-indigo-900 leading-relaxed">
                      तुमच्या लिंकने किंवा कोडने कोणत्याही विद्यार्थ्याने ₹२९ भरून नोंदणी केल्यास ₹५.८० थेट तुमच्या एजंट वॉलेटमध्ये जमा होतात.
                    </p>
                  </div>

                  <div className="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-1">
                    <div className="font-black text-emerald-950 flex items-center gap-1.5">
                      <Wallet className="w-4 h-4 text-emerald-600" />
                      <span>किमान विड्रॉल मर्यादा: ₹१०० (Minimum ₹100 Withdrawal)</span>
                    </div>
                    <p className="text-emerald-900 leading-relaxed">
                      वॉलेट शिल्लक किमान ₹१०० झाल्यावर तुम्ही थेट PhonePe, GPay, Paytm UPI किंवा बँक खात्यावर रक्कम काढू शकता.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 space-y-1">
                    <div className="font-black text-slate-900 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-slate-600" />
                      <span>२४ तासांत पेआउट हमी</span>
                    </div>
                    <p className="text-slate-600 leading-relaxed">
                      विड्रॉल विनंती सबमिट केल्यावर २४ तासांच्या आत ॲडमिन कडून रक्कम ट्रान्सफर केली जाते व UTR नंबर डॅशबोर्डवर दिसतो.
                    </p>
                  </div>
                </div>
              </div>

              {/* Quick Commission Milestones */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-600" />
                    <span>कमिशन अंदाजपत्रक (Target Earnings)</span>
                  </h3>
                  <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    २०% दर
                  </span>
                </div>

                <div className="space-y-2.5">
                  {[
                    { count: 18, label: "१८ विद्यार्थी (किमान विड्रॉल)", earn: "₹१०४.४०", note: "✓ लगेच UPI विड्रॉल" },
                    { count: 50, label: "५० विद्यार्थी", earn: "₹२९०.००", note: "✓ खात्यात जमा" },
                    { count: 100, label: "१०० विद्यार्थी", earn: "₹५८०.००", note: "✓ खात्यात जमा" },
                    { count: 500, label: "५०० विद्यार्थी", earn: "₹२,९००.००", note: "🌟 टॉप परफॉर्मर" },
                    { count: 1000, label: "१००० विद्यार्थी", earn: "₹५,८००.००", note: "🏆 मुख्य एजंट" },
                  ].map((tier, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                    >
                      <div>
                        <div className="font-bold text-slate-900">{tier.label}</div>
                        <div className="text-[10px] text-slate-500">{tier.note}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-emerald-700 font-mono-numbers text-sm">
                          {tier.earn}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: REFERRED STUDENTS LIST ("त्यांनी किती refer केले हे दिसेल") */}
          {dashboardTab === "students" && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-indigo-600" />
                    <span>रेफर केलेले विद्यार्थी (Referred Students List)</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    खालील विद्यार्थ्यांनी तुमच्या एजंट कोडने नोंदणी केली असून प्रत्येकाचे ₹५.८० जमा झाले आहेत.
                  </p>
                </div>

                <div className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-900 font-black text-xs font-mono-numbers">
                  एकूण: {referredList.length} विद्यार्थी
                </div>
              </div>

              {referredList.length === 0 ? (
                <div className="p-8 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">
                    अजून कोणीही विद्यार्थी जोडलेला नाही.
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mx-auto">
                    तुमचा एजंट कोड <strong>{currentAgent.agentCode}</strong> आणि थेट लिंक व्हॉट्सॲपवर शेअर करा आणि कमिशन मिळवणे सुरू करा.
                  </p>
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs inline-flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Copy className="w-4 h-4" />
                    <span>लिंक कॉपी करून शेअर करा</span>
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-slate-200 text-slate-500 font-bold bg-slate-50/70">
                        <th className="py-2.5 px-3 rounded-l-xl">विद्यार्थ्याचे नाव</th>
                        <th className="py-2.5 px-3">मोबाईल</th>
                        <th className="py-2.5 px-3">लक्ष्य परीक्षा</th>
                        <th className="py-2.5 px-3">नोंदणी तारीख</th>
                        <th className="py-2.5 px-3">स्थिती</th>
                        <th className="py-2.5 px-3 text-right rounded-r-xl">कमिशन (२०%)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
                      {referredList.map((rec, idx) => (
                        <tr key={rec.id || idx} className="hover:bg-slate-50/80 transition-colors">
                          <td className="py-3 px-3 font-bold text-slate-900">
                            {rec.referredStudentName || "विद्यार्थी"}
                          </td>
                          <td className="py-3 px-3 font-mono text-slate-500">
                            {maskPhoneNumber(rec.referredStudentMobile)}
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-800 font-bold text-[10px]">
                              {rec.referredStudentExam || "MHT_CET"}
                            </span>
                          </td>
                          <td className="py-3 px-3 text-slate-500 font-mono-numbers">
                            {new Date(rec.timestamp).toLocaleDateString("mr-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </td>
                          <td className="py-3 px-3">
                            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1 w-fit">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              सक्रिय
                            </span>
                          </td>
                          <td className="py-3 px-3 text-right font-black text-emerald-700 font-mono-numbers">
                            +₹{formatInr(rec.commissionEarned || 5.8)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: WITHDRAWAL (MINIMUM ₹100) */}
          {dashboardTab === "withdraw" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Form Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-emerald-600" />
                    <span>UPI / बँक विड्रॉल विनंती</span>
                  </h3>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-300">
                    किमान मर्यादा: ₹{minWithdrawal}
                  </span>
                </div>

                {!canWithdraw && (
                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-3">
                    <div className="flex items-start gap-2.5 text-amber-950 text-xs">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-bold">
                          सध्या तुमचे वॉलेट शिल्लक ₹{formatInr(walletBal)} आहे.
                        </p>
                        <p className="text-amber-800 leading-relaxed">
                          पैसे खात्यावर ट्रान्सफर करण्यासाठी <strong>किमान ₹{minWithdrawal}</strong> शिल्लक असणे आवश्यक आहे. (अजून <strong>₹{formatInr(remainingForWithdraw)}</strong> किंवा <strong>{referralsNeeded}</strong> विद्यार्थी आवश्यक).
                        </p>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-bold text-amber-900 font-mono-numbers">
                        <span>सध्या: ₹{formatInr(walletBal)}</span>
                        <span>लक्ष्य: ₹{minWithdrawal}</span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-amber-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-500"
                          style={{
                            width: `${Math.min(100, (walletBal / minWithdrawal) * 100)}%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                {payoutSuccessMessage && (
                  <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-xs text-emerald-950 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span>{payoutSuccessMessage}</span>
                  </div>
                )}

                {payoutErrorMessage && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{payoutErrorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleRequestPayout} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-black text-slate-700 block mb-1">
                      काढायची रक्कम (रुपये):
                    </label>
                    <div className="relative">
                      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 font-bold text-slate-400">
                        ₹
                      </span>
                      <input
                        type="number"
                        min={minWithdrawal}
                        max={walletBal}
                        required
                        placeholder={`किमान ${minWithdrawal}`}
                        value={payoutAmount}
                        onChange={(e) => setPayoutAmount(e.target.value)}
                        className="w-full pl-8 pr-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-mono font-bold text-xs outline-none"
                      />
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                      <span>उपलब्ध: ₹{formatInr(walletBal)}</span>
                      {walletBal >= minWithdrawal && (
                        <button
                          type="button"
                          onClick={() => setPayoutAmount(String(Math.floor(walletBal)))}
                          className="text-indigo-600 font-bold hover:underline cursor-pointer"
                        >
                          सर्व रक्कम (₹{Math.floor(walletBal)}) भरा
                        </button>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-700 block mb-1">
                      तुमचा UPI ID (PhonePe / GPay / Paytm):
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. 9823456789@upi किंवा user@okaxis"
                      value={payoutUpi}
                      onChange={(e) => setPayoutUpi(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-mono font-bold text-xs outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!canWithdraw || isSubmittingPayout}
                    className={`w-full py-3 rounded-2xl text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      canWithdraw
                        ? "bg-slate-900 hover:bg-slate-800 text-white"
                        : "bg-slate-200 text-slate-400 cursor-not-allowed"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>
                      {isSubmittingPayout
                        ? "विनंती पाठवत आहे..."
                        : `₹${payoutAmount || minWithdrawal} विड्रॉल विनंती सबमिट करा`}
                    </span>
                  </button>
                </form>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-[11px] text-slate-500 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    विड्रॉल विनंती केल्यानंतर २४ तासांत रक्कम थेट बँक खात्यात ट्रान्सफर केली जाते.
                  </span>
                </div>
              </div>

              {/* History Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <span>विड्रॉल विनंती इतिहास (Payout Requests)</span>
                </h3>

                {myPayouts.length === 0 ? (
                  <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-center text-xs text-slate-500">
                    कोणतीही विड्रॉल विनंती केलेली नाही.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {myPayouts.map((p) => (
                      <div
                        key={p.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between text-xs"
                      >
                        <div>
                          <div className="font-black text-slate-900 font-mono-numbers">
                            ₹{formatInr(p.amount)}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                            UPI: {p.upiId}
                          </div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            {new Date(p.requestedAt).toLocaleString("mr-IN", {
                              day: "numeric",
                              month: "short",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </div>
                        </div>

                        <div className="text-right">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                              p.status === "approved" || p.status === "transferred"
                                ? "bg-emerald-100 text-emerald-800"
                                : p.status === "pending"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {p.status === "approved" || p.status === "transferred"
                              ? "✓ खात्यात जमा (Paid)"
                              : p.status === "pending"
                              ? "⏳ प्रलंबित (Pending)"
                              : "नाकारले (Rejected)"}
                          </span>
                          {p.adminUtr && (
                            <div className="text-[10px] font-mono text-emerald-700 mt-1">
                              UTR: {p.adminUtr}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 4: COMMISSION CALCULATOR */}
          {dashboardTab === "calculator" && (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6 max-w-2xl mx-auto">
              <div className="text-center space-y-1">
                <h3 className="text-lg font-black text-slate-900 flex items-center justify-center gap-2">
                  <Calculator className="w-5 h-5 text-indigo-600" />
                  <span>एजंट कमिशन कॅल्क्युलेटर</span>
                </h3>
                <p className="text-xs text-slate-500">
                  तुम्ही किती विद्यार्थी रेफर करू शकता त्यानुसार तुमचा संभाव्य नफा तपासा
                </p>
              </div>

              <div className="space-y-3 bg-slate-50 p-5 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                  <span>रेफर करायचे विद्यार्थी:</span>
                  <span className="text-lg font-black text-indigo-700 font-mono-numbers">
                    {calcStudents} विद्यार्थी
                  </span>
                </div>

                <input
                  type="range"
                  min={1}
                  max={1000}
                  step={1}
                  value={calcStudents}
                  onChange={(e) => setCalcStudents(Number(e.target.value))}
                  className="w-full accent-indigo-600 cursor-pointer"
                />

                <div className="flex justify-between text-[11px] text-slate-400 font-mono-numbers">
                  <span>१ विद्यार्थी</span>
                  <span>२५०</span>
                  <span>५००</span>
                  <span>१००० विद्यार्थी</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 rounded-2xl bg-indigo-50 border border-indigo-200">
                  <div className="text-xs text-indigo-900 font-semibold">कमिशन दर</div>
                  <div className="text-2xl font-black text-indigo-950 mt-1">२०%</div>
                  <div className="text-[10px] text-indigo-700 mt-0.5">₹५.८० / विद्यार्थी</div>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
                  <div className="text-xs text-emerald-900 font-semibold">एकूण संभाव्य कमाई</div>
                  <div className="text-2xl font-black text-emerald-950 mt-1 font-mono-numbers">
                    ₹{formatInr(calcStudents * 5.8)}
                  </div>
                  <div className="text-[10px] text-emerald-700 mt-0.5">थेट तुमच्या बँक खात्यात</div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: MARKETING & PROMOTION SCRIPT */}
          {dashboardTab === "marketing" && (
            <div className="space-y-4">
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-black text-slate-900">
                    व्हॉट्सॲप प्रमोशन मेसेज (WhatsApp Copy Script)
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(agentShareWhatsappText);
                      alert("प्रमोशन मेसेज कॉपी झाला आहे!");
                    }}
                    className="px-3 py-1 rounded-xl bg-slate-900 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>मेसेज कॉपी करा</span>
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                  {agentShareWhatsappText}
                </div>
              </div>
            </div>
          )}
        </>
      )}

      {/* QR CODE MODAL */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 text-center">
            <h3 className="font-black text-slate-900 text-base">
              तुमचा अधिकृत एजंट QR कोड
            </h3>
            <p className="text-xs text-slate-500">
              विद्यार्थ्यांना हा QR कोड स्कॅन करायला सांगा आणि थेट तुमच्या एजंट कोडने सुरू करा.
            </p>

            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 inline-block">
              <img
                src={qrImageUrl}
                alt="Agent QR Code"
                className="w-48 h-48 mx-auto"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-2.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-mono font-bold text-indigo-950">
              कोड: {currentAgent?.agentCode}
            </div>

            <button
              type="button"
              onClick={() => setShowQrModal(false)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs cursor-pointer"
            >
              बंद करा (Close)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
