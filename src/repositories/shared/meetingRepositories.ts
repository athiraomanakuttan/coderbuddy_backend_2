import { MeetingUserType } from "../../model/shared/meeting.model"
import { CustomMeetingDataType } from "../../types/type"

interface MeetingRepositories{
    createMeeting(title: string, meetingDate:string,expertId: string, userId: string, postId: string):Promise<MeetingUserType | null>
    getMeetingsById(userId: string, status:number):Promise<MeetingUserType[] | null>
    getMeetingDetailById(meetingId: string, userId :  string):Promise<MeetingUserType | null>
    getUserMeetings(userId: string, particepentId: string): Promise<CustomMeetingDataType[] | null>
}
export default MeetingRepositories