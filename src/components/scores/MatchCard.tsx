import React from 'react';
import { Match } from '../../types/football';
import { useFootball } from '../../context/FootballContext';
import { Star } from 'lucide-react';

interface MatchCardProps {
  match: Match;
}

export const MatchCard: React.FC<MatchCardProps> = ({ match }) => {
  const { language, toggleFavoriteMatch, isMatchFavorited, setSelectedMatch, t } = useFootball();

  const isFav = isMatchFavorited(match.id);
  const isLive = match.status === 'LIVE';
  const isFT = match.status === 'FT';

  // Extract goalscorers for quick preview
  const homeGoals = match.events.filter((e) => e.type === 'goal' && e.teamId === match.homeTeam.id);
  const awayGoals = match.events.filter((e) => e.type === 'goal' && e.teamId === match.awayTeam.id);

  return (
    <div
      onClick={() => setSelectedMatch(match)}
      className={`group relative bg-[#161616] hover:bg-[#1C1C1C] transition-all duration-200 border rounded-xl p-3 cursor-pointer shadow-sm ${
        isLive
          ? 'border-[#00FF87]/40 shadow-[0_0_15px_rgba(0,255,135,0.06)]'
          : 'border-[#262626] hover:border-[#383838]'
      }`}
    >
      {/* Top micro-bar: Status or Time & Favorite star */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          {isLive ? (
            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#00FF87]/10 text-[#00FF87] border border-[#00FF87]/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00FF87] opacity-80"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00FF87]"></span>
              </span>
              <span className="font-extrabold tracking-wide">{match.minute}'</span>
              <span className="text-[10px] uppercase font-bold tracking-wider">{t('live_badge')}</span>
            </div>
          ) : isFT ? (
            <span className="text-neutral-400 font-bold px-2 py-0.5 rounded-md bg-neutral-800 text-[11px]">
              {t('ft')}
            </span>
          ) : (
            <span className="text-neutral-300 font-bold px-2 py-0.5 rounded-md bg-neutral-800 text-[11px]">
              {match.startTime}
            </span>
          )}

          <span className="text-[11px] text-neutral-400 font-normal truncate max-w-[150px]">
            {language === 'ar' ? match.roundAr : match.round}
          </span>
        </div>

        {/* Favorite Star Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavoriteMatch(match.id);
          }}
          className={`p-1.5 rounded-lg transition-colors ${
            isFav
              ? 'text-amber-400 bg-amber-400/10'
              : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
          }`}
          title="Add to Favorites"
        >
          <Star className={`w-4 h-4 ${isFav ? 'fill-amber-400' : ''}`} />
        </button>
      </div>

      {/* Main Teams & Score Section */}
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2 py-1">
        {/* Home Team */}
        <div className="flex items-center gap-2.5 justify-end text-right">
          <span
            className={`text-xs sm:text-sm font-semibold truncate ${
              isFT && match.homeScore > match.awayScore ? 'text-[#00FF87]' : 'text-neutral-100'
            }`}
          >
            {language === 'ar' ? match.homeTeam.nameAr : match.homeTeam.name}
          </span>
          <img
            src={match.homeTeam.logo}
            alt={match.homeTeam.name}
            className="w-7 h-7 object-contain drop-shadow-sm flex-shrink-0"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://media.api-sports.io/football/teams/42.png';
            }}
          />
        </div>

        {/* Score Box */}
        <div className="px-3 py-1 bg-[#101010] border border-[#2A2A2A] rounded-lg text-center min-w-[70px]">
          {match.status === 'NS' ? (
            <span className="text-xs font-bold text-neutral-400">VS</span>
          ) : (
            <div className="flex items-center justify-center gap-1.5">
              <span
                className={`text-base sm:text-lg font-black tracking-tight ${
                  isLive ? 'text-[#00FF87]' : 'text-white'
                }`}
              >
                {match.homeScore}
              </span>
              <span className="text-neutral-400 font-bold">-</span>
              <span
                className={`text-base sm:text-lg font-black tracking-tight ${
                  isLive ? 'text-[#00FF87]' : 'text-white'
                }`}
              >
                {match.awayScore}
              </span>
            </div>
          )}
        </div>

        {/* Away Team */}
        <div className="flex items-center gap-2.5 justify-start text-left">
          <img
            src={match.awayTeam.logo}
            alt={match.awayTeam.name}
            className="w-7 h-7 object-contain drop-shadow-sm flex-shrink-0"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                'https://media.api-sports.io/football/teams/49.png';
            }}
          />
          <span
            className={`text-xs sm:text-sm font-semibold truncate ${
              isFT && match.awayScore > match.homeScore ? 'text-[#00FF87]' : 'text-neutral-100'
            }`}
          >
            {language === 'ar' ? match.awayTeam.nameAr : match.awayTeam.name}
          </span>
        </div>
      </div>

      {/* Goal Scorers Preview */}
      {(homeGoals.length > 0 || awayGoals.length > 0) && (
        <div className="mt-2.5 pt-2 border-t border-[#222222] grid grid-cols-2 gap-2 text-[10px] text-neutral-400">
          <div className="text-right truncate pr-1">
            {homeGoals.map((g) => (
              <span key={g.id} className="inline-block ml-1">
                ⚽ {language === 'ar' ? g.playerAr : g.player} {g.minute}'
              </span>
            ))}
          </div>
          <div className="text-left truncate pl-1">
            {awayGoals.map((g) => (
              <span key={g.id} className="inline-block mr-1">
                ⚽ {language === 'ar' ? g.playerAr : g.player} {g.minute}'
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Hover tap hint */}
      <div className="mt-1 text-center">
        <span className="text-[9px] text-neutral-400 group-hover:text-[#00FF87] transition-colors">
          {language === 'ar' ? 'اضغط لعرض التشكيلة والملعب التكتيكي والإحصائيات' : 'Tap for Lineups, Pitch & Stats'}
        </span>
      </div>
    </div>
  );
};
