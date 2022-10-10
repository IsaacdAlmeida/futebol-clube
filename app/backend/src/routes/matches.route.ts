import { Router } from 'express';
import validateMatches from '../middlewares/matchAuthMiddleware';
import MatchesController from '../controllers/matches.controller';

const matchesRoute = Router();

const matchesController = new MatchesController();

matchesRoute.get('/', matchesController.getAll);
matchesRoute.post('/', validateMatches, matchesController.createMatch);
matchesRoute.patch('/:id/finish', matchesController.finishMatch);

export default matchesRoute;
