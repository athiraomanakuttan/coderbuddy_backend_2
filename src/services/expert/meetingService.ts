import { MeetingType } from "../../model/admin/meetingModel"
import MeetingRepository from "../../repositories/expert/meetingRepository"

class MeetingService {
private meetingRepository : MeetingRepository
constructor(meetingRepository : MeetingRepository){
    this.meetingRepository = meetingRepository
}
async getAdminExpertMeeting(id:string):Promise<MeetingType | null>
{
    const meetingDetails = await this.meetingRepository.getAdminExpertMeeting(id)
    return meetingDetails;
}
async verifymeeting(id: string, meetingId: string, userId: string): Promise<MeetingType | null> {
    const meetingData =  await this.meetingRepository.verifymeeting(id,meetingId,userId)
    return meetingData;
}
}
export default MeetingService