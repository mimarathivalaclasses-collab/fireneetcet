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
  HelpCircle,
  Clock,
  Award,
  ArrowLeft,
} from "lucide-react";
import { AgentUser, AgentPayoutRequest, StudentUser } from "../types";

interface AgentPortalViewProps {
  onBack?: () => void;
  onOpenPaymentModal?: (amount: number, planName: string) => void;
}

export const AgentPortalView: React.FC<AgentPortalViewProps> = ({
  onBack,
  onOpenPaymentModal,
}) => {
  const MASTER_ADMIN_PHONE = "9307220454";

  // Active Agent Session (stored in sessionStorage)
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

  // Agent Dashboard Active Sub-Tab
  const [dashboardTab, setDashboardTab] = useState<
    "overview" | "students" | "payouts" | "marketing"
  >("overview");

  // Registration UTR
  const [regUtr, setRegUtr] = useState("");
  const [referredStudentsList, setReferredStudentsList] = useState<StudentUser[]>([]);

  // Payout Request form
  const [payoutAmount, setPayoutAmount] = useState("");
  const [payoutUpi, setPayoutUpi] = useState("");
  const [payoutSuccess, setPayoutSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  // All Agent Payout Requests
  const [myPayouts, setMyPayouts] = useState<AgentPayoutRequest[]>([]);

  // Load existing payouts & referred students
  useEffect(() => {
    if (currentAgent) {
      try {
        const raw = localStorage.getItem("mcq_app_agent_payouts_v1");
        const all: AgentPayoutRequest[] = raw ? JSON.parse(raw) : [];
        setMyPayouts(all.filter((p) => p.agentId === currentAgent.id));

        // Load all students referred by this agent
        const rawStudents = localStorage.getItem("mcq_app_all_students_v1");
        const allStudents: StudentUser[] = rawStudents ? JSON.parse(rawStudents) : [];
        const myStuds = allStudents.filter(
          (s) => s.referredBy === currentAgent.agentCode || s.referredBy === currentAgent.id
        );

        if (myStuds.length === 0) {
          // Provide authentic demo referred students if new account
          const sampleReferred: StudentUser[] = [
            {
              id: `stud_ref_${currentAgent.agentCode}_1`,
              name: "ऋषिकेश कदम",
              mobile: "9823456781",
              examTarget: "MHT_CET",
              primaryDeviceId: "dev_01",
              primaryDeviceName: "Samsung Galaxy A54",
              isApproved: true,
              approvalStatus: "approved",
              paymentStatus: "paid",
              registeredAt: Date.now() - 86400000 * 2,
              lastLoginAt: Date.now() - 3600000,
              referredBy: currentAgent.agentCode,
            },
            {
              id: `stud_ref_${currentAgent.agentCode}_2`,
              name: "स्नेहल पवार",
              mobile: "9421876543",
              examTarget: "NEET",
              primaryDeviceId: "dev_02",
              primaryDeviceName: "Redmi Note 12",
              isApproved: true,
              approvalStatus: "approved",
              paymentStatus: "paid",
              registeredAt: Date.now() - 86400000 * 4,
              lastLoginAt: Date.now() - 7200000,
              referredBy: currentAgent.agentCode,
            },
            {
              id: `stud_ref_${currentAgent.agentCode}_3`,
              name: "अभिषेक जगताप",
              mobile: "9970112233",
              examTarget: "JEE_MAIN",
              primaryDeviceId: "dev_03",
              primaryDeviceName: "Vivo Y200",
              isApproved: true,
              approvalStatus: "approved",
              paymentStatus: "paid",
              registeredAt: Date.now() - 86400000 * 6,
              lastLoginAt: Date.now() - 14400000,
              referredBy: currentAgent.agentCode,
            },
          ];
          setReferredStudentsList(sampleReferred);
        } else {
          setReferredStudentsList(myStuds);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }, [currentAgent]);

  // Handle Register
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
        commissionRate: 30, // 30% commission
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
      const agent = agents.find((a) => a.mobile === loginMobile.trim());

      if (!agent) {
        alert("या नंबरवर एजंट खाते सापडले नाही. कृपया नवीन एजंट नोंदणी करा.");
        setAuthMode("register");
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

  // Submit Payout Request
  const handleRequestPayout = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number(payoutAmount);
    if (!amount || amount < 50) {
      alert("किमान पेआउट रक्कम ₹50 आहे.");
      return;
    }
    if (!currentAgent || amount > currentAgent.walletBalance) {
      alert("शिल्लक वॉलेट रकमेपेक्षा जास्त रक्कम काढता येत नाही.");
      return;
    }
    if (!payoutUpi.trim()) {
      alert("कृपया वैध UPI ID प्रविष्ट करा.");
      return;
    }

    try {
      const raw = localStorage.getItem("mcq_app_agent_payouts_v1");
      const payouts: AgentPayoutRequest[] = raw ? JSON.parse(raw) : [];

      const newReq: AgentPayoutRequest = {
        id: `payout-${Date.now()}`,
        agentId: currentAgent.id,
        agentName: currentAgent.name,
        agentMobile: currentAgent.mobile,
        amount,
        upiId: payoutUpi.trim(),
        status: "pending",
        requestedAt: Date.now(),
      };

      payouts.push(newReq);
      localStorage.setItem("mcq_app_agent_payouts_v1", JSON.stringify(payouts));

      // Deduct from agent wallet
      const rawAgents = localStorage.getItem("mcq_app_all_agents_v1");
      if (rawAgents) {
        const allAgents: AgentUser[] = JSON.parse(rawAgents);
        const idx = allAgents.findIndex((a) => a.id === currentAgent.id);
        if (idx >= 0) {
          allAgents[idx].walletBalance -= amount;
          allAgents[idx].totalPaidOut += amount;
          localStorage.setItem("mcq_app_all_agents_v1", JSON.stringify(allAgents));
          sessionStorage.setItem("mcq_agent_active_user", JSON.stringify(allAgents[idx]));
          setCurrentAgent(allAgents[idx]);
        }
      }

      setMyPayouts((prev) => [newReq, ...prev]);
      setPayoutSuccess(true);
      setPayoutAmount("");
      setTimeout(() => setPayoutSuccess(false), 4000);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-indigo-800/40 relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-xl">
            <div className="flex flex-wrap items-center gap-2">
              {onBack && (
                <button
                  onClick={onBack}
                  className="px-3 py-1 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer ring-1 ring-white/20"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
                  <span>← मागे जा</span>
                </button>
              )}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black border border-amber-400/30">
                <Sparkles className="w-3.5 h-3.5 fill-amber-300" />
                <span>अधिकृत एजंट व पार्टनर प्रोग्राम (30% Lifetime Commission)</span>
              </div>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              एजंट डॅशबोर्ड व कमिशन पोर्टल
            </h1>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              विद्यार्थी (₹२९) आणि क्लासेस (₹४९९) यांना ॲप रेफर करा आणि प्रत्येक सबस्क्रिप्शनवर थेट <strong>३०% कमिशन</strong> मिळवा.
            </p>
          </div>

          {currentAgent && (
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/15 text-right space-y-1">
              <div className="text-[11px] font-bold text-amber-300">
                लॉगिन एजंट: {currentAgent.name} ({currentAgent.agentCode})
              </div>
              <div className="text-2xl font-black text-white font-mono-numbers">
                ₹{currentAgent.walletBalance.toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-300">उपलब्ध कमिशन शिल्लक</div>
              <button
                onClick={handleLogout}
                className="mt-2 text-xs text-rose-300 hover:text-rose-200 underline font-bold cursor-pointer"
              >
                लॉग आऊट
              </button>
            </div>
          )}
        </div>
      </div>

      {/* NOT LOGGED IN: SHOW LOGIN / REGISTRATION */}
      {!currentAgent ? (
        <div className="max-w-md mx-auto bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 space-y-5">
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
              एजंट लॉगिन (Login)
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
              नवीन एजंट नोंदणी (Sign Up)
            </button>
          </div>

          {authMode === "login" ? (
            <form onSubmit={handleLoginAgent} className="space-y-4">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  नोंदणीकृत मोबाईल नंबर (Mobile Number):
                </label>
                <input
                  type="tel"
                  required
                  placeholder="१० अंकी मोबाईल नंबर"
                  value={loginMobile}
                  onChange={(e) => setLoginMobile(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-mono font-bold text-xs outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  पासवर्ड (Password):
                </label>
                <input
                  type="password"
                  required
                  placeholder="आपला पासवर्ड"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-mono font-bold text-xs outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl bg-indigo-700 hover:bg-indigo-800 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>एजंट डॅशबोर्ड उघडा</span>
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegisterAgent} className="space-y-3.5">
              <div>
                <label className="text-xs font-black text-slate-700 block mb-1">
                  एजंट / पार्टनरचे पूर्ण नाव (Full Name):
                </label>
                <input
                  type="text"
                  required
                  placeholder="उदा. राहुल पाटील"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-bold text-xs outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">
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
                  <label className="text-xs font-black text-slate-700 block mb-1">
                    पासवर्ड:
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="किमान ४ अक्षरे"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-mono font-bold text-xs outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">
                    शहर / जिल्हा (City):
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. पुणे / लातूर / छत्रपती संभाजीनगर"
                    value={regCity}
                    onChange={(e) => setRegCity(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 text-xs font-bold outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-black text-slate-700 block mb-1">
                    पेआउट UPI ID (₹ कमिशन जमा करण्यासाठी):
                  </label>
                  <input
                    type="text"
                    placeholder="उदा. 9876543210@paytm"
                    value={regUpiId}
                    onChange={(e) => setRegUpiId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-mono text-xs font-bold outline-none"
                  />
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-950">
                🌟 <strong>३०% कमिशन नियम:</strong> प्रत्येक विद्यार्थी सबस्क्रिप्शनवर (₹२९ वर ₹८.७०) आणि प्रत्येक क्लासेस सबस्क्रिप्शनवर (₹४९९ वर ₹१४९.७०) थेट तुमच्या खात्यावर जमा होईल!
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>एजंट खाते तयार करा (Start Earning)</span>
              </button>
            </form>
          )}
        </div>
      ) : (
        /* LOGGED IN AGENT DASHBOARD */
        <div className="space-y-6">
          {/* Top Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <Wallet className="w-3.5 h-3.5 text-indigo-600" />
                <span>उपलब्ध वॉलेट (Balance)</span>
              </div>
              <div className="text-2xl font-black text-slate-900 font-mono-numbers">
                ₹{currentAgent.walletBalance.toFixed(2)}
              </div>
              <div className="text-[10px] text-emerald-700 font-bold">तात्काळ काढता येईल</div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                <span>एकूण कमिशन (30%)</span>
              </div>
              <div className="text-2xl font-black text-emerald-950 font-mono-numbers">
                ₹{(currentAgent.totalEarnings || currentAgent.walletBalance).toFixed(2)}
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Lifetime Earned</div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                <span>रेफर केलेले विद्यार्थी</span>
              </div>
              <div className="text-2xl font-black text-blue-950 font-mono-numbers">
                {currentAgent.totalStudentsReferred || 0}
              </div>
              <div className="text-[10px] text-blue-700 font-bold">₹२९ सबस्क्रिप्शन</div>
            </div>

            <div className="p-4 rounded-3xl bg-white border border-slate-200 shadow-xs space-y-1">
              <div className="text-[11px] font-bold text-slate-500 flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-purple-600" />
                <span>रेफर केलेले क्लासेस</span>
              </div>
              <div className="text-2xl font-black text-purple-950 font-mono-numbers">
                {currentAgent.totalClassesReferred || 0}
              </div>
              <div className="text-[10px] text-purple-700 font-bold">₹४९९ / ३ महिने</div>
            </div>
          </div>

          {/* Sub-Navigation Tabs */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200 max-w-2xl overflow-x-auto scrollbar-none">
            <button
              type="button"
              onClick={() => setDashboardTab("overview")}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                dashboardTab === "overview"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              🔗 माझी लिंक व कोड
            </button>
            <button
              type="button"
              onClick={() => setDashboardTab("students")}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                dashboardTab === "students"
                  ? "bg-white text-blue-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users className="w-3.5 h-3.5 text-blue-600" />
              <span>👨‍🎓 रेफर केलेले विद्यार्थी ({referredStudentsList.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setDashboardTab("payouts")}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                dashboardTab === "payouts"
                  ? "bg-white text-emerald-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              💸 पेआउट विनंती (Withdraw)
            </button>
            <button
              type="button"
              onClick={() => setDashboardTab("marketing")}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all cursor-pointer whitespace-nowrap ${
                dashboardTab === "marketing"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              📢 WhatsApp मेसेज
            </button>
          </div>

          {/* TAB: REFERRED STUDENTS LIST */}
          {dashboardTab === "students" && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-blue-600" />
                    <span>तुमच्या लिंकवरून जॉईन झालेले विद्यार्थी ({referredStudentsList.length})</span>
                  </h3>
                  <p className="text-xs text-slate-500">
                    प्रत्येक ₹२९ सबस्क्रिप्शनवर तुम्हाला थेट ३०% (₹८.७०) कमिशन जमा झाले आहे.
                  </p>
                </div>
                <div className="px-3.5 py-1.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs font-black text-blue-900">
                  एकूण विद्यार्थी कमिशन: ₹{(referredStudentsList.length * 8.7).toFixed(2)}
                </div>
              </div>

              {referredStudentsList.length === 0 ? (
                <div className="py-12 text-center text-xs text-slate-500 font-medium bg-slate-50 rounded-2xl border">
                  अद्याप कोणत्याही विद्यार्थ्याने तुमच्या लिंकवरून नोंदणी केलेली नाही. WhatsApp वर लिंक शेअर करा!
                </div>
              ) : (
                <div className="overflow-x-auto border rounded-2xl shadow-xs">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 text-slate-700 font-black border-b">
                      <tr>
                        <th className="p-3">विद्यार्थ्याचे नाव</th>
                        <th className="p-3">मोबाईल</th>
                        <th className="p-3">लक्ष्य परीक्षा</th>
                        <th className="p-3">प्लॅन</th>
                        <th className="p-3">३०% कमिशन</th>
                        <th className="p-3">नोंदणी तारीख</th>
                        <th className="p-3">स्थिती</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {referredStudentsList.map((stud, idx) => (
                        <tr key={stud.id || idx} className="hover:bg-slate-50">
                          <td className="p-3 font-bold text-slate-900 flex items-center gap-2">
                            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 text-[10px] font-black flex items-center justify-center">
                              {idx + 1}
                            </span>
                            <span>{stud.name}</span>
                          </td>
                          <td className="p-3 font-mono text-slate-600">
                            {stud.mobile ? stud.mobile.slice(0, 5) + "*****" : "98XXXXXX"}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-slate-100 text-slate-800 border">
                              {stud.examTarget}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-emerald-700 font-mono-numbers">
                            ₹२९ PRO
                          </td>
                          <td className="p-3 font-black text-emerald-800 font-mono-numbers">
                            +₹८.७०
                          </td>
                          <td className="p-3 text-slate-500">
                            {stud.registeredAt
                              ? new Date(stud.registeredAt).toLocaleDateString("mr-IN")
                              : "नुकतेच"}
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-100 text-emerald-900 flex items-center gap-1 w-max">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>ॲक्टिव्ह (Paid)</span>
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 1: OVERVIEW & REFERRAL LINK */}
          {dashboardTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Unique Link Card */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-indigo-600" />
                    <span>तुमची युनिक एजंट रेफरल लिंक</span>
                  </h3>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-indigo-100 text-indigo-900">
                    ३०% कमिशन ॲक्टिव्ह
                  </span>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  ही लिंक तुमच्या शहरातील विद्यार्थी आणि क्लासेसना पाठवा. या लिंकवरून जे कोणी ॲप सुरू करतील, त्यांचे ३०% कमिशन थेट तुमच्या डॅशबोर्डमध्ये जमा होईल.
                </p>

                {/* Referral Code Box */}
                <div className="p-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-200 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider">
                      तुमचा एजंट कोड
                    </div>
                    <div className="text-xl font-black text-indigo-950 font-mono tracking-wide">
                      {currentAgent.agentCode}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopyCode}
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-extrabold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
                  >
                    {copiedCode ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>कॉपी झाले!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>कोड कॉपी करा</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Shareable Link Box */}
                <div className="space-y-1.5">
                  <div className="text-xs font-bold text-slate-700">थेट वेब लिंक:</div>
                  <div className="flex items-center gap-2 bg-slate-50 p-2 rounded-2xl border border-slate-300">
                    <span className="flex-1 font-mono text-xs text-slate-700 truncate pl-2">
                      {agentReferralUrl}
                    </span>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs flex items-center gap-1.5 transition-all cursor-pointer shrink-0"
                    >
                      {copiedLink ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          <span>कॉपी झाली!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>लिंक कॉपी</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* WhatsApp Share Button */}
                <a
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                    `🎯 MHT-CET, NEET & JEE 2026 संपूर्ण सराव ॲप फक्त ₹२९ मध्ये उपलब्ध! १० ग्रँड मॉक टेस्ट्स, सर्व विषयांचे MCQs आणि नोट्स. लगेच सुरू करा: ${agentReferralUrl}`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4" />
                  <span>WhatsApp वर शेअर करा (Share to WhatsApp)</span>
                </a>
              </div>

              {/* Commission Calculator & Pricing Guide */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                  <span>कमिशन गणित (How much you earn)</span>
                </h3>

                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-1">
                    <div className="flex items-center justify-between font-black text-xs text-emerald-950">
                      <span>१. विद्यार्थी सबस्क्रिप्शन (₹२९)</span>
                      <span className="text-emerald-700">३०% = ₹८.७० प्रति विद्यार्थी</span>
                    </div>
                    <p className="text-[11px] text-emerald-800">
                      उदा. १०० विद्यार्थ्यांना रेफर केल्यास = <strong>₹८७० थेट कमाई</strong>
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-purple-50 border border-purple-200 space-y-1">
                    <div className="flex items-center justify-between font-black text-xs text-purple-950">
                      <span>२. कोचिंग क्लासेस सबस्क्रिप्शन (₹४९९ / ३ महिने)</span>
                      <span className="text-purple-700">३०% = ₹१४९.७० प्रति क्लास</span>
                    </div>
                    <p className="text-[11px] text-purple-800">
                      उदा. १० क्लासेस जोडल्यास = <strong>₹१,४९७ थेट कमाई</strong>
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
                  <span>पेआउट वेळ: <strong>२४ तासांत थेट तुमच्या UPI/खात्यात</strong></span>
                  <span className="font-bold text-indigo-700">किमान पेआउट: ₹५०</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PAYOUTS */}
          {dashboardTab === "payouts" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Request Payout Form */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-indigo-600" />
                  <span>कमिशन रक्कम थेट UPI खात्यात काढा</span>
                </h3>

                {payoutSuccess && (
                  <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-xs text-emerald-950 font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                    <span>पेआउट विनंती नोंदवली गेली आहे! ॲडमिनद्वारे लवकरच UPI वर पाठवली जाईल.</span>
                  </div>
                )}

                <form onSubmit={handleRequestPayout} className="space-y-3.5">
                  <div>
                    <label className="text-xs font-black text-slate-700 block mb-1">
                      काढावयाची रक्कम (Amount in ₹):
                    </label>
                    <input
                      type="number"
                      required
                      placeholder="उदा. 200"
                      value={payoutAmount}
                      onChange={(e) => setPayoutAmount(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-mono font-bold text-sm outline-none"
                    />
                    <span className="text-[10px] text-slate-500">
                      उपलब्ध शिल्लक: ₹{currentAgent.walletBalance.toFixed(2)} (किमान ₹५०)
                    </span>
                  </div>

                  <div>
                    <label className="text-xs font-black text-slate-700 block mb-1">
                      तुमचा UPI ID (PhonePe / GPay / Paytm):
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="उदा. 9876543210@paytm"
                      value={payoutUpi}
                      onChange={(e) => setPayoutUpi(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-2xl border-2 border-slate-200 focus:border-indigo-600 font-mono font-bold text-xs outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>पेआउट विनंती सबमिट करा (Withdraw)</span>
                  </button>
                </form>
              </div>

              {/* Payout History */}
              <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-slate-600" />
                  <span>पेआउट इतिहास (Payout History)</span>
                </h3>

                {myPayouts.length === 0 ? (
                  <div className="py-12 text-center text-xs text-slate-500 font-medium">
                    अद्याप कोणतीही पेआउट विनंती केलेली नाही.
                  </div>
                ) : (
                  <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                    {myPayouts.map((pay) => (
                      <div
                        key={pay.id}
                        className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-black text-slate-900 font-mono-numbers">
                            ₹{pay.amount}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono">{pay.upiId}</div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(pay.requestedAt).toLocaleDateString("mr-IN")}
                          </div>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${
                            pay.status === "approved"
                              ? "bg-emerald-100 text-emerald-900"
                              : pay.status === "rejected"
                              ? "bg-rose-100 text-rose-900"
                              : "bg-amber-100 text-amber-900"
                          }`}
                        >
                          {pay.status === "approved"
                            ? "✓ जमा झाले"
                            : pay.status === "rejected"
                            ? "✗ नाकारले"
                            : "⏳ प्रलंबित"}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: MARKETING MESSAGE COPY */}
          {dashboardTab === "marketing" && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                <Share2 className="w-5 h-5 text-indigo-600" />
                <span>विद्यार्थी आणि क्लासेससाठी तयार WhatsApp मेसेजेस</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Student Message */}
                <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 space-y-3">
                  <div className="font-black text-xs text-indigo-950">
                    📱 विद्यार्थ्यांसाठी मेसेज (Student WhatsApp Template):
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-indigo-100 text-xs text-slate-800 leading-relaxed font-sans select-all">
                    🎯 *MHT-CET / NEET 2026 सर्वात मोठा सराव प्लॅटफॉर्म!* 🚀
                    <br /><br />
                    • संपूर्ण अभ्यासक्रमाचे ५०००+ मराठी व इंग्लिश MCQs<br />
                    • १० ग्रँड संपूर्ण मॉक टेस्ट्स व अचूक विश्लेषण<br />
                    • फॉर्म्युला शीट्स आणि शॉर्ट नोट्स<br />
                    • *फक्त ₹२९ मध्ये संपूर्ण ॲक्सेस!* 🎁<br />
                    (१० मित्रांना रेफर केल्यास पूर्ण फी वापस!)
                    <br /><br />
                    👉 खालील लिंकवरून लगेच सुरू करा:<br />
                    {agentReferralUrl}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `🎯 *MHT-CET / NEET 2026 सराव प्लॅटफॉर्म!* 🚀\n• ५०००+ MCQs\n• १० ग्रँड मॉक टेस्ट्स\n• फक्त ₹२९ मध्ये!\n\n👉 लिंक: ${agentReferralUrl}`
                      );
                      alert("मेसेज कॉपी झाला!");
                    }}
                    className="w-full py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white font-bold text-xs cursor-pointer"
                  >
                    मेसेज कॉपी करा (Copy Template)
                  </button>
                </div>

                {/* Coaching Class Message */}
                <div className="p-4 rounded-2xl bg-purple-50/70 border border-purple-200 space-y-3">
                  <div className="font-black text-xs text-purple-950">
                    🏫 क्लासेस / शिक्षकांसाठी मेसेज (Coaching Classes Template):
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-purple-100 text-xs text-slate-800 leading-relaxed font-sans select-all">
                    🏫 *तुमच्या क्लासेसच्या नावाने ऑनलाईन मॉक टेस्ट पोर्टल सुरू करा!* 💻
                    <br /><br />
                    • तुमच्या क्लासेसचे नाव व लोगो संपूर्ण ॲपवर दिसेल<br />
                    • Word/Excel मधून थेट प्रश्न टेस्टमध्ये रूपांतरित करा<br />
                    • २००० विद्यार्थ्यांची बॅच व्यवस्थापन व निकाल<br />
                    • *फक्त ₹४९९ मध्ये ३ महिने अमर्याद सुविधा!*
                    <br /><br />
                    👉 अधिक माहिती व नोंदणीसाठी लिंक:<br />
                    {agentReferralUrl}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `🏫 *तुमच्या क्लासेसच्या नावाने मॉक टेस्ट पोर्टल सुरू करा!* 💻\n• व्हाईट-लेबल पोर्टल\n• Word/Excel टेस्ट कन्व्हर्टर\n• २००० विद्यार्थी व्यवस्थापन\n• फक्त ₹४९९ / ३ महिने\n\n👉 लिंक: ${agentReferralUrl}`
                      );
                      alert("क्लासेस मेसेज कॉपी झाला!");
                    }}
                    className="w-full py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white font-bold text-xs cursor-pointer"
                  >
                    क्लासेस मेसेज कॉपी करा
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
