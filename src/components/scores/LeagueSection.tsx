import React, { useState } from 'react';
import { Match } from '../../types/football';
import { MatchCard } from './MatchCard';
import { useFootball } from '../../context/FootballContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface LeagueSectionProps {
  leagueId: number;
  leagueName: string;
  leagueNameAr: string;
  leagueLogo: string;
  leagueCountry: string;
  leagueFlag: string;
  matches: Match[];
}

export const LeagueSection: React.FC<LeagueSectionProps> = ({
  leagueName,
  leagueNameAr,
  leagueLogo,
  leagueCountry,
  leagueFlag,
  matches,
}) => {
  const { language } = useFootball();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="mb-4">
      {/* League Header */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between px-3 py-2 bg-[#141414] hover:bg-[#1A1A1A] transition-colors rounded-t-xl border border-[#242424] text-left"
      >
        <div className="flex items-center gap-2.5">
          <span className="text-base">{leagueFlag}</span>
          <img
            src={leagueLogo}
            alt={leagueName}
            className="w-5 h-5 object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://media.api-sports.io/football/leagues/39.png';
            }}
          />
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white tracking-tight">
              {language === 'ar' ? leagueNameAr : leagueName}
            </span>
            <span className="text-[10px] text-neutral-400 -mt-0.5">{leagueCountry}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-neutral-400">
          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-neutral-800 text-neutral-300">
            {matches.length}
          </span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {/* Matches List */}
      {isOpen && (
        <div className="bg-[#0E0E0E] p-2 space-y-2 border-x border-b border-[#242424] rounded-b-xl">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};
