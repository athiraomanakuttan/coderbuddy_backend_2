import { MeetingUserType } from "../../model/shared/meeting.model";

interface IMeetingService
{
    createMeetingLink(title: string, meetingDate: string, expertId: string, userId: string,postId:string) : Promise<MeetingUserType | null>;
    getMeetingsById(userId:string, status: number):Promise<MeetingUserType[] | null>
    getMeetingDataById(meetingId: string, userId:string):Promise<MeetingUserType |  null>
}

export default IMeetingService