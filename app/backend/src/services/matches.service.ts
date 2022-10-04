import Matches from '../database/models/matches';
import Teams from '../database/models/teams';

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
}

export default MatchesService;
