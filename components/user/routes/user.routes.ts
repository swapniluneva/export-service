import { Request, Response, Router, NextFunction } from 'express';
import { UserController } from '../controller/user.controller';

const route = Router();

export default (app: any) => {

      app.use(route);

      let UserObject = new UserController();

      route.get(
            "/ExportUsers",
            async (req: Request, res: Response, next: NextFunction) => {
                  try {
                        UserObject.ExportUsers(res);
                  } catch (e) {
                        next(e);
                  }
            });
}
