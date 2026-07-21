import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { AVADI_WARDS } from '../../mock/mockData';
import { Camera, MapPin, ArrowLeft, Send, X, Image as ImageIcon } from 'lucide-react';

export const ReportStepDescribe: React.FC = () => {
  const { user, setCurrentScreen } = useAuth();
  const { addComplaint, showToast } = useAppData();

  const category = (localStorage.getItem('temp_complaint_category') || 'Streetlight') as any;

  const [description, setDescription] = useState('');
  const [address, setAddress] = useState(user?.streetName || 'Kamaraj Nagar 3rd Main Road, Avadi');
  const [wardNumber, setWardNumber] = useState<number>(user?.wardNumber || 12);
  const [images, setImages] = useState<string[]>([]);

  const handleAddSamplePhoto = () => {
    if (images.length >= 2) {
      showToast('Maximum 2 photo attachments allowed.', 'info');
      return;
    }
    const samplePhotos = [
      'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800&auto=format&fit=crop&q=80',
    ];
    setImages((prev) => [...prev, samplePhotos[prev.length % samplePhotos.length]]);
    showToast('Photo evidence attached!', 'success');
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim() || !address.trim()) return;

    const selectedWard = AVADI_WARDS.find((w) => w.number === wardNumber) || AVADI_WARDS[0];

    const issueId = addComplaint({
      category,
      description,
      images,
      address,
      wardNumber: selectedWard.number,
      wardName: selectedWard.name,
    });

    localStorage.setItem('last_created_issue_id', issueId);
    showToast(`Complaint ${issueId} submitted successfully!`, 'success');
    setCurrentScreen('4.4'); // Submitted Confirmation
  };

  return (
    <div className="bg-slate-50 dark:bg-slate-950 flex flex-col justify-between p-4 transition-colors">
      <div className="max-w-md mx-auto w-full flex-1 flex flex-col justify-center py-6">
        {/* Step Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-amber-600 dark:text-amber-400 font-bold">Step 2 of 2</span>
            <span>Describe & Evidence</span>
          </div>
          <div className="w-full bg-slate-200 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 h-full w-full transition-all duration-300" />
          </div>
        </div>

        <div className="text-center mb-6">
          <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300">
            Category: {category}
          </span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-2">Describe the Issue</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Provide details, photo evidence and exact address for ward technicians
          </p>
        </div>

        <form onSubmit={handleSubmitReport} className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 space-y-4">
          {/* Description text field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Issue Description *
            </label>
            <textarea
              required
              rows={4}
              placeholder="e.g. Non-functional streetlight pole near junction 3. Extremely dark after 7 PM..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none resize-none"
            />
          </div>

          {/* Photo Attachment (Up to 2 photos) */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center">
                <Camera className="w-4 h-4 mr-1.5 text-amber-500" />
                Attach Evidence Photos (Max 2)
              </label>
              <span className="text-[11px] text-slate-400">{images.length}/2</span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={handleAddSamplePhoto}
                className="py-2.5 px-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-bold hover:bg-amber-100 flex items-center space-x-1.5"
              >
                <ImageIcon className="w-4 h-4 text-amber-600" />
                <span>Attach Photo</span>
              </button>

              {images.map((img, idx) => (
                <div key={idx} className="relative w-12 h-12 rounded-xl overflow-hidden border border-slate-300">
                  <img src={img} alt="Evidence" className="w-full h-full object-cover" />
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

          {/* Address field */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Street Address & Landmark *
            </label>
            <input
              type="text"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
            />
          </div>

          {/* Ward selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              Select Ward *
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3.5 top-3.5 text-amber-500" />
              <select
                value={wardNumber}
                onChange={(e) => setWardNumber(Number(e.target.value))}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-bold text-slate-900 dark:text-white focus:ring-2 focus:ring-amber-500 outline-none"
              >
                {AVADI_WARDS.map((w) => (
                  <option key={w.number} value={w.number}>
                    Ward {w.number} - {w.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Wizard Buttons */}
          <div className="pt-4 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setCurrentScreen('4.2')}
              className="py-3 px-5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center space-x-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-orange-600 to-red-600 hover:from-amber-600 hover:to-red-700 text-white text-sm font-bold shadow-lg shadow-orange-500/30 flex items-center space-x-2"
            >
              <span>Submit Report</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
