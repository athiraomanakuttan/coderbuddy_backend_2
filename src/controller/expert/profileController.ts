import { Request , Response } from "express";
import ExpertService from "../../services/expert/expertServices";
import { ExpertDocument } from "../../model/expert/expertModel";

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


async updateProfile(req: Request | any, res: Response): Promise<void> {
    const userId = req.id; 
    const data = req.body; 

    if (!userId) {
         res.status(400).json({
            status: false,
            message: "User is not authorized. Please log in again.",
            data: null,
        });
        return;
    }
    console.log(data)
    try {
        const updatedProfile = await this.profileService.updateExpert(userId, data);

        if (updatedProfile) {
             res.status(200).json({
                status: true,
                message: "Profile updated successfully",
                data: updatedProfile,
            });
            return;
        } else {
             res.status(404).json({
                status: false,
                message: "User profile not found",
                data: null,
            });
            return;
        }
    } catch (error) {
        console.error("Error updating profile:", error);
         res.status(500).json({
            status: false,
            message: "An error occurred while updating the profile",
            data: null,
        });
        return
    }
}


}
export default ProfileController;