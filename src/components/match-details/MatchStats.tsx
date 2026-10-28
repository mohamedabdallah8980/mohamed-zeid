import React from 'react';
import { Match } from '../../types/football';
import { useFootball } from '../../context/FootballContext';

interface MatchStatsProps {
  match: Match;
}

export const MatchStats: React.FC<MatchStatsProps> = ({ match }) => {
  const { t } = useFootball();
  const stats = match.stats;

  const statItems: { label: string; home: number; away: number; isPercentage?: boolean }[] = [
    { label: t('possession'), home: stats.possession[0], away: stats.possession[1], isPercentage: true },
    { label: t('expected_goals'), home: stats.expectedGoals[0], away: stats.expectedGoals[1] },
    { label: t('shots_total'), home: stats.shotsTotal[0], away: stats.shotsTotal[1] },
    { label: t('shots_on_target'), home: stats.shotsOnTarget[0], away: stats.shotsOnTarget[1] },
    { label: t('corners'), home: stats.corners[0], away: stats.corners[1] },
    { label: t('fouls'), home: stats.fouls[0], away: stats.fouls[1] },
    { label: t('yellow_cards'), home: stats.yellowCards[0], away: stats.yellowCards[1] },
    { label: t('red_cards'), home: stats.redCards[0], away: stats.redCards[1] },
    { label: t('passes'), home: stats.passesTotal[0], away: stats.passesTotal[1] },
    { label: t('offsides'), home: stats.offsides[0], away: stats.offsides[1] },
  ];

  return (
    <div className="space-y-4 py-2">
      {statItems.map((item, idx) => {
        const total = item.home + item.away || 1;
        const homePercent = item.isPercentage ? item.home : (item.home / total) * 100;
        const awayPercent = item.isPercentage ? item.away : (item.away / total) * 100;

        const isHomeGreater = item.home > item.away;
        const isAwayGreater = item.away > item.home;

        return (
          <div key={idx} className="bg-[#141414] p-3 rounded-xl border border-[#222222]">
            {/* Values & Label */}
            <div className="flex items-center justify-between text-xs mb-1.5 font-bold">
              <span className={isHomeGreater ? 'text-[#00FF87]' : 'text-neutral-300'}>
                {item.home}
                {item.isPercentage ? '%' : ''}
              </span>
              <span className="text-neutral-400 font-medium text-[11px]">{item.label}</span>
              <span className={isAwayGreater ? 'text-[#00FF87]' : 'text-neutral-300'}>
                {item.away}
                {item.isPercentage ? '%' : ''}
              </span>
            </div>

            {/* Comparison Progress Bar */}
            <div className="flex items-center h-2 bg-neutral-900 rounded-full overflow-hidden gap-1">
              {/* Home bar */}
              <div
                style={{ width: `${homePercent}%` }}
                className={`h-full transition-all duration-500 rounded-l-full ${
                  isHomeGreater ? 'bg-[#00FF87]' : 'bg-neutral-600'
                }`}
              />
              {/* Away bar */}
              <div
                style={{ width: `${awayPercent}%` }}
                className={`h-full transition-all duration-500 rounded-r-full ${
                  isAwayGreater ? 'bg-[#00FF87]' : 'bg-neutral-600'
                }`}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
