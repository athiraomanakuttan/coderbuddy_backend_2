import { Request , Response } from "express";
import MeetingService from "../../services/expert/meetingService";
import { v4 as uuidv4 } from "uuid";
import { MeetingType } from "../../model/admin/meetingModel";
import AdminService from "../../services/admin/adminService";
import { ExpertDocument } from "../../model/expert/expertModel";
class MeetingController{
    private meetingService : MeetingService;
    private adminService : AdminService;
    constructor(meetingService: MeetingService, adminService : AdminService){
        this.meetingService = meetingService
        this.adminService =  adminService
    }
    async createMeeting(req:Request , res: Response):Promise<void>{
        const { expertId, title, meetingDate } =  req.body
        const meetingId  =  uuidv4()
        try {
            const createMeet =  await this.meetingService.createMeeting({meetingId,
                title,
                userId: expertId,
                dateTime:meetingDate} as MeetingType)
                if(createMeet){
                    const isMeetingScheduled = 1;
                    const updateExpert =  await this.adminService.updateExpertById(expertId,{isMeetingScheduled} as ExpertDocument)
                    res.status(200).json({status: true, message: "Meeting created successfully", data:createMeet})
                    return;
                }
                else
                res.status(400).json({status: true, message: "Meeting created successfully"})

        } catch (error) {
            console.log(error)
            res.status(500).json({ status: false, message:"unable to create meeting"})
        }

    }
}

export default MeetingController