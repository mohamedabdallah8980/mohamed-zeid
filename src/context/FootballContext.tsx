import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Match, Language, ThemeMode } from '../types/football';
import { INITIAL_MATCHES } from '../data/mockFootballData';
import { footballApi } from '../services/apiFootball';

export type MainTab = 'scores' | 'favorites' | 'standings' | 'search' | 'settings';
export type MatchFilter = 'ALL' | 'LIVE' | 'FINISHED' | 'UPCOMING';

interface FootballContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  activeTab: MainTab;
  setActiveTab: (tab: MainTab) => void;
  filterStatus: MatchFilter;
  setFilterStatus: (filter: MatchFilter) => void;
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  matches: Match[];
  setMatches: React.Dispatch<React.SetStateAction<Match[]>>;
  loading: boolean;
  error: string | null;
  refreshMatches: () => Promise<void>;
  
  // Favorites
  favoriteMatches: number[];
  favoriteTeams: number[];
  toggleFavoriteMatch: (id: number) => void;
  toggleFavoriteTeam: (id: number) => void;
  isMatchFavorited: (id: number) => boolean;
  isTeamFavorited: (id: number) => boolean;

  // Match details modal
  selectedMatch: Match | null;
  setSelectedMatch: (match: Match | null) => void;

  // Live match simulator
  isSimulatorRunning: boolean;
  setIsSimulatorRunning: (run: boolean) => void;
  toggleSimulator: () => void;
  latestNotification: string | null;
  clearNotification: () => void;

  // View mode
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  toggleMobileFrame: () => void;

  // Sound effects
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;

  // Translations helper
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    app_title: 'ScorePulse',
    scores: 'Scores',
    favorites: 'Favorites',
    standings: 'Standings',
    search: 'Search',
    settings: 'Settings',
    all: 'All',
    live: 'Live',
    finished: 'Finished',
    upcoming: 'Upcoming',
    yesterday: 'Yesterday',
    today: 'Today',
    tomorrow: 'Tomorrow',
    pick_date: 'Pick Date',
    ft: 'FT',
    ht: 'HT',
    ns: 'NS',
    live_badge: 'LIVE',
    details: 'Details',
    lineups: 'Lineups',
    stats: 'Stats',
    h2h: 'H2H',
    table: 'Table',
    possession: 'Ball Possession',
    shots_total: 'Total Shots',
    shots_on_target: 'Shots on Target',
    expected_goals: 'Expected Goals (xG)',
    corners: 'Corner Kicks',
    fouls: 'Fouls',
    yellow_cards: 'Yellow Cards',
    red_cards: 'Red Cards',
    passes: 'Accurate Passes',
    offsides: 'Offsides',
    formation: 'Formation',
    coach: 'Coach',
    substitutes: 'Substitutes',
    rank: '#',
    team: 'Team',
    played: 'P',
    won: 'W',
    drawn: 'D',
    lost: 'L',
    gf: 'GF',
    ga: 'GA',
    gd: 'GD',
    pts: 'Pts',
    form: 'Form',
    top_scorers: 'Top Scorers',
    goals: 'Goals',
    assists: 'Assists',
    no_matches: 'No matches found for this filter.',
    empty_favorites: 'No favorites added yet. Tap the star icon on any match or team to follow!',
    search_placeholder: 'Search teams, leagues, players...',
    recent_searches: 'Recent Searches',
    popular_teams: 'Popular Teams',
    appearance: 'Appearance',
    dark_mode: 'Dark Mode',
    light_mode: 'Light Mode',
    language_label: 'Language',
    notifications: 'Goal Notifications',
    live_sim: 'Live Simulation (Auto-clock)',
    api_key_title: 'API-Football v3 Key',
    api_key_desc: 'Optional: Enter your rapidapi/api-sports key to fetch live worldwide data directly.',
    save: 'Save',
    clear: 'Clear',
    phone_frame: 'Mobile Mockup View',
    full_view: 'Full Width View',
    goal_scored: 'GOAL! ⚽',
    retry: 'Retry',
    loading_data: 'Loading football scores...',
  },
  ar: {
    app_title: 'نبض الملاعب',
    scores: 'المباريات',
    favorites: 'المفضلة',
    standings: 'الترتيب',
    search: 'بحث',
    settings: 'الإعدادات',
    all: 'الكل',
    live: 'مباشر',
    finished: 'انتهت',
    upcoming: 'القادمة',
    yesterday: 'الأمس',
    today: 'اليوم',
    tomorrow: 'الغد',
    pick_date: 'اختر تاريخاً',
    ft: 'نهاية',
    ht: 'استراحة',
    ns: 'لم تبدأ',
    live_badge: 'مباشر',
    details: 'الأحداث',
    lineups: 'التشكيلة',
    stats: 'الإحصائيات',
    h2h: 'المواجهات',
    table: 'الجدول',
    possession: 'الاستحواذ',
    shots_total: 'إجمالي التسديدات',
    shots_on_target: 'التسديدات على المرمى',
    expected_goals: 'الأهداف المتوقعة (xG)',
    corners: 'الركنيات',
    fouls: 'الأخطاء',
    yellow_cards: 'البطاقات الصفراء',
    red_cards: 'البطاقات الحمراء',
    passes: 'التمريرات الصحيحة',
    offsides: 'التسلل',
    formation: 'الخطة التكتيكية',
    coach: 'المدرب',
    substitutes: 'دكة البدلاء',
    rank: '#',
    team: 'الفريق',
    played: 'لعب',
    won: 'ف',
    drawn: 'ت',
    lost: 'خ',
    gf: 'له',
    ga: 'عليه',
    gd: '+/-',
    pts: 'نقاط',
    form: 'النموذج',
    top_scorers: 'الهدافون',
    goals: 'الأهداف',
    assists: 'التمريرات الحاسمة',
    no_matches: 'لا توجد مباريات مطابقة للفلتر المحدد.',
    empty_favorites: 'لا توجد عناصر مفضلة حتى الآن. انقر على النجمة في أي مباراة أو فريق لمتابعتها فوراً!',
    search_placeholder: 'ابحث عن أندية، دوريات، لاعبين...',
    recent_searches: 'عمليات البحث الأخيرة',
    popular_teams: 'أشهر الأندية',
    appearance: 'المظهر',
    dark_mode: 'الوضع الداكن',
    light_mode: 'الوضع الفاتح',
    language_label: 'اللغة',
    notifications: 'تنبيهات الأهداف',
    live_sim: 'محاكاة المباريات المباشرة',
    api_key_title: 'مفتاح API-Football v3',
    api_key_desc: 'اختياري: يمكنك وضع مفتاح API-Sports الخاص بك لجلب المباريات الحية عالمياً مباشرة.',
    save: 'حفظ',
    clear: 'مسح',
    phone_frame: 'محاكي الهاتف المحمول',
    full_view: 'عرض الشاشة الكاملة',
    goal_scored: 'هـــدف! ⚽',
    retry: 'إعادة المحاولة',
    loading_data: 'جاري تحميل نتائج المباريات...',
  },
};

const FootballContext = createContext<FootballContextType | undefined>(undefined);

export const FootballProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Saved states
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('scorepulse_lang') as Language) || 'ar'; // Default to Arabic for user comfort
  });

  const [theme, setThemeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem('scorepulse_theme') as ThemeMode) || 'dark';
  });

  const [activeTab, setActiveTab] = useState<MainTab>('scores');
  const [filterStatus, setFilterStatus] = useState<MatchFilter>('ALL');
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-28');
  const [matches, setMatches] = useState<Match[]>(INITIAL_MATCHES);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Favorites
  const [favoriteMatches, setFavoriteMatches] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('scorepulse_fav_matches');
      return stored ? JSON.parse(stored) : [1001]; // Default favorite Arsenal-Chelsea
    } catch {
      return [1001];
    }
  });

  const [favoriteTeams, setFavoriteTeams] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem('scorepulse_fav_teams');
      return stored ? JSON.parse(stored) : [42, 541, 1026]; // Arsenal, Real Madrid, Al Ahly
    } catch {
      return [42, 541, 1026];
    }
  });

  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isSimulatorRunning, setIsSimulatorRunning] = useState<boolean>(true);
  const [latestNotification, setLatestNotification] = useState<string | null>(null);
  const [isMobileFrame, setIsMobileFrame] = useState<boolean>(true);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Set language & RTL
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('scorepulse_lang', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  // Set Theme
  const setTheme = (tMode: ThemeMode) => {
    setThemeState(tMode);
    localStorage.setItem('scorepulse_theme', tMode);
    if (tMode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  useEffect(() => {
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [language, theme]);

  // Persist favorites
  const toggleFavoriteMatch = (id: number) => {
    setFavoriteMatches((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((mId) => mId !== id) : [...prev, id];
      localStorage.setItem('scorepulse_fav_matches', JSON.stringify(next));
      return next;
    });
  };

  const toggleFavoriteTeam = (id: number) => {
    setFavoriteTeams((prev) => {
      const exists = prev.includes(id);
      const next = exists ? prev.filter((tId) => tId !== id) : [...prev, id];
      localStorage.setItem('scorepulse_fav_teams', JSON.stringify(next));
      return next;
    });
  };

  const isMatchFavorited = (id: number) => favoriteMatches.includes(id);
  const isTeamFavorited = (id: number) => favoriteTeams.includes(id);

  // Load matches
  const refreshMatches = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await footballApi.getMatches(selectedDate);
      setMatches(data);
    } catch {
      setError('Failed to fetch football data. Showing offline records.');
    } finally {
      setLoading(false);
    }
  }, [selectedDate]);

  useEffect(() => {
    refreshMatches();
  }, [refreshMatches]);

  // Live match simulation ticker: Advances live minutes every 4 seconds
  useEffect(() => {
    if (!isSimulatorRunning) return;

    const interval = setInterval(() => {
      setMatches((prevMatches) => {
        return prevMatches.map((match) => {
          if (match.status !== 'LIVE' || match.minute === undefined) return match;

          const nextMinute = match.minute + 1;
          let newHomeScore = match.homeScore;
          let newAwayScore = match.awayScore;
          const updatedEvents = [...match.events];

          // Small random chance of a goal happening during live simulation
          if (Math.random() < 0.08 && nextMinute < 90) {
            const isHomeGoal = Math.random() > 0.45;
            if (isHomeGoal) {
              newHomeScore += 1;
              const scorerName = match.homeTeam.name === 'Arsenal' ? 'Martinelli' : match.homeTeam.name;
              updatedEvents.unshift({
                id: `ev-sim-${Date.now()}`,
                minute: nextMinute,
                teamId: match.homeTeam.id,
                type: 'goal',
                player: scorerName,
                playerAr: scorerName,
                detail: 'Brilliant live finish!',
              });
              setLatestNotification(`⚽ GOAL! ${match.homeTeam.name} ${newHomeScore} - ${newAwayScore} ${match.awayTeam.name} (${nextMinute}')`);
            } else {
              newAwayScore += 1;
              const scorerName = match.awayTeam.name === 'Chelsea' ? 'Nkunku' : match.awayTeam.name;
              updatedEvents.unshift({
                id: `ev-sim-${Date.now()}`,
                minute: nextMinute,
                teamId: match.awayTeam.id,
                type: 'goal',
                player: scorerName,
                playerAr: scorerName,
                detail: 'Clinical counter-attack goal!',
              });
              setLatestNotification(`⚽ GOAL! ${match.homeTeam.name} ${newHomeScore} - ${newAwayScore} ${match.awayTeam.name} (${nextMinute}')`);
            }
          }

          // If reached 90', mark full-time
          let updatedStatus: Match['status'] = 'LIVE';
          if (nextMinute >= 93) {
            updatedStatus = 'FT';
          }

          return {
            ...match,
            minute: nextMinute,
            status: updatedStatus,
            homeScore: newHomeScore,
            awayScore: newAwayScore,
            events: updatedEvents,
          };
        });
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [isSimulatorRunning]);

  // Keep selectedMatch in sync with matches updates
  useEffect(() => {
    if (selectedMatch) {
      const current = matches.find((m) => m.id === selectedMatch.id);
      if (current) {
        setSelectedMatch(current);
      }
    }
  }, [matches, selectedMatch]);

  const toggleSimulator = () => setIsSimulatorRunning((prev) => !prev);
  const toggleMobileFrame = () => setIsMobileFrame((prev) => !prev);
  const clearNotification = () => setLatestNotification(null);

  const t = (key: string): string => {
    return translations[language]?.[key] || key;
  };

  return (
    <FootballContext.Provider
      value={{
        language,
        setLanguage,
        theme,
        setTheme,
        activeTab,
        setActiveTab,
        filterStatus,
        setFilterStatus,
        selectedDate,
        setSelectedDate,
        matches,
        setMatches,
        loading,
        error,
        refreshMatches,
        favoriteMatches,
        favoriteTeams,
        toggleFavoriteMatch,
        toggleFavoriteTeam,
        isMatchFavorited,
        isTeamFavorited,
        selectedMatch,
        setSelectedMatch,
        isSimulatorRunning,
        setIsSimulatorRunning,
        toggleSimulator,
        latestNotification,
        clearNotification,
        isMobileFrame,
        setIsMobileFrame,
        toggleMobileFrame,
        soundEnabled,
        setSoundEnabled,
        t,
      }}
    >
      {children}
    </FootballContext.Provider>
  );
};

export const useFootball = () => {
  const context = useContext(FootballContext);
  if (!context) {
    throw new Error('useFootball must be used within a FootballProvider');
  }
  return context;
};
