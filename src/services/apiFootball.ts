import { Match, LeagueStandingRow, TopScorer } from '../types/football';
import { INITIAL_MATCHES, PREMIER_LEAGUE_STANDINGS, PREMIER_LEAGUE_TOP_SCORERS } from '../data/mockFootballData';

const BASE_URL = 'https://v3.football.api-sports.io';

export class FootballApiService {
  private static instance: FootballApiService;
  private apiKey: string = '';

  private constructor() {
    this.apiKey = localStorage.getItem('scorepulse_api_key') || '';
  }

  public static getInstance(): FootballApiService {
    if (!FootballApiService.instance) {
      FootballApiService.instance = new FootballApiService();
    }
    return FootballApiService.instance;
  }

  public setApiKey(key: string) {
    this.apiKey = key.trim();
    if (this.apiKey) {
      localStorage.setItem('scorepulse_api_key', this.apiKey);
    } else {
      localStorage.removeItem('scorepulse_api_key');
    }
  }

  public getApiKey(): string {
    return this.apiKey;
  }

  public hasApiKey(): boolean {
    return !!this.apiKey;
  }

  // Fetch matches by date
  public async getMatches(date: string): Promise<Match[]> {
    if (!this.apiKey) {
      // Return local realistic data
      return INITIAL_MATCHES;
    }

    try {
      const response = await fetch(`${BASE_URL}/fixtures?date=${date}`, {
        headers: {
          'x-apisports-key': this.apiKey,
        },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      if (!data.response || data.response.length === 0) {
        return INITIAL_MATCHES;
      }

      // Map API-Football v3 fixture response
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data.response.slice(0, 20).map((item: any, idx: number) => {
        const fixture = item.fixture;
        const league = item.league;
        const teams = item.teams;
        const goals = item.goals;
        const statusShort = fixture.status.short;

        let status: Match['status'] = 'NS';
        if (['1H', '2H', 'HT', 'ET', 'P', 'LIVE'].includes(statusShort)) {
          status = 'LIVE';
        } else if (['FT', 'AET', 'PEN'].includes(statusShort)) {
          status = 'FT';
        }

        return {
          id: fixture.id || idx + 2000,
          leagueId: league.id,
          leagueName: league.name,
          leagueNameAr: league.name,
          leagueLogo: league.logo,
          leagueCountry: league.country,
          leagueFlag: league.flag || '⚽',
          round: league.round || 'Regular Season',
          roundAr: league.round || 'الموسم العادي',
          venue: fixture.venue?.name || 'Stadium',
          venueAr: fixture.venue?.name || 'الملعب',
          city: fixture.venue?.city || '',
          cityAr: fixture.venue?.city || '',
          referee: fixture.referee || 'Referee',
          homeTeam: {
            id: teams.home.id,
            name: teams.home.name,
            nameAr: teams.home.name,
            shortName: teams.home.name.substring(0, 3).toUpperCase(),
            shortNameAr: teams.home.name.substring(0, 3),
            logo: teams.home.logo,
          },
          awayTeam: {
            id: teams.away.id,
            name: teams.away.name,
            nameAr: teams.away.name,
            shortName: teams.away.name.substring(0, 3).toUpperCase(),
            shortNameAr: teams.away.name.substring(0, 3),
            logo: teams.away.logo,
          },
          homeScore: goals.home ?? 0,
          awayScore: goals.away ?? 0,
          status,
          minute: fixture.status.elapsed,
          startTime: new Date(fixture.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: fixture.date.substring(0, 10),
          events: [],
          stats: {
            possession: [50, 50],
            shotsTotal: [0, 0],
            shotsOnTarget: [0, 0],
            expectedGoals: [0, 0],
            corners: [0, 0],
            fouls: [0, 0],
            yellowCards: [0, 0],
            redCards: [0, 0],
            passesTotal: [0, 0],
            passAccuracy: [0, 0],
            offsides: [0, 0],
          },
          lineups: INITIAL_MATCHES[0].lineups,
        };
      });
    } catch {
      // Graceful fallback to initial matches
      return INITIAL_MATCHES;
    }
  }

  // Fetch Standings
  public async getStandings(leagueId: number, season: number = 2024): Promise<LeagueStandingRow[]> {
    if (!this.apiKey) {
      return PREMIER_LEAGUE_STANDINGS;
    }

    try {
      const response = await fetch(`${BASE_URL}/standings?league=${leagueId}&season=${season}`, {
        headers: {
          'x-apisports-key': this.apiKey,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch standings');
      const data = await response.json();
      const rows = data.response?.[0]?.league?.standings?.[0];

      if (!rows || rows.length === 0) return PREMIER_LEAGUE_STANDINGS;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return rows.map((r: any) => ({
        rank: r.rank,
        team: {
          id: r.team.id,
          name: r.team.name,
          nameAr: r.team.name,
          shortName: r.team.name.substring(0, 3).toUpperCase(),
          shortNameAr: r.team.name.substring(0, 3),
          logo: r.team.logo,
        },
        played: r.all.played,
        won: r.all.win,
        drawn: r.all.draw,
        lost: r.all.lose,
        goalsFor: r.all.goals.for,
        goalsAgainst: r.all.goals.against,
        goalDifference: r.goalsDiff,
        points: r.points,
        form: r.form ? (r.form.split('').slice(-5) as ('W' | 'D' | 'L')[]) : ['W', 'D', 'W'],
        zone: r.rank <= 4 ? 'cl' : r.rank === 5 ? 'el' : r.rank >= 18 ? 'relegation' : undefined,
      }));
    } catch {
      return PREMIER_LEAGUE_STANDINGS;
    }
  }

  // Fetch Top Scorers
  public async getTopScorers(leagueId: number, season: number = 2024): Promise<TopScorer[]> {
    if (!this.apiKey) {
      return PREMIER_LEAGUE_TOP_SCORERS;
    }

    try {
      const response = await fetch(`${BASE_URL}/players/topscorers?league=${leagueId}&season=${season}`, {
        headers: {
          'x-apisports-key': this.apiKey,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch top scorers');
      const data = await response.json();
      if (!data.response) return PREMIER_LEAGUE_TOP_SCORERS;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return data.response.slice(0, 10).map((item: any, idx: number) => ({
        rank: idx + 1,
        player: item.player.name,
        playerAr: item.player.name,
        team: {
          id: item.statistics[0].team.id,
          name: item.statistics[0].team.name,
          nameAr: item.statistics[0].team.name,
          shortName: item.statistics[0].team.name.substring(0, 3).toUpperCase(),
          shortNameAr: item.statistics[0].team.name.substring(0, 3),
          logo: item.statistics[0].team.logo,
        },
        goals: item.statistics[0].goals.total || 0,
        assists: item.statistics[0].goals.assists || 0,
        played: item.statistics[0].games.appearences || 0,
        penalties: item.statistics[0].penalty.scored || 0,
      }));
    } catch {
      return PREMIER_LEAGUE_TOP_SCORERS;
    }
  }
}

export const footballApi = FootballApiService.getInstance();
