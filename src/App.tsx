import React from 'react';
import { FootballProvider, useFootball } from './context/FootballContext';
import { DeviceFrame } from './components/common/DeviceFrame';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { ScoresView } from './components/scores/ScoresView';
import { StandingsView } from './components/standings/StandingsView';
import { FavoritesView } from './components/favorites/FavoritesView';
import { SearchView } from './components/search/SearchView';
import { SettingsView } from './components/settings/SettingsView';
import { MatchDetailsModal } from './components/match-details/MatchDetailsModal';

const AppContent: React.FC = () => {
  const { activeTab } = useFootball();

  return (
    <DeviceFrame>
      {/* Top Application Bar */}
      <Header />

      {/* Main Tab Screens */}
      <main className="flex-1 flex flex-col">
        {activeTab === 'scores' && <ScoresView />}
        {activeTab === 'favorites' && <FavoritesView />}
        {activeTab === 'standings' && <StandingsView />}
        {activeTab === 'search' && <SearchView />}
        {activeTab === 'settings' && <SettingsView />}
      </main>

      {/* Bottom Navigation Bar */}
      <BottomNav />

      {/* Full Match Details & Tactical Pitch Modal */}
      <MatchDetailsModal />
    </DeviceFrame>
  );
};

export default function App() {
  return (
    <FootballProvider>
      <AppContent />
    </FootballProvider>
  );
}
