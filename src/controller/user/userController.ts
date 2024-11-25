import { UserType } from "../../model/user/userModel";
import UserService from "../../services/user/userServices"
class UserController{

    private userService :UserService;
    constructor(userService :UserService)
    {
        this.userService = userService
    }
    async signupPost(user:UserType):Promise<UserType | null>
    {
        const newUser = await this.userService.createUser(user)
        return newUser;
    }
}

export default UserController