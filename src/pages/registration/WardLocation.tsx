import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { AVADI_WARDS } from '../../mock/mockData';
import { MapPin, Navigation, ArrowLeft, ArrowRight, Building2, Sparkles } from 'lucide-react';

export const WardLocation: React.FC = () => {
  const { registrationData, updateWardDetails, autoFillLocation, generateOTP, setCurrentScreen } = useAuth();
  const { showToast } = useAppData();
  const [isLocating, setIsLocating] = useState(false);

  const handleLocationAccess = () => {
    setIsLocating(true);
    setTimeout(() => {
      autoFillLocation();
      setIsLocating(false);
      showToast('GPS Location identified: Ward 12 - Kamaraj Nagar', 'success');
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    generateOTP();
    setCurrentScreen('3');
  };

  const selectedWard = AVADI_WARDS.find((w) => w.number === registrationData.wardNumber) || AVADI_WARDS[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between p-4 transition-colors">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Step 3 of 3</span>
            <span>Ward & Location</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full w-full transition-all duration-300" />
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-emerald-500/20 mb-3">
            AC
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Ward & Location</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pin your location for hyper-local civic updates & neighborhood news
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-900/10 via-teal-900/10 to-cyan-900/10 dark:from-emerald-950/40 dark:to-cyan-950/40 border border-emerald-500/30 text-center">
            <button
              type="button"
              onClick={handleLocationAccess}
              disabled={isLocating}
              className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs shadow-md flex items-center justify-center space-x-2 transition-all"
            >
              {isLocating ? (
                <>
                  <Sparkles className="w-4 h-4 animate-spin" />
                  <span>Detecting Device GPS Location...</span>
                </>
              ) : (
                <>
                  <Navigation className="w-4 h-4 text-emerald-200 animate-pulse" />
                  <span>Allow Location Access (Auto-Fill Ward)</span>
                </>
              )}
            </button>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2">
              Detects your street & ward automatically using your browser GPS
            </p>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Ward Number *
            </label>
            <div className="relative">
              <MapPin className="w-5 h-5 absolute left-3.5 top-3.5 text-emerald-500" />
              <select
                value={registrationData.wardNumber}
                onChange={(e) => updateWardDetails({ wardNumber: Number(e.target.value) })}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {AVADI_WARDS.map((ward) => (
                  <option key={ward.number} value={ward.number}>
                    Ward {ward.number} - {ward.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center space-x-3">
            <Building2 className="w-5 h-5 text-teal-600 dark:text-teal-400 shrink-0" />
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Assigned Community</span>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                {selectedWard.community} ({selectedWard.name})
              </p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Street Name / Landmark *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Kamaraj Nagar 3rd Main Road"
              value={registrationData.streetName}
              onChange={(e) => updateWardDetails({ streetName: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div className="pt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentScreen('2.1')}
              className="py-3 px-5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 flex items-center space-x-2"
            >
              <span>Continue to OTP</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
