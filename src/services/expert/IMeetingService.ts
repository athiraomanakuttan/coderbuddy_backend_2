import { MeetingType } from "../../model/admin/meetingModel"

interface IMeetingService{
getAdminExpertMeeting(id:string):Promise<MeetingType | null>
verifymeeting(meetingId: string): Promise<MeetingType | null>
}
export default IMeetingService