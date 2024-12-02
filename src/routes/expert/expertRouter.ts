import { Router } from "express";
import ExpertController from "../../controller/expert/expertController";
import ExpertRepositoryImplementation from "../../repositories/implementation/expert/expertRepositoryImplimentation";
import ExpertService from "../../services/expert/expertServices";
import authenticationMiddleware from "../../middleware/authenticationMiddleware";
import ProfileController from "../../controller/expert/profileController";

const router = Router();

const expertRepositoryImplementation = new ExpertRepositoryImplementation();
const expertService = new ExpertService(expertRepositoryImplementation);
const expertController = new ExpertController(expertService);

const profileController = new ProfileController(expertService)

router.post('/signup', (req, res) => expertController.signupPost(req, res));
router.post('/login',(req,res)=> expertController.loginPost(req,res))
router.post('/verify-otp',(req,res)=>expertController.verifyOtp(req,res))

router.get('/get-expert-details',authenticationMiddleware,(req,res)=> profileController.getExpertDetails(req,res) )
router.put('/update-profile',authenticationMiddleware,(req,res)=> profileController.updateProfile(req,res) )


export default router;
