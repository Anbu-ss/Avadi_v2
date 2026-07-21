import React, { createContext, useContext, useState } from 'react';

export interface NotificationSettings {
  communityUpdates: boolean;
  complaintStatus: boolean;
  govNotifications: boolean;
  emergencyAlerts: boolean;
}

interface SettingsContextType {
  notifications: NotificationSettings;
  toggleNotification: (key: keyof NotificationSettings) => void;
  setAllNotifications: (settings: NotificationSettings) => void;
}

const DEFAULT_NOTIFICATIONS: NotificationSettings = {
  communityUpdates: true,
  complaintStatus: true,
  govNotifications: true,
  emergencyAlerts: true,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<NotificationSettings>(() => {
    const saved = localStorage.getItem('avadi_notifications');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse notification settings', e);
      }
    }
    return DEFAULT_NOTIFICATIONS;
  });

  const toggleNotification = (key: keyof NotificationSettings) => {
    setNotifications((prev) => {
      const updated = { ...prev, [key]: !prev[key] };
      localStorage.setItem('avadi_notifications', JSON.stringify(updated));
      return updated;
    });
  };

  const setAllNotifications = (newSettings: NotificationSettings) => {
    setNotifications(newSettings);
    localStorage.setItem('avadi_notifications', JSON.stringify(newSettings));
  };

  return (
    <SettingsContext.Provider value={{ notifications, toggleNotification, setAllNotifications }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
