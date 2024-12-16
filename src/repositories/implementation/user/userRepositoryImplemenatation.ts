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
    async getPostDetails(
        id: string, 
        status: string | null, 
        skip: number = 0, 
        limit: number = 5
    ): Promise<{
        posts: PostType[];
        totalPosts: number;
        totalPages: number;
    } | null> {
        const poststatus: (string | number)[] = status !== null 
            ? [status] 
            : [1, 2, 3];
        
        try {
            const postDetails = await Post.find({
                userId: id, 
                status: { $in: poststatus } 
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
    
            const totalPosts = await Post.countDocuments({
                userId: id, 
                status: { $in: poststatus }
            });
    
            return {
                posts: postDetails,
                totalPosts: totalPosts,
                totalPages: Math.ceil(totalPosts / limit)
            };
        } catch (error) {
            console.error('Error fetching posts:', error);
            return null;
        }
    }
    async countPosts(id: string, status: string | null): Promise<number> {
        const poststatus: (string | number)[] =  status!== null ? [status] : [0,1,2]
        const count  =  await Post.countDocuments({userId : id, status:{$in : poststatus}})
        return count;
    }
    async updatePostStatus(userId : string , id: string, status: number): Promise<PostType | null> {
        const updatePost = await Post.findOneAndUpdate({_id:id, userId:userId},{$set:{status}},{new: true})
        return updatePost
    }
}

export default UserRepositoryImplementation;