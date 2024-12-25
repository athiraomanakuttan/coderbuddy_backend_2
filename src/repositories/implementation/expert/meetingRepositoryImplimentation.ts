import Meeting, { MeetingType } from "../../../model/admin/meetingModel";
import MeetingRepository from "../../expert/meetingRepository";

class MeetingRepositoryImplimentation implements MeetingRepository{

    async getAdminExpertMeeting(id: string): Promise<MeetingType | null> {
        const meetingDetails = await Meeting.findOne({userId:id,status:0})
        return meetingDetails;
    }
    async verifymeeting(id: string, meetingId: string, userId: string): Promise<MeetingType | null> {
        const meetingData =  await Meeting.findOne({_id:id,userId:userId, meetingId:meetingId})
        return meetingData;
    }
}
export default MeetingRepositoryImplimentation