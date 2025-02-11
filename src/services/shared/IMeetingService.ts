import { MeetingUserType } from "../../model/shared/meeting.model";
import { CustomMeetingDataType, MeetingDataResponseType } from "../../types/type";

interface IMeetingService
{
    createMeetingLink(title: string, meetingDate: string, expertId: string, userId: string,postId:string) : Promise<MeetingUserType | null>;
    getMeetingsById(userId:string, status: number,page: number,limit:number):Promise<MeetingDataResponseType | null>
    getMeetingDataById(meetingId: string, userId:string):Promise<MeetingUserType |  null>
    getUserMeetings(userId: string, participantId: string): Promise<CustomMeetingDataType[] | null>
}

export default IMeetingService