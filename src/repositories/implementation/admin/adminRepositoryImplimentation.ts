import { UserType } from "../../../model/user/userModel";
import { ExpertDocument } from "../../../model/expert/expertModel";
import AdminRepository from "../../admin/adminRepository";

class AdminRepositoryImplimentation implements AdminRepository{
async getUserDetails(): Promise<UserType[] | UserType | null> {
    return null
}
async getExpertDetails(): Promise<ExpertDocument[] | ExpertDocument | null> {
    return null
    
}
}

export default AdminRepositoryImplimentation