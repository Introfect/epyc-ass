export type PlayerRecord= {
    balls_bowled: number;
    balls_faced: number;
    batting_average: number;
    batting_strike_rate: number;
    best_bowling_match: number;
    bowling_average: number;
    bowling_strike_rate: number;
    catches_taken: number;
    centuries: number;
    economy_rate: number;
    five_wicket_hauls: number;
    four_wicket_hauls: number;
    fours: number;
    half_centuries: number;
    highest_score: number;
    matches_batted: number;
    matches_bowled: number;
    not_outs: number;
    player_name: string;
    runs_conceded: number;
    runs_scored: number;
    sixes: number;
    stumpings: number;
    wickets_taken: number;
    year: number;
  }

  export type YearlyPlaterMetric= {
    year: number;
    player1: number;
    player2: number;
  }

  export type TopPlayer= {
    player_name: string;
    runs_scored: number;
    highest_score: number;
    half_centuries: number;
    centuries: number;
  }