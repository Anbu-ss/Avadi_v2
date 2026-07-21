import React from 'react';
import { useAppData } from '../../context/AppDataContext';
import { Download, X, Smartphone } from 'lucide-react';

export const InstallPWABanner: React.FC = () => {
  const { isPWAInstalled, dismissPWAPrompt, showToast } = useAppData();

  if (isPWAInstalled) return null;

  const handleInstall = () => {
    showToast('Avadi Connect PWA added to home screen!', 'success');
    dismissPWAPrompt();
  };

  return (
    <div className="bg-gradient-to-r from-teal-700 via-emerald-700 to-cyan-800 text-white px-4 py-2.5 text-xs">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 rounded-lg bg-white/10 shrink-0">
            <Smartphone className="w-4 h-4 text-emerald-200" />
          </div>
          <div>
            <span className="font-bold">Install Avadi Connect PWA</span>
            <span className="hidden sm:inline text-emerald-100 ml-1.5">
              — Access civic services, complaints & emergency SOS instantly from your home screen.
            </span>
          </div>
        </div>
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={handleInstall}
            className="px-3 py-1 rounded-lg bg-white text-emerald-800 font-bold hover:bg-emerald-50 transition-colors shadow-sm flex items-center space-x-1"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>
          <button
            onClick={dismissPWAPrompt}
            className="p-1 rounded-md hover:bg-white/10 text-white/80"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
