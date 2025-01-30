import Router from 'express'
import authenticationMiddleware from '../../middleware/authenticationMiddleware';
import MeetingService from "../../services/admin/Implimentation/meetingService";
import MeetingRepositoryImplementation from "../../repositories/implementation/admin/meetingRepositoryImplimentation";
import MeetingController from "../../controller/admin/meetingController"


const router = Router();


import AdminService from '../../services/admin/Implimentation/adminService';
import AdminController from '../../controller/admin/adminController';
import AdminRepositoryImplimentation from '../../repositories/implementation/admin/adminRepositoryImplimentation';

const adminRepositoryImplimentation = new AdminRepositoryImplimentation()

const meetingRepositoryImplementation =  new MeetingRepositoryImplementation()

const adminService  = new AdminService(adminRepositoryImplimentation);
const meetingService = new MeetingService(meetingRepositoryImplementation)

const adminController =  new AdminController(adminService )
const meetingController =  new MeetingController(meetingService , adminService)

router.post('/login',(req,res)=>adminController.signupPost(req,res)) 
router.get('/user-details', authenticationMiddleware  as any, (req,res)=> adminController.getUserData(req,res) )
router.put('/changeUserStatus',authenticationMiddleware  as any,(req,res)=> adminController.changeUserStatus(req,res))

router.get('/expert-details', authenticationMiddleware  as any, (req,res)=> adminController.getExpertData(req,res) )
router.get('/get-expert/:id',authenticationMiddleware  as any, (req,res)=> adminController.getExpertDetails(req,res))
router.put('/reject-expert',authenticationMiddleware  as any, (req,res)=> adminController.changeExpertStatus(req,res))
router.put('/change-expert-status', authenticationMiddleware as any, (req,res)=> adminController.enableDisableStatus(req,res))

router.post('/create-meeting-link',authenticationMiddleware  as any , (req,res)=> meetingController.createMeeting(req,res))
router.post('/get-meeting-details', authenticationMiddleware  as any , (req,res)=> meetingController.getMeetingDetails(req,res))
router.put('/approve-expert',authenticationMiddleware as any , (req,res)=>meetingController.approveExpert(req,res))

export default router;