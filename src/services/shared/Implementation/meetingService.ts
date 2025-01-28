import MeetingRepositories from "../../../repositories/shared/meetingRepositories"
import { MeetingUserType } from "../../../model/shared/meeting.model";
import IMeetingService from "../IMeetingService";
class MeetingService implements IMeetingService{
    private meetingRepositories : MeetingRepositories
    constructor(meetingRepositories:MeetingRepositories){
        this.meetingRepositories = meetingRepositories;
    }

    async createMeetingLink(title: string, meetingDate: string, expertId: string, userId: string): Promise<MeetingUserType | null> {
        const data = await this.meetingRepositories.createMeeting(title,meetingDate,expertId,userId)
        return data
    }

    async getMeetingsById(userId: string, status: number): Promise<MeetingUserType[] | null> {
        const data =  await this.meetingRepositories.getMeetingsById(userId, status);
        return data
    }
    
}

export default MeetingService