import { Response, Request } from "express";
import { CustomType } from "../../types/type";
import IMeetingService from "../../services/shared/IMeetingService";
import { console } from "inspector";
class MeetingController {
  private _meetingService: IMeetingService;
  constructor(meetingService: IMeetingService) {
    this._meetingService = meetingService;
  }

  async createMeetingLink(req:CustomType, res:Response):Promise<void>{
    
    const expertId = req.id
    const { title , meetingDate, userId} =  req.body
    if(!title || !meetingDate || !userId || !expertId){
        res.status(400).json({status:false, message:"unable to create Meeting"})
        return
    }

   try {
    const meetingData =  await this._meetingService.createMeetingLink(title,meetingDate,expertId,userId)
    if(meetingData)
        res.status(200).json({status:false, message:"Meeting created", data: meetingData})

   } catch (error) {
    res.status(500).json({status:false, message:"unable to create Meeting"})
    
   }
  }

  async getMeetingDetails(req: CustomType, res:Response):Promise<void>{
    const userId =  req.id;
    const { status } = req.query;
    if(!userId){
      res.status(400).json({status: false, message: "user id  is empty"});
      return
    }
    else if(Number(status)<0 || Number(status)>1){
      {
        res.status(400).json({status: false, message: "Invalid status"});
        return
      }
    }
    try {
      const meetingData =  await this._meetingService.getMeetingsById(userId,Number(status))
      console.log("meetingData", meetingData)
      if(meetingData){
        res.status(200).json({ status : false, message:"Sucessfully fetched data", data:meetingData }) 
      }
    } catch (error) {
      console.log("error", error)
      res.status(500).json({status: false, message: "error while fetching meeting data", error:error});
      
    }

  }
}

export default MeetingController;
