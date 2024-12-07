import { ExpertDocument } from "../../model/expert/expertModel";
import { UserType } from "../../model/user/userModel"

interface AdminRepository{
getUserDetails():Promise<UserType[] | UserType | null>;
getExpertDetails():Promise<ExpertDocument[] | ExpertDocument | null >
getExpertPendingDetails():Promise<ExpertDocument[] | ExpertDocument | null>
getUserById(id:string):Promise<UserType | null>;
getExpertById(id:string):Promise<ExpertDocument | null>
updateUserById(id:string,data:UserType):Promise<UserType | null>
updateExpertById(id: string,data:ExpertDocument):Promise<ExpertDocument | null>
}

export default AdminRepository