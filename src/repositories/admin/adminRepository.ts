import { ExpertDocument } from "../../model/expert/expertModel";
import { UserType } from "../../model/user/userModel"

interface AdminRepository{
getUserDetails(skip: number, limit: number):Promise<UserType[] | UserType | null>;
getExpertDetails():Promise<ExpertDocument[] | ExpertDocument | null >
getExpertPendingDetails(skip: number, limit: number):Promise<ExpertDocument[] | ExpertDocument | null>
getUserById(id:string):Promise<UserType | null>;
getExpertById(id:string):Promise<ExpertDocument | null>
updateUserById(id:string,data:UserType):Promise<UserType | null>
updateExpertById(id: string,data:ExpertDocument):Promise<ExpertDocument | null>
getUserCount():Promise<number>
countExpertPendingDetails():Promise<number>
}

export default AdminRepository