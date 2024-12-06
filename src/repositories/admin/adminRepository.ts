import { ExpertDocument } from "../../model/expert/expertModel";
import { UserType } from "../../model/user/userModel"

interface AdminRepository{
getUserDetails():Promise<UserType[] | UserType | null>;
getExpertDetails():Promise<ExpertDocument[] | ExpertDocument | null >
getExpertPendingDetails():Promise<ExpertDocument[] | ExpertDocument | null>
getUserById(id:string):Promise<UserType | null>;
updateUserById(id:string,data:UserType):Promise<UserType | null>
}

export default AdminRepository