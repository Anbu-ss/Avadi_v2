import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { AVADI_WARDS } from '../../mock/mockData';
import {
  AlertTriangle,
  FileText,
  Clock,
  Bell,
  Building,
  Phone,
  Mail,
  UserCheck,
  Plus,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

export const ComplaintsHome: React.FC = () => {
  const { user, setCurrentScreen } = useAuth();
  const { t, language } = useLanguage();
  const [activeGuideStep, setActiveGuideStep] = useState(0);

  const wardInfo = AVADI_WARDS.find((w) => w.number === (user?.wardNumber || 12)) || AVADI_WARDS[0];

  const howItWorksSteps = language === 'ta' ? [
    { step: '1. வகையைத் தேர்ந்தெடுக்கவும்', desc: 'தெருவிளக்கு, குடிநீர், குப்பை அல்லது வடிகால் தேர்வை செய்க.' },
    { step: '2. இடம் & புகைப்படம் சேர்க்கவும்', desc: '2 புகைப்படங்கள் & இருப்பிட அடையாளத்தை பதிவு செய்க.' },
    { step: '3. பிரத்யேக புகார் எண் பெறுக', desc: 'உடனடி கண்காணிப்பு புகார் எண் (எ.கா. AVD-2026-8942) உருவாக்கப்படும்.' },
    { step: '4. நேரலை புகார் நிலை', desc: 'சமர்ப்பிக்கப்பட்டது ➔ நடவடிக்கை ➔ முன்னேற்றம் ➔ தீர்க்கப்பட்டது.' },
  ] : [
    { step: '1. Select Category', desc: 'Choose streetlight, water, garbage or drainage category.' },
    { step: '2. Provide Location & Evidence', desc: 'Attach up to 2 photos & landmark description.' },
    { step: '3. Unique Issue ID Generated', desc: 'Receive instant trackable reference ID (e.g. AVD-2026-8942).' },
    { step: '4. Live Status Timeline', desc: 'Track Submitted ➔ Action ➔ In Progress ➔ Resolved.' },
  ];

  // Automatically move complaint guide slider every 3s (3000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveGuideStep((prev) => (prev + 1) % howItWorksSteps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [howItWorksSteps.length]);

  const nextStep = () => {
    setActiveGuideStep((prev) => (prev + 1) % howItWorksSteps.length);
  };

  const prevStep = () => {
    setActiveGuideStep((prev) => (prev - 1 + howItWorksSteps.length) % howItWorksSteps.length);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center">
              <AlertTriangle className="w-7 h-7 text-amber-500 mr-2" />
              <span>{t('civicComplaints')}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Official ward grievance reporting & administration system
            </p>
          </div>
        </div>

        {/* "How it Works" Explainer Slider with Left & Right Buttons */}
        <section className="bg-gradient-to-br from-amber-500/10 via-amber-600/5 to-slate-900/5 dark:from-amber-950/40 dark:to-slate-900/40 rounded-3xl p-5 border border-amber-500/30 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 text-amber-800 dark:text-amber-300">
              <HelpCircle className="w-5 h-5" />
              <h3 className="text-sm font-bold">How Complaint Reporting Works</h3>
            </div>
            <div className="flex space-x-1">
              {howItWorksSteps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveGuideStep(i)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    activeGuideStep === i ? 'bg-amber-600 w-5' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  aria-label={`Guide step ${i + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative p-5 rounded-2xl bg-white dark:bg-slate-900 shadow-sm border border-amber-200 dark:border-amber-900/50 flex items-center justify-between">
            <button
              onClick={prevStep}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="text-center px-4 flex-1">
              <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                Guide Step {activeGuideStep + 1} of 4
              </span>
              <h4 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                {howItWorksSteps[activeGuideStep].step}
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {howItWorksSteps[activeGuideStep].desc}
              </p>
            </div>

            <button
              onClick={nextStep}
              className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Next step"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </section>

        <section className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div
            onClick={() => setCurrentScreen('4.5')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-emerald-500 cursor-pointer text-left transition-all"
          >
            <div className="p-2.5 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 w-fit mb-2">
              <FileText className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">My Reports</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Your submitted complaints</p>
          </div>

          <div
            onClick={() => setCurrentScreen('4.5')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-amber-500 cursor-pointer text-left transition-all"
          >
            <div className="p-2.5 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 w-fit mb-2">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Track Complaints</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Live status timeline</p>
          </div>

          <div
            onClick={() => setCurrentScreen('3.1')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-cyan-500 cursor-pointer text-left transition-all"
          >
            <div className="p-2.5 rounded-xl bg-cyan-100 dark:bg-cyan-950 text-cyan-600 dark:text-cyan-400 w-fit mb-2">
              <Bell className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Local Alerts</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Ward notices & outages</p>
          </div>

          <div
            onClick={() => setCurrentScreen('5.0')}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-indigo-500 cursor-pointer text-left transition-all"
          >
            <div className="p-2.5 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 w-fit mb-2">
              <Building className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white">Govt Services</h4>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">Corporation contacts</p>
          </div>
        </section>

        <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                Administration Contact Card
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Ward {wardInfo.number} Officials ({wardInfo.name})
              </h3>
            </div>
            <UserCheck className="w-6 h-6 text-emerald-500" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Ward Councilor</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{wardInfo.councilorName}</h4>
              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <a href={`tel:${wardInfo.councilorPhone}`} className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  <Phone className="w-3.5 h-3.5 mr-1.5" />
                  <span>{wardInfo.councilorPhone}</span>
                </a>
                <div className="flex items-center text-slate-500 dark:text-slate-400 text-[11px]">
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                  <span className="truncate">{wardInfo.councilorEmail}</span>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[10px] font-extrabold uppercase text-slate-400">Assistant Engineer (Maintenance)</span>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">{wardInfo.engineerName}</h4>
              <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300">
                <a href={`tel:${wardInfo.engineerPhone}`} className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold hover:underline">
                  <Phone className="w-3.5 h-3.5 mr-1.5" />
                  <span>{wardInfo.engineerPhone}</span>
                </a>
                <p className="text-[11px] text-slate-400">Office Hours: 10:00 AM - 05:00 PM</p>
              </div>
            </div>
          </div>
        </section>

        <button
          onClick={() => setCurrentScreen('4.2')}
          className="fixed right-0 top-1/2 -translate-y-1/2 z-40 px-4 py-3.5 sm:px-5 rounded-l-2xl sm:rounded-l-full bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 text-white font-extrabold text-xs sm:text-sm shadow-2xl shadow-orange-600/50 flex items-center space-x-2 border-y border-l border-white/30 hover:pr-6 hover:scale-105 active:scale-95 transition-all ring-2 ring-white/20"
          title="Report Civic Complaint"
        >
          <Plus className="w-5 h-5" />
          <span>Report Complaint</span>
        </button>
      </div>
    </div>
  );
};
