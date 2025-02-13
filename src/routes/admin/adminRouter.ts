import Router from 'express'
import authenticationMiddleware from '../../middleware/authenticationMiddleware';

import AdminService from '../../services/admin/Implimentation/adminService';
import MeetingService from "../../services/admin/Implimentation/meetingService";
import ConcernService from '../../services/admin/Implimentation/concernService'

import AdminRepositoryImplimentation from '../../repositories/implementation/admin/adminRepositoryImplimentation';
import MeetingRepositoryImplementation from "../../repositories/implementation/admin/meetingRepositoryImplimentation";
import ConcernRepository from '../../repositories/implementation/admin/concernRepository';

import MeetingController from "../../controller/admin/meetingController"
import ConcernController from '../../controller/admin/concernController';
import AdminController from '../../controller/admin/adminController';



const router = Router();



const adminRepositoryImplimentation = new AdminRepositoryImplimentation()
const cornsernRepositoryImplimentation =  new ConcernRepository()
const meetingRepositoryImplementation =  new MeetingRepositoryImplementation()

const adminService  = new AdminService(adminRepositoryImplimentation);
const meetingService = new MeetingService(meetingRepositoryImplementation)
const concernService = new ConcernService(cornsernRepositoryImplimentation)

const adminController =  new AdminController(adminService )
const meetingController =  new MeetingController(meetingService , adminService)
const concernController =  new ConcernController(concernService)

router.post('/login',(req,res)=>adminController.signupPost(req,res)) 
router.get('/user-details', authenticationMiddleware  as any, (req,res)=> adminController.getUserData(req,res) )
router.put('/changeUserStatus',authenticationMiddleware  as any,(req,res)=> adminController.changeUserStatus(req,res))
router.get('/get-user-profile/:id', authenticationMiddleware as any, (req,res)=>adminController.getUserDataById(req,res))

router.get('/expert-details', authenticationMiddleware  as any, (req,res)=> adminController.getExpertData(req,res) )
router.get('/get-expert/:id',authenticationMiddleware  as any, (req,res)=> adminController.getExpertDetails(req,res))
router.put('/reject-expert',authenticationMiddleware  as any, (req,res)=> adminController.changeExpertStatus(req,res))
router.put('/change-expert-status', authenticationMiddleware as any, (req,res)=> adminController.enableDisableStatus(req,res))

router.post('/create-meeting-link',authenticationMiddleware  as any , (req,res)=> meetingController.createMeeting(req,res))
router.post('/get-meeting-details', authenticationMiddleware  as any , (req,res)=> meetingController.getMeetingDetails(req,res))
router.put('/approve-expert',authenticationMiddleware as any , (req,res)=>meetingController.approveExpert(req,res))

router.get('/get-concern-data', authenticationMiddleware as any, (req,res)=> concernController.getConcernDataByStatus(req,res))
router.get('/get-profit-report', authenticationMiddleware as any, (req,res)=> adminController.getAdminProfitReport(req,res))

export default router;