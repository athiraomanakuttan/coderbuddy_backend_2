import { MeetingUserType } from "../../model/shared/meeting.model"

interface MeetingRepositories{
    createMeeting(title: string, meetingDate:string,expertId: string, userId: string):Promise<MeetingUserType | null>
}
export default MeetingRepositories