import { Request , Response } from "express";
import ExpertService from "../../services/expert/expertServices";

class ProfileController{
    private profileService:ExpertService;
    constructor(profileService: ExpertService)
    {
        this.profileService = profileService
    }

    async getExpertDetails(req: Request | any, res:Response):Promise<void>{
        const email  =  req.user
        if(!email){   
            res.status(400).json({status: false, message:"user unautherized. please login", data: null})
            return;
        }
        try {
            const userData =  await this.profileService.getExpertByEmail(email)
            if (userData?.status === 1) {
          res.status(200).json({
            status: true,
            message: "User data fetched successfully",
            data: userData,
          });
        } else {
          res.status(400).json({
            status: false,
            message: "User is blocked.",
            data: null,
          });
        }
        } catch (error) {
            
        }

    }

    async updateProfile(req:Request | any, res: Response):Promise<void>{
        const id  = req.id
        const data =  req.body
        console.log(data)
        if(!id)
            res.status(400).json({status:false, message:"user is not autherized please login again",data: null})
        else
       { 
        // const update = await this.profileService.getExpertById(id,data) 
       }
    }

}
export default ProfileController;