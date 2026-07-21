import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SERVICE_WORKERS } from '../mock/mockData';
import { Search, Wrench, Star, ShieldCheck, PhoneCall, Award } from 'lucide-react';

export const LocalServices: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('All');

  const filters = ['All', 'Electrician', 'Plumber', 'AC Service', 'RO Repair', 'Carpenter', 'Home Maid'];

  const filteredWorkers = SERVICE_WORKERS.filter((worker) => {
    const matchesFilter = activeFilter === 'All' || worker.serviceType === activeFilter;
    const matchesSearch =
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.serviceType.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center">
              <Wrench className="w-7 h-7 text-indigo-500 mr-2" />
              <span>{t('localServices')}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Verified neighborhood electricians, plumbers & technicians with instant phone dialer
            </p>
          </div>
        </div>

        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search for electrician, plumber, AC repair, motor works..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeFilter === filter
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-indigo-500'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredWorkers.map((worker) => (
            <div
              key={worker.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all space-y-4"
            >
              <div className="flex items-start space-x-3.5">
                <div className="relative">
                  <img
                    src={worker.photo}
                    alt={worker.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-indigo-500/30"
                  />
                  {worker.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-0.5 rounded-full ring-2 ring-white dark:ring-slate-900" title="Verified Worker">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                      {worker.serviceType}
                    </span>
                    <div className="flex items-center text-xs font-black text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500 mr-1" />
                      <span>{worker.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                    {worker.name}
                  </h3>

                  <div className="flex items-center space-x-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-semibold">
                      <Award className="w-3.5 h-3.5 mr-1" />
                      {worker.experienceYears} Years Exp.
                    </span>
                    <span>•</span>
                    <span>{worker.ward}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 space-y-1 text-xs">
                <p className="font-semibold text-slate-700 dark:text-slate-300">
                  Specialty: <span className="font-normal">{worker.specialty}</span>
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Rate: {worker.charges}
                </p>
              </div>

              <a
                href={`tel:${worker.phone}`}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-teal-600 hover:from-indigo-700 hover:to-teal-700 text-white font-bold text-xs shadow-lg shadow-indigo-600/20 flex items-center justify-center space-x-2 transition-transform active:scale-95"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Call Worker ({worker.phone})</span>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
