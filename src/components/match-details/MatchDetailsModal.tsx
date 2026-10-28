import React, { useState } from 'react';
import { useFootball } from '../../context/FootballContext';
import { TacticalPitch } from './TacticalPitch';
import { MatchTimeline } from './MatchTimeline';
import { MatchStats } from './MatchStats';
import { ArrowLeft, Star, MapPin, User, Calendar, Bell } from 'lucide-react';

export const MatchDetailsModal: React.FC = () => {
  const { selectedMatch, setSelectedMatch, language, toggleFavoriteMatch, isMatchFavorited, t } =
    useFootball();

  const [activeSubTab, setActiveSubTab] = useState<'timeline' | 'lineups' | 'stats' | 'h2h' | 'table'>('lineups');

  if (!selectedMatch) return null;

  const isFav = isMatchFavorited(selectedMatch.id);
  const isLive = selectedMatch.status === 'LIVE';

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-0 sm:p-4 overflow-y-auto">
      <div className="bg-[#0E0E0E] text-white w-full max-w-2xl min-h-screen sm:min-h-0 sm:max-h-[92vh] sm:rounded-2xl border border-[#262626] flex flex-col shadow-2xl overflow-hidden">
        {/* Top Navbar */}
        <div className="flex items-center justify-between px-4 py-3 bg-[#141414] border-b border-[#242424] sticky top-0 z-20">
          <button
            onClick={() => setSelectedMatch(null)}
            className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
          >
            <ArrowLeft className={`w-5 h-5 ${language === 'ar' ? 'rotate-180' : ''}`} />
            <span className="text-xs font-semibold">{language === 'ar' ? 'رجوع' : 'Back'}</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-neutral-300 truncate max-w-[180px]">
              {language === 'ar' ? selectedMatch.leagueNameAr : selectedMatch.leagueName}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleFavoriteMatch(selectedMatch.id)}
              className={`p-1.5 rounded-lg ${isFav ? 'text-amber-400 bg-amber-400/10' : 'text-neutral-400 hover:text-white'}`}
            >
              <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
            </button>
            <button
              onClick={() => setSelectedMatch(null)}
              className="p-1.5 rounded-lg text-neutral-400 hover:text-white bg-neutral-800 text-xs"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Match Score Hero Card */}
          <div className="bg-gradient-to-b from-[#181818] to-[#121212] rounded-2xl p-4 border border-[#282828] shadow-inner text-center">
            {/* Status & Elapsed Minute */}
            <div className="flex items-center justify-center gap-2 mb-3">
              {isLive ? (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#00FF87]/15 text-[#00FF87] border border-[#00FF87]/40">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF87] opacity-80"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF87]"></span>
                  </span>
                  <span className="text-xs font-extrabold">{selectedMatch.minute}' {t('live_badge')}</span>
                </div>
              ) : selectedMatch.status === 'FT' ? (
                <span className="px-3 py-1 rounded-md bg-neutral-800 text-neutral-300 text-xs font-bold">
                  {t('ft')} - Full Time
                </span>
              ) : (
                <span className="px-3 py-1 rounded-md bg-neutral-800 text-neutral-300 text-xs font-bold">
                  {selectedMatch.startTime}
                </span>
              )}
            </div>

            {/* Teams and Big Score */}
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 my-2">
              {/* Home Team */}
              <div className="flex flex-col items-center">
                <img
                  src={selectedMatch.homeTeam.logo}
                  alt={selectedMatch.homeTeam.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-md"
                />
                <span className="mt-2 text-sm sm:text-base font-bold text-white text-center">
                  {language === 'ar' ? selectedMatch.homeTeam.nameAr : selectedMatch.homeTeam.name}
                </span>
              </div>

              {/* Big Score Box */}
              <div className="flex flex-col items-center px-4">
                {selectedMatch.status === 'NS' ? (
                  <span className="text-2xl font-black text-neutral-400">VS</span>
                ) : (
                  <div className="text-3xl sm:text-4xl font-black tracking-tight text-white flex items-center gap-2">
                    <span className={isLive ? 'text-[#00FF87]' : ''}>{selectedMatch.homeScore}</span>
                    <span className="text-neutral-500 font-light">-</span>
                    <span className={isLive ? 'text-[#00FF87]' : ''}>{selectedMatch.awayScore}</span>
                  </div>
                )}
                <span className="text-[11px] text-neutral-400 mt-1">
                  {language === 'ar' ? selectedMatch.roundAr : selectedMatch.round}
                </span>
              </div>

              {/* Away Team */}
              <div className="flex flex-col items-center">
                <img
                  src={selectedMatch.awayTeam.logo}
                  alt={selectedMatch.awayTeam.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-md"
                />
                <span className="mt-2 text-sm sm:text-base font-bold text-white text-center">
                  {language === 'ar' ? selectedMatch.awayTeam.nameAr : selectedMatch.awayTeam.name}
                </span>
              </div>
            </div>

            {/* Venue & Referee Meta */}
            <div className="mt-3 pt-3 border-t border-[#242424] flex items-center justify-center gap-4 text-[11px] text-neutral-400 flex-wrap">
              <div className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#00FF87]" />
                <span>{language === 'ar' ? selectedMatch.venueAr : selectedMatch.venue}, {language === 'ar' ? selectedMatch.cityAr : selectedMatch.city}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-neutral-400" />
                <span>{selectedMatch.referee}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>{selectedMatch.date}</span>
              </div>
            </div>
          </div>

          {/* Sub-Tabs: Timeline | Lineups (Pitch) | Stats | H2H | Table */}
          <div className="flex items-center gap-1 p-1 bg-[#141414] rounded-xl border border-[#222222]">
            {[
              { id: 'lineups', label: t('lineups') },
              { id: 'timeline', label: t('details') },
              { id: 'stats', label: t('stats') },
              { id: 'h2h', label: t('h2h') },
              { id: 'table', label: t('table') },
            ].map((tab) => {
              const isActive = activeSubTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveSubTab(tab.id as typeof activeSubTab)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#00FF87] text-black shadow-sm'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content Display */}
          {activeSubTab === 'lineups' && <TacticalPitch match={selectedMatch} />}
          {activeSubTab === 'timeline' && <MatchTimeline match={selectedMatch} />}
          {activeSubTab === 'stats' && <MatchStats match={selectedMatch} />}

          {/* H2H Tab */}
          {activeSubTab === 'h2h' && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-neutral-300 block mb-2">
                {language === 'ar' ? 'آخر المواجهات المباشرة' : 'Head-to-Head History'}
              </span>
              {selectedMatch.h2h && selectedMatch.h2h.length > 0 ? (
                selectedMatch.h2h.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#141414] border border-[#242424]"
                  >
                    <span className="text-[11px] text-neutral-400">{item.date}</span>
                    <div className="flex items-center gap-3 text-xs font-semibold">
                      <span className={item.winner === 'home' ? 'text-[#00FF87] font-bold' : 'text-neutral-200'}>
                        {item.home}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-neutral-900 font-mono font-bold text-white text-xs">
                        {item.score}
                      </span>
                      <span className={item.winner === 'away' ? 'text-[#00FF87] font-bold' : 'text-neutral-200'}>
                        {item.away}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-xs text-neutral-400">
                  {language === 'ar' ? 'لا توجد مواجهات سابقة مسجلة' : 'No H2H records found'}
                </div>
              )}
            </div>
          )}

          {/* Table Tab */}
          {activeSubTab === 'table' && (
            <div className="bg-[#141414] p-3 rounded-xl border border-[#242424] text-xs">
              <div className="flex items-center justify-between text-neutral-400 pb-2 border-b border-[#222222] font-semibold text-[11px]">
                <span># {t('team')}</span>
                <div className="flex items-center gap-3">
                  <span>{t('played')}</span>
                  <span>{t('gd')}</span>
                  <span>{t('pts')}</span>
                </div>
              </div>
              <div className="divide-y divide-[#222222] mt-1">
                <div className="flex items-center justify-between py-2.5 text-[#00FF87] font-bold">
                  <div className="flex items-center gap-2">
                    <span className="w-4 text-center">2</span>
                    <img src={selectedMatch.homeTeam.logo} alt="" className="w-4 h-4 object-contain" />
                    <span>{language === 'ar' ? selectedMatch.homeTeam.nameAr : selectedMatch.homeTeam.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-neutral-200">
                    <span className="w-4 text-center">28</span>
                    <span className="w-5 text-center text-[#00FF87]">+34</span>
                    <span className="w-5 text-center font-bold text-white">61</span>
                  </div>
                </div>
                <div className="flex items-center justify-between py-2.5 text-neutral-200">
                  <div className="flex items-center gap-2">
                    <span className="w-4 text-center">4</span>
                    <img src={selectedMatch.awayTeam.logo} alt="" className="w-4 h-4 object-contain" />
                    <span>{language === 'ar' ? selectedMatch.awayTeam.nameAr : selectedMatch.awayTeam.name}</span>
                  </div>
                  <div className="flex items-center gap-4 text-neutral-400">
                    <span className="w-4 text-center">28</span>
                    <span className="w-5 text-center text-neutral-300">+19</span>
                    <span className="w-5 text-center font-bold text-white">52</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
