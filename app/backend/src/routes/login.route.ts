import { Router } from 'express';
import validateLoginFields from '../middlewares/loginAuthMiddleware';
import LoginController from '../controllers/login.controller';

const loginRoute = Router();

const loginController = new LoginController();

loginRoute.post('/', validateLoginFields, loginController.login);
loginRoute.get('/validate', loginController.validateTokenLogin);

export default loginRoute;
