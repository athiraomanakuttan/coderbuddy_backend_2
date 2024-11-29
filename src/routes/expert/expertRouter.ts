import { Router } from "express";
import ExpertController from "../../controller/expert/expertController";
import ExpertRepositoryImplementation from "../../repositories/implementation/expert/expertRepositoryImplimentation";
import ExpertService from "../../services/expert/expertServices";

const router = Router();

const expertRepositoryImplementation = new ExpertRepositoryImplementation();
const expertService = new ExpertService(expertRepositoryImplementation);
const expertController = new ExpertController(expertService);

router.post('/signup', (req, res) => expertController.signupPost(req, res));
router.post('/login',(req,res)=> expertController.loginPost(req,res))
router.post('/verify-otp',(req,res)=>expertController.verifyOtp(req,res))

export default router;
