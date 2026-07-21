export type Language = 'en' | 'ta';

export interface TranslationDictionary {
  [key: string]: {
    en: string;
    ta: string;
  };
}

export const translations: TranslationDictionary = {
  // App & Header
  appTitle: { en: 'Avadi Connect', ta: 'ஆவடி கனெக்ட்' },
  homeHub: { en: 'Home Hub', ta: 'முகப்பு மையம்' },
  settings: { en: 'Settings', ta: 'அமைப்புகள்' },
  generalSettings: { en: 'General Settings', ta: 'பொது அமைப்புகள்' },
  generalDescription: {
    en: 'Manage application language, theme preferences, and notifications.',
    ta: 'செயலியின் மொழி, தீம் மற்றும் அறிவிப்புகளை நிர்வகிக்கவும்.',
  },
  backToHub: { en: 'Back to Hub', ta: 'பின்செல்க' },

  // Language Section
  languagePreference: { en: 'Language Preference', ta: 'மொழி விருப்பம்' },
  selectLanguage: { en: 'Select your preferred language', ta: 'உங்கள் விருப்பமான மொழியைத் தேர்ந்தெடுக்கவும்' },
  english: { en: 'English', ta: 'ஆங்கிலம் (English)' },
  tamil: { en: 'தமிழ் (Tamil)', ta: 'தமிழ்' },
  englishDesc: { en: 'Default system language', ta: 'இயல்புநிலை கணினி மொழி' },
  tamilDesc: { en: 'தமிழ் மொழியில் பயன்படுத்தவும்', ta: 'தமிழ் மொழியில் பயன்படுத்தவும்' },
  languageUpdated: { en: 'Language updated successfully!', ta: 'மொழி வெற்றிகரமாக மாற்றப்பட்டது!' },

  // Theme Section
  theme: { en: 'Theme Mode', ta: 'தீம் முறை' },
  selectTheme: { en: 'Choose your visual appearance preference', ta: 'உங்கள் பார்வை விருப்பத்தை தேர்வு செய்யவும்' },
  lightMode: { en: 'Light Mode', ta: 'லைட் மோட் (வெளிச்சம்)' },
  lightModeDesc: { en: 'Clean bright look', ta: 'தெளிவான வெளிச்சமான தோற்றம்' },
  darkMode: { en: 'Dark Mode', ta: 'டார்க் மோட் (இருள்)' },
  darkModeDesc: { en: 'Easy on the eyes in dark environment', ta: 'இரவில் கண்களுக்கு இதமானது' },
  systemDefault: { en: 'System Default', ta: 'கணினி இயல்புநிலை' },
  systemDefaultDesc: { en: 'Match device system settings', ta: 'சாதன அமைப்புகளுக்கு ஏற்ப பொருந்தும்' },

  // Notifications Section
  notifications: { en: 'Notifications', ta: 'அறிவிப்புகள்' },
  notificationsDesc: {
    en: 'Control alerts and broadcast notifications you receive',
    ta: 'நீங்கள் பெறும் அறிவிப்புகள் மற்றும் விழிப்பூட்டல்களைக் கட்டுப்படுத்தவும்',
  },
  communityUpdates: { en: 'Community Updates', ta: 'சமூக செய்திகள்' },
  communityUpdatesDesc: {
    en: 'Posts and events from neighbors in your ward',
    ta: 'உங்கள் வார்டு குடியிருப்பாளர்களின் பதிவுகள் மற்றும் நிகழ்வுகள்',
  },
  complaintStatus: { en: 'Complaint Status', ta: 'புகார் நிலை' },
  complaintStatusDesc: {
    en: 'Real-time progress updates on civic complaints',
    ta: 'நகராட்சி புகார்களின் நிகழ்நேர நிலை தகவல்கள்',
  },
  govNotifications: { en: 'Government Notifications', ta: 'அரசு மற்றும் மாநகராட்சி தகவல்கள்' },
  govNotificationsDesc: {
    en: 'Avadi City Corporation announcements and water/power alerts',
    ta: 'ஆவடி மாநகராட்சி அறிவிப்புகள் மற்றும் குடிநீர்/மின்சார தகவல்கள்',
  },
  emergencyAlerts: { en: 'Emergency Alerts', ta: 'அவசர விழிப்பூட்டல்கள்' },
  emergencyAlertsDesc: {
    en: 'Urgent 24/7 ward safety and SOS notifications',
    ta: 'அவசர 24/7 வார்டு பாதுகாப்பு மற்றும் SOS அறிவிப்புகள்',
  },

  // About Application Section
  aboutApplication: { en: 'About Application', ta: 'செயலி பற்றி' },
  aboutAppDesc: {
    en: 'System details, version history, privacy policy, and release notes',
    ta: 'செயலி தகவல்கள், பதிப்பு வரலாறு, தனியுரிமை கொள்கை மற்றும் வெளியீட்டு குறிப்புகள்',
  },
  aboutAvadiConnect: { en: 'About Avadi Connect', ta: 'ஆவடி கனெக்ட் பற்றி' },
  viewDetails: { en: 'View Details', ta: 'விவரங்களை பார்க்க' },

  // Support Section
  support: { en: 'Support', ta: 'உதவி & ஆதரவு' },
  supportDesc: {
    en: 'Reach out to helpdesk, report issues, or suggest new features',
    ta: 'உதவி மையத்தை தொடர்பு கொள்ள, கருத்து தெரிவிக்க அல்லது புகார்களை அனுப்ப',
  },
  contactSupport: { en: 'Contact Support', ta: 'உதவி மையத்தை தொடர்பு கொள்ள' },
  contactSupportDesc: { en: '24/7 Hotline & Email helpdesk', ta: '24/7 அவசர உதவி எண் & மின்னஞ்சல்' },
  sendFeedback: { en: 'Send Feedback', ta: 'கருத்து தெரிவிக்க' },
  sendFeedbackDesc: { en: 'Rate & share your thoughts', ta: 'மதிப்பீடு மற்றும் கருத்துக்களை பகிர்' },
  reportBug: { en: 'Report a Bug', ta: 'பிழை அறிக்கை அனுப்ப' },
  reportBugDesc: { en: 'Flag technical glitch to engineering', ta: 'தொழில்நுட்ப பிழைகளை பொறியியலாளர்களுக்கு அனுப்ப' },
  suggestFeature: { en: 'Suggest a Feature', ta: 'புதிய வசதியை பரிந்துரைக்க' },
  suggestFeatureDesc: { en: 'Propose new tools for residents', ta: 'குடியிருப்பாளர்களுக்கான புதிய வசதிகளை முன்மொழிய' },

  // Logout Section
  logout: { en: 'Logout', ta: 'வெளியேறு' },
  logoutConfirm: { en: 'Are you sure you want to log out?', ta: 'நீங்கள் நிச்சயமாக வெளியேற விரும்புகிறீர்களா?' },
  logoutDialogTitle: { en: 'Log Out Confirmation', ta: 'வெளியேறு உறுதிப்படுத்தல்' },
  cancel: { en: 'Cancel', ta: 'ரத்து செய்' },
  confirmLogout: { en: 'Logout', ta: 'வெளியேறு' },

  // Navigation & Actions
  home: { en: 'Home', ta: 'முகப்பு' },
  feed: { en: 'Feed', ta: 'செய்திகள்' },
  complaints: { en: 'Complaints', ta: 'புகார்கள்' },
  sos: { en: 'SOS Emergency', ta: 'அவசர SOS' },
  explore: { en: 'Explore', ta: 'ஆராய்க' },
  communityFeed: { en: 'Community Feed', ta: 'சமூக ஏடு' },
  civicComplaints: { en: 'Civic Complaints', ta: 'நகர புகார்கள்' },
  emergencySos: { en: 'Emergency SOS', ta: 'அவசர SOS' },
  explorePlaces: { en: 'Explore Places', ta: 'இடங்களை ஆராய்க' },
  exploreFood: { en: 'Explore Food & Night', ta: 'உணவு & இரவு நேர உணவகங்கள்' },
  localServices: { en: 'Local Services', ta: 'உள்ளூர் சேவைகள்' },
  rentalsProperty: { en: 'Rentals & Property', ta: 'வாடகை & சொத்துக்கள்' },
  jobsDirectory: { en: 'Jobs Directory', ta: 'வேலைவாய்ப்பு கோப்பகம்' },
  mainFeatures: { en: 'Main Features', ta: 'முக்கிய அம்சங்கள்' },
  accountPreferences: { en: 'Account & Preferences', ta: 'கணக்கு & விருப்பங்கள்' },
  settingsPreferences: { en: 'Settings & Preferences', ta: 'அமைப்புகள் & விருப்பங்கள்' },
  lightTheme: { en: 'Light Theme', ta: 'வெளிச்சமான தீம்' },
  darkTheme: { en: 'Dark Theme', ta: 'இருண்ட தீம்' },
  logOutMenu: { en: 'Log Out', ta: 'வெளியேறு' },

  // Home Hub Specific Translations
  vanakkam: { en: 'Vanakkam', ta: 'வணக்கம்' },
  welcomeHub: { en: 'Welcome back to your ward civic hub', ta: 'உங்கள் வார்டு மையத்திற்கு மீண்டும் நல்வரவு' },
  tapToEditProfile: { en: 'Tap to edit profile', ta: 'சுயவிவரத்தை திருத்த தட்டவும்' },
  currentWard: { en: 'Current Ward', ta: 'தற்போதைய வார்டு' },
  ward: { en: 'Ward', ta: 'வார்டு' },
  resident: { en: 'Resident', ta: 'குடியிருப்பாளர்' },
  announcements: { en: 'Announcements & Feature Sliders', ta: 'அறிவிப்புகள் மற்றும் முக்கிய செய்திகள்' },
  quickActions: { en: 'Quick Actions', ta: 'விரைவு சேவைகள்' },
  quickFacts: { en: 'Quick Facts About Avadi Ward', ta: 'ஆவடி வார்டு பற்றிய முக்கிய தகவல்கள்' },
  localTravel: { en: 'Local Travel & Timings', ta: 'உள்ளூர் பேருந்து & இரயில் நேரங்கள்' },
  nearbyStop: { en: 'Nearby Stop: Avadi Railway Station Bus Stop', ta: 'அருகிலுள்ள நிறுத்தம்: ஆவடி இரயில் நிலைய பேருந்து நிறுத்தம்' },
  bus: { en: 'Bus', ta: 'பேருந்து' },
  train: { en: 'Train', ta: 'இரயில்' },
  route: { en: 'Route', ta: 'தடம்' },

  // General Labels
  enabled: { en: 'Enabled', ta: 'செயல்படுத்தப்பட்டது' },
  disabled: { en: 'Disabled', ta: 'முடக்கப்பட்டது' },
  activePreference: { en: 'Active Preference', ta: 'தற்போது செயல்படுகிறது' },
  saveChanges: { en: 'Save Preferences', ta: 'விருப்பங்களை சேமிக்க' },
  preferencesSaved: { en: 'Settings saved successfully!', ta: 'அமைப்புகள் வெற்றிகரமாக சேமிக்கப்பட்டன!' },
};
