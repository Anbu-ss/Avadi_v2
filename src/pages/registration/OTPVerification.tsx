import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { KeyRound, Mail, Phone, CheckCircle, RefreshCw, ArrowLeft } from 'lucide-react';

export const OTPVerification: React.FC = () => {
  const { registrationData, otpCode, generateOTP, verifyOTP, setCurrentScreen } = useAuth();
  const { showToast } = useAppData();
  const [code, setCode] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    const success = verifyOTP(code);
    if (success) {
      showToast('OTP Verified! Welcome to Avadi Connect.', 'success');
      setCurrentScreen('3.0');
    } else {
      setErrorMsg('Invalid OTP. Use demo OTP code "1234" or check above.');
    }
  };

  const handleResend = () => {
    const newCode = generateOTP();
    showToast(`New OTP sent! Code: ${newCode}`, 'info');
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between p-4 transition-colors">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center py-6">
        <div className="text-center mb-6">
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-emerald-500/20 mb-3">
            <KeyRound className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">OTP Verification</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Authentication code generated for passwordless resident login
          </p>
        </div>

        <form onSubmit={handleVerify} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-5">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-2">
            <div className="flex items-center text-slate-700 dark:text-slate-200 font-semibold">
              <Mail className="w-4 h-4 mr-2 text-emerald-600 shrink-0" />
              <span>Email (Mandatory): {registrationData.email || 'anbu.avadi@gmail.com'}</span>
            </div>
            <div className="flex items-center text-slate-600 dark:text-slate-300">
              <Phone className="w-4 h-4 mr-2 text-teal-600 shrink-0" />
              <span>Mobile (SMS): +91 {registrationData.mobile || '9876543210'}</span>
            </div>
            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-emerald-700 dark:text-emerald-400 font-mono font-bold">
              <span>DEMO OTP CODE:</span>
              <span className="bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded tracking-widest text-sm">{otpCode || '1234'}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2 text-center">
              Enter 4-Digit Verification Code
            </label>
            <input
              type="text"
              maxLength={4}
              required
              placeholder="1234"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
              className="w-full text-center tracking-[0.5em] text-2xl font-mono py-3.5 rounded-2xl border-2 border-emerald-500/50 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-4 focus:ring-emerald-500/20 outline-none"
            />
          </div>

          {errorMsg && (
            <p className="text-xs font-semibold text-red-500 text-center bg-red-50 dark:bg-red-950/50 p-2.5 rounded-xl border border-red-200 dark:border-red-800">
              {errorMsg}
            </p>
          )}

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Didn't receive code?</span>
            <button
              type="button"
              onClick={handleResend}
              className="font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center space-x-1"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Resend OTP</span>
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold text-sm shadow-xl shadow-emerald-600/30 flex items-center justify-center space-x-2"
          >
            <CheckCircle className="w-5 h-5" />
            <span>Verify & Login</span>
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setCurrentScreen('2.2')}
              className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 inline-flex items-center"
            >
              <ArrowLeft className="w-3.5 h-3.5 mr-1" />
              Back to Ward Selection
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
