import MeetingRepositories from "../../repositories/shared/meetingRepositories"
import { MeetingUserType } from "../../model/shared/meeting.model";
class MeetingService{
    private meetingRepositories : MeetingRepositories
    constructor(meetingRepositories:MeetingRepositories){
        this.meetingRepositories = meetingRepositories;
    }

    async createMeetingLink(title: string, meetingDate: string, expertId: string, userId: string): Promise<MeetingUserType | null> {
        const data = await this.meetingRepositories.createMeeting(title,meetingDate,expertId,userId)
        return data
    }
    
}

export default MeetingService