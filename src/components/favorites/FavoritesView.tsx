import React from 'react';
import { useFootball } from '../../context/FootballContext';
import { MatchCard } from '../scores/MatchCard';
import { Star, Shield } from 'lucide-react';

export const FavoritesView: React.FC = () => {
  const { matches, favoriteMatches, favoriteTeams, toggleFavoriteTeam, language, t } = useFootball();

  // Filter favorite matches
  const favMatchesList = matches.filter((m) => favoriteMatches.includes(m.id));

  // Collect teams that are in favoriteTeams
  const allTeams = [
    { id: 42, name: 'Arsenal', nameAr: 'أرسنال', country: 'England', logo: 'https://media.api-sports.io/football/teams/42.png' },
    { id: 40, name: 'Liverpool', nameAr: 'ليفربول', country: 'England', logo: 'https://media.api-sports.io/football/teams/40.png' },
    { id: 50, name: 'Manchester City', nameAr: 'مان سيتي', country: 'England', logo: 'https://media.api-sports.io/football/teams/50.png' },
    { id: 541, name: 'Real Madrid', nameAr: 'ريال مدريد', country: 'Spain', logo: 'https://media.api-sports.io/football/teams/541.png' },
    { id: 529, name: 'Barcelona', nameAr: 'برشلونة', country: 'Spain', logo: 'https://media.api-sports.io/football/teams/529.png' },
    { id: 1026, name: 'Al Ahly SC', nameAr: 'الأهلي المصري', country: 'Egypt', logo: 'https://media.api-sports.io/football/teams/1026.png' },
  ];

  const followedTeams = allTeams.filter((t) => favoriteTeams.includes(t.id));

  return (
    <div className="p-3 sm:p-4 space-y-6">
      {/* 1. Favorite Matches Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'ar' ? 'المباريات المفضلة' : 'Favorite Matches'}
            </h2>
          </div>
          <span className="text-xs text-neutral-400 font-semibold">{favMatchesList.length}</span>
        </div>

        {favMatchesList.length > 0 ? (
          <div className="space-y-2">
            {favMatchesList.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        ) : (
          <div className="p-6 rounded-2xl bg-[#141414] border border-[#242424] text-center space-y-2">
            <Star className="w-8 h-8 text-neutral-400 mx-auto" />
            <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed">
              {t('empty_favorites')}
            </p>
          </div>
        )}
      </div>

      {/* 2. Followed Teams Section */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#00FF87]" />
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              {language === 'ar' ? 'الفرق المفضلة' : 'Followed Teams'}
            </h2>
          </div>
          <span className="text-xs text-neutral-400 font-semibold">{followedTeams.length}</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {allTeams.map((team) => {
            const isFollowed = favoriteTeams.includes(team.id);
            return (
              <div
                key={team.id}
                onClick={() => toggleFavoriteTeam(team.id)}
                className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                  isFollowed
                    ? 'bg-[#181818] border-[#00FF87]/40 shadow-sm'
                    : 'bg-[#121212] border-[#222222] opacity-70 hover:opacity-100'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <img src={team.logo} alt="" className="w-6 h-6 object-contain" />
                  <div>
                    <span className="text-xs font-bold text-white block">
                      {language === 'ar' ? team.nameAr : team.name}
                    </span>
                    <span className="text-[10px] text-neutral-400">{team.country}</span>
                  </div>
                </div>

                <Star className={`w-4 h-4 ${isFollowed ? 'text-amber-400 fill-amber-400' : 'text-neutral-400'}`} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
