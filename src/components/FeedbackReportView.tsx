import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  CheckCircle2,
  Send,
  MessageSquare,
  Sparkles,
  HelpCircle,
  BookOpen,
  ArrowLeft,
  Phone,
  Layers,
  FileQuestion,
  Lightbulb,
  ShieldCheck,
  Check,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { ExamType, SubjectType, UserFeedbackReport, StudentUser } from "../types";
import {
  saveFeedbackReportToCloud,
  fetchFeedbackReportsFromCloud,
} from "../services/firebase";

interface FeedbackReportViewProps {
  currentUser?: StudentUser | null;
  currentExam: ExamType;
  onBack?: () => void;
}

export const FeedbackReportView: React.FC<FeedbackReportViewProps> = ({
  currentUser,
  currentExam,
  onBack,
}) => {
  const [category, setCategory] = useState<UserFeedbackReport["category"]>("question_error");
  const [userName, setUserName] = useState<string>(currentUser?.name || "");
  const [userMobile, setUserMobile] = useState<string>(currentUser?.mobile || "");
  const [exam, setExam] = useState<ExamType>(currentUser?.examTarget || currentExam || "MHT_CET");
  const [subject, setSubject] = useState<SubjectType>("Physics");
  const [questionNumberOrTopic, setQuestionNumberOrTopic] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const [submittedReports, setSubmittedReports] = useState<UserFeedbackReport[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // Load existing reports
  const loadReports = async () => {
    try {
      const raw = localStorage.getItem("mcq_app_user_feedbacks_v1");
      let localList: UserFeedbackReport[] = raw ? JSON.parse(raw) : [];
      
      const cloudReports = await fetchFeedbackReportsFromCloud();
      if (cloudReports && cloudReports.length > 0) {
        const map = new Map<string, UserFeedbackReport>();
        localList.forEach((r) => map.set(r.id, r));
        cloudReports.forEach((cr) => map.set(cr.id, cr));
        localList = Array.from(map.values()).sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
        localStorage.setItem("mcq_app_user_feedbacks_v1", JSON.stringify(localList));
      }
      setSubmittedReports(localList);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadReports();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSuccess(false);

    if (!userName.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!userMobile.trim() || userMobile.trim().length < 10) {
      setErrorMessage("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!description.trim() || description.trim().length < 5) {
      setErrorMessage("Please write a detailed description of the error or problem.");
      return;
    }

    const categoryNames: Record<string, string> = {
      question_error: "Error in Question or Option",
      mock_test_issue: "Mock Test / Timer Problem",
      app_suggestion: "New Feature / Suggestion",
      login_issue: "Login or Account Approval Help",
      other: "Other Issues",
    };

    const newReport: UserFeedbackReport = {
      id: `rep_${Date.now()}`,
      userName: userName.trim(),
      userMobile: userMobile.trim(),
      studentName: userName.trim(),
      studentMobile: userMobile.trim(),
      userRole: currentUser?.role || "student",
      category,
      issueCategory: categoryNames[category],
      exam,
      subject: category === "question_error" ? subject : undefined,
      questionNumberOrTopic: questionNumberOrTopic.trim() || undefined,
      description: description.trim(),
      status: "pending",
      createdAt: Date.now(),
    };

    try {
      const raw = localStorage.getItem("mcq_app_user_feedbacks_v1");
      const list: UserFeedbackReport[] = raw ? JSON.parse(raw) : [];
      list.unshift(newReport);
      localStorage.setItem("mcq_app_user_feedbacks_v1", JSON.stringify(list));
      setSubmittedReports(list);

      // Save to Firestore Cloud
      await saveFeedbackReportToCloud(newReport);

      setIsSuccess(true);
      setDescription("");
      setQuestionNumberOrTopic("");
      setTimeout(() => setIsSuccess(false), 6000);
    } catch (err) {
      setErrorMessage("Error saving record. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Accuracy & Transparency Campaign</span>
          </div>
          <h1 className="text-xl md:text-2xl font-black tracking-tight">
            Error & Feedback Reporting Center
          </h1>
          <p className="text-xs md:text-sm text-white/90 font-medium max-w-xl">
            Send your suggestions for question errors, answer explanations, or app improvements directly to the admin. Corrections will be made promptly.
          </p>
        </div>

        <div className="bg-slate-900/40 backdrop-blur-md border border-white/20 rounded-2xl p-3.5 text-center min-w-[180px]">
          <span className="text-[11px] text-amber-200 block font-bold">Admin Helpline</span>
          <a
            href="tel:9970106432"
            className="text-lg font-mono-numbers font-black text-white hover:underline flex items-center justify-center gap-1.5 mt-0.5"
          >
            <Phone className="w-4 h-4 text-emerald-300" />
            <span>9970106432</span>
          </a>
        </div>
      </div>

      {/* Main Grid: Form + Instructions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Form Column */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-rose-500" />
              <span>Send New Error or Suggestion</span>
            </h2>
            <span className="text-xs text-slate-500 font-bold">* All fields are required</span>
          </div>

          {isSuccess && (
            <div className="p-4 bg-emerald-50 border-2 border-emerald-400 text-emerald-900 rounded-2xl text-xs sm:text-sm font-bold flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-extrabold text-emerald-950">Your report has been successfully submitted to the admin!</p>
                <p className="text-xs text-emerald-800 font-medium mt-0.5">
                  The admin team will review and fix this error as soon as possible. Thank you for your cooperation!
                </p>
              </div>
            </div>
          )}

          {errorMessage && (
            <div className="p-4 bg-rose-50 border border-rose-300 text-rose-800 rounded-2xl text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Category Select */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1.5">
                Feedback / Error Category:
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-bold focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none cursor-pointer"
              >
                <option value="question_error">🔴 Question or Option Error</option>
                <option value="mock_test_issue">⏱️ Mock Test or Result Issue</option>
                <option value="app_suggestion">💡 Suggestion for App Improvement</option>
                <option value="login_issue">🔑 Account Login / Approval Help</option>
                <option value="other">📝 Other Questions or Problems</option>
              </select>
            </div>

            {/* Exam & Subject if Question Error */}
            {category === "question_error" && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    Exam:
                  </label>
                  <select
                    value={exam}
                    onChange={(e) => setExam(e.target.value as ExamType)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold outline-none"
                  >
                    <option value="MHT_CET">MHT-CET (PCM/PCB)</option>
                    <option value="NEET">NEET-UG (Medical)</option>
                    <option value="JEE_MAIN">JEE Main (Engg)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-700 mb-1">
                    Subject:
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value as SubjectType)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold outline-none"
                  >
                    <option value="Physics">Physics</option>
                    <option value="Chemistry">Chemistry</option>
                    <option value="Mathematics">Mathematics</option>
                    <option value="Biology">Biology</option>
                  </select>
                </div>
              </div>
            )}

            {/* Question Identifier / Topic */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1">
                {category === "question_error"
                  ? "Question Number, Chapter, or Subject Name:"
                  : "Topic or Reference:"}
              </label>
              <input
                type="text"
                placeholder={
                  category === "question_error"
                    ? "e.g. Mock Test 01 - Q.24 or Electrostatics - Coulomb's Law"
                    : "e.g. Timer or Formula Revision"
                }
                value={questionNumberOrTopic}
                onChange={(e) => setQuestionNumberOrTopic(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-medium focus:border-amber-500 outline-none"
              />
            </div>

            {/* Description Textarea */}
            <div>
              <label className="block text-xs font-black text-slate-700 mb-1">
                What is wrong and what should be correct? Write in detail:
              </label>
              <textarea
                rows={4}
                required
                placeholder="e.g. In the question, option (C) should be correct instead of (B) because..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-300 text-slate-900 text-xs sm:text-sm font-medium focus:border-amber-500 focus:ring-2 focus:ring-amber-200 outline-none resize-y"
              />
            </div>

            {/* User Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  Your Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amit Patil"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 mb-1">
                  Mobile Number (WhatsApp):
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 9876543210"
                  value={userMobile}
                  onChange={(e) => setUserMobile(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold outline-none font-mono"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 hover:from-amber-600 hover:to-rose-700 text-white font-black text-sm uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
            >
              <Send className="w-4 h-4" />
              <span>Send Feedback / Error to Admin</span>
            </button>
          </form>
        </div>

        {/* Sidebar Info & WhatsApp Support */}
        <div className="space-y-4">
          
          <div className="bg-slate-900 text-white rounded-3xl p-5 border border-slate-800 space-y-4 shadow-sm">
            <div className="flex items-center gap-2 text-amber-400">
              <ShieldCheck className="w-5 h-5" />
              <span className="text-xs font-black uppercase tracking-wider">Admin Direct Help Center</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-medium">
              Every error you send is directly recorded in the dashboard of the Master Admin (9970106432).
            </p>

            <div className="space-y-2 pt-2 border-t border-slate-800">
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Question and Answer Accuracy Check</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Error Fix & Update within 24 hours</span>
              </div>
              <div className="flex items-start gap-2 text-xs text-slate-300">
                <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Reply to Student via WhatsApp</span>
              </div>
            </div>

            <a
              href="https://wa.me/919970106432?text=Hello%20Admin,%20I%20want%20to%20report%20an%20error/suggestion%20in%20the%20app"
              target="_blank"
              rel="noreferrer"
              className="block w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-center text-xs font-black transition-all shadow-md cursor-pointer"
            >
              💬 Contact directly on WhatsApp
            </a>
          </div>

          {/* Recent Reports List by this Device */}
          <div className="bg-white rounded-3xl p-5 border border-slate-200 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-4 h-4 text-amber-500" />
                <span>Previous Records ({submittedReports.length})</span>
              </h3>
              <button
                onClick={loadReports}
                className="text-[11px] text-slate-500 hover:text-slate-900 font-bold flex items-center gap-1 cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Refresh</span>
              </button>
            </div>

            {submittedReports.length === 0 ? (
              <div className="py-6 text-center text-xs text-slate-400">
                No records made yet.
              </div>
            ) : (
              <div className="space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
                {submittedReports.slice(0, 5).map((rep) => (
                  <div
                    key={rep.id}
                    className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900 truncate max-w-[140px]">
                        {rep.issueCategory || rep.category}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                          rep.status === "resolved"
                            ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                            : "bg-amber-100 text-amber-800 border border-amber-300"
                        }`}
                      >
                        {rep.status === "resolved" ? "✅ Resolved" : "⏳ Review in Progress"}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px] line-clamp-2">{rep.description}</p>
                    <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
                      <span>{new Date(rep.createdAt).toLocaleDateString("en-IN")}</span>
                      {rep.subject && <span>{rep.subject}</span>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
