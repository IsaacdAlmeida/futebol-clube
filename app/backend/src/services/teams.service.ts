import Teams from '../database/models/teams';
import ITeam from '../interfaces/teams.interface';
import CustomError from '../errors/CustomError';

class TeamsService {
  model: Teams;

  constructor() {
    this.model = new Teams();
  }

  public getAll = async (): Promise<ITeam[]> => {
    const allTeams = await Teams.findAll();

    return allTeams;
  };

  public getByPk = async (id: string): Promise<ITeam> => {
    const team = await Teams.findByPk(id);

    if (!team) throw new CustomError(404, 'There is no team with such id!');
    return team as ITeam;
  };
}

export default TeamsService;
