import { Request, Response } from 'express';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(private matchesService = new MatchesService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const allTeams = await this.matchesService.getAll();

    return res.status(200).json(allTeams);
  };
}

export default MatchesController;
