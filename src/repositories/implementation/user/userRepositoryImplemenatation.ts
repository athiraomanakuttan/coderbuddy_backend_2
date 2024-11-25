import UserRepository from "../../user/userRepository";
import { User,UserType } from "../../../model/user/userModel";

class UserRepositoryImplementation implements UserRepository{
    async createUser(user: UserType): Promise<UserType> {
        const newUser = await User.create(user)
        return newUser
    }
    
}

export default UserRepositoryImplementation;