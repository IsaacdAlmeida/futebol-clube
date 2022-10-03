import { Request, Response } from 'express';
import CustomError from '../errors/CustomError';
import LoginService from '../services/login.service';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await this.loginService.login(email, password);

    return res.status(200).json({ token });
  };

  public validateTokenLogin = async (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) throw new CustomError(401, 'Invalid Token!');

    const token = authorization.replace('Bearer ', ''); // https://stackoverflow.com/questions/43915379/i-need-to-replace-bearer-from-the-header-to-verify-the-token
    const role = await this.loginService.validateTokenLogin(token);
    return res.status(200).json({ role });
  };
}

export default LoginController;
