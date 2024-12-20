import { MeetingType } from "../../model/admin/meetingModel";

interface MeetingRepository {
    createMeeting(data : MeetingType):Promise<MeetingType | null>
    getMeetingdata( status :  number, limit : number, skip : number):Promise<MeetingType[] | null>
    getMeetingCount(status: number):Promise<number>
}

export default MeetingRepository