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

async getUserById(id: string): Promise<UserType | null> {
    const userData =  await User.findOne({_id:id})
    return userData
}

async updateUserById(id: string, data: UserType): Promise<UserType | null> {
    const userData = await User.findOneAndUpdate({ _id: id }, data, { new: true });
    return userData;
}



}

export default AdminRepositoryImplimentation