import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { X, Image as ImageIcon, Sparkles, Send, Tag, Users, Globe, ChevronLeft, ChevronRight } from 'lucide-react';

interface CreatePostModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const { addPost, showToast } = useAppData();

  const [audience, setAudience] = useState<'My Ward' | 'All Avadi'>('My Ward');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<'General' | 'Civic Issue' | 'Event' | 'Announcement' | 'Alert'>('General');
  const [images, setImages] = useState<string[]>([]);
  const [isAddingTag, setIsAddingTag] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const inspirationTips = [
    '💡 Share neighborhood safety & road alerts',
    '🌳 Highlight local park or lake cleanup drives',
    '🤝 Request help or recommend local Avadi services',
    '📢 Post community welfare announcements',
    '🚨 Report urgent water supply or power outage update',
  ];

  const handleScrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -150, behavior: 'smooth' });
  };

  const handleScrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 150, behavior: 'smooth' });
  };

  const handleAddSampleImage = () => {
    if (images.length >= 2) {
      showToast('Maximum 2 photos allowed per post.', 'info');
      return;
    }
    const samplePhotos = [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=800&auto=format&fit=crop&q=80',
    ];
    setImages((prev) => [...prev, samplePhotos[prev.length % samplePhotos.length]]);
    showToast('Photo attached!', 'success');
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    addPost({
      authorName: user?.name || 'Resident',
      authorWard: `Ward ${user?.wardNumber || 12} - ${user?.wardName || 'Kamaraj Nagar'}`,
      authorAvatar: user?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      timestamp: 'Just now',
      content,
      category,
      images,
      wardTag: `Ward ${user?.wardNumber || 12}`,
      audience,
    });

    setContent('');
    setImages([]);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-150">
        <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5" />
            <h3 className="font-bold text-base">Create Community Post</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handlePostSubmit} className="p-5 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Inspiration Sliders with Left & Right Buttons */}
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
            <div className="flex items-center justify-between mb-1">
              <span className="font-extrabold text-emerald-800 dark:text-emerald-300">
                Need inspiration?
              </span>
              <div className="flex space-x-1">
                <button
                  type="button"
                  onClick={handleScrollLeft}
                  className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={handleScrollRight}
                  className="p-1 rounded-md bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 hover:bg-emerald-200"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
              {inspirationTips.map((tip, i) => (
                <span
                  key={i}
                  onClick={() => setContent((prev) => (prev ? `${prev}\n${tip}` : tip))}
                  className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 whitespace-nowrap cursor-pointer hover:border-emerald-500 font-medium"
                >
                  {tip}
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5">
              Audience Scope
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setAudience('My Ward')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center space-x-1.5 transition-all ${
                  audience === 'My Ward'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>My Ward Only (Ward {user?.wardNumber || 12})</span>
              </button>

              <button
                type="button"
                onClick={() => setAudience('All Avadi')}
                className={`py-2 px-3 rounded-xl text-xs font-bold border flex items-center justify-center space-x-1.5 transition-all ${
                  audience === 'All Avadi'
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm'
                    : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Globe className="w-3.5 h-3.5" />
                <span>All Avadi Corporation</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Description / Message
            </label>
            <textarea
              required
              rows={4}
              placeholder="What's happening in your ward? Share updates, news, or ask neighbors..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Attach Pictures (Up to 2 photos)
              </label>
              <span className="text-[11px] text-slate-400">{images.length}/2 attached</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleAddSampleImage}
                className="py-2.5 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:border-emerald-500 flex items-center space-x-1.5"
              >
                <ImageIcon className="w-4 h-4 text-emerald-500" />
                <span>Attach Photo</span>
              </button>

              {images.map((img, idx) => (
                <div key={idx} className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-300">
                  <img src={img} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => setImages((prev) => prev.filter((_, i) => i !== idx))}
                    className="absolute top-0 right-0 p-0.5 bg-red-600 text-white rounded-bl"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center">
                <Tag className="w-3.5 h-3.5 mr-1 text-emerald-500" />
                Category Tag
              </label>
              <button
                type="button"
                onClick={() => setIsAddingTag(!isAddingTag)}
                className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold"
              >
                {isAddingTag ? 'Done' : 'Change Tag'}
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {(['General', 'Civic Issue', 'Event', 'Announcement', 'Alert'] as const).map((cat) => (
                <button
                  type="button"
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all ${
                    category === cat
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-500'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  #{cat}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 flex justify-end space-x-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white text-xs font-bold shadow-lg shadow-emerald-600/30 flex items-center space-x-1.5"
            >
              <Send className="w-4 h-4" />
              <span>Post Now</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
