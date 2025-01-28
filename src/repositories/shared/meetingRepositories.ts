import { MeetingUserType } from "../../model/shared/meeting.model"

interface MeetingRepositories{
    createMeeting(title: string, meetingDate:string,expertId: string, userId: string, postId: string):Promise<MeetingUserType | null>
    getMeetingsById(userId: string, status:number):Promise<MeetingUserType[] | null>
}
export default MeetingRepositories