import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useAppData } from '../context/AppDataContext';
import { useLanguage } from '../context/LanguageContext';
import {
  ShieldAlert,
  PhoneCall,
  Flame,
  Ambulance,
  Siren,
  HeartHandshake,
  X,
  Send,
  Sparkles,
} from 'lucide-react';

export const EmergencySOS: React.FC = () => {
  const { user, setCurrentScreen } = useAuth();
  const { addPost, showToast } = useAppData();
  const { language } = useLanguage();

  const [isSosActive, setIsSosActive] = useState(false);
  const [sosCountdown, setSosCountdown] = useState(5);
  const [isBloodModalOpen, setIsBloodModalOpen] = useState(false);
  const [bloodGroupNeeded, setBloodGroupNeeded] = useState('O+');
  const [hospitalName, setHospitalName] = useState('Avadi Government Hospital');
  const [contactNumber, setContactNumber] = useState(user?.mobile || '9876543210');

  const handleTriggerSOS = () => {
    setIsSosActive(true);
    let count = 5;
    const interval = setInterval(() => {
      count -= 1;
      setSosCountdown(count);
      if (count <= 0) {
        clearInterval(interval);
        showToast('🚨 EMERGENCY SOS BROADCASTED! Avadi Police & Emergency Contacts notified with GPS location.', 'error');
      }
    }, 1000);
  };

  const handleCancelSOS = () => {
    setIsSosActive(false);
    setSosCountdown(5);
    showToast('Emergency SOS cancelled.', 'info');
  };

  const handleBloodRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPost({
      authorName: user?.name || 'Ward Resident',
      authorWard: `Ward ${user?.wardNumber || 12} • ${user?.wardName || 'Avadi'}`,
      authorAvatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      timestamp: 'Just now',
      content: `🚨 URGENT EMERGENCY BLOOD REQUIRED!\nBlood Group Needed: ${bloodGroupNeeded}\nHospital / Location: ${hospitalName}\nContact Phone: ${contactNumber}\n\nPlease reach out immediately if you or someone you know can donate!`,
      category: 'Alert',
      wardTag: `Ward ${user?.wardNumber || 12}`,
      audience: 'All Avadi',
      isEmergencyBlood: true,
      bloodGroupNeeded,
      hospitalName,
      contactNumber,
    });

    showToast(`🚨 Urgent ${bloodGroupNeeded} Blood Request posted to Avadi Community Feed!`, 'success');
    setIsBloodModalOpen(false);
    setCurrentScreen('3.1');
  };

  const emergencyContacts = [
    {
      category: language === 'ta' ? 'காவல் துறை சேவைகள்' : 'Police Services',
      icon: Siren,
      color: 'text-blue-500 bg-blue-500/10',
      items: [
        { name: 'Avadi Police Commissionerate (Control Room)', phone: '100 / 044-26372000' },
        { name: 'T6 Avadi Tank Factory Police Station', phone: '044-26382100' },
        { name: 'Thirumullaivoyal Police Station', phone: '044-26371234' },
      ],
    },
    {
      category: language === 'ta' ? 'ஆம்புலன்ஸ் & மருத்துவமனைகள்' : 'Ambulance & Hospitals',
      icon: Ambulance,
      color: 'text-rose-500 bg-rose-500/10',
      items: [
        { name: '108 Emergency Ambulance Dispatch', phone: '108' },
        { name: 'Avadi Government Hospital (NM Road)', phone: '044-26380320' },
        { name: 'Sir Ivan Stedeford Hospital (Ambattur-Avadi)', phone: '044-26801555' },
      ],
    },
    {
      category: language === 'ta' ? 'தீயணைப்பு & பேரிடர் மீட்பு' : 'Fire & Disaster Rescue',
      icon: Flame,
      color: 'text-amber-500 bg-amber-500/10',
      items: [
        { name: 'Avadi Fire Station (MTH Road)', phone: '101 / 044-26380101' },
        { name: 'Avadi Corporation Flood & Disaster Control Room', phone: '044-26376000' },
      ],
    },
  ];

  return (
    <div className="bg-slate-50 dark:bg-slate-950 transition-colors pb-12">
      <div className="max-w-3xl mx-auto px-4 pt-4 space-y-6 text-center">
        {/* SOS Header Card */}
        <section className="bg-gradient-to-r from-red-600 via-rose-600 to-pink-700 text-white rounded-3xl p-6 shadow-xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-4 translate-y-4">
            <ShieldAlert className="w-56 h-56" />
          </div>

          <div className="relative z-10 space-y-3">
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-black uppercase tracking-wider backdrop-blur-md">
              24/7 Avadi Ward Emergency Hotline
            </span>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Emergency SOS Response
            </h1>
            <p className="text-xs text-rose-100 max-w-md mx-auto">
              Tap the SOS button to instantly alert Avadi Corporation Control Room and Emergency First Responders.
            </p>
          </div>
        </section>

        {/* SOS Action Button */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          {!isSosActive ? (
            <div className="space-y-4">
              <button
                onClick={handleTriggerSOS}
                className="w-36 h-36 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 text-white mx-auto shadow-2xl shadow-red-600/50 flex flex-col items-center justify-center space-y-1 ring-8 ring-red-100 dark:ring-red-950/60 hover:scale-105 active:scale-95 transition-all"
              >
                <ShieldAlert className="w-12 h-12 animate-pulse" />
                <span className="text-lg font-black tracking-wider">PRESS SOS</span>
              </button>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                Tap to dispatch emergency alerts to local authorities
              </p>
            </div>
          ) : (
            <div className="p-6 bg-red-50 dark:bg-red-950/40 rounded-2xl border border-red-200 dark:border-red-900 space-y-3 animate-pulse">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-red-600">DISPATCHING SOS SIGNAL</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Broadcasting location details in:
                </p>
                <div className="text-5xl font-mono font-black text-red-600">{sosCountdown}s</div>
                <button
                  onClick={handleCancelSOS}
                  className="w-full py-3 rounded-2xl bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs hover:bg-slate-300"
                >
                  CANCEL SOS
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Critical Emergency Contacts Directory */}
        <section className="space-y-4 text-left">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            Critical Emergency Contacts Directory
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {emergencyContacts.map((sec) => {
              const IconComp = sec.icon;
              return (
                <div
                  key={sec.category}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3"
                >
                  <div className="flex items-center space-x-2.5">
                    <div className={`p-2.5 rounded-2xl ${sec.color}`}>
                      <IconComp className="w-5 h-5" />
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{sec.category}</h4>
                  </div>

                  <div className="space-y-2 pt-1">
                    {sec.items.map((item) => (
                      <div key={item.name} className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 flex items-center justify-between text-xs">
                        <div className="pr-2">
                          <span className="font-semibold text-slate-900 dark:text-white block">{item.name}</span>
                          <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400">{item.phone}</span>
                        </div>
                        <a
                          href={`tel:${item.phone.split('/')[0].trim()}`}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-[11px] font-bold shadow hover:bg-emerald-700 shrink-0 flex items-center space-x-1"
                        >
                          <PhoneCall className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 🩸 REQUEST BLOOD DONATION CARD AT THE END OF THE PAGE */}
        <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-rose-200 dark:border-rose-900/60 shadow-md space-y-4 text-left">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-2xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Emergency Blood Donation</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Broadcast an urgent blood request to all Avadi Ward residents</p>
            </div>
          </div>

          <button
            onClick={() => setIsBloodModalOpen(true)}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-pink-600 to-red-600 hover:from-rose-700 hover:to-pink-700 text-white font-bold text-sm shadow-lg shadow-rose-600/30 flex items-center justify-center space-x-2 transition-all active:scale-98"
          >
            <HeartHandshake className="w-5 h-5" />
            <span>Request Blood Donation</span>
          </button>
        </section>

        {/* Blood Requirement Form Modal */}
        {isBloodModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setIsBloodModalOpen(false)} />
            <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-6 z-10 border border-rose-500 text-left space-y-4 animate-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-rose-600">
                  <HeartHandshake className="w-5 h-5" />
                  <h3 className="font-bold text-base">Blood Requirement Request</h3>
                </div>
                <button onClick={() => setIsBloodModalOpen(false)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleBloodRequestSubmit} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Required Blood Group</label>
                  <select
                    value={bloodGroupNeeded}
                    onChange={(e) => setBloodGroupNeeded(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold dark:text-white"
                  >
                    {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                      <option key={bg} value={bg}>{bg}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Hospital / Patient Details</label>
                  <input
                    type="text"
                    required
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium dark:text-white"
                    placeholder="e.g. Avadi Govt Hospital, ICU Ward 3"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                    className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium dark:text-white"
                    placeholder="Contact mobile number for donors"
                  />
                </div>

                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-[11px] text-rose-700 dark:text-rose-300 flex items-center space-x-2 border border-rose-200 dark:border-rose-900">
                  <Sparkles className="w-4 h-4 shrink-0 text-rose-500" />
                  <span>Submitting will immediately post this request as an Emergency Blood alert in the Community Feed.</span>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-lg flex items-center justify-center space-x-1.5 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Broadcast Emergency Blood Request</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
