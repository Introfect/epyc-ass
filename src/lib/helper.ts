import { MatchType, MetricComparison, TeamInfo, TeamPerformance, TeamStats, YearlyMetric } from "@/types/matchesTypes";
import { PlayerRecord, TopPlayer } from "@/types/playerTypes";
import { teamData } from "./constants";

export const normalizeSeason = (season: string) => {
    const newString=String(season)
    if (newString.includes("/")) {
      return newString.split("/")[0];
    }
    return newString;
  };

 export const countMatchesPerSeason = (matches: MatchType[]): { year: number; matches: number }[] => {
    const seasonCount: { [key: string]: number } = {};
  
    matches!.forEach((match) => {
      const normalizedSeason = normalizeSeason(match!.season!);
      if (seasonCount[normalizedSeason]) {
        seasonCount[normalizedSeason] += 1;
      } else {
        seasonCount[normalizedSeason] = 1;
      }
    });
  
    return Object.entries(seasonCount).map(([year, matches]) => ({
      year: parseInt(year, 10),
      matches
    }));
  };


  export const countTossDecisionsPerTeam = (matches: MatchType[]): { team: string; bat: number; bowl: number }[] => {
    const teamDecisionCount: { [key: string]: { bat: number; bowl: number } } = {};
  
    matches.forEach((match) => {      
     const team = match.toss_winner;
      const decision = match.toss_decision?.toLowerCase(); // Use optional chaining to handle undefined values
  
      if (!teamDecisionCount[team]) {
        teamDecisionCount[team] = { bat: 0, bowl: 0 };
      }
  
      if (decision === 'bat') {
        teamDecisionCount[team].bat += 1;
      } else if (decision === 'field' || decision === 'bowl') {
        teamDecisionCount[team].bowl += 1;
      }
    });
    return Object.entries(teamDecisionCount).map(([team, decisions]) => ({
      team:team,
      bat: decisions.bat,
      bowl: decisions.bowl
    }));
  };


export const calculateAvgRunsPerSeason = (matches: MatchType[]): { year: number; avgRuns: number }[] => {
    const seasonRunCount: { [key: string]: { totalRuns: number; matchCount: number } } = {};
  
    matches.forEach((match) => {
      const normalizedSeason = normalizeSeason(match!.season!);
      match.season=normalizedSeason
      const season = match.season;
      const runs = typeof match.target_runs === 'number' ? match.target_runs : parseInt(match.target_runs);

      if (isNaN(runs)) {
        return; 
      }
      if (!seasonRunCount[season]) {
        seasonRunCount[season] = { totalRuns: 0, matchCount: 0 };
      }
  
      seasonRunCount[season].totalRuns += runs;
      seasonRunCount[season].matchCount += 1;
    });
  
    return Object.entries(seasonRunCount).map(([season, data]) => {
      const year = season.includes('/') ? parseInt(season.split('/')[0]) : parseInt(season);
      return {
        year,
        avgRuns: data.totalRuns / data.matchCount
      };
    });
  };

export const calculateMetricsComparison = (matches: MatchType[], teamA: string, teamB: string): MetricComparison[] => {
  const teamStats: { [team: string]: { totalRuns: number; wins: number; matchesPlayed: number; wickets: number } } = {
    [teamA]: { totalRuns: 0, wins: 0, matchesPlayed: 0, wickets: 0 },
    [teamB]: { totalRuns: 0, wins: 0, matchesPlayed: 0, wickets: 0 },
  };

  matches.forEach(match => {
    if (match.team1 === teamA || match.team2 === teamA) {
      // Increment matches played
      teamStats[teamA].matchesPlayed += 1;

      // Sum total runs scored by the team
      if (match.team1 === teamA && typeof match.target_runs === 'number') {
        teamStats[teamA].totalRuns += match.target_runs;
      }
      if (match.team2 === teamA && typeof match.target_runs === 'number') {
        teamStats[teamA].totalRuns += match.target_runs;
      }

      // Increment wins for the team
      if (match.winner === teamA) {
        teamStats[teamA].wins += 1;
      }

      // Calculate wickets (assuming result_margin is the number of wickets taken)
      if (match.result === 'wickets' && typeof match.result_margin === 'number' && match.winner === teamA) {
        teamStats[teamA].wickets += match.result_margin;
      }
    }

    if (match.team1 === teamB || match.team2 === teamB) {
      // Increment matches played
      teamStats[teamB].matchesPlayed += 1;

      // Sum total runs scored by the team
      if (match.team1 === teamB && typeof match.target_runs === 'number') {
        teamStats[teamB].totalRuns += match.target_runs;
      }
      if (match.team2 === teamB && typeof match.target_runs === 'number') {
        teamStats[teamB].totalRuns += match.target_runs;
      }

      // Increment wins for the team
      if (match.winner === teamB) {
        teamStats[teamB].wins += 1;
      }

      // Calculate wickets (assuming result_margin is the number of wickets taken)
      if (match.result === 'wickets' && typeof match.result_margin === 'number' && match.winner === teamB) {
        teamStats[teamB].wickets += match.result_margin;
      }
    }
  });

  const metrics = ['avgRuns', 'wins', 'matchesPlayed', 'wickets'];
  const comparison: MetricComparison[] = metrics.map(metric => {
    let valueA, valueB;
    if (metric === 'avgRuns') {
      valueA = teamStats[teamA].matchesPlayed > 0 ? teamStats[teamA].totalRuns / teamStats[teamA].matchesPlayed : 0;
      valueB = teamStats[teamB].matchesPlayed > 0 ? teamStats[teamB].totalRuns / teamStats[teamB].matchesPlayed : 0;
    } else {
      // @ts-ignore
      valueA = teamStats[teamA][metric as keyof typeof teamStats[teamA]];
      // @ts-ignore
      valueB = teamStats[teamB][metric as keyof typeof teamStats[teamB]];
    }
    return {
      metric,
      teamA: valueA,
      teamB: valueB,
      total: valueA + valueB,
    };
  });

  return comparison;
};


  

export const getUniqueTeams = (matches: MatchType[]): TeamInfo[] => {
    const teams = new Set<string>();
  
    matches?.forEach(match => {
      teams.add(match.team1);
      teams.add(match.team2);
    });
    return Array.from(teams).map(teamName=> teamData[teamName]);
  };

export const calculateYearlyAvgRuns = (matches: MatchType[], teamA: string, teamB: string): YearlyMetric[] => {
  const yearlyStats: { [year: string]: { [team: string]: { totalRuns: number; matchesPlayed: number } } } = {};

  matches.forEach(match => {
    const normalizedSeason = normalizeSeason(match!.season!);
      match.season=normalizedSeason
    const year = match.season;

    if (!yearlyStats[year]) {
      yearlyStats[year] = {
        [teamA]: { totalRuns: 0, matchesPlayed: 0 },
        [teamB]: { totalRuns: 0, matchesPlayed: 0 },
      };
    }

    if (match.team1 === teamA || match.team2 === teamA) {
      yearlyStats[year][teamA].matchesPlayed += 1;
      if (typeof match.target_runs === 'number') {
        yearlyStats[year][teamA].totalRuns += match.target_runs;
      }
    }

    if (match.team1 === teamB || match.team2 === teamB) {
      yearlyStats[year][teamB].matchesPlayed += 1;
      if (typeof match.target_runs === 'number') {
        yearlyStats[year][teamB].totalRuns += match.target_runs;
      }
    }
  });

  return Object.keys(yearlyStats).map(year => {
    const teamAStats = yearlyStats[year][teamA];
    const teamBStats = yearlyStats[year][teamB];
    return {
      year,
      teamA: teamAStats.matchesPlayed > 0 ? Math.round(teamAStats.totalRuns / teamAStats.matchesPlayed) : 0,
      teamB: teamBStats.matchesPlayed > 0 ? Math.round(teamBStats.totalRuns / teamBStats.matchesPlayed) : 0,
    };
  });
};


export const calculateYearlyWins = (matches: MatchType[], teamA: string, teamB: string): YearlyMetric[] => {
  const yearlyStats: { [year: string]: { [team: string]: number } } = {};

  matches.forEach(match => {
    const year = match.season;

    if (!yearlyStats[year]) {
      yearlyStats[year] = {
        [teamA]: 0,
        [teamB]: 0,
      };
    }

    if (match.winner === teamA) {
      yearlyStats[year][teamA] += 1;
    }

    if (match.winner === teamB) {
      yearlyStats[year][teamB] += 1;
    }
  });

  return Object.keys(yearlyStats).map(year => ({
    year,
    teamA: yearlyStats[year][teamA],
    teamB: yearlyStats[year][teamB],
  }));
};


export const calculateYearlyWickets = (matches: MatchType[], teamA: string, teamB: string): YearlyMetric[] => {
  const yearlyStats: { [year: string]: { [team: string]: number } } = {};

  matches.forEach(match => {
    const year = match.season;

    if (!yearlyStats[year]) {
      yearlyStats[year] = {
        [teamA]: 0,
        [teamB]: 0,
      };
    }

    if (match.result === 'wickets' && typeof match.result_margin === 'number') {
      if (match.winner === teamA) {
        yearlyStats[year][teamA] += match.result_margin;
      }

      if (match.winner === teamB) {
        yearlyStats[year][teamB] += match.result_margin;
      }
    }
  });

  return Object.keys(yearlyStats).map(year => ({
    year,
    teamA: yearlyStats[year][teamA],
    teamB: yearlyStats[year][teamB],
  }));
};

export const calculateTeamStats = (matches: MatchType[]): TeamStats[] => {
  const teamStats: { [team: string]: { wins: number, losses: number, matchesPlayed: number, totalRuns: number } } = {};

  matches.forEach(match => {
    const { team1, team2, winner, target_runs } = match;

    if (!teamStats[team1]) {
      teamStats[team1] = { wins: 0, losses: 0, matchesPlayed: 0, totalRuns: 0 };
    }

    if (!teamStats[team2]) {
      teamStats[team2] = { wins: 0, losses: 0, matchesPlayed: 0, totalRuns: 0 };
    }

    teamStats[team1].matchesPlayed++;
    teamStats[team2].matchesPlayed++;

    const targetRunsTeam1 = typeof target_runs === 'number' ? target_runs : (isNaN(Number(target_runs)) ? 0 : Number(target_runs));
    const targetRunsTeam2 = typeof target_runs === 'number' ? target_runs : (isNaN(Number(target_runs)) ? 0 : Number(target_runs));

    teamStats[team1].totalRuns += targetRunsTeam1;
    teamStats[team2].totalRuns += targetRunsTeam2;

    if (winner === team1) {
      teamStats[team1].wins++;
      teamStats[team2].losses++;
    } else if (winner === team2) {
      teamStats[team2].wins++;
      teamStats[team1].losses++;
    }
  });

  return Object.entries(teamStats).map(([team, stats]) => ({
    team,
    wins: stats.wins,
    losses: stats.losses,
    matchesPlayed: stats.matchesPlayed,
    totalRuns: stats.totalRuns,
    avgRunsPerMatch: stats.matchesPlayed > 0 ? stats.totalRuns / stats.matchesPlayed : 0,
  })).sort((a, b) => b.wins - a.wins).slice(0, 5);
};


export const countMatchesAndSuperOvers = (matches: MatchType[]) => {
  let totalMatches = 0;
  let superOvers = 0;

  matches.forEach(match => {
    totalMatches++;
    if (match.super_over?.toLowerCase() === 'y') {
      superOvers++;
    }
  });

  return {
    totalMatches,
    superOvers
  };
};

// Player analysis

export const compareBattingAverage = (records: PlayerRecord[], player1: string, player2: string): { year: number, player1: number, player2: number }[] => {
  const yearlyStats: { [year: number]: { [player: string]: number } } = {};

  records.forEach(record => {
    const year = record.year;

    if (!yearlyStats[year]) {
      yearlyStats[year] = {};
    }

    if (record.player_name === player1) {
      yearlyStats[year][player1] = record.batting_average;
    }

    if (record.player_name === player2) {
      yearlyStats[year][player2] = record.batting_average;
    }
  });

  return Object.keys(yearlyStats).map(year => ({
    year: parseInt(year),
    // @ts-expect-error
    player1: yearlyStats[year][player1] || 0,
    // @ts-expect-error
    player2: yearlyStats[year][player2] || 0,
  }));
};


export const compareRunsScored = (records: PlayerRecord[], player1: string, player2: string): { year: number, player1: number, player2: number }[] => {
  const yearlyStats: { [year: number]: { [player: string]: number } } = {};

  records.forEach(record => {
    const year = record.year;

    if (!yearlyStats[year]) {
      yearlyStats[year] = {};
    }

    if (record.player_name === player1) {
      yearlyStats[year][player1] = record.runs_scored;
    }

    if (record.player_name === player2) {
      yearlyStats[year][player2] = record.runs_scored;
    }
  });

  return Object.keys(yearlyStats).map(year => ({
    year: parseInt(year),
    // @ts-expect-error
    player1: yearlyStats[year][player1] || 0,
    // @ts-expect-error
    player2: yearlyStats[year][player2] || 0,
  }));
};


export const compareWicketsTaken = (records: PlayerRecord[], player1: string, player2: string): { year: number, player1: number, player2: number }[] => {
  const yearlyStats: { [year: number]: { [player: string]: number } } = {};

  records.forEach(record => {
    const year = record.year;

    if (!yearlyStats[year]) {
      yearlyStats[year] = {};
    }

    if (record.player_name === player1) {
      yearlyStats[year][player1] = record.wickets_taken;
    }

    if (record.player_name === player2) {
      yearlyStats[year][player2] = record.wickets_taken;
    }
  });

  return Object.keys(yearlyStats).map(year => ({
    year: parseInt(year),
    // @ts-expect-error
    player1: yearlyStats[year][player1] || 0,
    // @ts-expect-error
    player2: yearlyStats[year][player2] || 0,
  }));
};


export const compareBattingStrikeRate = (records: PlayerRecord[], player1: string, player2: string): { year: number, player1: number, player2: number }[] => {
  const yearlyStats: { [year: number]: { [player: string]: number } } = {};

  records.forEach(record => {
    const year = record.year;

    if (!yearlyStats[year]) {
      yearlyStats[year] = {};
    }

    if (record.player_name === player1) {
      yearlyStats[year][player1] = record.batting_strike_rate;
    }

    if (record.player_name === player2) {
      yearlyStats[year][player2] = record.batting_strike_rate;
    }
  });

  return Object.keys(yearlyStats).map(year => ({
    year: parseInt(year),
    // @ts-expect-error
    player1: yearlyStats[year][player1] || 0,
    // @ts-expect-error
    player2: yearlyStats[year][player2] || 0,
  }));
};

export const getUniquePlayerNames = (records: PlayerRecord[]): string[] => {
  const playerNamesSet: Set<string> = new Set();

  records.forEach(record => {
    playerNamesSet.add(record.player_name);
  });

  return Array.from(playerNamesSet);
};

export const getTopRunScorers = (players: PlayerRecord[]): TopPlayer[] => {
  // Sort players by runs scored in descending order
  const sortedPlayers = players.sort((a, b) => b.runs_scored - a.runs_scored);

  // Get the top 5 players
  const topPlayers = sortedPlayers.slice(0, 5);

  // Return the required metrics
  return topPlayers.map(player => ({
    player_name: player.player_name,
    runs_scored: player.runs_scored,
    highest_score: player.highest_score,
    half_centuries: player.half_centuries,
    centuries: player.centuries
  }));
};