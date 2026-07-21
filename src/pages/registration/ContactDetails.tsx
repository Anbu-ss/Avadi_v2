import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Phone, Mail, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

export const ContactDetails: React.FC = () => {
  const { registrationData, updateContactDetails, setCurrentScreen } = useAuth();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationData.mobile || !registrationData.email) return;
    setCurrentScreen('2.2');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between p-4 transition-colors">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center py-6">
        {/* Step Wizard Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Step 2 of 3</span>
            <span>Contact Info</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full w-2/3 transition-all duration-300" />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-emerald-500/20 mb-3">
            AC
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Contact Verification</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Provide reachable contact methods for OTP authentication & ward updates
          </p>
        </div>

        {/* Form Card */}
        <form onSubmit={handleNext} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
          {/* Mobile Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Mobile Number (Primary) *
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="tel"
                required
                maxLength={10}
                placeholder="10-digit mobile number"
                value={registrationData.mobile}
                onChange={(e) => updateContactDetails({ mobile: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Will receive SMS notifications & emergency SOS alerts</p>
          </div>

          {/* Email ID */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Email Address (Mandatory Verification) *
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="email"
                required
                placeholder="name@domain.com"
                value={registrationData.email}
                onChange={(e) => updateContactDetails({ email: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1">Mandatory for OTP verification & civic complaint progress receipts</p>
          </div>

          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800 flex items-start space-x-2 text-xs text-emerald-800 dark:text-emerald-300">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>Your contact details are encrypted and kept strictly within Avadi Corporation records.</span>
          </div>

          {/* Bottom Buttons */}
          <div className="pt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentScreen('2.0')}
              className="py-3 px-5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-lg shadow-emerald-600/30 flex items-center space-x-2"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
