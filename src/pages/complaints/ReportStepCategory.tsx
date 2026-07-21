import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Lightbulb, Droplets, Trash2, Waves, MoreHorizontal, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

type ComplaintCategory = 'Streetlight' | 'Water Issue' | 'Garbage' | 'Drainage' | 'Others';

export const ReportStepCategory: React.FC = () => {
  const { setCurrentScreen } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<ComplaintCategory>('Streetlight');

  const categories = [
    {
      id: 'Streetlight',
      title: 'Streetlight',
      description: 'Non-functional LED lamp post, loose wiring or dark streets',
      icon: Lightbulb,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
    },
    {
      id: 'Water Issue',
      title: 'Water Supply Issue',
      description: 'Pipeline leakage, low pressure or dirty drinking water supply',
      icon: Droplets,
      color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/30',
    },
    {
      id: 'Garbage',
      title: 'Garbage & Solid Waste',
      description: 'Uncollected street bin overflow, public dumping or dead animal',
      icon: Trash2,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
    },
    {
      id: 'Drainage',
      title: 'Drainage & Sewage',
      description: 'Clogged storm water drain, open manhole or sewage overflow',
      icon: Waves,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/30',
    },
    {
      id: 'Others',
      title: 'Others / Roads',
      description: 'Road potholes, fallen tree branches, stray animals or noise',
      icon: MoreHorizontal,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
    },
  ];

  const handleNext = () => {
    localStorage.setItem('temp_complaint_category', selectedCategory);
    setCurrentScreen('4.3'); // Step 2 Describe
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 flex flex-col justify-between p-4 transition-colors">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center py-6">
        {/* Wizard Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-amber-600 dark:text-amber-400 font-bold">Step 1 of 2</span>
            <span>Select Issue Category</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full w-1/2 transition-all duration-300" />
          </div>
        </div>

        <div className="text-center mb-6">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Report Civic Issue</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Choose the category that best describes your complaint
          </p>
        </div>

        {/* Category Cards List */}
        <div className="space-y-3">
          {categories.map((cat) => {
            const IconComp = cat.icon;
            const isSelected = selectedCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as ComplaintCategory)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-white dark:bg-slate-900 border-amber-500 ring-2 ring-amber-500/30 shadow-md'
                    : 'bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                <div className="flex items-center space-x-3.5">
                  <div className={`p-3 rounded-xl border ${cat.color}`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">{cat.title}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 max-w-[230px]">{cat.description}</p>
                  </div>
                </div>

                <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                  isSelected ? 'bg-amber-500 border-amber-500 text-white' : 'border-slate-300 dark:border-slate-700'
                }`}>
                  {isSelected && <CheckCircle2 className="w-4 h-4" />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Wizard Bottom Buttons */}
        <div className="mt-8 flex items-center justify-between gap-3">
          <button
            onClick={() => setCurrentScreen('4.1')}
            className="py-3 px-5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Cancel</span>
          </button>

          <button
            onClick={handleNext}
            className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white text-sm font-bold shadow-lg shadow-amber-500/30 flex items-center space-x-2"
          >
            <span>Next (Describe)</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
