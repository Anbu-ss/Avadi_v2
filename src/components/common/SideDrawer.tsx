import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  Home,
  MessageSquare,
  AlertTriangle,
  ShieldAlert,
  Compass,
  Utensils,
  Wrench,
  Building,
  LogOut,
  Moon,
  Sun,
  MapPin,
  ChevronRight,
  Camera,
  Settings,
} from 'lucide-react';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenProfile: () => void;
}

export const SideDrawer: React.FC<SideDrawerProps> = ({ isOpen, onClose, onOpenProfile }) => {
  const { user, setCurrentScreen, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t } = useLanguage();

  if (!isOpen) return null;

  const navigateTo = (screenCode: string) => {
    setCurrentScreen(screenCode);
    onClose();
  };

  const navItems = [
    { code: '3.0', label: t('homeHub'), icon: Home, badge: '' },
    { code: '3.1', label: t('communityFeed'), icon: MessageSquare, badge: 'Popular' },
    { code: '4.1', label: t('civicComplaints'), icon: AlertTriangle, badge: 'Track' },
    { code: '5.0', label: t('emergencySos'), icon: ShieldAlert, badge: '24/7', color: 'text-red-500' },
    { code: '6.1', label: t('explorePlaces'), icon: Compass, badge: '' },
    { code: '7.1', label: t('exploreFood'), icon: Utensils, badge: 'Night' },
    { code: '8.1', label: t('localServices'), icon: Wrench, badge: 'Verified' },
    { code: '9.1', label: t('rentalsProperty'), icon: Building, badge: '' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container */}
      <div className="relative w-80 max-w-[85vw] bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col z-10 border-r border-slate-200 dark:border-slate-800 animate-in slide-in-from-left duration-200">
        {/* Header Header */}
        <div className="p-5 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {user ? (
            <div className="flex items-center space-x-3 cursor-pointer group" onClick={() => { onOpenProfile(); onClose(); }}>
              <div className="relative">
                <img
                  src={user.avatarUrl}
                  alt={user.name}
                  className="w-14 h-14 rounded-full border-2 border-white/80 object-cover shadow"
                />
                <div className="absolute bottom-0 right-0 bg-emerald-500 text-white p-1 rounded-full border border-white shadow">
                  <Camera className="w-3 h-3" />
                </div>
              </div>
              <div>
                <h3 className="font-bold text-lg leading-tight flex items-center group-hover:text-emerald-100 transition-colors">
                  {user.name}
                  <ChevronRight className="w-4 h-4 ml-1 text-white/70" />
                </h3>
                <p className="text-xs text-emerald-100 flex items-center mt-1">
                  <MapPin className="w-3.5 h-3.5 mr-1" />
                  {t('ward')} {user.wardNumber} • {user.wardName}
                </p>
                <p className="text-[11px] text-emerald-200/80 mt-0.5">{user.mobile}</p>
              </div>
            </div>
          ) : (
            <div>
              <h3 className="font-bold text-lg">{t('vanakkam')}!</h3>
              <p className="text-xs text-emerald-100 mt-1">Avadi Ward Resident Portal</p>
              <button
                onClick={() => navigateTo('1.0')}
                className="mt-3 px-3 py-1.5 rounded-lg bg-white text-emerald-700 text-xs font-bold shadow"
              >
                Register / Login
              </button>
            </div>
          )}
        </div>

        {/* Navigation List */}
        <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1">
          <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            {t('mainFeatures')}
          </div>

          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.code}
                onClick={() => navigateTo(item.code)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors group"
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className={`w-5 h-5 ${item.color || 'text-slate-500 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          <div className="pt-3 pb-1 px-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-t border-slate-100 dark:border-slate-800">
            {t('accountPreferences')}
          </div>

          <button
            onClick={() => navigateTo('10.0')}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Settings className="w-5 h-5 text-emerald-500" />
            <span>{t('settingsPreferences')}</span>
          </button>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 space-y-2 bg-slate-50 dark:bg-slate-900/50">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm"
          >
            <div className="flex items-center space-x-2">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
              <span>{theme === 'dark' ? t('lightTheme') : t('darkTheme')}</span>
            </div>
            <span className="text-xs text-slate-400 font-mono capitalize">{theme}</span>
          </button>

          {user && (
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>{t('logOutMenu')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
