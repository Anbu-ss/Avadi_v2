import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  ChevronLeft,
  Info,
  Shield,
  FileText,
  Headphones,
  Code,
  History,
  Sparkles,
  ChevronDown,
  ChevronUp,
  MapPin,
  CheckCircle2,
  HeartHandshake,
} from 'lucide-react';

export const AboutAvadiConnect: React.FC = () => {
  const { setCurrentScreen } = useAuth();
  const [expandedCard, setExpandedCard] = useState<string | null>('releaseNotes');

  const toggleCard = (cardId: string) => {
    setExpandedCard((prev) => (prev === cardId ? null : cardId));
  };

  const mainFeatures = [
    { title: 'Civic Complaint Tracker', desc: 'Log streetlight, road, garbage & water issues directly to ward engineers.' },
    { title: '24/7 Emergency SOS', desc: 'Instant one-tap dispatch for police, ambulance, fire, and ward disaster help.' },
    { title: 'Ward Community Feed', desc: 'Share neighborhood news, safety alerts, and local events with verified neighbors.' },
    { title: 'Discover Avadi', desc: 'Explore Paruthipattu Lake Eco Park, historical sites, and local Avadi spots.' },
    { title: 'Explore Food & Night', desc: 'Curated list of local eateries, tea stalls, and late-night food joints.' },
    { title: 'Local Services Directory', desc: 'Verified local electricians, plumbers, carpenters, and technicians.' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-full pb-12 transition-colors animate-in fade-in duration-200">
      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-6">
        {/* Header Hero Card */}
        <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
            <Sparkles className="w-56 h-56" />
          </div>

          <div className="flex items-center space-x-3 mb-4 relative z-10">
            <button
              onClick={() => setCurrentScreen('10.0')}
              className="p-2 rounded-2xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-all active:scale-95 border border-white/20"
              title="Back to Settings"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-emerald-100 uppercase tracking-wider">
              System Info
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
            <div className="flex items-center space-x-4">
              {/* Application Logo */}
              <div className="w-16 h-16 rounded-2xl bg-white text-emerald-600 flex items-center justify-center font-black text-2xl shadow-lg shadow-black/20 ring-4 ring-white/20 shrink-0">
                AC
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
                  <span>About Avadi Connect</span>
                </h1>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-extrabold backdrop-blur-md border border-white/20">
                    Version 2.5.0
                  </span>
                  <span className="text-xs text-emerald-100/90 font-mono">Build 2026.7</span>
                </div>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs font-semibold self-stretch sm:self-auto flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-emerald-200" />
              <span>Avadi Corporation Ward Portal</span>
            </div>
          </div>
        </section>

        {/* Application Description & Objective */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-2">
            <div className="flex items-center space-x-2 text-emerald-600 dark:text-emerald-400">
              <Info className="w-5 h-5" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider">Application Description</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              Avadi Connect is the official civic and ward community digital platform designed for residents of Avadi Municipal Corporation. It seamlessly bridges communication between citizens, ward counselors, and corporation emergency departments.
            </p>
          </div>

          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-2">
            <div className="flex items-center space-x-2 text-teal-600 dark:text-teal-400">
              <HeartHandshake className="w-5 h-5" />
              <h3 className="font-extrabold text-sm uppercase tracking-wider">Project Objective</h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              To empower all 48 wards in Avadi with direct digital access to civic issue reporting, emergency SOS safety dispatch, local economic services, and neighborhood community updates with maximum transparency.
            </p>
          </div>
        </section>

        {/* Main Features Grid */}
        <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-4">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Main Features</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {mainFeatures.map((feat) => (
              <div
                key={feat.title}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 space-y-1 hover:border-emerald-500/50 transition-all"
              >
                <h4 className="text-xs font-black text-emerald-700 dark:text-emerald-400 flex items-center">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-500 shrink-0" />
                  <span>{feat.title}</span>
                </h4>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-tight">
                  {feat.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* EXPANDABLE INFORMATION CARDS */}
        <section className="space-y-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white px-1">
            Information & Policy Details
          </h3>

          {/* 1. Privacy Policy */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md overflow-hidden transition-all">
            <button
              onClick={() => toggleCard('privacy')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Privacy Policy</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Data encryption & resident privacy protection</p>
                </div>
              </div>
              {expandedCard === 'privacy' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {expandedCard === 'privacy' && (
              <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed animate-in fade-in duration-150">
                <p>
                  Your privacy is paramount. Avadi Connect collects minimal registration data (Name, Ward Number, and Contact Number) strictly to route civic complaints to appropriate municipal engineers and dispatch emergency assistance.
                </p>
                <p>
                  - Profile pictures and preferences are stored locally in your browser storage.
                </p>
                <p>
                  - We do not share personal resident data with third-party advertising services.
                </p>
              </div>
            )}
          </div>

          {/* 2. Terms & Conditions */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md overflow-hidden transition-all">
            <button
              onClick={() => toggleCard('terms')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Terms & Conditions</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Resident portal guidelines and usage terms</p>
                </div>
              </div>
              {expandedCard === 'terms' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {expandedCard === 'terms' && (
              <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed animate-in fade-in duration-150">
                <p>
                  By using Avadi Connect, residents agree to provide accurate ward information when logging civic complaints or emergency SOS requests.
                </p>
                <p>
                  - Abuse of the 24/7 Emergency SOS button or false complaint reports is strictly prohibited.
                </p>
                <p>
                  - Community feed posts must adhere to neighborhood respectful communication standards.
                </p>
              </div>
            )}
          </div>

          {/* 3. Contact Support */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md overflow-hidden transition-all">
            <button
              onClick={() => toggleCard('support')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-900">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Contact Support</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Hotline, email, and corporation office location</p>
                </div>
              </div>
              {expandedCard === 'support' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {expandedCard === 'support' && (
              <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed animate-in fade-in duration-150">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-medium">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Civic Helpline</span>
                    <p className="font-bold text-slate-900 dark:text-white">1800-425-4500 (Toll-Free)</p>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800">
                    <span className="text-[10px] uppercase font-bold text-slate-400">Email Address</span>
                    <p className="font-bold text-slate-900 dark:text-white">support@avadi.gov.in</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 4. Developer Information */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md overflow-hidden transition-all">
            <button
              onClick={() => toggleCard('developer')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 border border-purple-100 dark:border-purple-900">
                  <Code className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Developer Information</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Technology stack and design credentials</p>
                </div>
              </div>
              {expandedCard === 'developer' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {expandedCard === 'developer' && (
              <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed animate-in fade-in duration-150">
                <p>
                  Built with high performance web technologies including React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons, and Antigravity Design Principles.
                </p>
                <div className="flex items-center space-x-2 pt-1">
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-mono">React 19</span>
                  <span className="px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 text-[10px] font-mono">TypeScript</span>
                  <span className="px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 text-[10px] font-mono">Vite</span>
                </div>
              </div>
            )}
          </div>

          {/* 5. Version History */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md overflow-hidden transition-all">
            <button
              onClick={() => toggleCard('history')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900">
                  <History className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Version History</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Release milestones from v1.0 to v2.5.0</p>
                </div>
              </div>
              {expandedCard === 'history' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {expandedCard === 'history' && (
              <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed animate-in fade-in duration-150">
                <div className="border-l-2 border-emerald-500 pl-3 space-y-2">
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">v2.5.0 (Current)</span> - Added Settings Page, Profile Picture Editor, Language Context (English/Tamil), System Theme Mode, and Notification Preferences.
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">v2.0.0</span> - Added Community Feed, Civic Complaint Wizard, Emergency 24/7 SOS dispatch.
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white">v1.0.0</span> - Initial release of Avadi Ward resident portal.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 6. Release Notes */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-md overflow-hidden transition-all">
            <button
              onClick={() => toggleCard('releaseNotes')}
              className="w-full p-4 flex items-center justify-between text-left hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Release Notes (v2.5.0)</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Highlights of recent features and improvements</p>
                </div>
              </div>
              {expandedCard === 'releaseNotes' ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
            </button>

            {expandedCard === 'releaseNotes' && (
              <div className="p-4 pt-0 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 space-y-2 leading-relaxed animate-in fade-in duration-150">
                <ul className="list-disc list-inside space-y-1">
                  <li>✨ <strong>Editable Profile Picture:</strong> Device image picker for JPG, JPEG, PNG, WEBP with high quality 1:1 circular cropping.</li>
                  <li>🌐 <strong>Language Switcher:</strong> Instantly switch between English and தமிழ் (Tamil) with local browser persistence.</li>
                  <li>🌙 <strong>Theme Modes:</strong> Support for Light Mode, Dark Mode, and System Default with smooth transitions.</li>
                  <li>🔔 <strong>Notification Controls:</strong> Toggle switches for Community, Complaint, Government, and Emergency alerts.</li>
                  <li>ℹ️ <strong>About & Support:</strong> Complete About section and interactive support/feedback modules.</li>
                </ul>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
