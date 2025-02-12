import { MeetingUserType } from "../../model/shared/meeting.model"
import { CustomMeetingDataType, MeetingDataResponseType, MonthlyReport } from "../../types/type"

interface MeetingRepositories{
    createMeeting(title: string, meetingDate:string,expertId: string, userId: string, postId: string):Promise<MeetingUserType | null>
    getMeetingsById(userId: string, status:number, page: number, limit : number):Promise<MeetingDataResponseType | null>
    getMeetingDetailById(meetingId: string, userId :  string):Promise<MeetingUserType | null>
    getUserMeetings(userId: string, particepentId: string): Promise<CustomMeetingDataType[] | null>
    getMeetingReport(userId: string, year: number):Promise<MonthlyReport[] | null>
}
export default MeetingRepositories