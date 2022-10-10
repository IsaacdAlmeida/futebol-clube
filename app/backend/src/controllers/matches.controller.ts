import { Request, Response } from 'express';
import TeamsService from '../services/teams.service';
import MatchesService from '../services/matches.service';

class MatchesController {
  constructor(
    private matchesService = new MatchesService(),
    private teamService = new TeamsService(),
  ) { }

  public getAll = async (_req: Request, res: Response) => {
    const allMatches = await this.matchesService.getAll();

    return res.status(200).json(allMatches);
  };

  public createMatch = async (req: Request, res: Response) => {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = req.body;

    await this.teamService.getByPk(homeTeam);
    await this.teamService.getByPk(awayTeam);

    const matchParams = {
      homeTeam,
      awayTeam,
      homeTeamGoals,
      awayTeamGoals,
      inProgress,
    };

    const match = await this.matchesService.createMatch(matchParams);

    return res.status(201).json(match);
  };

  public finishMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.matchesService.finishMatch(id);

    return res.status(200).json({ message: 'Finished' });
  };
}

export default MatchesController;

// receber query string = inProgress
// fazer validação no service para filtrar se é true ou false, se for retornar um dos dois
// caso não, retorna todas as partidas
