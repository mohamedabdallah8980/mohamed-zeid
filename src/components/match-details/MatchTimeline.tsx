import React from 'react';
import { Match, MatchEvent } from '../../types/football';
import { useFootball } from '../../context/FootballContext';
import { RefreshCw } from 'lucide-react';

interface MatchTimelineProps {
  match: Match;
}

export const MatchTimeline: React.FC<MatchTimelineProps> = ({ match }) => {
  const { language } = useFootball();

  const getEventIcon = (type: MatchEvent['type']) => {
    switch (type) {
      case 'goal':
        return <span className="text-base">⚽</span>;
      case 'yellow_card':
        return <span className="w-3.5 h-5 bg-amber-400 rounded-sm inline-block shadow-sm"></span>;
      case 'red_card':
        return <span className="w-3.5 h-5 bg-red-600 rounded-sm inline-block shadow-sm"></span>;
      case 'subst':
        return <RefreshCw className="w-4 h-4 text-[#00FF87]" />;
      default:
        return <span className="text-xs">⏱️</span>;
    }
  };

  if (!match.events || match.events.length === 0) {
    return (
      <div className="py-12 text-center text-neutral-400 text-xs">
        {language === 'ar' ? 'لم تبدأ أحداث المباراة بعد.' : 'No match events recorded yet.'}
      </div>
    );
  }

  // Sort events by minute descending
  const sortedEvents = [...match.events].sort((a, b) => b.minute - a.minute);

  return (
    <div className="py-2 space-y-3">
      {sortedEvents.map((ev) => {
        const isHome = ev.teamId === match.homeTeam.id;

        return (
          <div
            key={ev.id}
            className={`flex items-center gap-3 p-2.5 rounded-xl bg-[#141414] border border-[#242424] ${
              ev.type === 'goal' ? 'border-[#00FF87]/30 bg-[#00FF87]/5' : ''
            }`}
          >
            {/* Minute badge */}
            <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-700 flex items-center justify-center font-mono font-bold text-xs text-[#00FF87] flex-shrink-0">
              {ev.minute}'
            </div>

            {/* Event Icon */}
            <div className="flex-shrink-0 w-6 flex items-center justify-center">
              {getEventIcon(ev.type)}
            </div>

            {/* Event Details */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white">
                  {language === 'ar' ? ev.playerAr : ev.player}
                </span>
                <span className="text-[10px] text-neutral-400">
                  ({isHome ? (language === 'ar' ? match.homeTeam.shortNameAr : match.homeTeam.shortName) : (language === 'ar' ? match.awayTeam.shortNameAr : match.awayTeam.shortName)})
                </span>
              </div>

              {ev.assistOrSub && (
                <div className="text-[11px] text-neutral-400 flex items-center gap-1 mt-0.5">
                  <span className="text-neutral-400">{ev.type === 'subst' ? 'IN:' : 'Assist:'}</span>
                  <span className="text-neutral-300 font-medium">
                    {language === 'ar' ? ev.assistOrSubAr : ev.assistOrSub}
                  </span>
                </div>
              )}

              {ev.detail && (
                <div className="text-[10px] text-neutral-400 italic mt-0.5">
                  {ev.detail}
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
