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
    
    async findByEmail(email:String):Promise<UserType | null>
    {
       
        const getUser = await this.userRepository.findByEmail(email)
        return getUser
    }

}

export default UserService;