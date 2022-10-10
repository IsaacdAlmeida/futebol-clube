import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.service';

class LeaderboardController {
  constructor(private leaderboardService = new LeaderboardService()) { }

  public getHomeLeaderboard = async (_req: Request, res: Response) => {
    const homeLeaderboard = await this.leaderboardService.getHomeLeaderboard();

    return res.status(200).json(homeLeaderboard);
  };
}

export default LeaderboardController;
