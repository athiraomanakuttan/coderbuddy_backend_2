import UserRepository from "../../repositories/user/userRepository";
import { UserType } from "../../model/user/userModel";

class UserService{
    private userRepository:UserRepository;
    constructor(userRepository:UserRepository)
    {
        this.userRepository = userRepository;
    }
    
    async createUser(user: UserType):Promise<UserType>{
        const newUser = await this.userRepository.createUser(user)
        return newUser;
    }
    

}

export default UserService;