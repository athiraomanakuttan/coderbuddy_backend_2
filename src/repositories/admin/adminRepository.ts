import { ExpertDocument } from "../../model/expert/expertModel";
import { UserType } from "../../model/user/userModel"

interface AdminRepository{
getUserDetails():Promise<UserType[] | UserType | null>;
getExpertDetails():Promise<ExpertDocument[] | ExpertDocument | null >
}

export default AdminRepository