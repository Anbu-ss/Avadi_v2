import React, { createContext, useContext, useState } from 'react';
import type { UserProfile, BloodGroup, Gender } from '../types';
import { AVADI_WARDS } from '../mock/mockData';

interface RegistrationData {
  name: string;
  dob: string;
  bloodGroup: BloodGroup;
  gender: Gender;
  mobile: string;
  email: string;
  wardNumber: number;
  streetName: string;
  community: string;
}

interface AuthContextType {
  user: UserProfile | null;
  registrationData: RegistrationData;
  otpCode: string;
  isOtpSent: boolean;
  updatePersonalDetails: (details: Partial<RegistrationData>) => void;
  updateContactDetails: (contact: Partial<RegistrationData>) => void;
  updateWardDetails: (wardInfo: Partial<RegistrationData>) => void;
  autoFillLocation: () => void;
  generateOTP: () => string;
  verifyOTP: (code: string) => boolean;
  loginAsGuest: () => void;
  logout: () => void;
  updateProfile: (updated: Partial<UserProfile>) => void;
  deleteRegistrationDetails: () => void;
  currentScreen: string;
  setCurrentScreen: (screen: string) => void;
}

const DEFAULT_REGISTRATION: RegistrationData = {
  name: 'Anbarasu S',
  dob: '1996-08-15',
  bloodGroup: 'O+',
  gender: 'Male',
  mobile: '9876543210',
  email: 'anbu.avadi@gmail.com',
  wardNumber: 12,
  streetName: 'Kamaraj Nagar Main Road',
  community: 'Avadi Central Hub',
};

export const DEFAULT_USER_PROFILE: UserProfile = {
  id: 'guest-1',
  name: 'Anbarasu S',
  dob: '1996-08-15',
  bloodGroup: 'O+',
  gender: 'Male',
  mobile: '9876543210',
  email: 'anbu.avadi@gmail.com',
  wardNumber: 12,
  wardName: 'Kamaraj Nagar',
  streetName: 'Kamaraj Nagar 3rd Main Road',
  community: 'Avadi Central Hub',
  isLoggedIn: true,
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [registrationData, setRegistrationData] = useState<RegistrationData>(DEFAULT_REGISTRATION);
  const [otpCode, setOtpCode] = useState<string>('1234');
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);
  const [currentScreen, setCurrentScreen] = useState<string>('1.0');

  const [user, setUser] = useState<UserProfile | null>(() => {
    const savedUser = localStorage.getItem('avadi_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        if (parsed) return parsed;
      } catch (e) {
        console.error('Failed to parse user session', e);
      }
    }
    return DEFAULT_USER_PROFILE;
  });

  const updatePersonalDetails = (details: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...details }));
  };

  const updateContactDetails = (contact: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...contact }));
  };

  const updateWardDetails = (wardInfo: Partial<RegistrationData>) => {
    setRegistrationData((prev) => {
      const updated = { ...prev, ...wardInfo };
      if (wardInfo.wardNumber) {
        const found = AVADI_WARDS.find((w) => w.number === wardInfo.wardNumber);
        if (found) {
          updated.community = found.community;
        }
      }
      return updated;
    });
  };

  const autoFillLocation = () => {
    setRegistrationData((prev) => ({
      ...prev,
      wardNumber: 12,
      streetName: 'Gandhi Statue Main Road (GPS Located)',
      community: 'Avadi Central Hub',
    }));
  };

  const generateOTP = () => {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    setOtpCode(code);
    setIsOtpSent(true);
    return code;
  };

  const verifyOTP = (code: string): boolean => {
    if (code === otpCode || code === '1234' || code.length === 4) {
      const ward = AVADI_WARDS.find((w) => w.number === registrationData.wardNumber) || AVADI_WARDS[0];
      const savedUserRaw = localStorage.getItem('avadi_user');
      let savedAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
      if (savedUserRaw) {
        try {
          const parsed = JSON.parse(savedUserRaw);
          if (parsed.avatarUrl) savedAvatar = parsed.avatarUrl;
        } catch {
          // fallback
        }
      }

      const newUser: UserProfile = {
        id: `usr-${Date.now()}`,
        name: registrationData.name || 'Resident',
        dob: registrationData.dob || '1995-01-01',
        bloodGroup: registrationData.bloodGroup || 'O+',
        gender: registrationData.gender || 'Male',
        mobile: registrationData.mobile || '9876543210',
        email: registrationData.email || 'resident@avadi.gov.in',
        wardNumber: ward.number,
        wardName: ward.name,
        streetName: registrationData.streetName || 'Main Road',
        community: ward.community,
        isLoggedIn: true,
        avatarUrl: savedAvatar,
      };
      setUser(newUser);
      localStorage.setItem('avadi_user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const loginAsGuest = () => {
    const savedUserRaw = localStorage.getItem('avadi_user');
    let savedAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80';
    if (savedUserRaw) {
      try {
        const parsed = JSON.parse(savedUserRaw);
        if (parsed.avatarUrl) savedAvatar = parsed.avatarUrl;
      } catch {
        // fallback
      }
    }

    const defaultUser: UserProfile = {
      id: 'guest-1',
      name: 'Anbarasu',
      dob: '1996-08-15',
      bloodGroup: 'O+',
      gender: 'Male',
      mobile: '9876543210',
      email: 'anbu.avadi@gmail.com',
      wardNumber: 12,
      wardName: 'Kamaraj Nagar',
      streetName: 'Kamaraj Nagar 3rd Main Road',
      community: 'Avadi Central Hub',
      isLoggedIn: true,
      avatarUrl: savedAvatar,
    };
    setUser(defaultUser);
    localStorage.setItem('avadi_user', JSON.stringify(defaultUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('avadi_user');
    setCurrentScreen('1.0');
  };

  const updateProfile = (updated: Partial<UserProfile>) => {
    if (!user) return;
    const updatedUser = { ...user, ...updated };
    setUser(updatedUser);
    try {
      localStorage.setItem('avadi_user', JSON.stringify(updatedUser));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  };

  const deleteRegistrationDetails = () => {
    setRegistrationData(DEFAULT_REGISTRATION);
    setUser(null);
    localStorage.removeItem('avadi_user');
    setCurrentScreen('1.0');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        registrationData,
        otpCode,
        isOtpSent,
        updatePersonalDetails,
        updateContactDetails,
        updateWardDetails,
        autoFillLocation,
        generateOTP,
        verifyOTP,
        loginAsGuest,
        logout,
        updateProfile,
        deleteRegistrationDetails,
        currentScreen,
        setCurrentScreen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
