import React from 'react';
import { useFootball, MatchFilter } from '../../context/FootballContext';

export const FilterChips: React.FC = () => {
  const { filterStatus, setFilterStatus, matches, t } = useFootball();

  const liveMatchesCount = matches.filter((m) => m.status === 'LIVE').length;
  const finishedMatchesCount = matches.filter((m) => m.status === 'FT').length;
  const upcomingMatchesCount = matches.filter((m) => m.status === 'NS').length;

  const filters: { id: MatchFilter; label: string; count?: number; isLive?: boolean }[] = [
    { id: 'ALL', label: t('all'), count: matches.length },
    { id: 'LIVE', label: t('live'), count: liveMatchesCount, isLive: true },
    { id: 'FINISHED', label: t('finished'), count: finishedMatchesCount },
    { id: 'UPCOMING', label: t('upcoming'), count: upcomingMatchesCount },
  ];

  return (
    <div className="px-3 py-2 bg-[#0D0D0D] border-b border-[#1E1E1E] overflow-x-auto no-scrollbar">
      <div className="flex items-center gap-1.5 min-w-max">
        {filters.map((f) => {
          const isActive = filterStatus === f.id;
          return (
            <button
              key={f.id}
              onClick={() => setFilterStatus(f.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                isActive
                  ? 'bg-[#00FF87] text-black shadow-[0_0_10px_rgba(0,255,135,0.3)]'
                  : 'bg-[#181818] text-neutral-300 hover:text-white hover:bg-[#202020] border border-[#2A2A2A]'
              }`}
            >
              {f.isLive && (
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${isActive ? 'bg-black' : 'bg-[#00FF87]'} opacity-75`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isActive ? 'bg-black' : 'bg-[#00FF87]'}`}></span>
                </span>
              )}
              <span>{f.label}</span>
              {f.count !== undefined && (
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    isActive ? 'bg-black/20 text-black' : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {f.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
