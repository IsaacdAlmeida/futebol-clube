import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';

class TeamsController {
  constructor(private teamsService = new TeamsService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const allTeams = await this.teamsService.getAll();

    return res.status(200).json(allTeams);
  };

  public getByPk = async (req: Request, res: Response) => {
    const { id } = req.params;

    const team = await this.teamsService.getByPk(id);

    return res.status(200).json(team);
  };
}

export default TeamsController;
