import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Menu, Sun, Moon, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  title?: string;
  onOpenDrawer: () => void;
  onOpenProfile: () => void;
  isSimplified?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ title, onOpenDrawer, onOpenProfile }) => {
  const { user, currentScreen, setCurrentScreen } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={onOpenDrawer}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Open Menu"
            aria-label="Open Navigation Drawer"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onOpenDrawer()}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold shadow-md shadow-emerald-500/20">
              AC
            </div>
            <div>
              <h1 className="text-base font-bold tracking-tight text-slate-900 dark:text-white leading-tight">
                {title || t('appTitle')}
              </h1>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {currentScreen !== '5.0' && (
            <button
              onClick={() => setCurrentScreen('5.0')}
              className="px-2.5 py-1.5 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 text-xs font-semibold flex items-center space-x-1 hover:bg-red-200 transition-colors"
              title="Emergency SOS"
            >
              <ShieldAlert className="w-4 h-4 animate-pulse text-red-600" />
              <span className="hidden sm:inline">SOS</span>
            </button>
          )}

          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Toggle Theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-5 h-5 text-amber-400" />
            ) : (
              <Moon className="w-5 h-5 text-slate-600" />
            )}
          </button>

          <button
            onClick={onOpenProfile}
            className="p-0.5 rounded-full ring-2 ring-emerald-500/50 hover:ring-emerald-500 transition-all cursor-pointer"
            title="Resident Profile"
            aria-label="Open Resident Profile"
          >
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name || 'Resident Profile'}
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
                }}
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
