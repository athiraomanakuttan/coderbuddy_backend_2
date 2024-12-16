import { PostType } from "../../model/user/postModel";
import { UserType } from "../../model/user/userModel";
interface UserRepository {
    createUser(user:UserType):Promise<UserType>;
    findById(id:String):Promise<UserType | null>;
    findByEmail(email:String):Promise<UserType | null>;
    updateById(id:string,user:UserType):Promise<UserType | string | null>
    updateUserByEmail(email:string,data: UserType):Promise<UserType | null>
    getUserByEmail(email:string):Promise<UserType |null>
    uploadPost(data: PostType):Promise<PostType | null>
    getPostDetails(id: string, status: string | null,  page?: number, 
        limit?: number
    ): Promise<{
        posts: PostType[] | null;
        totalPosts: number;
        totalPages: number;
    } | null>
    countPosts(id:string,status:string  | null):Promise<number>
    updatePostStatus(userId :  string, id:string, status:number):Promise<PostType | null>
}

export default UserRepository;