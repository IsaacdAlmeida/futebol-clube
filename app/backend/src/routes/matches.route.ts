import { Router } from 'express';
import MatchesController from '../controllers/matches.controller';

const matchesRoute = Router();

const matchesController = new MatchesController();

matchesRoute.get('/', matchesController.getAll);

export default matchesRoute;
