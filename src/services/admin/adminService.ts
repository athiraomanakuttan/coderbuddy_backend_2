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
}
export default AdminService;