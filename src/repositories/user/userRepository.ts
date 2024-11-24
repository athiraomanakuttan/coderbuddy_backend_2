import {userType} from '../../model/user/userModel.ts'
interface userRepository {
    createUser(user:userType):Promise<userType>;
    findById(id:String):Promise<userType>;
    findByEmail(email:String):Promise<userType>;
    updateById(id:String,user:userType):Promise<userType | String | null>
    disableUser(id : String):Promise<string | null>
}

export default userRepository;