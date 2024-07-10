export type MatchType = {
    city: string;
    date: string;
    id: number;
    match_type: string;
    method: string;
    player_of_match: string;
    result: string;
    result_margin: number;
    season: string;
    super_over: string;
    target_overs: number;
    target_runs: number;
    team1: string;
    team2: string;
    toss_decision: string;
    toss_winner: string;
    umpire1: string;
    umpire2: string;
    venue: string;
    winner: string;
  };

  export type MatchesPerSeason = {
    season: string;
    count: number;
  };

export type TeamPerformance= {
    team: string;
    totalRuns: number;
    wins: number;
    matchesPlayed: number;
    wickets: number;
  }

export type MetricComparison ={
  metric: string;
  teamA: number;
  teamB: number;
  total: number;
}  

export type YearlyMetric= {
  year: string;
  teamA: number;
  teamB: number;
}

export type TeamStats= {
  team: string;
  wins: number;
  losses: number;
  matchesPlayed: number;
  totalRuns: number;
  avgRunsPerMatch: number;
}

export type TeamInfo= {
  name: string;
  logo: string;
  color: string;
}

