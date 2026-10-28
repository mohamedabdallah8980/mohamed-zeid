import React, { useState } from 'react';
import { useFootball } from '../../context/FootballContext';
import { FEATURED_LEAGUES, PREMIER_LEAGUE_STANDINGS, PREMIER_LEAGUE_TOP_SCORERS } from '../../data/mockFootballData';
import { Trophy, Flame } from 'lucide-react';

export const StandingsView: React.FC = () => {
  const { language, t } = useFootball();
  const [selectedLeagueId, setSelectedLeagueId] = useState<number>(39);
  const [activeTab, setActiveTab] = useState<'table' | 'scorers'>('table');

  const selectedLeague = FEATURED_LEAGUES.find((l) => l.id === selectedLeagueId) || FEATURED_LEAGUES[0];

  return (
    <div className="p-3 sm:p-4 space-y-4">
      {/* League Selection Horizontal Pills */}
      <div className="overflow-x-auto no-scrollbar pb-1">
        <div className="flex items-center gap-2 min-w-max">
          {FEATURED_LEAGUES.map((league) => {
            const isSelected = selectedLeagueId === league.id;
            return (
              <button
                key={league.id}
                onClick={() => setSelectedLeagueId(league.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                  isSelected
                    ? 'bg-[#1E1E1E] text-[#00FF87] border-[#00FF87]/50 shadow-[0_0_10px_rgba(0,255,135,0.15)]'
                    : 'bg-[#141414] text-neutral-400 hover:text-white border-[#242424]'
                }`}
              >
                <span>{league.flag}</span>
                <span className="truncate">{language === 'ar' ? league.nameAr : league.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub Tabs: League Table vs Top Scorers */}
      <div className="flex items-center gap-2 p-1 bg-[#141414] rounded-xl border border-[#222222]">
        <button
          onClick={() => setActiveTab('table')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'table' ? 'bg-[#00FF87] text-black shadow-sm' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Trophy className="w-3.5 h-3.5" />
          <span>{t('table')}</span>
        </button>
        <button
          onClick={() => setActiveTab('scorers')}
          className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
            activeTab === 'scorers' ? 'bg-[#00FF87] text-black shadow-sm' : 'text-neutral-400 hover:text-white'
          }`}
        >
          <Flame className="w-3.5 h-3.5" />
          <span>{t('top_scorers')}</span>
        </button>
      </div>

      {/* 1. Standings Table Tab */}
      {activeTab === 'table' && (
        <div className="bg-[#141414] rounded-2xl border border-[#242424] overflow-hidden shadow-lg">
          {/* Table Header */}
          <div className="p-3 bg-[#181818] border-b border-[#242424] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">{selectedLeague.flag}</span>
              <span className="text-xs font-bold text-white">
                {language === 'ar' ? selectedLeague.nameAr : selectedLeague.name}
              </span>
            </div>
            <span className="text-[10px] text-neutral-400 font-medium">2026/2027 Season</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="border-b border-[#222222] text-neutral-400 font-semibold text-[11px] bg-[#121212]">
                  <th className="py-2.5 px-3 sticky left-0 bg-[#121212] z-10 w-44"># {t('team')}</th>
                  <th className="py-2.5 px-2 text-center">{t('played')}</th>
                  <th className="py-2.5 px-2 text-center">{t('won')}</th>
                  <th className="py-2.5 px-2 text-center">{t('drawn')}</th>
                  <th className="py-2.5 px-2 text-center">{t('lost')}</th>
                  <th className="py-2.5 px-2 text-center">{t('gf')}</th>
                  <th className="py-2.5 px-2 text-center">{t('ga')}</th>
                  <th className="py-2.5 px-2 text-center">{t('gd')}</th>
                  <th className="py-2.5 px-2 text-center font-bold text-white">{t('pts')}</th>
                  <th className="py-2.5 px-3 text-center">{t('form')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1E1E1E]">
                {PREMIER_LEAGUE_STANDINGS.map((row) => {
                  return (
                    <tr key={row.rank} className="hover:bg-[#1A1A1A] transition-colors">
                      {/* Rank & Team (Sticky) */}
                      <td className="py-2 px-3 sticky left-0 bg-[#141414] hover:bg-[#1A1A1A] z-10">
                        <div className="flex items-center gap-2">
                          {/* Zone indicator bar */}
                          <div
                            className={`w-1 h-5 rounded-full ${
                              row.zone === 'cl'
                                ? 'bg-blue-500'
                                : row.zone === 'el'
                                ? 'bg-amber-500'
                                : row.zone === 'conf'
                                ? 'bg-emerald-500'
                                : row.zone === 'relegation'
                                ? 'bg-red-500'
                                : 'bg-transparent'
                            }`}
                          />
                          <span className="w-4 text-center font-bold text-neutral-300 text-xs">
                            {row.rank}
                          </span>
                          <img
                            src={row.team.logo}
                            alt={row.team.name}
                            className="w-5 h-5 object-contain"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src =
                                'https://media.api-sports.io/football/teams/40.png';
                            }}
                          />
                          <span className="font-semibold text-white truncate max-w-[110px]">
                            {language === 'ar' ? row.team.nameAr : row.team.name}
                          </span>
                        </div>
                      </td>

                      <td className="py-2 px-2 text-center text-neutral-300 font-mono">{row.played}</td>
                      <td className="py-2 px-2 text-center text-neutral-400 font-mono">{row.won}</td>
                      <td className="py-2 px-2 text-center text-neutral-400 font-mono">{row.drawn}</td>
                      <td className="py-2 px-2 text-center text-neutral-400 font-mono">{row.lost}</td>
                      <td className="py-2 px-2 text-center text-neutral-400 font-mono">{row.goalsFor}</td>
                      <td className="py-2 px-2 text-center text-neutral-400 font-mono">{row.goalsAgainst}</td>
                      <td
                        className={`py-2 px-2 text-center font-mono font-bold ${
                          row.goalDifference > 0 ? 'text-[#00FF87]' : row.goalDifference < 0 ? 'text-red-400' : 'text-neutral-400'
                        }`}
                      >
                        {row.goalDifference > 0 ? `+${row.goalDifference}` : row.goalDifference}
                      </td>
                      <td className="py-2 px-2 text-center font-mono font-extrabold text-white text-sm">
                        {row.points}
                      </td>

                      {/* Last 5 Form Colored Circles */}
                      <td className="py-2 px-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {row.form.map((res, i) => (
                            <span
                              key={i}
                              className={`w-3.5 h-3.5 rounded-full flex items-center justify-center text-[8px] font-black ${
                                res === 'W'
                                  ? 'bg-[#00FF87] text-black'
                                  : res === 'D'
                                  ? 'bg-amber-400 text-black'
                                  : 'bg-red-500 text-white'
                              }`}
                            >
                              {res}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Qualification Legend */}
          <div className="p-3 bg-[#101010] border-t border-[#222222] flex items-center justify-around text-[10px] text-neutral-400 flex-wrap gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              <span>{language === 'ar' ? 'دوري أبطال أوروبا (1-4)' : 'UEFA Champions League (1-4)'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              <span>{language === 'ar' ? 'الدوري الأوروبي (5)' : 'Europa League (5)'}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block"></span>
              <span>{language === 'ar' ? 'منطقة الهبوط (18-20)' : 'Relegation Zone (18-20)'}</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. Top Scorers Tab */}
      {activeTab === 'scorers' && (
        <div className="bg-[#141414] rounded-2xl border border-[#242424] overflow-hidden shadow-lg p-3 space-y-2">
          {PREMIER_LEAGUE_TOP_SCORERS.map((sc) => (
            <div
              key={sc.rank}
              className="flex items-center justify-between p-3 rounded-xl bg-[#181818] border border-[#242424]"
            >
              <div className="flex items-center gap-3">
                <span className="w-5 text-center font-extrabold text-sm text-[#00FF87]">
                  #{sc.rank}
                </span>
                <img src={sc.team.logo} alt="" className="w-6 h-6 object-contain" />
                <div>
                  <span className="text-xs font-bold text-white block">
                    {language === 'ar' ? sc.playerAr : sc.player}
                  </span>
                  <span className="text-[10px] text-neutral-400">
                    {language === 'ar' ? sc.team.nameAr : sc.team.name} · {sc.played} {language === 'ar' ? 'مباراة' : 'matches'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <span className="text-base font-black text-[#00FF87]">{sc.goals}</span>
                  <span className="text-[10px] text-neutral-400 block">{t('goals')}</span>
                </div>
                <div>
                  <span className="text-base font-bold text-neutral-300">{sc.assists}</span>
                  <span className="text-[10px] text-neutral-400 block">{t('assists')}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
