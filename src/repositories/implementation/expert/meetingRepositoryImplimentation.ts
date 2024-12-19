import Meeting, { MeetingType } from '../../../model/admin/meetingModel'
import  MeetingRepository  from '../../expert/meetingRepository'
class MeetingRepositoryImplementation implements MeetingRepository{
    async createMeeting(data: MeetingType): Promise<MeetingType | null> {
        const createMeet =  await Meeting.create(data)
        return createMeet;
    }
}

export default MeetingRepositoryImplementation;