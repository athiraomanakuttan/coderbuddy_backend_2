import { MeetingType } from "../../model/admin/meetingModel"

interface MeetingRepository{
     getAdminExpertMeeting(id:string):Promise<MeetingType | null>
     verifymeeting(id:string,meetingId : string,userId : string):Promise<MeetingType | null>
}
export default MeetingRepository