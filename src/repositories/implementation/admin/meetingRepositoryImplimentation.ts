import Meeting, { MeetingType } from '../../../model/admin/meetingModel'
import  MeetingRepository  from '../../admin/meetingRepository'
class MeetingRepositoryImplementation implements MeetingRepository{
    async createMeeting(data: MeetingType): Promise<MeetingType | null> {
        const createMeet =  await Meeting.create(data)
        return createMeet;
    }
    async getMeetingdata( status: number, limit: number, skip: number): Promise<MeetingType[] | null> {
        const getMeetingData =  await Meeting.find({status: status}).skip(skip).limit(limit)
        return getMeetingData;
    }
    async getMeetingCount(status: number): Promise<number> {
        const count = await Meeting.find({status :  status}).countDocuments()
        return count
    }
    async updateMeetingByExpertId(id: string): Promise<MeetingType | null> {
        const updateMeeting = await Meeting.findOneAndUpdate({userId: id, status: 0}, {$set : { status:1}}, {next : true})
        return updateMeeting;
    }
}

export default MeetingRepositoryImplementation;