import { Router } from "express";
import { upload } from "../../config/multerConfig";
import ExpertController from "../../controller/expert/expertController";
import ExpertRepositoryImplementation from "../../repositories/implementation/expert/expertRepositoryImplimentation";
import ExpertService from "../../services/expert/expertServices";
import authenticationMiddleware from "../../middleware/authenticationMiddleware";
import ProfileController from "../../controller/expert/profileController";
import checkExpertBlocked from "../../middleware/expertBlocked";
import PostController from "../../controller/expert/postController";


const router = Router();
// repository
const expertRepositoryImplementation = new ExpertRepositoryImplementation();

// service
const expertService = new ExpertService(expertRepositoryImplementation);
//constroller
const expertController = new ExpertController(expertService);
const profileController = new ProfileController(expertService)
const postController = new PostController(expertService)

router.post('/signup', (req, res) => expertController.signupPost(req, res));
router.post('/login',(req,res)=> expertController.loginPost(req,res))
router.post('/verify-otp',(req,res)=>expertController.verifyOtp(req,res))

router.post('/forgot-password',(req,res)=> expertController.forgotPassword(req,res))
router.put('/update-password',(req,res)=> expertController.updatePassword(req,res))
router.get('/google-signup',(req,res)=>expertController.googleSignup(req,res))


router.get('/get-expert-details',authenticationMiddleware as any,checkExpertBlocked  as any,(req,res)=> profileController.getExpertDetails(req,res) )
router.put('/update-profile',authenticationMiddleware as any,checkExpertBlocked  as any,upload.single('profilePicture'),(req,res)=> profileController.updateProfile(req,res) )

router.get('/get-post', authenticationMiddleware as any, (req, res) => postController.getPost(req, res));

router.post('/add-comment', authenticationMiddleware as any , (req,res)=>postController.addComment(req,res) )


export default router;
  