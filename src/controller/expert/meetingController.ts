import { Request,Response } from "express"
import MeetingService from "../../services/expert/meetingService"
interface CustomType extends Request{
    id?:string
}

class MeetingController{
    private meetngService :MeetingService
    constructor(meetngService : MeetingService){
        this.meetngService = meetngService
    }
    async getAdminExpertMeeting(req:CustomType , res:Response):Promise<void>{
        const expertId = req.id;
        if(!expertId){
            res.status(400).json({status:false, message:"user is not authenticated"})
            return
        }
        try {
            const meetingDetails = await this.meetngService.getAdminExpertMeeting(expertId)
            res.status(200).json({status:true, message:"data fetched successfully ", data: meetingDetails})
            
        } catch (error) {
            res.status(500).json({status:false, message:"unable to get the details"})
            
        }
    }
}
export default MeetingController