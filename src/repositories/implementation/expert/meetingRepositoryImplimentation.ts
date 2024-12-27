import Meeting, { MeetingType } from "../../../model/admin/meetingModel";
import MeetingRepository from "../../expert/meetingRepository";

class MeetingRepositoryImplimentation implements MeetingRepository{

    async getAdminExpertMeeting(id: string): Promise<MeetingType | null> {
        const meetingDetails = await Meeting.findOne({userId:id,status:0})
        return meetingDetails;
    }
    async verifymeeting(meetingId: string): Promise<MeetingType | null> {
        const meetingData =  await Meeting.findOne({meetingId:meetingId,status:0})
        return meetingData;
    }
}
export default MeetingRepositoryImplimentation