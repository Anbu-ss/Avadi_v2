import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { useLanguage } from '../../context/LanguageContext';
import { RENTAL_PROPERTIES, AVADI_WARDS } from '../../mock/mockData';
import type { RentalProperty } from '../../types';
import { JobsListing } from './JobsListing';
import { MapPin, PhoneCall, Home, Briefcase, Plus, X, Send } from 'lucide-react';

export const RentalJobsHome: React.FC = () => {
  const { user, currentScreen, setCurrentScreen } = useAuth();
  const { showToast } = useAppData();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'rentals' | 'jobs'>(
    currentScreen === '9.2' ? 'jobs' : 'rentals'
  );

  const [propertyList, setPropertyList] = useState<RentalProperty[]>(RENTAL_PROPERTIES);
  const [isPostRentalModalOpen, setIsPostRentalModalOpen] = useState(false);

  // New Rental Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'1BHK' | '2BHK' | '3BHK' | 'Commercial Shop' | 'Plot / Land'>('2BHK');
  const [newRent, setNewRent] = useState('₹12,000 / month');
  const [newDeposit, setNewDeposit] = useState('₹50,000');
  const [newAddress, setNewAddress] = useState('Market Road, Avadi');
  const [newWard, setNewWard] = useState('Ward 12');
  const [newAmenities, setNewAmenities] = useState('24/7 Water, Covered Parking');
  const [newOwnerName, setNewOwnerName] = useState(user?.name || 'Property Owner');
  const [newPhone, setNewPhone] = useState(user?.mobile || '9876543210');

  useEffect(() => {
    if (currentScreen === '9.2') {
      setActiveTab('jobs');
    } else if (currentScreen === '9.1') {
      setActiveTab('rentals');
    }
  }, [currentScreen]);

  const handleTabChange = (tab: 'rentals' | 'jobs') => {
    setActiveTab(tab);
    setCurrentScreen(tab === 'jobs' ? '9.2' : '9.1');
  };

  const handleCreateRentalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const amArray = newAmenities.split(',').map((s) => s.trim()).filter(Boolean);

    const createdProperty: RentalProperty = {
      id: `rental-${Date.now()}`,
      title: newTitle,
      propertyType: newType,
      rent: newRent,
      deposit: newDeposit,
      image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=600&q=80',
      address: newAddress,
      ward: newWard,
      amenities: amArray.length > 0 ? amArray : ['Water Supply', 'Good Location'],
      ownerName: newOwnerName,
      phone: newPhone,
      postedDate: 'Just now',
    };

    setPropertyList((prev) => [createdProperty, ...prev]);
    showToast(`Rental property listing "${newTitle}" posted successfully!`, 'success');

    setNewTitle('');
    setIsPostRentalModalOpen(false);
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors relative min-h-screen">
      <div className="max-w-4xl mx-auto px-4 pt-4 pb-12 space-y-4">
        {/* Header with Dual Buttons */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-700 text-white rounded-3xl p-6 shadow-xl space-y-4">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest bg-white/20 px-2.5 py-1 rounded-full text-purple-100">
              Ward Classifieds & Employment Hub
            </span>
            <h2 className="text-2xl font-black mt-2 flex items-center">
              {activeTab === 'rentals' ? (
                <>
                  <Home className="w-6 h-6 mr-2 text-purple-200" />
                  <span>{t('rentalsProperty')}</span>
                </>
              ) : (
                <>
                  <Briefcase className="w-6 h-6 mr-2 text-purple-200" />
                  <span>{t('jobsDirectory')}</span>
                </>
              )}
            </h2>
            <p className="text-xs text-purple-100/90 mt-0.5">
              {activeTab === 'rentals'
                ? 'Browse hyper-local house, shop & plot rentals in Avadi'
                : 'Explore local job openings in Avadi retail shops, TIDEL Park IT hub & factories'}
            </p>
          </div>

          {/* Dual Toggle Buttons */}
          <div className="flex bg-slate-950/40 p-1.5 rounded-2xl border border-white/20 gap-2">
            <button
              onClick={() => handleTabChange('rentals')}
              className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'rentals'
                  ? 'bg-white text-purple-900 shadow-lg scale-[1.02]'
                  : 'text-purple-100 hover:bg-white/10'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{t('rentalsProperty')}</span>
            </button>

            <button
              onClick={() => handleTabChange('jobs')}
              className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all flex items-center justify-center space-x-2 ${
                activeTab === 'jobs'
                  ? 'bg-white text-purple-900 shadow-lg scale-[1.02]'
                  : 'text-purple-100 hover:bg-white/10'
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>{t('jobsDirectory')}</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'rentals' ? (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Available Rentals in Avadi
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {propertyList.map((prop) => (
                <article
                  key={prop.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={prop.image}
                      alt={prop.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-white text-[10px] font-bold">
                      {prop.propertyType}
                    </div>
                    <div className="absolute bottom-3 left-3 px-3 py-1 rounded-xl bg-emerald-600 text-white text-xs font-black shadow">
                      {prop.rent}
                    </div>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-bold text-slate-900 dark:text-white leading-tight">
                        {prop.title}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center mt-1">
                        <MapPin className="w-3.5 h-3.5 mr-1 text-purple-500 shrink-0" />
                        <span className="truncate">{prop.address} ({prop.ward})</span>
                      </p>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {prop.amenities.map((am) => (
                          <span
                            key={am}
                            className="px-2.5 py-0.5 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300 text-[10px] font-semibold"
                          >
                            ✓ {am}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-medium">Owner / Contact</span>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{prop.ownerName}</span>
                      </div>

                      <a
                        href={`tel:${prop.phone}`}
                        className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-md flex items-center space-x-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Call Owner</span>
                      </a>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Floating Fixed Position Post Rental Property Button (Right Side Middle) */}
            <button
              onClick={() => setIsPostRentalModalOpen(true)}
              className="fixed top-1/2 -translate-y-1/2 right-3 sm:right-6 z-40 px-4 py-3 sm:px-5 sm:py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-600 text-white font-bold text-xs sm:text-sm shadow-2xl shadow-purple-600/50 flex items-center space-x-2 hover:scale-105 active:scale-95 transition-all ring-4 ring-white dark:ring-slate-900 cursor-pointer"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="hidden xs:inline sm:inline">Post Rental Property</span>
              <span className="xs:hidden sm:hidden">Post Rental</span>
            </button>
          </div>
        ) : (
          <JobsListing />
        )}

        {/* Post Rental Property Modal */}
        {isPostRentalModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsPostRentalModalOpen(false)} />
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl z-10 border border-purple-500 space-y-4 max-h-[85vh] overflow-y-auto animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div className="flex items-center space-x-2 text-purple-600 dark:text-purple-400">
                  <Home className="w-5 h-5" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Post Rental Property</h3>
                </div>
                <button onClick={() => setIsPostRentalModalOpen(false)} className="p-1 text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleCreateRentalSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Property Title *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Spacious 2 BHK Independent House"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Property Type</label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as any)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none font-semibold"
                    >
                      {['1BHK', '2BHK', '3BHK', 'Commercial Shop', 'Plot / Land'].map((t) => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Rent Amount</label>
                    <input
                      type="text"
                      value={newRent}
                      onChange={(e) => setNewRent(e.target.value)}
                      placeholder="e.g. ₹12,000 / month"
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Deposit Amount</label>
                    <input
                      type="text"
                      value={newDeposit}
                      onChange={(e) => setNewDeposit(e.target.value)}
                      placeholder="e.g. ₹50,000"
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Ward Location</label>
                    <select
                      value={newWard}
                      onChange={(e) => setNewWard(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                    >
                      {AVADI_WARDS.map((w) => (
                        <option key={w.number} value={`Ward ${w.number}`}>
                          Ward {w.number} - {w.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Address / Landmark</label>
                  <input
                    type="text"
                    value={newAddress}
                    onChange={(e) => setNewAddress(e.target.value)}
                    placeholder="e.g. Near Market Road, Kamaraj Nagar"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Key Amenities (Comma Separated)</label>
                  <input
                    type="text"
                    value={newAmenities}
                    onChange={(e) => setNewAmenities(e.target.value)}
                    placeholder="e.g. 24/7 Water, Car Parking, Balcony"
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Owner Name</label>
                    <input
                      type="text"
                      required
                      value={newOwnerName}
                      onChange={(e) => setNewOwnerName(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Phone</label>
                    <input
                      type="tel"
                      required
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs dark:text-white outline-none"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsPostRentalModalOpen(false)}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md flex items-center space-x-1"
                  >
                    <Send className="w-4 h-4" />
                    <span>Publish Listing</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
