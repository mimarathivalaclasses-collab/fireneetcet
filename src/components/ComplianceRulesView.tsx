import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  FileText,
  DollarSign,
  Database,
  Lock,
  Scale,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ChevronRight,
  Info,
  HelpCircle,
  Building,
  Smartphone,
  EyeOff,
  Flame,
  ArrowLeft,
} from "lucide-react";
import { triggerHaptic } from "../utils/haptics";

interface ComplianceRulesViewProps {
  onBack: () => void;
}

type TabType = "audit" | "adsense" | "firebase" | "dpdp" | "payment" | "disclaimer";

export const ComplianceRulesView: React.FC<ComplianceRulesViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<TabType>("audit");

  const handleTabChange = (tab: TabType) => {
    triggerHaptic("selection");
    setActiveTab(tab);
  };

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-6 py-6 pb-24 space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white rounded-3xl p-5 sm:p-7 shadow-xl border border-indigo-500/20 relative overflow-hidden">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 transition-all cursor-pointer mb-2"
            >
              <ArrowLeft className="w-4 h-4" /> मागे जा (Back)
            </button>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-indigo-500/20 border border-indigo-400/30 text-indigo-300">
                <Scale className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
                  कायदे, नियम व तांत्रिक सुरक्षितता केंद्र (Rules & Compliance)
                </h1>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  Google AdSense, Firebase, DPDP कायदा २०२३, UPI/PhonePe आणि शासकीय परीक्षा नियमावली
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" /> कायदेशीर पडताळणी सज्ज
            </span>
            <span className="px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5" /> सिंगल डिव्हाइस लॉक
            </span>
          </div>
        </div>

        {/* Tab Navigation Navigation Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pt-5 mt-4 border-t border-white/10 scrollbar-none">
          <button
            type="button"
            onClick={() => handleTabChange("audit")}
            className={`px-4 py-2 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "audit"
                ? "bg-amber-500 text-slate-950 shadow-md"
                : "bg-white/5 hover:bg-white/10 text-slate-300"
            }`}
          >
            <AlertTriangle className="w-4 h-4" /> ॲपमधील कमतरता (App Audit)
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("adsense")}
            className={`px-4 py-2 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "adsense"
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-white/5 hover:bg-white/10 text-slate-300"
            }`}
          >
            <DollarSign className="w-4 h-4 text-amber-300" /> Google AdSense नियम
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("firebase")}
            className={`px-4 py-2 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "firebase"
                ? "bg-amber-600 text-white shadow-md"
                : "bg-white/5 hover:bg-white/10 text-slate-300"
            }`}
          >
            <Flame className="w-4 h-4 text-yellow-300" /> Firebase Security & Quotas
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("dpdp")}
            className={`px-4 py-2 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "dpdp"
                ? "bg-teal-600 text-white shadow-md"
                : "bg-white/5 hover:bg-white/10 text-slate-300"
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-emerald-300" /> DPDP कायदा (विद्यार्थी डेटा)
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("payment")}
            className={`px-4 py-2 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "payment"
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white/5 hover:bg-white/10 text-slate-300"
            }`}
          >
            <Building className="w-4 h-4 text-pink-300" /> UPI / PhonePe / RBI नियम
          </button>

          <button
            type="button"
            onClick={() => handleTabChange("disclaimer")}
            className={`px-4 py-2 rounded-xl text-xs font-black shrink-0 transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === "disclaimer"
                ? "bg-slate-700 text-white shadow-md"
                : "bg-white/5 hover:bg-white/10 text-slate-300"
            }`}
          >
            <FileText className="w-4 h-4 text-slate-300" /> CET / NTA अस्वीकरण
          </button>
        </div>
      </div>

      {/* TAB 1: ॲपमधील कमतरता व सोडवलेले उपाय (Audit & Shortcomings) */}
      {activeTab === "audit" && (
        <div className="space-y-6">
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-4 sm:p-5">
            <h2 className="text-base sm:text-lg font-black text-amber-950 dark:text-amber-200 flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              प्रामाणिक सॉफ्टवेअर ऑडिट: ॲपमध्ये सध्या काय कमतरता आहेत?
            </h2>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              कोणतेही कमर्शियल ॲप सुरू करताना कायदेशीर, तांत्रिक आणि युझर अनुभवात त्रुटी असल्यास गुगल पॉलिसी किंवा बँक पेमेंट गेटवे खात्यावर बंदी आणू शकतात. खाली सविस्तर ऑडिट आणि उपाय दिलेले आहेत:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Shortcoming 1 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-black">
                  कमतरता १: AdSense धोरणे
                </span>
                <span className="text-xs font-bold text-slate-400">Policy Gap</span>
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                स्टॅटिक कायदेशीर पेजेसची कमतरता (Static Mandatory Pages)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                गुगल ॲडसेन्स मान्यता मिळण्यासाठी वेबसाइटवर वेगळे <strong>Privacy Policy</strong>, <strong>Terms of Service</strong>, <strong>Disclaimer</strong>, <strong>Contact Us</strong> आणि <strong>Refund Policy</strong> पेजेस असणे बंधनकारक असते. फक्त एक पॉपअप चालत नाही.
              </p>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span><strong>उपाय:</strong> या नवीन केंद्रामध्ये सर्व कायदेशीर ड्राफ्ट्स तयार केले आहेत.</span>
              </div>
            </div>

            {/* Shortcoming 2 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 text-xs font-black">
                  कमतरता २: ॲड प्लेसमेंट
                </span>
                <span className="text-xs font-bold text-slate-400">Invalid Clicks Risk</span>
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                चालू चाचणीमध्ये जाहिराती दाखवण्याचा धोका
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                गुगल ॲडसेन्सचे कडक नियम आहेत: सक्रिय टेस्ट (Active Exam Simulator) किंवा OMR शीट चालू असताना कधीही जाहिरात लावू नये. विद्यार्थ्यांनी घाईत चुकून क्लिक केल्यास गुगलचे बॉट्स याला <em>"Invalid Activity"</em> मानून खाते कायमचे बंद करतात.
              </p>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span><strong>उपाय:</strong> ActiveTest स्क्रीन पूर्णपणे Ad-Free (जाहिरातमुक्त) ठेवली आहे.</span>
              </div>
            </div>

            {/* Shortcoming 3 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-black">
                  कमतरता ३: NPCI व बँक KYC
                </span>
                <span className="text-xs font-bold text-slate-400">Merchant Account</span>
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                PhonePe / UPI मर्चंट बिझनेस नाव पारदर्शकता
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                वैयक्तिक UPI ID वर वारंवार ₹२९ पेमेंट घेतल्यास बँक वैयक्तिक खाते संशयास्पद म्हणून फ्रीज करू शकते. आरबीआय नियमानुसार शैक्षणिक सेवांसाठी <strong>MCC 8299 (Educational Services)</strong> अंतर्गत चालू खाते (Current Account) किंवा व्यापारी खाते हवे.
              </p>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span><strong>उपाय:</strong> PhonePe Business Merchant QR व UTR व्हेरीफिकेशन सिस्टिम दिली आहे.</span>
              </div>
            </div>

            {/* Shortcoming 4 */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 text-xs font-black">
                  कमतरता ४: लहान विद्यार्थ्यांचा डेटा
                </span>
                <span className="text-xs font-bold text-slate-400">DPDP Act 2023</span>
              </div>
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                १८ वर्षांखालील विद्यार्थ्यांचा डेटा ट्रॅकिंग कायदा
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                भारताच्या नवीन DPDP कायदा २०२३ नुसार, १८ वर्षांखालील शालेय विद्यार्थ्यांचे वर्तन ट्रॅक करून त्यांना टार्गेटेड जाहिराती दाखवणे बेकायदेशीर आहे. पालकांची सहमती आणि डेटा नष्ट करण्याचा पर्याय हवा.
              </p>
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/30 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span><strong>उपाय:</strong> ॲपमध्ये "डेटा कायमचा नष्ट करा" (Right to Erasure) पर्याय दिला आहे.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Google AdSense नियम व अटी (AdSense Guidelines) */}
      {activeTab === "adsense" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-5 rounded-2xl shadow-md">
            <h2 className="text-base sm:text-lg font-black flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-amber-300" />
              Google AdSense Publisher धोरणे व मान्यता मार्गदर्शक
            </h2>
            <p className="text-xs sm:text-sm text-blue-100 mt-1">
              तुमच्या वेबसाइटवर गुगल ॲडसेन्स सुरू करून दरमहा नियमित उत्पन्न मिळवण्यासाठी खालील अटी तंतोतंत पाळणे आवश्यक आहे:
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-black">१</span>
                उच्च दर्जाचा आणि मूळ मजकूर (High-Value Educational Content)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                AdSense बॉट्स वेबसाइटचा दर्जा तपासतात. जर वेबसाइटवर फक्त २-३ प्रश्न किंवा रिकामी पाने असतील तर <em>"Low-value content"</em> किंवा <em>"Scraped content"</em> असा नकार येतो. आपल्या ॲपमध्ये <strong>१०० पॉइंट्स हाय-यील्ड नोट्स, सविस्तर स्पष्टीकरणे आणि सूत्रे</strong> असल्यामुळे ॲडसेन्ससाठी हा मोठा प्लस पॉइंट आहे.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-black">२</span>
                अवैध क्लिक्स आणि जाहिरातींची योग्य जागा (Invalid Traffic & Placement)
              </h3>
              <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2 pl-4 list-disc">
                <li>
                  <strong>स्वतःच्या जाहिरातींवर कधीही क्लिक करू नका:</strong> चाचणी करताना किंवा मित्रांना सांगून जाहिरातींवर क्लिक करायला लावल्यास गुगलचे AI एका सेकंदात आयपी (IP) ट्रॅक करून ॲडसेन्स खाते कायमचे सस्पेंड करते.
                </li>
                <li>
                  <strong>"ॲडवर क्लिक करा" असे कधीही लिहू नका:</strong> कोणत्याही बटणाजवळ "आमच्या ॲडला सपोर्ट करा किंवा क्लिक करा" असे लिहिणे Google धोरणांचे गंभीर उल्लंघन आहे.
                </li>
                <li>
                  <strong>चाचणीच्या मध्यभागी जाहिरात नको:</strong> प्रश्न सोडवताना Next किंवा Save बटणाच्या अगदी वर जाहिरात लावू नये, कारण विद्यार्थ्यांचा हात चुकून लागू शकतो (Accidental clicks).
                </li>
              </ul>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center text-xs font-black">३</span>
                कुकीज व युझर कन्सेंट (Cookie Consent & GDPR/CPRA)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                युरोपियन युनियन आणि गुगलच्या नव्या मानकांनुसार वापरकर्त्याला <em>"We use cookies to personalize content and ads"</em> असा बॅनर दाखवून त्यांची परवानगी घेणे आवश्यक आहे (Google CMP प्रमाणीकृत).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Firebase Security & Quotas */}
      {activeTab === "firebase" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white p-5 rounded-2xl shadow-md">
            <h2 className="text-base sm:text-lg font-black flex items-center gap-2">
              <Flame className="w-6 h-6 text-yellow-300" />
              Firebase Firestore सुरक्षितता नियम आणि Quota व्यवस्थापन
            </h2>
            <p className="text-xs sm:text-sm text-amber-100 mt-1">
              डेटाबेस हॅक होण्यापासून वाचवणे आणि अनपेक्षित बिलांपासून संरक्षण मिळवण्यासाठीचे सुरक्षा नियम:
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-500" />
                Firestore Security Rules (सुरक्षा नियम)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                फायरबेसमध्ये ओपन रूल्स (उदा. <code>allow read, write: if true;</code>) ठेवल्यास कोणीही बॉट स्क्रिप्ट चालवून डेटाबेस रिकामा करू शकतो किंवा दुसऱ्या विद्यार्थ्याचे गुण बदलू शकतो.
              </p>
              <div className="bg-slate-950 text-slate-200 p-4 rounded-xl font-mono text-xs overflow-x-auto">
                <pre>{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // विद्यार्थी फक्त स्वतःचाच डेटा पाहू आणि लिहू शकतो
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // सबमिट केलेल्या टेस्ट्समध्ये फेरफार करण्यास मनाई
    match /test_results/{resultId} {
      allow create: if request.auth != null;
      allow read: if request.auth != null;
      allow update, delete: if false; // रिझल्ट बदलता येत नाही!
    }
  }
}`}</pre>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base flex items-center gap-2">
                <Database className="w-4 h-4 text-blue-500" />
                मोफत मर्यादा (Free Spark Quota Limits)
              </h3>
              <ul className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4">
                <li><strong>दैनिक मोफत वाचणे (Reads):</strong> ५०,००० डॉक्युमेंट्स / दिवस</li>
                <li><strong>दैनिक मोफत लिहिणे (Writes):</strong> २०,००० डॉक्युमेंट्स / दिवस</li>
                <li><strong>डेटा साठा (Storage):</strong> १ GB मोफत साठवणूक</li>
                <li>
                  <strong>आपल्या ॲपचे स्मार्ट कॅशिंग:</strong> ॲपमध्ये <code>localStorage</code> आणि <code>DataVault</code> कॅशिंग वापरले आहे, ज्यामुळे प्रत्येक प्रश्नासाठी फायरबेसवर वारंवार विनंती जात नाही आणि मोफत कोट्यात हजारो विद्यार्थी सराव करू शकतात!
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: विद्यार्थी डेटा गोपनीयता कायदा (DPDP Act 2023) */}
      {activeTab === "dpdp" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-teal-700 to-emerald-800 text-white p-5 rounded-2xl shadow-md">
            <h2 className="text-base sm:text-lg font-black flex items-center gap-2">
              <ShieldAlert className="w-6 h-6 text-teal-300" />
              डिजिटल वैयक्तिक डेटा संरक्षण कायदा (DPDP Act 2023 - भारत)
            </h2>
            <p className="text-xs sm:text-sm text-teal-100 mt-1">
              भारतीय संसदेने संमत केलेल्या DPDP कायद्यानुसार शालेय विद्यार्थ्यांच्या डेटाविषयीचे नियम:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
              <h3 className="font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                पालकांची संमती (Parental Consent)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                १८ वर्षांखालील विद्यार्थ्यांचा मोबाईल क्रमांक व नाव घेताना पालकांची संमती अनिवार्य मानली जाते. हा डेटा फक्त शैक्षणिक प्रगती मोजण्यासाठीच वापरता येतो.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
              <h3 className="font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <EyeOff className="w-4 h-4 text-rose-500" />
                विद्यार्थ्यांच्या वर्तनाचे ट्रॅकिंग बंदी
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                लहान मुलांच्या अभ्यासाच्या सवयी किंवा डेटा इतर कोणत्याही थर्ड-पार्टी जाहिरात एजन्सीला विकणे किंवा टार्गेटेड जाहिरातींसाठी वापरणे हा कायद्याने दंडनीय गुन्हा आहे.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
              <h3 className="font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Lock className="w-4 h-4 text-blue-500" />
                डेटा नष्ट करण्याचा अधिकार (Right to Erasure)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                कोणत्याही विद्यार्थ्याने किंवा पालकाने विनंती केल्यास त्यांचा सर्व डेटा, मोबाईल क्रमांक आणि निकाल कायमचा मिटवण्याची सुविधा ॲपमध्ये उपलब्ध असायला हवी.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-2">
              <h3 className="font-black text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Building className="w-4 h-4 text-amber-500" />
                तक्रार निवारण अधिकारी (Grievance Officer)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                डेटा लीक किंवा गोपनीयतेसंबंधी तक्रारी सोडवण्यासाठी संस्थेचा अधिकृत अधिकारी, ईमेल आणि फोन नंबर जाहीर करणे आवश्यक आहे.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: UPI / PhonePe / RBI नियम व परतावा धोरण */}
      {activeTab === "payment" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-purple-700 to-indigo-800 text-white p-5 rounded-2xl shadow-md">
            <h2 className="text-base sm:text-lg font-black flex items-center gap-2">
              <Building className="w-6 h-6 text-pink-300" />
              NPCI, RBI व PhonePe मर्चंट पेमेंट आणि परतावा (Refund) धोरण
            </h2>
            <p className="text-xs sm:text-sm text-purple-100 mt-1">
              ऑनलाइन फी स्वीकारताना कायदेशीर अडचणी टाळण्यासाठीचे व्यावसायिक नियम:
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                १. व्यापारी प्रवर्ग कोड (Merchant Category Code - MCC 8299)
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                भारतीय राष्ट्रीय पेमेंट कॉर्पोरेशन (NPCI) च्या नियमानुसार शैक्षणिक संस्था आणि टेस्ट सिरीजसाठी <strong>MCC 8299 (Schools & Educational Services)</strong> नोंदणी असावी. यासाठी PhonePe Business किंवा Razorpay वर व्यवसायाचे पॅन कार्ड किंवा प्रोप्रायटरशिप नोंदणी कागदपत्रे जोडून व्हेरिफाय करावे.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                २. अधिकृत परतावा धोरण (Official Refund & Cancellation Policy)
              </h3>
              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 space-y-2">
                <p>
                  <strong>• १० रेफरल्स १००% परतावा योजना:</strong> ज्या विद्यार्थ्याने १० मित्रांना यशस्वीपणे नोंदणी करून दिली आहे, त्याला भरलेली ₹२९ फी त्याच्या मूळ UPI खात्यावर २४ ते ४८ तासांत १००% रिफंड केली जाते.
                </p>
                <p>
                  <strong>• तांत्रिक त्रुटी परतावा:</strong> जर विद्यार्थ्याचे पैसे बँकेतून कापले गेले परंतु २४ तासांत कोर्स ॲक्टिव्हेट झाला नाही, तर UTR ट्रान्झॅक्शन आयडी तपासल्यानंतर संपूर्ण रक्कम तात्काळ परत केली जाते.
                </p>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 space-y-3">
              <h3 className="font-black text-slate-900 dark:text-white text-sm sm:text-base">
                ३. तक्रार निवारण कक्ष (Customer Dispute Redressal)
              </h3>
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm space-y-1.5 text-slate-700 dark:text-slate-300">
                <p><strong>संस्था:</strong> मी मराठीवाला क्लासेस, अंबड (जि. जालना, महाराष्ट्र)</p>
                <p><strong>हेल्पलाईन / WhatsApp:</strong> +91 9307220454</p>
                <p><strong>निवारण कालावधी:</strong> तक्रार दाखल केल्यापासून कमाल २४ ते ४८ कामकाजाचे तास.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: शासकीय परीक्षा आयोग अस्वीकरण व कॉपीराइट */}
      {activeTab === "disclaimer" && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white p-5 rounded-2xl shadow-md">
            <h2 className="text-base sm:text-lg font-black flex items-center gap-2">
              <FileText className="w-6 h-6 text-slate-300" />
              शासकीय परीक्षा आयोग वैधानिक अस्वीकरण (Statutory Legal Disclaimer)
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              कायदेशीर नोटीस किंवा कॉपीराइट वादांपासून संरक्षण करणारा अधिकृत मसुदा:
            </p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4">
            <div className="space-y-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
              <p>
                <strong>१. स्वतंत्र खासगी व्यासपीठ:</strong> 'मी मराठीवाला क्लासेस' हे एक स्वतंत्र खाजगी शैक्षणिक आणि सराव व्यासपीठ आहे. या पोर्टलचा <strong>महाराष्ट्र राज्य सामाईक प्रवेश परीक्षा कक्ष (State Common Entrance Test Cell, Maharashtra)</strong> किंवा <strong>राष्ट्रीय परीक्षा संस्था (National Testing Agency - NTA)</strong> यांच्याशी कोणताही अधिकृत, शासकीय किंवा प्रशासकीय संबंध नाही.
              </p>
              <p>
                <strong>२. ट्रेडमार्क व नाव:</strong> 'MHT-CET', 'NEET (UG)', आणि 'JEE (Main)' ही नावे केवळ संबंधित परीक्षांच्या अभ्यासक्रमाचा संदर्भ देण्यासाठी आणि विद्यार्थ्यांच्या माहितीसाठी वापरण्यात आली आहेत. या नावांवर संबंधित परीक्षा मंडळांचे अधिकृत स्वामित्व आहे.
              </p>
              <p>
                <strong>३. मागील वर्षांचे प्रश्न (PYQs) व फेअर युझ:</strong> ॲपमध्ये दिलेले मागील वर्षांचे प्रश्न हे भारतीय कॉपीराइट कायदा, १९५७ च्या कलम ५२(१)(अ) मधील <em>"Fair Dealing for Educational and Instructional Purposes"</em> अंतर्गत शैक्षणिक सरावासाठी संकलित करण्यात आले आहेत.
              </p>
              <p>
                <strong>४. निकालाची कोणतीही हमी नाही:</strong> हे ॲप विद्यार्थ्यांना स्पर्धा परीक्षेचा सराव आणि आत्मविश्वास वाढवण्यासाठी मदत करते; प्रत्यक्ष शासकीय परीक्षेत ठराविक गुण किंवा रँक मिळण्याची कोणतीही हमी संस्था देत नाही.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
