import { Request,Response } from "express"
import AdminService from "../../services/admin/adminService"
import JwtUtility from "../../utils/jwtUtility"

class AdminController{
    private adminService: AdminService
    constructor(adminService : AdminService)
    {
        this.adminService = adminService
    }
    async signupPost(req:Request, res: Response):Promise<void>{
        const {email, password}= req.body
        const adminEmail = process.env.ADMIN_EMAIL
        const adminPassword = process.env.ADMIN_PASSWORD
        if(!email || !password){
            res.status(400).json({status:false, message:"email or password can not be empty"})
            return
        }
        else if(!adminEmail || !adminPassword ){
            res.status(400).json({status:false, message:"unable to login. please try again"})
            return
        }
        const checkCredentails = this.adminService.adminSignup({email,password},{email:adminEmail,password:adminPassword})
        if(!checkCredentails.status){
            res.status(400).json({status:false, message:checkCredentails.message})
            return
        }
        const accessToken =  JwtUtility.generateAccessToken({email})
        const refreshToken =  JwtUtility.generateRefreshToken({email})
        res.cookie('refreshToken',refreshToken,{ 
            httpOnly: true,
            secure: false,
            maxAge: 1 * 60 * 60 * 1000,})
        res.status(200).json({status: true,message:"login successfull", accessToken})
    }

    async getUserData(req: Request, res: Response):Promise<void>{
        try {
            const userData =  await this.adminService.getUserData()
            res.status(200).json({ status : true, message:"data fetched successfully", data : userData})
        } catch (error) {
            console.log(error)
            res.status(500).json({status:false,message:"error while fetching data", data:null})
        }
    }
    async getExpertData(req: Request, res: Response):Promise<void>{
        try {
            const userData =  await this.adminService.getExpertPendingList()
            res.status(200).json({ status : true, message:"data fetched successfully", data : userData})
        } catch (error) {
            console.log(error)
            res.status(500).json({status:false,message:"error while fetching data", data:null})
        }
    }
    

}
export default AdminController