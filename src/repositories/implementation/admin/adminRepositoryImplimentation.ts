import { User, UserType } from "../../../model/user/userModel";
import Expert, { ExpertDocument } from "../../../model/expert/expertModel";
import AdminRepository from "../../admin/adminRepository";

class AdminRepositoryImplimentation implements AdminRepository{
async getUserDetails(): Promise< UserType[] | UserType | null> {
    const userData =  await User.find()
    return userData
}
async getExpertDetails(): Promise<ExpertDocument[] | ExpertDocument | null> {
    const expertData = await Expert.find({status:{$in:[0,2]}})
    return expertData
    
}
async getExpertPendingDetails(): Promise<ExpertDocument[] | ExpertDocument | null> {
    const expertData = await Expert.find({status:1})
    return expertData
}
}

export default AdminRepositoryImplimentation