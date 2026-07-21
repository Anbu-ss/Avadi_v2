import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme, type ThemeMode } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useSettings } from '../context/SettingsContext';
import { useAppData } from '../context/AppDataContext';
import { SupportModal, type SupportModalType } from '../components/common/SupportModal';
import {
  Settings,
  Globe,
  Sun,
  Moon,
  Laptop,
  Bell,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sliders,
  Sparkles,
  Shield,
  MessageSquare,
  AlertTriangle,
  Building2,
  Check,
  Info,
  HelpCircle,
  Headphones,
  Bug,
  Lightbulb,
  LogOut,
  AlertCircle,
} from 'lucide-react';
import type { Language } from '../utils/translations';

export const SettingsPage: React.FC = () => {
  const { setCurrentScreen, logout } = useAuth();
  const { themeMode, setThemeMode } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { notifications, toggleNotification } = useSettings();
  const { showToast } = useAppData();

  const [activeSupportModal, setActiveSupportModal] = useState<SupportModalType>(null);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState<boolean>(false);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    showToast(t('languageUpdated'), 'success');
  };

  const handleThemeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
    const modeLabels = {
      light: 'Light Mode',
      dark: 'Dark Mode',
      system: 'System Default',
    };
    showToast(`Theme changed to ${modeLabels[mode]}`, 'info');
  };

  const handleNotificationToggle = (key: keyof typeof notifications, label: string) => {
    toggleNotification(key);
    const nextState = !notifications[key];
    showToast(`${label} ${nextState ? 'Enabled' : 'Disabled'}`, 'info');
  };

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    logout();
    showToast('Logged out successfully.', 'info');
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 min-h-full pb-16 transition-colors animate-in fade-in duration-200">
      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-6">
        {/* Top Header Card */}
        <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white rounded-3xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
            <Sliders className="w-48 h-48" />
          </div>

          <div className="flex items-center justify-between relative z-10">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentScreen('3.0')}
                className="p-2 rounded-2xl bg-white/15 hover:bg-white/25 text-white backdrop-blur-md transition-all active:scale-95 border border-white/20"
                title={t('backToHub')}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight flex items-center gap-2">
                  <Settings className="w-7 h-7" />
                  <span>{t('settings')}</span>
                </h1>
                <p className="text-xs text-emerald-100/90 mt-0.5">
                  {t('generalDescription')}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center space-x-1.5 bg-white/15 backdrop-blur-md px-3 py-1.5 rounded-2xl border border-white/20 text-xs font-bold">
              <Sparkles className="w-4 h-4 text-emerald-200" />
              <span>Avadi Connect v2.5</span>
            </div>
          </div>
        </section>

        {/* GENERAL SETTINGS SECTION */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('generalSettings')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Language, theme mode, and alert preferences
              </p>
            </div>
          </div>

          {/* 1. LANGUAGE PREFERENCE CARD */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-4 transition-all">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 border border-teal-100 dark:border-teal-900">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {t('languagePreference')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('selectLanguage')}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                {language === 'en' ? 'English' : 'தமிழ்'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* English Card */}
              <div
                onClick={() => handleLanguageChange('en')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  language === 'en'
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                    language === 'en'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    EN
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      English
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t('englishDesc')}
                    </p>
                  </div>
                </div>

                {language === 'en' && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
              </div>

              {/* Tamil Card */}
              <div
                onClick={() => handleLanguageChange('ta')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between group ${
                  language === 'ta'
                    ? 'bg-emerald-50/90 dark:bg-emerald-950/40 border-emerald-500 shadow-md ring-2 ring-emerald-500/20'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm transition-colors ${
                    language === 'ta'
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    தமிழ்
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      தமிழ் (Tamil)
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {t('tamilDesc')}
                    </p>
                  </div>
                </div>

                {language === 'ta' && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                )}
              </div>
            </div>
          </div>

          {/* 2. THEME MODE CARD */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-4 transition-all">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900">
                  {themeMode === 'dark' ? <Moon className="w-5 h-5" /> : themeMode === 'system' ? <Laptop className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {t('theme')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('selectTheme')}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 capitalize">
                {themeMode}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Light Mode */}
              <div
                onClick={() => handleThemeChange('light')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  themeMode === 'light'
                    ? 'bg-amber-50/90 dark:bg-amber-950/30 border-amber-500 shadow-md ring-2 ring-amber-500/20'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${
                    themeMode === 'light' ? 'bg-amber-500 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    <Sun className="w-5 h-5" />
                  </div>
                  {themeMode === 'light' && (
                    <span className="p-1 rounded-full bg-amber-500 text-white">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t('lightMode')}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {t('lightModeDesc')}
                  </p>
                </div>
              </div>

              {/* Dark Mode */}
              <div
                onClick={() => handleThemeChange('dark')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  themeMode === 'dark'
                    ? 'bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-500 shadow-md ring-2 ring-indigo-500/20'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${
                    themeMode === 'dark' ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    <Moon className="w-5 h-5" />
                  </div>
                  {themeMode === 'dark' && (
                    <span className="p-1 rounded-full bg-indigo-600 text-white">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t('darkMode')}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {t('darkModeDesc')}
                  </p>
                </div>
              </div>

              {/* System Default */}
              <div
                onClick={() => handleThemeChange('system')}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                  themeMode === 'system'
                    ? 'bg-cyan-50/90 dark:bg-cyan-950/40 border-cyan-500 shadow-md ring-2 ring-cyan-500/20'
                    : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`p-2.5 rounded-xl ${
                    themeMode === 'system' ? 'bg-cyan-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    <Laptop className="w-5 h-5" />
                  </div>
                  {themeMode === 'system' && (
                    <span className="p-1 rounded-full bg-cyan-600 text-white">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {t('systemDefault')}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {t('systemDefaultDesc')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 3. NOTIFICATIONS CARD */}
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-md space-y-4 transition-all">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900">
                  <Bell className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {t('notifications')}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {t('notificationsDesc')}
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300">
                {Object.values(notifications).filter(Boolean).length}/4 {t('enabled')}
              </span>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
              {/* Community Updates */}
              <div className="py-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3 pr-3">
                  <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {t('communityUpdates')}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {t('communityUpdatesDesc')}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleNotificationToggle('communityUpdates', t('communityUpdates'))}
                  className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notifications.communityUpdates ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  role="switch"
                  aria-checked={notifications.communityUpdates}
                >
                  <span
                    className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      notifications.communityUpdates ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Complaint Status */}
              <div className="py-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3 pr-3">
                  <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                    <AlertTriangle className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {t('complaintStatus')}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {t('complaintStatusDesc')}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleNotificationToggle('complaintStatus', t('complaintStatus'))}
                  className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notifications.complaintStatus ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  role="switch"
                  aria-checked={notifications.complaintStatus}
                >
                  <span
                    className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      notifications.complaintStatus ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Government Notifications */}
              <div className="py-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3 pr-3">
                  <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
                    <Building2 className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {t('govNotifications')}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {t('govNotificationsDesc')}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleNotificationToggle('govNotifications', t('govNotifications'))}
                  className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notifications.govNotifications ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  role="switch"
                  aria-checked={notifications.govNotifications}
                >
                  <span
                    className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      notifications.govNotifications ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              {/* Emergency Alerts */}
              <div className="py-3.5 flex items-center justify-between">
                <div className="flex items-center space-x-3 pr-3">
                  <div className="p-2 rounded-xl bg-red-500/10 text-red-600 dark:text-red-400">
                    <Shield className="w-4.5 h-4.5 text-red-500" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {t('emergencyAlerts')}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {t('emergencyAlertsDesc')}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleNotificationToggle('emergencyAlerts', t('emergencyAlerts'))}
                  className={`relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                    notifications.emergencyAlerts ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  role="switch"
                  aria-checked={notifications.emergencyAlerts}
                >
                  <span
                    className={`pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                      notifications.emergencyAlerts ? 'translate-x-5.5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT APPLICATION SECTION */}
        <section className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <Info className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('aboutApplication')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('aboutAppDesc')}
              </p>
            </div>
          </div>

          <div
            onClick={() => setCurrentScreen('11.0')}
            className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-5 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-lg hover:border-emerald-500/50 transition-all cursor-pointer group flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-cyan-600 text-white flex items-center justify-center font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform">
                AC
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  {t('aboutAvadiConnect')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Version 2.5.0 • Objectives, Privacy Policy, Terms & Release Notes
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-xs font-extrabold px-3 py-1 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 hidden sm:inline-block">
                {t('viewDetails')}
              </span>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </section>

        {/* SUPPORT SECTION */}
        <section className="space-y-4">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {t('support')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {t('supportDesc')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Contact Support */}
            <div
              onClick={() => setActiveSupportModal('contact')}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-lg hover:border-cyan-500/50 transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 group-hover:scale-110 transition-transform">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400">
                    {t('contactSupport')}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {t('contactSupportDesc')}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Send Feedback */}
            <div
              onClick={() => setActiveSupportModal('feedback')}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-lg hover:border-emerald-500/50 transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                    {t('sendFeedback')}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {t('sendFeedbackDesc')}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Report a Bug */}
            <div
              onClick={() => setActiveSupportModal('bug')}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-lg hover:border-rose-500/50 transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400 group-hover:scale-110 transition-transform">
                  <Bug className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400">
                    {t('reportBug')}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {t('reportBugDesc')}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>

            {/* Suggest a Feature */}
            <div
              onClick={() => setActiveSupportModal('feature')}
              className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-4 border border-slate-200/80 dark:border-slate-800/80 shadow-md hover:shadow-lg hover:border-amber-500/50 transition-all cursor-pointer group flex items-center justify-between"
            >
              <div className="flex items-center space-x-3">
                <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400">
                    {t('suggestFeature')}
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {t('suggestFeatureDesc')}
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </section>

        {/* LOGOUT SECTION */}
        <section className="pt-4 border-t border-slate-200/80 dark:border-slate-800">
          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="w-full py-4 px-5 rounded-3xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/70 text-red-600 dark:text-red-400 border border-red-200/80 dark:border-red-900/60 font-bold text-sm shadow-md transition-all flex items-center justify-center space-x-2 active:scale-98"
          >
            <LogOut className="w-5 h-5" />
            <span>{t('logout')}</span>
          </button>
        </section>
      </div>

      {/* Support Interactive Modal */}
      <SupportModal
        type={activeSupportModal}
        onClose={() => setActiveSupportModal(null)}
      />

      {/* LOGOUT CONFIRMATION DIALOG MODAL */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowLogoutConfirm(false)}
          />

          <div className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 z-10 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-150 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-red-100 dark:bg-red-950/80 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto border border-red-200 dark:border-red-900">
              <AlertCircle className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Log Out Confirmation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-2 font-medium">
                Are you sure you want to log out?
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="py-3 px-4 rounded-2xl border border-slate-300 dark:border-slate-700 text-xs font-extrabold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmLogout}
                className="py-3 px-4 rounded-2xl bg-red-600 hover:bg-red-700 text-white text-xs font-extrabold shadow-md transition-colors flex items-center justify-center space-x-1"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
