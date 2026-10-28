import React from 'react';
import { useFootball } from '../../context/FootballContext';
import { DateStrip } from './DateStrip';
import { FilterChips } from './FilterChips';
import { LeagueSection } from './LeagueSection';
import { Match } from '../../types/football';
import { RefreshCw } from 'lucide-react';

export const ScoresView: React.FC = () => {
  const { matches, filterStatus, loading, refreshMatches, language, t } = useFootball();

  // Filter matches based on chip
  const filteredMatches = matches.filter((m) => {
    if (filterStatus === 'LIVE') return m.status === 'LIVE';
    if (filterStatus === 'FINISHED') return m.status === 'FT';
    if (filterStatus === 'UPCOMING') return m.status === 'NS';
    return true;
  });

  // Group filtered matches by League
  const leaguesMap = new Map<number, { meta: Match; matches: Match[] }>();
  filteredMatches.forEach((m) => {
    if (!leaguesMap.has(m.leagueId)) {
      leaguesMap.set(m.leagueId, { meta: m, matches: [] });
    }
    leaguesMap.get(m.leagueId)!.matches.push(m);
  });

  const leagueGroups = Array.from(leaguesMap.values());

  return (
    <div className="flex flex-col flex-1 pb-4">
      {/* 1. Date strip */}
      <DateStrip />

      {/* 2. Filter chips */}
      <FilterChips />

      {/* 3. Match Groups */}
      <div className="p-3 space-y-3 flex-1">
        {loading ? (
          /* Shimmer skeleton */
          <div className="space-y-3">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-[#161616] rounded-xl p-4 border border-[#222222] animate-pulse space-y-3">
                <div className="h-4 bg-neutral-800 rounded w-1/3" />
                <div className="h-8 bg-neutral-800 rounded w-full" />
              </div>
            ))}
          </div>
        ) : leagueGroups.length > 0 ? (
          leagueGroups.map(({ meta, matches }) => (
            <LeagueSection
              key={meta.leagueId}
              leagueId={meta.leagueId}
              leagueName={meta.leagueName}
              leagueNameAr={meta.leagueNameAr}
              leagueLogo={meta.leagueLogo}
              leagueCountry={meta.leagueCountry}
              leagueFlag={meta.leagueFlag}
              matches={matches}
            />
          ))
        ) : (
          /* Empty state */
          <div className="py-16 text-center space-y-3">
            <span className="text-4xl">⚽</span>
            <p className="text-xs text-neutral-400 max-w-xs mx-auto">
              {t('no_matches')}
            </p>
            <button
              onClick={() => refreshMatches()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2A2A2A] text-xs font-semibold text-[#00FF87]"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{t('retry')}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
