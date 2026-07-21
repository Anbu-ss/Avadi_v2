import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import {
  MessageSquare,
  AlertTriangle,
  ShieldAlert,
  Compass,
  Wrench,
  Building,
  ArrowRight,
  Sun,
  Moon,
  CheckCircle2,
  MapPin,
  Users,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setCurrentScreen, loginAsGuest } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const handleGetStarted = () => {
    setCurrentScreen('2.0');
  };

  const handleLoginClick = () => {
    setCurrentScreen('3'); // OTP login
  };

  const handleDemoClick = () => {
    loginAsGuest();
    setCurrentScreen('3.0');
  };

  const featureCards = [
    {
      title: 'Community Feed',
      description: 'Engage with neighbor posts, local announcements & ward discussions.',
      icon: MessageSquare,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
      screen: '3.1',
    },
    {
      title: 'Civic Complaints',
      description: 'Report streetlights, garbage, water issues & track live resolution status.',
      icon: AlertTriangle,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
      screen: '4.1',
    },
    {
      title: 'Emergency SOS',
      description: '1-tap emergency dispatch & direct contact to police, hospital & fire.',
      icon: ShieldAlert,
      color: 'bg-red-500/10 text-red-600 dark:text-red-400',
      screen: '5.0',
    },
    {
      title: 'Explore Avadi',
      description: 'Discover local attractions, parks, lakes & famous late-night food outlets.',
      icon: Compass,
      color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400',
      screen: '6.1',
    },
    {
      title: 'Local Services',
      description: 'Hire verified electricians, plumbers & technicians with click-to-call.',
      icon: Wrench,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400',
      screen: '8.1',
    },
    {
      title: 'Rentals & Jobs',
      description: 'Browse local house/shop rentals and hyper-local job opportunities.',
      icon: Building,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400',
      screen: '9.1',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col transition-colors">
      {/* Top Navbar */}
      <header className="w-full max-w-4xl mx-auto px-4 h-20 flex items-center justify-between">
        {/* Logo top-left */}
        <div className="flex items-center space-x-2.5">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white font-extrabold text-lg shadow-lg shadow-emerald-500/30">
            AC
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
              Avadi<span className="text-emerald-600 dark:text-emerald-400">Connect</span>
            </h1>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-0.5">
              Ward-Level Civic PWA
            </p>
          </div>
        </div>

        {/* Top-Right Action: Theme & Login */}
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
            title="Toggle Light/Dark Theme"
          >
            {theme === 'dark' ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
          </button>

          <button
            onClick={handleLoginClick}
            className="px-4 py-2 rounded-xl text-sm font-bold text-emerald-600 dark:text-emerald-400 border-2 border-emerald-600/30 hover:border-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 transition-all"
          >
            Login
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-4xl mx-auto px-4 py-8 flex flex-col items-center text-center">
        {/* Ward Badge */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-semibold mb-6 border border-emerald-200 dark:border-emerald-800">
          <MapPin className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          <span>Avadi Municipal Corporation • Wards 1 to 48</span>
        </div>

        {/* Centered Tagline & Slogan */}
        <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight max-w-2xl leading-tight">
          Empowering Avadi Residents with Hyper-Local Civic Engagement
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
          Report civic issues, track ward complaints in real-time, get emergency SOS help, discover local food & places, and connect with your neighborhood community.
        </p>

        {/* Primary Get Started CTA Button */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-sm">
          <button
            onClick={handleGetStarted}
            className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white font-bold text-base shadow-xl shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
          >
            <span>Get Started</span>
            <ArrowRight className="w-5 h-5" />
          </button>

          <button
            onClick={handleDemoClick}
            className="w-full py-3.5 px-6 rounded-2xl bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-semibold text-sm border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm"
          >
            Explore Prototype Demo
          </button>
        </div>

        {/* Trust Chips */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 font-medium">
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>Fast PWA Experience</span>
          </span>
          <span className="flex items-center space-x-1">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            <span>No App Store Download Needed</span>
          </span>
          <span className="flex items-center space-x-1">
            <Users className="w-4 h-4 text-emerald-500" />
            <span>48 Wards Supported</span>
          </span>
        </div>

        {/* Features Card Section Container */}
        <section className="mt-14 w-full">
          <div className="text-left mb-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Application Features
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select any card container to launch features directly
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featureCards.map((feat) => {
              const IconComp = feat.icon;
              return (
                <div
                  key={feat.title}
                  onClick={() => {
                    handleDemoClick();
                    setCurrentScreen(feat.screen);
                  }}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm hover:shadow-xl hover:border-emerald-500/50 transition-all cursor-pointer text-left group flex flex-col justify-between"
                >
                  <div>
                    <div className={`w-12 h-12 rounded-2xl ${feat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {feat.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    <span>Explore module</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-slate-200 dark:border-slate-900 text-center text-xs text-slate-400 dark:text-slate-600">
        <p>Avadi Connect Progressive Web Application • Avadi City Municipal Corporation, Chennai</p>
      </footer>
    </div>
  );
};
