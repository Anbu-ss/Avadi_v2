import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { Home, MessageSquare, AlertTriangle, ShieldAlert, Compass } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentScreen, setCurrentScreen } = useAuth();
  const { t } = useLanguage();

  // Hide bottom nav during registration or login wizard screens
  const hideScreens = ['1.0', '2.0', '2.1', '2.2', '3'];
  if (hideScreens.includes(currentScreen)) return null;

  const items = [
    { code: '3.0', label: t('home'), icon: Home },
    { code: '3.1', label: t('feed'), icon: MessageSquare },
    { code: '4.1', label: t('complaints'), icon: AlertTriangle },
    { code: '5.0', label: t('sos'), icon: ShieldAlert, isEmergency: true },
    { code: '6.1', label: t('explore'), icon: Compass },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-lg border-t border-slate-200 dark:border-slate-800 transition-colors md:hidden">
      <div className="max-w-md mx-auto flex items-center justify-around h-16 px-2">
        {items.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentScreen === item.code || (item.code === '4.1' && currentScreen.startsWith('4.'));

          if (item.isEmergency) {
            return (
              <button
                key={item.code}
                onClick={() => setCurrentScreen(item.code)}
                className="relative -top-4 flex flex-col items-center justify-center"
              >
                <div className="w-13 h-13 rounded-full bg-gradient-to-tr from-red-600 to-rose-500 text-white flex items-center justify-center shadow-lg shadow-red-500/40 ring-4 ring-white dark:ring-slate-900 active:scale-95 transition-transform">
                  <ShieldAlert className="w-7 h-7 animate-pulse" />
                </div>
                <span className="text-[10px] font-bold text-red-600 dark:text-red-400 mt-0.5">
                  SOS
                </span>
              </button>
            );
          }

          return (
            <button
              key={item.code}
              onClick={() => setCurrentScreen(item.code)}
              className={`flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <IconComponent className={`w-5 h-5 ${isActive ? 'scale-110' : ''} transition-transform`} />
              <span className="text-[10px] mt-1 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
