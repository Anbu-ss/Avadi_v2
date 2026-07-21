import React, { useState, useRef, useEffect } from 'react';
import { useAuth, DEFAULT_USER_PROFILE } from '../../context/AuthContext';
import { useAppData } from '../../context/AppDataContext';
import { AVADI_WARDS } from '../../mock/mockData';
import { X, User, Phone, Mail, MapPin, Heart, Calendar, Save, Camera, Trash2, Upload, Loader2 } from 'lucide-react';
import type { BloodGroup, Gender } from '../../types';
import { processAndCropProfileImage } from '../../utils/imageUtils';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile, deleteRegistrationDetails } = useAuth();
  const { showToast } = useAppData();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentUser = user || DEFAULT_USER_PROFILE;

  const [name, setName] = useState(currentUser.name);
  const [dob, setDob] = useState(currentUser.dob);
  const [bloodGroup, setBloodGroup] = useState<BloodGroup>(currentUser.bloodGroup);
  const [gender] = useState<Gender>(currentUser.gender);
  const [mobile, setMobile] = useState(currentUser.mobile);
  const [email, setEmail] = useState(currentUser.email);
  const [wardNumber, setWardNumber] = useState<number>(currentUser.wardNumber);
  const [streetName, setStreetName] = useState(currentUser.streetName);
  const [avatarUrl, setAvatarUrl] = useState<string>(currentUser.avatarUrl);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name);
      setDob(currentUser.dob);
      setBloodGroup(currentUser.bloodGroup);
      setMobile(currentUser.mobile);
      setEmail(currentUser.email);
      setWardNumber(currentUser.wardNumber);
      setStreetName(currentUser.streetName);
      setAvatarUrl(currentUser.avatarUrl);
    }
  }, [isOpen, currentUser]);

  if (!isOpen) return null;

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Reset input so re-selecting same file works
    e.target.value = '';
    setIsUploadingImage(true);

    try {
      const croppedDataUrl = await processAndCropProfileImage(file, { targetSize: 500 });
      setAvatarUrl(croppedDataUrl);
      updateProfile({ avatarUrl: croppedDataUrl });
      showToast('Profile picture updated successfully!', 'success');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update profile picture';
      showToast(message, 'error');
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const ward = AVADI_WARDS.find((w) => w.number === wardNumber) || AVADI_WARDS[0];
    updateProfile({
      name,
      dob,
      bloodGroup,
      gender,
      mobile,
      email,
      wardNumber: ward.number,
      wardName: ward.name,
      streetName,
      community: ward.community,
      avatarUrl,
    });
    showToast('Profile updated successfully!', 'success');
    onClose();
  };

  const handleDeleteDetails = () => {
    if (window.confirm('Are you sure you want to delete registration & profile details? You will be logged out.')) {
      deleteRegistrationDetails();
      showToast('Registration details deleted successfully.', 'info');
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden z-10 border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-150">
        <div className="p-5 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className="relative group cursor-pointer"
              onClick={() => !isUploadingImage && fileInputRef.current?.click()}
              title="Click camera icon or avatar to edit profile photo"
            >
              <div className="w-14 h-14 rounded-full border-2 border-white/80 overflow-hidden bg-white/10 flex items-center justify-center relative">
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover rounded-full" />
                {isUploadingImage && (
                  <div className="absolute inset-0 bg-slate-900/70 rounded-full flex items-center justify-center">
                    <Loader2 className="w-6 h-6 text-white animate-spin" />
                  </div>
                )}
              </div>
              {!isUploadingImage && (
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
            <div>
              <h2 className="text-lg font-bold">Resident Profile</h2>
              <p className="text-xs text-emerald-100">Ward {currentUser.wardNumber} Resident</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/20 text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSave} className="p-5 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Profile Photo Upload Section */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div
                className="relative w-12 h-12 rounded-full overflow-hidden border border-slate-300 dark:border-slate-600 bg-slate-100 cursor-pointer group"
                onClick={() => !isUploadingImage && fileInputRef.current?.click()}
                title="Tap to select picture"
              >
                <img src={avatarUrl} alt="Preview" className="w-full h-full rounded-full object-cover" />
                {isUploadingImage ? (
                  <div className="absolute inset-0 bg-slate-900/60 rounded-full flex items-center justify-center">
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-black/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-white">Profile Photo</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">JPG, JPEG, PNG, WEBP formats supported</p>
              </div>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
              onChange={handleImageUpload}
              className="hidden"
            />
            <button
              type="button"
              disabled={isUploadingImage}
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white text-xs font-bold shadow-sm flex items-center space-x-1 transition-all"
            >
              {isUploadingImage ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Change Photo</span>
                </>
              )}
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Date of Birth</label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                  className="w-full pl-9 pr-2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Blood Group</label>
              <div className="relative">
                <Heart className="w-4 h-4 absolute left-3 top-3 text-red-500" />
                <select
                  value={bloodGroup}
                  onChange={(e) => setBloodGroup(e.target.value as BloodGroup)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-semibold focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
                >
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Mobile Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Email ID</label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium dark:text-white"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Assigned Avadi Ward</label>
            <div className="relative">
              <MapPin className="w-4 h-4 absolute left-3 top-3 text-emerald-500" />
              <select
                value={wardNumber}
                onChange={(e) => setWardNumber(Number(e.target.value))}
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-semibold focus:ring-2 focus:ring-emerald-500 outline-none dark:text-white"
              >
                {AVADI_WARDS.map((w) => (
                  <option key={w.number} value={w.number}>
                    Ward {w.number} - {w.name} ({w.community})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">Street Address</label>
            <input
              type="text"
              value={streetName}
              onChange={(e) => setStreetName(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs font-medium dark:text-white"
            />
          </div>

          {/* Delete Details Action */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={handleDeleteDetails}
              className="px-3 py-2 rounded-xl text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 text-xs font-bold flex items-center space-x-1.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Profile Details</span>
            </button>

            <div className="flex space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md flex items-center space-x-1"
              >
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

