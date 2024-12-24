import { MeetingType } from "../../model/admin/meetingModel"

interface MeetingRepository{
     getAdminExpertMeeting(id:string):Promise<MeetingType | null>
}
export default MeetingRepository