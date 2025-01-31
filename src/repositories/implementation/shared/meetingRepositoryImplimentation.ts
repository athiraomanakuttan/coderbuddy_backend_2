import { MeetingUserType, MeetingUser } from "../../../model/shared/meeting.model";
import { CustomMeetingDataType } from "../../../types/type";
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

    async getUserMeetings(userId: string, participantId: string): Promise<CustomMeetingDataType[] | null> {
        const meetings = await MeetingUser.find({
            $or: [
                { expertId: userId, userId: participantId },
                { expertId: participantId, userId: userId }
            ]
        }).select('title _id');
        return meetings;
    }    
}

export default MeetingRepositoryImplimentation