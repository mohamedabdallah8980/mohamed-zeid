import React, { useState, useEffect } from 'react';
import { useFootball } from '../../context/FootballContext';
import { FEATURED_LEAGUES } from '../../data/mockFootballData';
import { Search as SearchIcon, X, Clock, Shield, Trophy } from 'lucide-react';

export const SearchView: React.FC = () => {
  const { language, matches, setSelectedMatch, toggleFavoriteTeam, isTeamFavorited, t } = useFootball();
  const [searchTerm, setSearchTerm] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('scorepulse_recent_searches');
      return stored ? JSON.parse(stored) : ['Arsenal', 'Real Madrid', 'Mohamed Salah'];
    } catch {
      return ['Arsenal', 'Real Madrid', 'Mohamed Salah'];
    }
  });

  const [selectedTeamPreview, setSelectedTeamPreview] = useState<{
    id: number;
    name: string;
    nameAr: string;
    country: string;
    logo: string;
    squad: string[];
  } | null>(null);

  // Teams list
  const searchableTeams = [
    { id: 42, name: 'Arsenal', nameAr: 'أرسنال', country: 'England', logo: 'https://media.api-sports.io/football/teams/42.png', squad: ['Saka', 'Ødegaard', 'Rice', 'Havertz', 'Saliba', 'Gabriel', 'Raya'] },
    { id: 40, name: 'Liverpool', nameAr: 'ليفربول', country: 'England', logo: 'https://media.api-sports.io/football/teams/40.png', squad: ['Mohamed Salah', 'Van Dijk', 'Alisson', 'Alexander-Arnold', 'Gakpo', 'Mac Allister'] },
    { id: 50, name: 'Manchester City', nameAr: 'مانشستر سيتي', country: 'England', logo: 'https://media.api-sports.io/football/teams/50.png', squad: ['Haaland', 'De Bruyne', 'Foden', 'Bernardo Silva', 'Rodri', 'Ederson'] },
    { id: 49, name: 'Chelsea', nameAr: 'تشيلسي', country: 'England', logo: 'https://media.api-sports.io/football/teams/49.png', squad: ['Cole Palmer', 'Caicedo', 'Jackson', 'Neto', 'Enzo Fernández', 'Cucurella'] },
    { id: 541, name: 'Real Madrid', nameAr: 'ريال مدريد', country: 'Spain', logo: 'https://media.api-sports.io/football/teams/541.png', squad: ['Vinícius Jr', 'Mbappé', 'Bellingham', 'Valverde', 'Courtois', 'Rüdiger'] },
    { id: 529, name: 'FC Barcelona', nameAr: 'برشلونة', country: 'Spain', logo: 'https://media.api-sports.io/football/teams/529.png', squad: ['Lamine Yamal', 'Lewandowski', 'Raphinha', 'Pedri', 'Gavi', 'Cubarsí'] },
    { id: 1026, name: 'Al Ahly SC', nameAr: 'الأهلي المصري', country: 'Egypt', logo: 'https://media.api-sports.io/football/teams/1026.png', squad: ['Mohamed El Shenawy', 'Emam Ashour', 'Wessam Abou Ali', 'Hussein El Shahat', 'Marwan Attia'] },
    { id: 1027, name: 'Zamalek SC', nameAr: 'الزمالك', country: 'Egypt', logo: 'https://media.api-sports.io/football/teams/1027.png', squad: ['Zizo', 'Abdallah El Said', 'Omar Gaber', 'Mathlouthi', 'Jaziri'] },
    { id: 157, name: 'Bayern Munich', nameAr: 'بايرن ميونخ', country: 'Germany', logo: 'https://media.api-sports.io/football/teams/157.png', squad: ['Harry Kane', 'Musiala', 'Kimmich', 'Olise', 'Neuer', 'Davies'] },
    { id: 85, name: 'Paris Saint-Germain', nameAr: 'باريس سان جيرمان', country: 'France', logo: 'https://media.api-sports.io/football/teams/85.png', squad: ['Hakimi', 'Dembélé', 'Barcola', 'Vitinha', 'Donnarumma', 'Marquinhos'] },
  ];

  // Debounce search
  const [debouncedQuery, setDebouncedQuery] = useState('');
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchTerm.trim().toLowerCase());
    }, 300);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const handleSaveSearch = (query: string) => {
    if (!query) return;
    setRecentSearches((prev) => {
      const filtered = prev.filter((s) => s.toLowerCase() !== query.toLowerCase());
      const updated = [query, ...filtered].slice(0, 5);
      localStorage.setItem('scorepulse_recent_searches', JSON.stringify(updated));
      return updated;
    });
  };

  const clearRecent = () => {
    setRecentSearches([]);
    localStorage.removeItem('scorepulse_recent_searches');
  };

  // Filtered results
  const filteredTeams = debouncedQuery
    ? searchableTeams.filter(
        (t) =>
          t.name.toLowerCase().includes(debouncedQuery) ||
          t.nameAr.toLowerCase().includes(debouncedQuery) ||
          t.country.toLowerCase().includes(debouncedQuery) ||
          t.squad.some((p) => p.toLowerCase().includes(debouncedQuery))
      )
    : [];

  const filteredLeagues = debouncedQuery
    ? FEATURED_LEAGUES.filter(
        (l) =>
          l.name.toLowerCase().includes(debouncedQuery) ||
          l.nameAr.toLowerCase().includes(debouncedQuery)
      )
    : [];

  return (
    <div className="p-3 sm:p-4 space-y-4">
      {/* Search Bar Input */}
      <div className="relative">
        <SearchIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-3.5 rtl:left-auto rtl:right-3 pointer-events-none" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSaveSearch(searchTerm);
          }}
          placeholder={t('search_placeholder')}
          className="w-full bg-[#161616] border border-[#282828] focus:border-[#00FF87] rounded-xl pl-9 pr-9 py-2.5 text-xs text-white placeholder-neutral-500 outline-none transition-colors"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-3 rtl:right-auto rtl:left-3 text-neutral-400 hover:text-white p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* When no query entered: Show Recent Searches & Popular Teams */}
      {!debouncedQuery && (
        <div className="space-y-4">
          {/* Recent Searches */}
          {recentSearches.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-neutral-400" />
                  {t('recent_searches')}
                </span>
                <button onClick={clearRecent} className="text-[11px] text-neutral-400 hover:text-white">
                  {t('clear')}
                </button>
              </div>
              <div className="flex items-center gap-1.5 flex-wrap">
                {recentSearches.map((term, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSearchTerm(term);
                      handleSaveSearch(term);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-[#141414] hover:bg-[#1E1E1E] border border-[#242424] text-xs text-neutral-300 transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Popular Teams Grid */}
          <div>
            <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider flex items-center gap-1.5 mb-2.5">
              <Shield className="w-3.5 h-3.5 text-[#00FF87]" />
              {t('popular_teams')}
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {searchableTeams.slice(0, 6).map((tm) => (
                <button
                  key={tm.id}
                  onClick={() => setSelectedTeamPreview(tm)}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-[#141414] hover:bg-[#1A1A1A] border border-[#222222] transition-colors text-left"
                >
                  <img src={tm.logo} alt="" className="w-6 h-6 object-contain" />
                  <span className="text-xs font-semibold text-white truncate">
                    {language === 'ar' ? tm.nameAr : tm.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Query Results */}
      {debouncedQuery && (
        <div className="space-y-4">
          {/* Teams Result */}
          {filteredTeams.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                Teams ({filteredTeams.length})
              </span>
              <div className="space-y-2">
                {filteredTeams.map((team) => (
                  <div
                    key={team.id}
                    onClick={() => setSelectedTeamPreview(team)}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#141414] hover:bg-[#1C1C1C] border border-[#242424] cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img src={team.logo} alt="" className="w-7 h-7 object-contain" />
                      <div>
                        <span className="text-xs font-bold text-white block">
                          {language === 'ar' ? team.nameAr : team.name}
                        </span>
                        <span className="text-[10px] text-neutral-400">{team.country}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-[#00FF87] font-semibold">View Squad →</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leagues Result */}
          {filteredLeagues.length > 0 && (
            <div>
              <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block mb-2">
                Competitions ({filteredLeagues.length})
              </span>
              <div className="space-y-2">
                {filteredLeagues.map((lg) => (
                  <div
                    key={lg.id}
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#141414] border border-[#242424]"
                  >
                    <span className="text-lg">{lg.flag}</span>
                    <span className="text-xs font-bold text-white">
                      {language === 'ar' ? lg.nameAr : lg.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {filteredTeams.length === 0 && filteredLeagues.length === 0 && (
            <div className="py-12 text-center text-xs text-neutral-400">
              {language === 'ar' ? 'لم يتم العثور على نتائج مطابقة للبحث' : 'No teams or leagues found'}
            </div>
          )}
        </div>
      )}

      {/* Team Squad Modal Preview */}
      {selectedTeamPreview && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-[#121212] border border-[#2A2A2A] rounded-2xl w-full max-w-md p-4 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#242424]">
              <div className="flex items-center gap-3">
                <img src={selectedTeamPreview.logo} alt="" className="w-8 h-8 object-contain" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    {language === 'ar' ? selectedTeamPreview.nameAr : selectedTeamPreview.name}
                  </h3>
                  <span className="text-[10px] text-neutral-400">{selectedTeamPreview.country}</span>
                </div>
              </div>
              <button
                onClick={() => setSelectedTeamPreview(null)}
                className="text-xs text-neutral-400 hover:text-white p-1"
              >
                ✕
              </button>
            </div>

            <div>
              <span className="text-xs font-bold text-neutral-300 block mb-2">Key Squad Players:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedTeamPreview.squad.map((player, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-md bg-[#181818] border border-[#262626] text-xs text-neutral-200"
                  >
                    ⚽ {player}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                toggleFavoriteTeam(selectedTeamPreview.id);
                setSelectedTeamPreview(null);
              }}
              className="w-full py-2 rounded-xl bg-[#00FF87] text-black font-bold text-xs"
            >
              {isTeamFavorited(selectedTeamPreview.id)
                ? (language === 'ar' ? 'إلغاء المتابعة' : 'Unfollow Team')
                : (language === 'ar' ? 'متابعة الفريق ⭐' : 'Follow Team ⭐')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
