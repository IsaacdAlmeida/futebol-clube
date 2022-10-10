import sequelize = require('sequelize');
import ILeaderboard from '../interfaces/leaderboard.interface';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

const TOTAL_POINTS = `SUM(home_team_goals > away_team_goals) * 3 
+ SUM(home_team_goals = away_team_goals)`;

const EFFICIENY = `CONVERT(((SUM(home_team_goals > away_team_goals) * 3) 
+ SUM(home_team_goals = away_team_goals)) / (COUNT(home_team) * 3) * 100, DECIMAL(10,2))`;

class LeaderboardService {
  model = Matches;

  public async leaderboardArray():Promise<ILeaderboard[]> {
    const homeLeaderboard = await this.model.findAll({ where: { inProgress: false },
      attributes: [
        [sequelize.literal(`${TOTAL_POINTS}`), 'totalPoints'],
        [sequelize.fn('COUNT', sequelize.col('home_team')), 'totalGames'],
        [sequelize.literal('SUM(home_team_goals > away_team_goals)'), 'totalVictories'],
        [sequelize.literal(`${EFFICIENY}`), 'eficiency'],
        [sequelize.fn('SUM', sequelize.col('home_team_goals')), 'goalsFavor'],
        [sequelize.fn('SUM', sequelize.col('away_team_goals')), 'goalsOwn'],
        [sequelize.literal('SUM(home_team_goals) - SUM(away_team_goals)'), 'goalsBalance'],
        [sequelize.literal('SUM(home_team_goals < away_team_goals)'), 'totalLosses'],
        [sequelize.literal('SUM(home_team_goals = away_team_goals)'), 'totalDraws']],
      include: [{ model: Teams, as: 'teamHome', attributes: ['teamName'] }],
      group: ['home_team'],
      order: [
        [sequelize.literal('totalPoints'), 'DESC'], [sequelize.literal('totalVictories'), 'DESC'],
        [sequelize.literal('goalsBalance'), 'DESC'], [sequelize.literal('goalsFavor'), 'DESC'],
        [sequelize.literal('goalsOwn'), 'ASC'],
      ] }); return homeLeaderboard as unknown as ILeaderboard[]; // mais de 20 linhas aqui
  }

  public async getHomeLeaderboard():Promise<ILeaderboard[]> {
    const arrayOfLeaderboard = await this.leaderboardArray();

    const homeLeaderboard = arrayOfLeaderboard.map((team) => ({
      name: (team.teamHome as unknown as ILeaderboard).teamName,
      totalPoints: (team.dataValues as unknown as ILeaderboard).totalPoints,
      totalGames: (team.dataValues as unknown as ILeaderboard).totalGames,
      totalVictories: (team.dataValues as unknown as ILeaderboard).totalVictories,
      totalDraws: (team.dataValues as unknown as ILeaderboard).totalDraws,
      totalLosses: (team.dataValues as unknown as ILeaderboard).totalLosses,
      goalsFavor: (team.dataValues as unknown as ILeaderboard).goalsFavor,
      goalsOwn: (team.dataValues as unknown as ILeaderboard).goalsOwn,
      goalsBalance: (team.dataValues as unknown as ILeaderboard).goalsBalance,
      efficiency: (team.dataValues as unknown as ILeaderboard).eficiency,
    }));

    return homeLeaderboard as unknown as ILeaderboard[];
  }
}

export default LeaderboardService;

// agradecimento especial ao amigo Gabriel por me ensinar essa query e pela paciência e dedicação de passar boa parte do domingo e da segunda me ensinando. Valeu de Coração.
