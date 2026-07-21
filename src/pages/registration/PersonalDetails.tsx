import React from 'react';
import { useAuth } from '../../context/AuthContext';
import type { BloodGroup, Gender } from '../../types';
import { User, Calendar, Heart, ArrowLeft, ArrowRight } from 'lucide-react';

export const PersonalDetails: React.FC = () => {
  const { registrationData, updatePersonalDetails, setCurrentScreen } = useAuth();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (!registrationData.name) return;
    setCurrentScreen('2.1');
  };

  const bloodGroups: BloodGroup[] = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const genders: Gender[] = ['Male', 'Female', 'Other'];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col justify-between p-4 transition-colors">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center py-6">
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">Step 1 of 3</span>
            <span>Personal Details</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-500 h-full w-1/3 transition-all duration-300" />
          </div>
        </div>

        <div className="text-center mb-6">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-emerald-500/20 mb-3">
            AC
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Resident Profile</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Enter your personal identification details for ward registration
          </p>
        </div>

        <form onSubmit={handleNext} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                required
                placeholder="e.g. Anbarasu S"
                value={registrationData.name}
                onChange={(e) => updatePersonalDetails({ name: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Date of Birth *
            </label>
            <div className="relative">
              <Calendar className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="date"
                required
                value={registrationData.dob}
                onChange={(e) => updatePersonalDetails({ dob: e.target.value })}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Blood Group *
            </label>
            <div className="relative">
              <Heart className="w-5 h-5 absolute left-3.5 top-3.5 text-red-500" />
              <select
                value={registrationData.bloodGroup}
                onChange={(e) => updatePersonalDetails({ bloodGroup: e.target.value as BloodGroup })}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
              >
                {bloodGroups.map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Gender *
            </label>
            <div className="grid grid-cols-3 gap-2">
              {genders.map((g) => (
                <button
                  type="button"
                  key={g}
                  onClick={() => updatePersonalDetails({ gender: g })}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                    registrationData.gender === g
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-md'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-emerald-400'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentScreen('1.0')}
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
