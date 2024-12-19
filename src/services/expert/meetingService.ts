import { MeetingType } from "../../model/admin/meetingModel";
import MeetingRepository from "../../repositories/expert/meetingRepository";

class MeetingService{
    private meetingRepository : MeetingRepository
    constructor(meetingRepository : MeetingRepository){
        this.meetingRepository = meetingRepository
    }
    async createMeeting(data :  MeetingType):Promise<MeetingType | null>{
        const createMeeting = await  this.meetingRepository.createMeeting(data)
        return createMeeting
    }
}

export default MeetingService;