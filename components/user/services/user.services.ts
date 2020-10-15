import { UserModel } from "../model/user.model";

export class UserService {
    
    public ExportUsers(res: any) {
        return new UserModel().ExportUsers(res);
    }
    
}