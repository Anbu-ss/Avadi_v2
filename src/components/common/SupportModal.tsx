import React, { useState } from 'react';
import { useAppData } from '../../context/AppDataContext';
import { X, Send, Star, Bug, Lightbulb, MessageSquare, Phone, Mail, Clock, Headphones } from 'lucide-react';

export type SupportModalType = 'feedback' | 'bug' | 'feature' | 'contact' | null;

interface SupportModalProps {
  type: SupportModalType;
  onClose: () => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ type, onClose }) => {
  const { showToast } = useAppData();
  const [rating, setRating] = useState<number>(5);
  const [message, setMessage] = useState<string>('');
  const [category, setCategory] = useState<string>('General');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  if (!type) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      if (type === 'feedback') {
        showToast('Thank you for your feedback! We appreciate your thoughts.', 'success');
      } else if (type === 'bug') {
        showToast('Bug report submitted to Avadi Tech Team. Ticket #BUG-' + Math.floor(1000 + Math.random() * 9000), 'success');
      } else if (type === 'feature') {
        showToast('Feature suggestion recorded! Thanks for making Avadi Connect better.', 'success');
      }
      setMessage('');
      onClose();
    }, 600);
  };

  const getHeaderInfo = () => {
    switch (type) {
      case 'feedback':
        return {
          title: 'Send Feedback',
          subtitle: 'Share your experience with Avadi Connect',
          icon: MessageSquare,
          gradient: 'from-emerald-600 to-teal-700',
        };
      case 'bug':
        return {
          title: 'Report a Bug',
          subtitle: 'Found an issue? Let our engineering team fix it',
          icon: Bug,
          gradient: 'from-rose-600 to-red-700',
        };
      case 'feature':
        return {
          title: 'Suggest a Feature',
          subtitle: 'Propose new tools for Avadi Ward Residents',
          icon: Lightbulb,
          gradient: 'from-amber-600 to-orange-700',
        };
      case 'contact':
        return {
          title: 'Contact Support',
          subtitle: 'Reach out to Avadi City Corporation Helpdesk',
          icon: Headphones,
          gradient: 'from-cyan-600 to-blue-700',
        };
      default:
        return { title: 'Support', subtitle: '', icon: Headphones, gradient: 'from-emerald-600 to-teal-700' };
    }
  };

  const info = getHeaderInfo();
  const IconComponent = info.icon;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-150">
        <div className={`p-5 bg-gradient-to-r ${info.gradient} text-white flex items-center justify-between`}>
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-2xl bg-white/15 backdrop-blur-md">
              <IconComponent className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg leading-tight">{info.title}</h3>
              <p className="text-xs text-white/80 mt-0.5">{info.subtitle}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {type === 'contact' ? (
          <div className="p-5 space-y-4">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400">Toll-Free Helpline</span>
                  <p className="text-sm font-black text-slate-900 dark:text-white">1800-425-4500</p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">24/7 Civic Helpline Active</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400">Support Email</span>
                  <p className="text-sm font-black text-slate-900 dark:text-white">support@avadi.gov.in</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2 border-t border-slate-200 dark:border-slate-700">
                <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase text-slate-400">Office Hours</span>
                  <p className="text-xs font-bold text-slate-800 dark:text-white">Mon - Sat: 9:00 AM - 5:30 PM</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Avadi Corporation HQ, NM Road</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-colors"
            >
              Close Support Info
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {type === 'feedback' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Rating
                </label>
                <div className="flex items-center space-x-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none transition-transform hover:scale-110"
                    >
                      <Star
                        className={`w-7 h-7 ${
                          star <= rating
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300 ml-2">
                    {rating}/5 Stars
                  </span>
                </div>
              </div>
            )}

            {type === 'bug' && (
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Issue Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
                >
                  <option value="General">General App Glitch</option>
                  <option value="Feed">Community Feed Issue</option>
                  <option value="Complaints">Civic Complaint Wizard Issue</option>
                  <option value="SOS">Emergency SOS Hotline Issue</option>
                  <option value="Profile">Profile / Photo Edit Issue</option>
                </select>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                {type === 'feedback'
                  ? 'Your Comments'
                  : type === 'bug'
                  ? 'Describe the Bug'
                  : 'Describe your Feature Idea'}
              </label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  type === 'feedback'
                    ? 'Tell us what you like or how we can improve...'
                    : type === 'bug'
                    ? 'What happened? Mention steps to reproduce...'
                    : 'Describe the feature you would love to see in Avadi Connect...'
                }
                className="w-full p-3 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
              />
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold shadow-md flex items-center space-x-1.5 transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isSubmitting ? 'Submitting...' : 'Submit'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
