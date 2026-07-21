import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { EXPLORE_PLACES } from '../mock/mockData';
import { Search, MapPin, Star, Clock, Navigation, Compass, ExternalLink } from 'lucide-react';

export const ExplorePlaces: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Devotional', 'Shopping Areas', 'Kids Park', 'Famous Areas', 'Lake & Nature', 'Defense & Heritage'];

  const filteredPlaces = EXPLORE_PLACES.filter((place) => {
    const matchesCategory = activeCategory === 'All' || place.category === activeCategory;
    const matchesSearch =
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-4">

        {/* Page Title */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center">
              <Compass className="w-7 h-7 text-cyan-500 mr-2" />
              <span>{t('explorePlaces')}</span>
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Explore local attractions, eco parks, heritage spots & shopping hubs
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3.5 top-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search places in Avadi (e.g. Eco Lake Park, Temple, Market)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm dark:text-white focus:ring-2 focus:ring-cyan-500 outline-none shadow-sm"
          />
        </div>

        {/* Filter Chips Horizontal Scroll */}
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-cyan-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:border-cyan-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Places Listings Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredPlaces.map((place) => (
            <article
              key={place.id}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
            >
              {/* Photo & Rating Overlay */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/70 backdrop-blur-md text-white text-[10px] font-bold">
                  {place.ward}
                </div>
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-black flex items-center space-x-1 shadow">
                  <Star className="w-3.5 h-3.5 fill-slate-950" />
                  <span>{place.rating}</span>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold uppercase text-cyan-600 dark:text-cyan-400 tracking-wider">
                    {place.category}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                    {place.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {place.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                  <div className="flex items-center text-xs text-slate-600 dark:text-slate-300">
                    <Clock className="w-3.5 h-3.5 mr-1.5 text-cyan-500 shrink-0" />
                    <span>{place.openingHours}</span>
                  </div>

                  <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 truncate">
                    <MapPin className="w-3.5 h-3.5 mr-1.5 text-emerald-500 shrink-0" />
                    <span className="truncate">{place.location}</span>
                  </div>

                  <a
                    href={place.mapUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 text-xs font-bold hover:bg-cyan-50 dark:hover:bg-cyan-950/40 flex items-center justify-center space-x-1 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3 h-3 ml-0.5" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
