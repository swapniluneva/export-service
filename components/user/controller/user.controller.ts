import { UserService } from '../services/user.services';


export class UserController {

    public ExportUsers(res: any) {
        return new UserService().ExportUsers(res);
    }
    

}
