import MeetingService from "../../services/shared/meetingService";
import { Response, Request } from "express";
import { CustomType } from "../../types/type";
class MeetingController {
  private meetingService: MeetingService;
  constructor(meetingService: MeetingService) {
    this.meetingService = meetingService;
  }

  async createMeetingLink(req:CustomType, res:Response):Promise<void>{
    
    const expertId = req.id
    const { title , meetingDate, userId} =  req.body
    if(!title || !meetingDate || !userId || !expertId){
        res.status(400).json({status:false, message:"unable to create Meeting"})
        return
    }

   try {
    const meetingData =  await this.meetingService.createMeetingLink(title,meetingDate,expertId,userId)
    if(meetingData)
        res.status(200).json({status:false, message:"Meeting created", data: meetingData})

   } catch (error) {
    res.status(500).json({status:false, message:"unable to create Meeting"})
    
   }
  }
}

export default MeetingController;
