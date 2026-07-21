import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { AVADI_WARDS, BUS_SCHEDULES, TRAIN_SCHEDULES } from '../mock/mockData';
import {
  MapPin,
  MessageSquare,
  AlertTriangle,
  ShieldAlert,
  Compass,
  Utensils,
  Wrench,
  Building,
  Briefcase,
  Bus,
  Train,
  ChevronRight,
  ChevronLeft,
  Info,
  Sparkles,
  Camera,
} from 'lucide-react';

interface HomePageProps {
  onOpenProfile?: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenProfile }) => {
  const { user, setCurrentScreen } = useAuth();
  const { t } = useLanguage();
  const [activeTravelTab, setActiveTravelTab] = useState<'bus' | 'train'>('bus');
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const slides = [
    {
      id: 1,
      title: 'Paruthipattu Lake Eco Park Boating Open!',
      subtitle: 'Avadi Corporation launches solar boating & walking track extensions.',
      badge: 'Civic Update',
      gradient: 'from-emerald-600 via-teal-600 to-cyan-700',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 2,
      title: 'Mega Health & Blood Donation Camp',
      subtitle: 'This Sunday at Kamaraj Nagar Community Hall. All blood groups needed.',
      badge: 'Community Event',
      gradient: 'from-rose-600 via-pink-600 to-red-700',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    },
    {
      id: 3,
      title: '24/7 Ward Complaint Hotline Active',
      subtitle: 'Log streetlight or garbage issues with immediate engineer dispatch.',
      badge: 'Corporation Help',
      gradient: 'from-amber-600 via-orange-600 to-yellow-600',
      image: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=800&auto=format&fit=crop&q=80',
    },
  ];

  // Automatically move feature slides every 3s (3000ms)
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const currentWardInfo = AVADI_WARDS.find((w) => w.number === (user?.wardNumber || 12)) || AVADI_WARDS[0];

  const quickActions = [
    { code: '3.1', title: t('communityFeed'), subtitle: 'Neighbor posts', icon: MessageSquare, bg: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400', isEmergency: false },
    { code: '4.1', title: t('civicComplaints'), subtitle: 'Report & track', icon: AlertTriangle, bg: 'bg-amber-500/10 text-amber-600 dark:text-amber-400', isEmergency: false },
    { code: '5.0', title: t('emergencySos'), subtitle: 'Instant 24/7 help', icon: ShieldAlert, bg: 'bg-red-500/10 text-red-600 dark:text-red-400', isEmergency: true },
    { code: '6.1', title: t('explorePlaces'), subtitle: 'Parks & Lake', icon: Compass, bg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400', isEmergency: false },
    { code: '7.1', title: t('exploreFood'), subtitle: 'Late-night outlets', icon: Utensils, bg: 'bg-orange-500/10 text-orange-600 dark:text-orange-400', isEmergency: false },
    { code: '8.1', title: t('localServices'), subtitle: 'Electricians & Plumbers', icon: Wrench, bg: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400', isEmergency: false },
    { code: '9.1', title: t('rentalsProperty'), subtitle: 'Homes, Shops, Plots', icon: Building, bg: 'bg-purple-500/10 text-purple-600 dark:text-purple-400', isEmergency: false },
    { code: '9.2', title: t('jobsDirectory'), subtitle: 'Hiring & vacancies', icon: Briefcase, bg: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400', isEmergency: false },
  ];

  const avadiFacts = [
    { title: '48 Wards', desc: 'Covered under Avadi City Municipal Corporation.' },
    { title: 'Paruthipattu Lake', desc: '88-acre restored eco park & bird sanctuary.' },
    { title: 'Defense Hub', desc: 'Home to HVF Arjun Tank Factory, CVRDE & IAF Base.' },
    { title: 'TIDEL Park', desc: 'Pattabiram IT Corridor powering local tech jobs.' },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-4xl mx-auto px-4 pt-4 space-y-6">
        {/* Tamil Greeting Card */}
        <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-700 text-white rounded-3xl p-5 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
            <Sparkles className="w-48 h-48" />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 relative z-10">
            <div
              className="flex items-center space-x-3.5 cursor-pointer group"
              onClick={() => onOpenProfile && onOpenProfile()}
              title="Click to view/edit resident profile"
            >
              <div className="relative">
                <img
                  src={user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'}
                  alt={user?.name || 'Resident'}
                  className="w-12 h-12 rounded-full border-2 border-white/80 object-cover shadow"
                />
                <div className="absolute -bottom-1 -right-1 bg-emerald-500 text-white p-1 rounded-full border border-white shadow">
                  <Camera className="w-2.5 h-2.5" />
                </div>
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-black tracking-tight group-hover:text-emerald-100 transition-colors">
                  {t('vanakkam')}, {user?.name || t('resident')}
                </h2>
                <p className="text-xs text-emerald-100/90 mt-0.5">
                  {t('welcomeHub')} • {t('tapToEditProfile')}
                </p>
              </div>
            </div>

            <div className="bg-white/15 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20 flex items-center space-x-3 self-stretch sm:self-auto">
              <div className="p-2 rounded-xl bg-white/20">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-emerald-100 font-bold">{t('currentWard')}</span>
                <p className="text-sm font-black text-white">
                  {t('ward')} {currentWardInfo.number} • {currentWardInfo.name}
                </p>
                <p className="text-[11px] text-emerald-200/80">{currentWardInfo.community}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Feature Sliders / Carousel with Left & Right Arrow Buttons */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center">
              <Sparkles className="w-5 h-5 text-emerald-500 mr-2" />
              <span>Announcements & Feature Sliders</span>
            </h3>
            <div className="flex space-x-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveSlide(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    activeSlide === idx ? 'bg-emerald-600 dark:bg-emerald-400 w-6' : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden shadow-lg h-48 sm:h-60 group">
            <img
              src={slides[activeSlide].image}
              alt={slides[activeSlide].title}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent p-5 sm:p-6 flex flex-col justify-between">
              <span className="inline-block text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/20 self-start">
                {slides[activeSlide].badge}
              </span>
              <div>
                <h4 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {slides[activeSlide].title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-200 mt-1 line-clamp-2">
                  {slides[activeSlide].subtitle}
                </p>
              </div>
            </div>

            <button
              onClick={prevSlide}
              className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg active:scale-95"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110 shadow-lg active:scale-95"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

        {/* Quick Actions Grid */}
        <section className="space-y-3">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {t('quickActions')}
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {quickActions.map((action) => {
              const IconComp = action.icon;
              return (
                <div
                  key={action.code}
                  onClick={() => setCurrentScreen(action.code)}
                  className={`p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-lg hover:border-emerald-500/50 transition-all cursor-pointer group flex flex-col justify-between ${
                    action.isEmergency ? 'ring-2 ring-red-500/30' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-2xl ${action.bg} group-hover:scale-110 transition-transform`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <div className="mt-3">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400">
                      {action.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {action.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Facts Section */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <div className="flex items-center space-x-2 text-slate-900 dark:text-white">
            <Info className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h3 className="text-base font-bold">{t('quickFacts')}</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {avadiFacts.map((fact) => (
              <div key={fact.title} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <h4 className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400">{fact.title}</h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{fact.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Travel Section: Bus & Train Buttons */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">{t('localTravel')}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">{t('nearbyStop')}</p>
            </div>

            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
              <button
                onClick={() => setActiveTravelTab('bus')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTravelTab === 'bus'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <Bus className="w-4 h-4" />
                <span>{t('bus')}</span>
              </button>
              <button
                onClick={() => setActiveTravelTab('train')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTravelTab === 'train'
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <Train className="w-4 h-4" />
                <span>{t('train')}</span>
              </button>
            </div>
          </div>

          {activeTravelTab === 'bus' ? (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1" />
                Nearby Stop: Avadi Railway Station Bus Stop (Ward 12)
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {BUS_SCHEDULES.map((bus) => (
                  <div key={bus.routeNo} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="px-2.5 py-1 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 font-extrabold text-xs">
                        Route {bus.routeNo}
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                        {bus.nextBus}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-2">
                      {bus.origin} ➔ {bus.destination}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      Via: {bus.via}
                    </p>
                    <div className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700 text-[10px] text-slate-400 font-medium">
                      Freq: {bus.frequency}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 flex items-center">
                <Train className="w-3.5 h-3.5 mr-1" />
                Avadi Railway Station Suburban Timetable
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {TRAIN_SCHEDULES.map((trn) => (
                  <div key={trn.trainNo} className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                        {trn.trainNo}
                      </span>
                      <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950 px-2 py-0.5 rounded-full">
                        {trn.platform}
                      </span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                      {trn.trainName}
                    </h4>
                    <div className="mt-2 flex items-center justify-between text-xs">
                      <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
                        Dep: {trn.departure}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        {trn.frequency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
