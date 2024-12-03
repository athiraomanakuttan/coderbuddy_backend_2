import { UserType } from "../../model/user/userModel";
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
}
export default AdminService;