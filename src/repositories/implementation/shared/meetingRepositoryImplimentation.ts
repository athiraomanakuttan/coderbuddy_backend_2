import { MeetingUserType, MeetingUser } from "../../../model/shared/meeting.model";
import MeetingRepositories from "../../shared/meetingRepositories";

class MeetingRepositoryImplimentation  implements MeetingRepositories{
    async createMeeting(title: string, meetingDate: string, expertId: string, userId: string): Promise<MeetingUserType | null> {
        return await MeetingUser.create({title, meetingDate, expertId, userId});
    }
}

export default MeetingRepositoryImplimentation