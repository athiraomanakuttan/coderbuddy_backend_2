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
    async updateUser(email: string, data: UserType): Promise<UserType | null> {
        const updatedUser = await this.userRepository.updateUserByEmail(email, data);
        return updatedUser;
    }
    
    async getUserByEmail(email: string): Promise<UserType | null> {
        return await this.userRepository.getUserByEmail(email);
    }
    async updateUserById(id: string ,  data: UserType): Promise<UserType |string | null >{
        const updatedUser =  await this.userRepository.updateById(id,data)
        return updatedUser
    }

}

export default UserService;