import { MeetingUserType, MeetingUser } from "../../../model/shared/meeting.model";
import MeetingRepositories from "../../shared/meetingRepositories";

class MeetingRepositoryImplimentation  implements MeetingRepositories{
    async createMeeting(title: string, meetingDate: string, expertId: string, userId: string, postId :  string): Promise<MeetingUserType | null> {
        return await MeetingUser.create({title, meetingDate, expertId, userId, postId});
    }

    async getMeetingsById(userId: string, status: number): Promise<MeetingUserType[] | null> {
        const meetinngData =  await MeetingUser.find({$or:[{userId : userId},{expertId: userId}], status:status})
        return meetinngData;
    }

    async getMeetingDetailById(meetingId: string, userId: string): Promise<MeetingUserType | null> {
        const meetingData =  await MeetingUser.findOne({_id: meetingId, $or:[{userId : userId},{expertId: userId}]})
        return meetingData
    }
}

export default MeetingRepositoryImplimentation