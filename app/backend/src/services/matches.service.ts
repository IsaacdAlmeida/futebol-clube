import IMatch from '../interfaces/match.interface';
import Matches from '../database/models/matches';
import Teams from '../database/models/teams';
import CustomError from '../errors/CustomError';

class MatchesService {
  model: Matches;

  constructor() {
    this.model = new Matches();
  }

  public getAll = async (): Promise<Matches[]> => {
    const allMatches = await Matches.findAll({
      include: [
        {
          model: Teams,
          as: 'teamHome',
          attributes: ['teamName'],
        },
        {
          model: Teams,
          as: 'teamAway',
          attributes: ['teamName'],
        },
      ],
    });

    return allMatches;
  };

  public createMatch = async (matchParams: object): Promise<IMatch> => {
    const createdMatch = await Matches.create(matchParams);

    return createdMatch as unknown as IMatch;
  };

  public finishMatch = async (id: string): Promise<void> => {
    const match = await Matches.findByPk(id);

    if (!match) throw new CustomError(404, 'Match does not exist');

    await match.update({ inProgress: false });
  };
}

export default MatchesService;
