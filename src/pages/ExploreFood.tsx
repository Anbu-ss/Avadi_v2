import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { FOOD_OUTLETS } from '../mock/mockData';
import { Search, Utensils, Star, Clock, PhoneCall, Moon } from 'lucide-react';

export const ExploreFood: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Veg', 'Non-Veg', 'Ice Cream Shops', 'Late-Night Food Shops', 'Snacks & Tea'];

  const filteredOutlets = FOOD_OUTLETS.filter((item) => {
    const matchesCat =
      activeCategory === 'All' ||
      item.category === activeCategory ||
      (activeCategory === 'Late-Night Food Shops' && item.isLateNight);
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center">
              <Utensils className="w-7 h-7 text-orange-500 mr-2" />
              <span>{t('exploreFood')}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Directory of food outlets & night eateries across Avadi wards
            </p>
          </div>
        </div>

        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search eateries, Biryani, Tiffin, Ice creams..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm dark:text-white focus:ring-2 focus:ring-orange-500 outline-none shadow-sm"
          />
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1 ${
                activeCategory === cat
                  ? 'bg-orange-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-orange-500'
              }`}
            >
              {cat === 'Late-Night Food Shops' && <Moon className="w-3.5 h-3.5 text-amber-300" />}
              <span>{cat}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredOutlets.map((item) => (
            <article
              key={item.id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.isLateNight && (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-indigo-950/80 backdrop-blur-md text-amber-300 text-[10px] font-extrabold flex items-center space-x-1 border border-indigo-700">
                    <Moon className="w-3 h-3" />
                    <span>Late-Night Hub</span>
                  </div>
                )}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center space-x-1 shadow">
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{item.rating}</span>
                </div>
              </div>

              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-extrabold uppercase text-orange-600 dark:text-orange-400">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      {item.ward}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {item.name}
                  </h3>
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                    Specialty: {item.specialty}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-orange-500 shrink-0" />
                    <span className="font-semibold">{item.timings}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-slate-400 truncate max-w-[170px]">{item.address}</span>
                    <a
                      href={`tel:${item.phone}`}
                      className="px-3 py-1.5 rounded-xl bg-orange-600 text-white text-xs font-bold shadow hover:bg-orange-700 flex items-center space-x-1 shrink-0"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>Call Shop</span>
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
