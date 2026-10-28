export type MatchStatus = 'LIVE' | 'FT' | 'NS' | 'HT' | 'ET' | 'P';

export type Language = 'en' | 'ar';
export type ThemeMode = 'dark' | 'light';

export interface Team {
  id: number;
  name: string;
  nameAr: string;
  shortName: string;
  shortNameAr: string;
  logo: string;
}

export interface MatchEvent {
  id: string;
  minute: number;
  extraMinute?: number;
  teamId: number;
  type: 'goal' | 'yellow_card' | 'red_card' | 'subst' | 'var';
  player: string;
  playerAr: string;
  assistOrSub?: string;
  assistOrSubAr?: string;
  detail?: string;
}

export interface PlayerPosition {
  id: number;
  number: number;
  name: string;
  nameAr: string;
  position: 'G' | 'D' | 'M' | 'F';
  gridX: number; // 0 to 100 percentage
  gridY: number; // 0 to 100 percentage
  rating?: number;
  isCaptain?: boolean;
}

export interface Lineup {
  formation: string;
  coach: string;
  coachAr: string;
  startingXI: PlayerPosition[];
  substitutes: {
    id: number;
    number: number;
    name: string;
    nameAr: string;
    position: 'G' | 'D' | 'M' | 'F';
  }[];
}

export interface MatchStats {
  possession: [number, number]; // home, away
  shotsTotal: [number, number];
  shotsOnTarget: [number, number];
  expectedGoals: [number, number]; // xG
  corners: [number, number];
  fouls: [number, number];
  yellowCards: [number, number];
  redCards: [number, number];
  passesTotal: [number, number];
  passAccuracy: [number, number];
  offsides: [number, number];
}

export interface Match {
  id: number;
  leagueId: number;
  leagueName: string;
  leagueNameAr: string;
  leagueLogo: string;
  leagueCountry: string;
  leagueFlag: string;
  round: string;
  roundAr: string;
  venue: string;
  venueAr: string;
  city: string;
  cityAr: string;
  referee: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  status: MatchStatus;
  minute?: number;
  startTime: string; // e.g. "18:30" or ISO
  date: string; // "YYYY-MM-DD"
  events: MatchEvent[];
  stats: MatchStats;
  lineups: {
    home: Lineup;
    away: Lineup;
  };
  h2h?: {
    date: string;
    home: string;
    away: string;
    score: string;
    winner: 'home' | 'away' | 'draw';
  }[];
}

export interface LeagueStandingRow {
  rank: number;
  team: Team;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  form: ('W' | 'D' | 'L')[];
  zone?: 'cl' | 'el' | 'conf' | 'relegation';
}

export interface TopScorer {
  rank: number;
  player: string;
  playerAr: string;
  team: Team;
  goals: number;
  assists: number;
  played: number;
  penalties: number;
}
