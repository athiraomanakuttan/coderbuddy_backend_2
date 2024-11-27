import UserRepository from "../../user/userRepository";
import { User,UserType } from "../../../model/user/userModel";

class UserRepositoryImplementation implements UserRepository{
    async createUser(user: UserType): Promise<UserType> {
        const newUser = await User.create(user)
        return newUser
    }
    async findByEmail(email: String): Promise<UserType | null> {
        const getUser = await User.findOne({email :  email});
        return getUser;
    }
    async updateUserByEmail(email: string, data: UserType): Promise<UserType | null> {
        const updatedUser = await User.findOneAndUpdate({ email }, data, { new: true });
        return updatedUser;
    }
    async getUserByEmail(email: string): Promise<UserType | null> {
        return await User.findOne({ email });
    }
    
    
}

export default UserRepositoryImplementation;