import { Router } from "express";
import MeetingRepositoryImplementation from "../../repositories/implementation/shared/meetingRepositoryImplimentation";
import MeetingService from "../../services/shared/meetingService";
import MeetingController from "../../controller/shared/meetingController";
import authenticationMiddleware from "../../middleware/authenticationMiddleware";
const router = Router()

const meetingRepositoryImplementation = new MeetingRepositoryImplementation()
const meetingService = new MeetingService(meetingRepositoryImplementation)
const meetingController =  new MeetingController(meetingService)

router.post('/create-meeting', authenticationMiddleware as any , (req,res)=>meetingController.createMeetingLink(req,res))

export default router;