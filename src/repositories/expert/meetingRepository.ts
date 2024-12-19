import { MeetingType } from "../../model/admin/meetingModel";

interface MeetingRepository {
    createMeeting(data : MeetingType):Promise<MeetingType | null>
}

export default MeetingRepository