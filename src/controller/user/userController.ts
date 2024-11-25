import UserService from "../../services/user/userServices"
class UserController{

    private userService :UserService;
    constructor(userService :UserService)
    {
        this.userService = userService
    }
}

export default UserController