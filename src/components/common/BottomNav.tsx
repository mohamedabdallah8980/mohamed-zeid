import React from 'react';
import { useFootball, MainTab } from '../../context/FootballContext';
import { Trophy, Star, Search, Settings } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, matches, favoriteMatches, t } = useFootball();

  // Count live matches for badge
  const liveCount = matches.filter((m) => m.status === 'LIVE').length;

  const tabs: { id: MainTab; label: string; icon: React.ReactNode; badge?: number }[] = [
    {
      id: 'scores',
      label: t('scores'),
      icon: <span className="text-lg">⚽</span>,
      badge: liveCount > 0 ? liveCount : undefined,
    },
    {
      id: 'favorites',
      label: t('favorites'),
      icon: <Star className="w-5 h-5" />,
      badge: favoriteMatches.length > 0 ? favoriteMatches.length : undefined,
    },
    {
      id: 'standings',
      label: t('standings'),
      icon: <Trophy className="w-5 h-5" />,
    },
    {
      id: 'search',
      label: t('search'),
      icon: <Search className="w-5 h-5" />,
    },
    {
      id: 'settings',
      label: t('settings'),
      icon: <Settings className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="sticky bottom-0 z-30 bg-[#121212]/95 backdrop-blur-md border-t border-[#222222] py-1.5 px-2 safe-bottom">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative rounded-lg ${
                isActive ? 'text-[#00FF87]' : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <div className="relative">
                {tab.icon}
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2 bg-[#00FF87] text-black font-extrabold text-[10px] w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[11px] font-semibold mt-1 tracking-tight ${isActive ? 'text-[#00FF87]' : ''}`}>
                {tab.label}
              </span>
              {isActive && (
                <div className="w-3.5 h-0.5 bg-[#00FF87] rounded-full mt-0.5 shadow-[0_0_8px_#00FF87]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
