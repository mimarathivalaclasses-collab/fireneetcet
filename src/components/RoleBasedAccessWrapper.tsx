import React from "react";
import { ShieldAlert, Lock, ArrowLeft, LogIn, Sparkles, UserCheck, ShieldCheck } from "lucide-react";
import { StudentUser, UserRole } from "../types";

interface RoleBasedAccessWrapperProps {
  currentUser: StudentUser | null;
  allowedRoles: UserRole[];
  children: React.ReactNode;
  titleMr?: string;
  descriptionMr?: string;
  onOpenAuth: (targetRole?: UserRole) => void;
  onBackToHome: () => void;
}

export const RoleBasedAccessWrapper: React.FC<RoleBasedAccessWrapperProps> = ({
  currentUser,
  allowedRoles,
  children,
  titleMr,
  descriptionMr,
  onOpenAuth,
  onBackToHome,
}) => {
  const currentRole: UserRole = currentUser?.role || "student";
  const isAuthorized = currentUser && allowedRoles.includes(currentRole);

  if (isAuthorized) {
    return <>{children}</>;
  }

  // Unauthorized Access State (Mobile-First Card Layout)
  const roleNameMap: Record<UserRole, string> = {
    admin: "मुख्य ॲडमिन डायरेक्टर (Super Admin)",
    class_admin: "कोचिंग क्लासेस ॲडमिन (Class Admin)",
    agent: "अधिकृत एजंट पार्टनर (Partner)",
    student: "नोंदणीकृत विद्यार्थी (Student)",
  };

  const allowedRolesText = allowedRoles.map((r) => roleNameMap[r]).join(" किंवा ");

  return (
    <div className="w-full min-h-[70vh] flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-slate-800/95 border border-slate-700/90 rounded-3xl p-6 sm:p-8 shadow-2xl text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 text-[11px] font-black uppercase tracking-wider">
            🔒 सुरक्षित ॲक्सेस निर्बंध (Restricted Area)
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            {titleMr || "या पानासाठी विशेष परवानगी आवश्यक आहे"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md mx-auto">
            {descriptionMr ||
              `हे पोर्टल केवळ ${allowedRolesText} साठी राखीव आहे. तुमचे वर्तमान खाते या भूमिकेत नाही.`}
          </p>
        </div>

        {/* Current User Status Indicator */}
        <div className="p-3.5 bg-slate-900/80 rounded-2xl border border-slate-700/80 text-left flex items-center justify-between text-xs">
          <div>
            <div className="text-[11px] text-slate-400 font-medium">सध्याचे लॉगिन:</div>
            <div className="font-black text-white">
              {currentUser ? currentUser.name : "लॉगिन केलेले नाही (Guest)"}
            </div>
          </div>
          <div className="px-2.5 py-1 rounded-xl bg-slate-800 border border-slate-600 text-slate-300 font-bold text-[11px]">
            भूमिका: {roleNameMap[currentRole]}
          </div>
        </div>

        {/* Actions (Touch friendly 44px+) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <button
            onClick={() => onOpenAuth(allowedRoles[0])}
            className="w-full min-h-[46px] py-3 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 text-xs font-black uppercase tracking-wider shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogIn className="w-4 h-4" />
            <span>योग्य खात्याने लॉगिन करा</span>
          </button>

          <button
            onClick={onBackToHome}
            className="w-full min-h-[46px] py-3 px-4 rounded-xl bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>मुख्य डॅशबोर्डवर जा</span>
          </button>
        </div>
      </div>
    </div>
  );
};
