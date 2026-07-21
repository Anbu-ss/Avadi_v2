import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, Copy, FileText, Home, ArrowRight, ShieldCheck } from 'lucide-react';

export const ReportSubmitted: React.FC = () => {
  const { setCurrentScreen } = useAuth();
  const issueId = localStorage.getItem('last_created_issue_id') || 'AVD-2026-8942';

  const handleCopy = () => {
    navigator.clipboard.writeText(issueId);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 flex flex-col items-center justify-center p-4 py-8 transition-colors">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-6">
        {/* Animated Check Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400 animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
            Submission Confirmed
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            Complaint Registered!
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            Your civic grievance has been logged in Avadi Corporation system and dispatched to your ward assistant engineer.
          </p>
        </div>

        {/* Generated Unique Issue ID Box */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/60 dark:to-teal-950/60 border border-emerald-300 dark:border-emerald-800 text-center space-y-2">
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase">
            Trackable Issue Reference ID
          </span>
          <div className="flex items-center justify-center space-x-3">
            <span className="text-2xl font-mono font-black text-emerald-700 dark:text-emerald-300 tracking-wider">
              {issueId}
            </span>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-emerald-600 shadow-sm border border-slate-200 dark:border-slate-700"
              title="Copy Issue ID"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 flex items-start space-x-2 text-left">
          <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
          <span>You will receive real-time SMS & notification updates as technicians progress through the resolution timeline.</span>
        </div>

        {/* Actions */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => setCurrentScreen('4.5')}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center space-x-2"
          >
            <FileText className="w-4 h-4" />
            <span>Track Complaint Status</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => setCurrentScreen('4.1')}
            className="w-full py-3 px-6 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center space-x-1.5"
          >
            <Home className="w-4 h-4" />
            <span>Return to Complaints Home</span>
          </button>
        </div>
      </div>
    </div>
  );
};
