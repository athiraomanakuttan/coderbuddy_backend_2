import { ExpertDocument } from "../../model/expert/expertModel";
import { User, UserType } from "../../model/user/userModel";
import AdminRepository from "../../repositories/admin/adminRepository";
import { basicType } from "../../types/type";


class AdminService{
    private adminRepository : AdminRepository;
    constructor(adminRepository: AdminRepository){
        this.adminRepository =  adminRepository;
    }
     adminSignup(userData:basicType,adminData:basicType):{status:boolean, message:string}{
        if(userData.email !== adminData.email){
            return {status:false, message:"incorrect emailid"}
        }
        else if(userData.password !== adminData.password)
            return { status: false , message:"incorrect password"}
        else
        return {status: true,message:"login success"}
    }
    async getUserData(): Promise< UserType[] | UserType | null >{
        const userData =  await this.adminRepository.getUserDetails()
        return userData
    }

    async getExpertPendingList(): Promise< ExpertDocument[] | ExpertDocument | null >{
        const expertData =  await this.adminRepository.getExpertPendingDetails()
        return expertData
    }
    async getUserById(id:string):Promise<UserType | null>{
        const userData =  await this.adminRepository.getUserById(id)
        return userData
    }

    async updateUserById(id:string, data:UserType):Promise<UserType | null>{
        const userData =  await this.adminRepository.updateUserById(id,data)
        return userData;
    }
}
export default AdminService;