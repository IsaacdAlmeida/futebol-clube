import { Request, Response } from 'express';
import LoginService from '../services/login.service';

class LoginController {
  constructor(private loginService = new LoginService()) { }

  public login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const token = await this.loginService.login(email, password);

    return res.status(200).json({ token });
  };
}

export default LoginController;
