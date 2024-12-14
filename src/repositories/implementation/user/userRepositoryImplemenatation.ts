import UserRepository from "../../user/userRepository";
import { User,UserType } from "../../../model/user/userModel";
import { Post, PostType } from "../../../model/user/postModel";

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
    async findById(id: string): Promise<UserType | null> {
        return await User.findOne({_id:id})
    }
    async updateById(id: String, user: UserType): Promise<UserType | string | null> {
        return await User.findOneAndUpdate({_id:id},user,{new : true})
    }
    async uploadPost(data: PostType): Promise<PostType | null> {
        const uploadPost = await Post.create(data)
        return uploadPost
    }
    
}

export default UserRepositoryImplementation;