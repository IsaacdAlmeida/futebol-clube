interface ILeaderboard {
  name: string;
  teamName?: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  eficiency: number;
  [key: string]: unknown;
}

export default ILeaderboard;
