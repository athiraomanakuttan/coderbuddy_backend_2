import { User, UserType } from "../../../model/user/userModel";
import Expert, { ExpertDocument } from "../../../model/expert/expertModel";
import AdminRepository from "../../admin/adminRepository";
import AdminService from "../../../services/admin/Implimentation/adminService";

class AdminRepositoryImplimentation implements AdminRepository{
    async getUserDetails(skip: number = 0, limit: number = 10): Promise<UserType[]> {
        return await User.find()
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); 
    }
async getExpertDetails(): Promise<ExpertDocument[] | ExpertDocument | null> {
    const expertData = await Expert.find({status:{$in:[0,2]}})
    return expertData
    
}
async getExpertPendingDetails(status:number = 0 ,skip: number = 0, limit: number = 10): Promise<ExpertDocument[]> {
    try {
        return await Expert.find({isMeetingScheduled : 0 , isVerified : status})
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 }); 
    } catch (error) {
        console.error('Error fetching expert details:', error);
        throw error;
    }
}

async countExpertPendingDetails(status: number = 0): Promise<number> {
    const count = await Expert.find({status:status}).countDocuments();
    return count;
}

async getUserById(id: string): Promise<UserType | null> {
    const userData =  await User.findOne({_id:id})
    return userData
}

async updateUserById(id: string, data: UserType): Promise<UserType | null> {
    const userData = await User.findOneAndUpdate({ _id: id }, data, { new: true });
    return userData;
}

async getExpertById(id: string): Promise<ExpertDocument | null> {
    const expertData = await Expert.findOne({_id :  id})
        return expertData;
}
async updateExpertById(id: string, data: ExpertDocument): Promise<ExpertDocument | null> {
    const updateExpert = await Expert.findOneAndUpdate({_id : id},data,{new:true})
    return updateExpert
}

async getUserCount(): Promise<number> {
    const count = await User.find({status:{$ne:-1}}).countDocuments();
    return count;
}

async updateExpertStatus(expertId: string, status: number): Promise<ExpertDocument | null> {
    const response = await Expert.findOneAndUpdate({_id: expertId}, {$set: { status: status}})
    return response;
}

}

export default AdminRepositoryImplimentation