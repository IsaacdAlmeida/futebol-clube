import { Router } from 'express';
import LoginController from '../controllers/login.controller';

const loginRoute = Router();

const loginController = new LoginController();

loginRoute.post('/', loginController.login);

export default loginRoute;
