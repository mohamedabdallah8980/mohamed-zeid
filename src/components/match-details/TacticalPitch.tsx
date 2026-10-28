import React, { useState } from 'react';
import { Match, PlayerPosition } from '../../types/football';
import { useFootball } from '../../context/FootballContext';
import { Shield, User } from 'lucide-react';

interface TacticalPitchProps {
  match: Match;
}

export const TacticalPitch: React.FC<TacticalPitchProps> = ({ match }) => {
  const { language, t } = useFootball();
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerPosition | null>(null);
  const [viewTeam, setViewTeam] = useState<'both' | 'home' | 'away'>('both');

  const homeLineup = match.lineups.home;
  const awayLineup = match.lineups.away;

  // Helper for SofaScore style rating colors
  const getRatingColor = (rating?: number) => {
    if (!rating) return 'bg-neutral-700 text-white';
    if (rating >= 8.0) return 'bg-[#00FF87] text-black font-extrabold';
    if (rating >= 7.0) return 'bg-emerald-500 text-black font-bold';
    if (rating >= 6.5) return 'bg-amber-400 text-black font-bold';
    return 'bg-red-500 text-white font-bold';
  };

  return (
    <div className="space-y-4">
      {/* Formations and Coaches Bar */}
      <div className="grid grid-cols-2 gap-2 bg-[#141414] p-3 rounded-xl border border-[#242424]">
        {/* Home side */}
        <div className="text-left">
          <div className="flex items-center gap-1.5">
            <img src={match.homeTeam.logo} alt={match.homeTeam.name} className="w-4 h-4 object-contain" />
            <span className="text-xs font-bold text-white">
              {language === 'ar' ? match.homeTeam.nameAr : match.homeTeam.name}
            </span>
          </div>
          <div className="text-[11px] text-neutral-400 mt-1 flex items-center gap-1">
            <span className="text-[#00FF87] font-bold">{homeLineup.formation}</span>
            <span>·</span>
            <span>{t('coach')}: {language === 'ar' ? homeLineup.coachAr : homeLineup.coach}</span>
          </div>
        </div>

        {/* Away side */}
        <div className="text-right">
          <div className="flex items-center justify-end gap-1.5">
            <span className="text-xs font-bold text-white">
              {language === 'ar' ? match.awayTeam.nameAr : match.awayTeam.name}
            </span>
            <img src={match.awayTeam.logo} alt={match.awayTeam.name} className="w-4 h-4 object-contain" />
          </div>
          <div className="text-[11px] text-neutral-400 mt-1 flex items-center justify-end gap-1">
            <span>{t('coach')}: {language === 'ar' ? awayLineup.coachAr : awayLineup.coach}</span>
            <span>·</span>
            <span className="text-[#00FF87] font-bold">{awayLineup.formation}</span>
          </div>
        </div>
      </div>

      {/* Team View Selector */}
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setViewTeam('both')}
          className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
            viewTeam === 'both' ? 'bg-[#00FF87] text-black font-bold' : 'bg-[#181818] text-neutral-400 hover:text-white'
          }`}
        >
          {language === 'ar' ? 'كلا الفريقين' : 'Both Teams'}
        </button>
        <button
          onClick={() => setViewTeam('home')}
          className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
            viewTeam === 'home' ? 'bg-[#00FF87] text-black font-bold' : 'bg-[#181818] text-neutral-400 hover:text-white'
          }`}
        >
          {language === 'ar' ? match.homeTeam.nameAr : match.homeTeam.shortName}
        </button>
        <button
          onClick={() => setViewTeam('away')}
          className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
            viewTeam === 'away' ? 'bg-[#00FF87] text-black font-bold' : 'bg-[#181818] text-neutral-400 hover:text-white'
          }`}
        >
          {language === 'ar' ? match.awayTeam.nameAr : match.awayTeam.shortName}
        </button>
      </div>

      {/* SVG Football Pitch Field */}
      <div className="relative w-full rounded-2xl overflow-hidden border-2 border-[#1E4D2B] shadow-2xl bg-[#143B1E]">
        {/* Pitch Stripes Pattern */}
        <div className="absolute inset-0 flex flex-col pointer-events-none opacity-40">
          {[...Array(12)].map((_, i) => (
            <div key={i} className={`flex-1 ${i % 2 === 0 ? 'bg-[#184523]' : 'bg-[#13391C]'}`} />
          ))}
        </div>

        {/* Tactical Pitch Container (Vertical view: Home top or left, Away bottom) */}
        <div className="relative w-full aspect-[9/14] sm:aspect-[3/4] p-3">
          {/* White Pitch Field Markings (SVG) */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none p-3"
            viewBox="0 0 100 140"
            fill="none"
            stroke="rgba(255,255,255,0.7)"
            strokeWidth="0.8"
          >
            {/* Outer boundary */}
            <rect x="2" y="2" width="96" height="136" rx="2" strokeWidth="1" />

            {/* Half-way line */}
            <line x1="2" y1="70" x2="98" y2="70" strokeWidth="0.9" />

            {/* Center circle */}
            <circle cx="50" cy="70" r="14" strokeWidth="0.8" />
            <circle cx="50" cy="70" r="0.8" fill="white" />

            {/* Top Penalty Area (Home Goal) */}
            <rect x="24" y="2" width="52" height="24" strokeWidth="0.8" />
            <rect x="36" y="2" width="28" height="8" strokeWidth="0.8" />
            <circle cx="50" cy="18" r="0.8" fill="white" />
            <path d="M 38 26 A 12 12 0 0 0 62 26" strokeWidth="0.8" />

            {/* Bottom Penalty Area (Away Goal) */}
            <rect x="24" y="114" width="52" height="24" strokeWidth="0.8" />
            <rect x="36" y="130" width="28" height="8" strokeWidth="0.8" />
            <circle cx="50" cy="122" r="0.8" fill="white" />
            <path d="M 38 114 A 12 12 0 0 1 62 114" strokeWidth="0.8" />

            {/* Corner Arcs */}
            <path d="M 2 6 A 4 4 0 0 0 6 2" />
            <path d="M 94 2 A 4 4 0 0 0 98 6" />
            <path d="M 2 134 A 4 4 0 0 0 6 138" />
            <path d="M 94 138 A 4 4 0 0 0 98 134" />
          </svg>

          {/* Home Team Players (Top half: Y: 0 to 48%) */}
          {(viewTeam === 'both' || viewTeam === 'home') &&
            homeLineup.startingXI.map((player) => {
              // Convert grid coordinates to pitch top half
              const posX = player.gridX;
              const posY = viewTeam === 'both' ? player.gridY * 0.58 + 4 : player.gridY * 0.9 + 5;

              return (
                <div
                  key={`home-${player.id}`}
                  onClick={() => setSelectedPlayer(player)}
                  style={{ left: `${posX}%`, top: `${posY}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-10 transition-transform active:scale-95"
                >
                  <div className="relative">
                    {/* Player Jersey Circle */}
                    <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-white shadow-md flex items-center justify-center text-white font-extrabold text-xs group-hover:ring-2 ring-[#00FF87] transition-all">
                      {player.number}
                    </div>

                    {/* Captain badge */}
                    {player.isCaptain && (
                      <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow">
                        C
                      </span>
                    )}

                    {/* Rating Pill */}
                    {player.rating && (
                      <span
                        className={`absolute -bottom-1 -right-1 text-[9px] px-1 rounded-full shadow ${getRatingColor(
                          player.rating
                        )}`}
                      >
                        {player.rating}
                      </span>
                    )}
                  </div>

                  {/* Player Name */}
                  <span className="mt-1 px-1.5 py-0.2 rounded bg-black/75 text-[10px] font-bold text-white tracking-tight text-center truncate max-w-[75px] shadow-sm">
                    {language === 'ar' ? player.nameAr : player.name}
                  </span>
                </div>
              );
            })}

          {/* Away Team Players (Bottom half: Y: 52 to 98%) */}
          {(viewTeam === 'both' || viewTeam === 'away') &&
            awayLineup.startingXI.map((player) => {
              // Convert grid coordinates to pitch bottom half
              const posX = player.gridX;
              const posY = viewTeam === 'both' ? 100 - (player.gridY * 0.58 + 4) : player.gridY * 0.9 + 5;

              return (
                <div
                  key={`away-${player.id}`}
                  onClick={() => setSelectedPlayer(player)}
                  style={{ left: `${posX}%`, top: `${posY}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group z-10 transition-transform active:scale-95"
                >
                  <div className="relative">
                    {/* Player Jersey Circle */}
                    <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center text-white font-extrabold text-xs group-hover:ring-2 ring-[#00FF87] transition-all">
                      {player.number}
                    </div>

                    {/* Captain badge */}
                    {player.isCaptain && (
                      <span className="absolute -top-1 -right-1 bg-amber-400 text-black text-[9px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center shadow">
                        C
                      </span>
                    )}

                    {/* Rating Pill */}
                    {player.rating && (
                      <span
                        className={`absolute -bottom-1 -right-1 text-[9px] px-1 rounded-full shadow ${getRatingColor(
                          player.rating
                        )}`}
                      >
                        {player.rating}
                      </span>
                    )}
                  </div>

                  {/* Player Name */}
                  <span className="mt-1 px-1.5 py-0.2 rounded bg-black/75 text-[10px] font-bold text-white tracking-tight text-center truncate max-w-[75px] shadow-sm">
                    {language === 'ar' ? player.nameAr : player.name}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Selected Player Popover Card */}
      {selectedPlayer && (
        <div className="bg-[#181818] p-3 rounded-xl border border-[#2A2A2A] flex items-center justify-between animate-fadeIn">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-base text-[#00FF87]">
              #{selectedPlayer.number}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  {language === 'ar' ? selectedPlayer.nameAr : selectedPlayer.name}
                </span>
                {selectedPlayer.isCaptain && (
                  <span className="text-[10px] bg-amber-400 text-black px-1.5 py-0.2 rounded font-black">
                    CAPTAIN
                  </span>
                )}
              </div>
              <div className="text-xs text-neutral-400 flex items-center gap-2 mt-0.5">
                <span>{selectedPlayer.position === 'G' ? 'Goalkeeper' : selectedPlayer.position === 'D' ? 'Defender' : selectedPlayer.position === 'M' ? 'Midfielder' : 'Forward'}</span>
                <span>·</span>
                <span>Match Rating: <strong className="text-[#00FF87]">{selectedPlayer.rating || 'N/A'}</strong></span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setSelectedPlayer(null)}
            className="text-xs text-neutral-400 hover:text-white px-2 py-1 rounded bg-neutral-800"
          >
            ✕
          </button>
        </div>
      )}

      {/* Substitutes Bench */}
      <div className="bg-[#121212] p-3 rounded-xl border border-[#222222]">
        <div className="flex items-center gap-1.5 mb-2.5">
          <Shield className="w-4 h-4 text-[#00FF87]" />
          <span className="text-xs font-bold text-white uppercase tracking-wider">{t('substitutes')}</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Home Substitutes */}
          <div>
            <span className="text-[11px] font-bold text-neutral-300 block mb-1.5">
              {language === 'ar' ? match.homeTeam.nameAr : match.homeTeam.name}
            </span>
            <div className="space-y-1.5">
              {homeLineup.substitutes.map((sub) => (
                <div key={sub.id} className="flex items-center gap-2 text-xs text-neutral-400">
                  <span className="w-5 text-center font-mono text-neutral-400 text-[11px]">#{sub.number}</span>
                  <span className="text-neutral-200">{language === 'ar' ? sub.nameAr : sub.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Away Substitutes */}
          <div>
            <span className="text-[11px] font-bold text-neutral-300 block mb-1.5 text-right">
              {language === 'ar' ? match.awayTeam.nameAr : match.awayTeam.name}
            </span>
            <div className="space-y-1.5">
              {awayLineup.substitutes.map((sub) => (
                <div key={sub.id} className="flex items-center justify-end gap-2 text-xs text-neutral-400">
                  <span className="text-neutral-200">{language === 'ar' ? sub.nameAr : sub.name}</span>
                  <span className="w-5 text-center font-mono text-neutral-400 text-[11px]">#{sub.number}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
