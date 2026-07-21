import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppDataProvider } from './context/AppDataContext';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { SettingsProvider } from './context/SettingsContext';
import { Navbar } from './components/common/Navbar';
import { SideDrawer } from './components/common/SideDrawer';
import { BottomNav } from './components/common/BottomNav';
import { ToastContainer } from './components/common/ToastContainer';
import { ProfileModal } from './components/common/ProfileModal';
import { InstallPWABanner } from './components/common/InstallPWABanner';

// Pages imports
import { LandingPage } from './pages/LandingPage';
import { PersonalDetails } from './pages/registration/PersonalDetails';
import { ContactDetails } from './pages/registration/ContactDetails';
import { WardLocation } from './pages/registration/WardLocation';
import { OTPVerification } from './pages/registration/OTPVerification';
import { HomePage } from './pages/HomePage';
import { CommunityFeed } from './pages/feed/CommunityFeed';
import { ComplaintsHome } from './pages/complaints/ComplaintsHome';
import { ReportStepCategory } from './pages/complaints/ReportStepCategory';
import { ReportStepDescribe } from './pages/complaints/ReportStepDescribe';
import { ReportSubmitted } from './pages/complaints/ReportSubmitted';
import { TrackComplaints } from './pages/complaints/TrackComplaints';
import { EmergencySOS } from './pages/EmergencySOS';
import { ExplorePlaces } from './pages/ExplorePlaces';
import { ExploreFood } from './pages/ExploreFood';
import { LocalServices } from './pages/LocalServices';
import { RentalJobsHome } from './pages/rentalsJobs/RentalJobsHome';
import { SettingsPage } from './pages/SettingsPage';
import { AboutAvadiConnect } from './pages/AboutAvadiConnect';

const MainContent: React.FC = () => {
  const { currentScreen } = useAuth();
  const { t } = useLanguage();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const renderScreen = () => {
    switch (currentScreen) {
      case '1.0':
        return <LandingPage />;
      case '2.0':
        return <PersonalDetails />;
      case '2.1':
        return <ContactDetails />;
      case '2.2':
        return <WardLocation />;
      case '3':
        return <OTPVerification />;
      case '3.0':
        return <HomePage onOpenProfile={() => setIsProfileOpen(true)} />;
      case '3.1':
      case '3.2':
        return <CommunityFeed />;
      case '4.1':
        return <ComplaintsHome />;
      case '4.2':
        return <ReportStepCategory />;
      case '4.3':
        return <ReportStepDescribe />;
      case '4.4':
        return <ReportSubmitted />;
      case '4.5':
        return <TrackComplaints />;
      case '5.0':
        return <EmergencySOS />;
      case '6.1':
        return <ExplorePlaces />;
      case '7.1':
        return <ExploreFood />;
      case '8.1':
        return <LocalServices />;
      case '9.1':
      case '9.2':
        return <RentalJobsHome />;
      case '10.0':
        return <SettingsPage />;
      case '11.0':
        return <AboutAvadiConnect />;
      default:
        return <HomePage onOpenProfile={() => setIsProfileOpen(true)} />;
    }
  };

  const getPageTitle = () => {
    switch (currentScreen) {
      case '3.0': return t('homeHub');
      case '3.1': return t('communityFeed');
      case '4.1': return t('civicComplaints');
      case '4.2':
      case '4.3': return t('civicComplaints');
      case '4.4': return t('civicComplaints');
      case '4.5': return t('complaintStatus');
      case '5.0': return t('emergencySos');
      case '6.1': return t('explorePlaces');
      case '7.1': return t('exploreFood');
      case '8.1': return t('localServices');
      case '9.1': return t('rentalsProperty');
      case '9.2': return t('jobsDirectory');
      case '10.0': return t('settingsPreferences');
      case '11.0': return t('aboutAvadiConnect');
      default: return t('appTitle');
    }
  };

  const showNavbar = !['1.0', '2.0', '2.1', '2.2', '3'].includes(currentScreen);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      <InstallPWABanner />

      {showNavbar && (
        <Navbar
          title={getPageTitle()}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenProfile={() => setIsProfileOpen(true)}
          isSimplified={currentScreen === '3.1'}
        />
      )}

      <main className={`flex-1 ${showNavbar ? 'pb-20 md:pb-0' : ''}`}>
        {renderScreen()}
      </main>

      <SideDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <ToastContainer />
      <BottomNav />
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <SettingsProvider>
          <AuthProvider>
            <AppDataProvider>
              <MainContent />
            </AppDataProvider>
          </AuthProvider>
        </SettingsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}

export default App;
