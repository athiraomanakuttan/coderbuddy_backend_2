import { UserType } from "../../model/user/userModel";
interface UserRepository {
    createUser(user:UserType):Promise<UserType>;
    // findById(id:String):Promise<UserType>;
    findByEmail(email:String):Promise<UserType | null>;
    // updateById(id:String,user:UserType):Promise<UserType | String | null>
    // disableUser(id : String):Promise<string | null>
}

export default UserRepository;