import  {Router,Request,Response}  from 'express'
import { upload } from '../../config/multerConfig';

import UserController from "../../controller/user/userController";
import UserService from '../../services/user/userServices';
import UserRepositoryImplementation from '../../repositories/implementation/user/userRepositoryImplemenatation';
import ProfileController from '../../controller/user/profileController';
import authenticationMiddleware from '../../middleware/authenticationMiddleware';
import checkisUserBlocked from '../../middleware/userBlocked';


const userRepositoryImplementation = new UserRepositoryImplementation();
const userService = new UserService(userRepositoryImplementation);
const userController = new UserController(userService)
const profileController = new ProfileController(userService)

const router = Router()

router.post('/signup',(req,res) => userController.signupPost(req,res));
router.post('/verify-otp',(req,res)=> userController.verifyOtp(req,res))
router.post('/login',(req,res)=>userController.loginPost(req,res))

router.get('/get-profile',authenticationMiddleware as any,checkisUserBlocked,(req,res)=>profileController.getProfile(req,res))
router.put('/update-profile', authenticationMiddleware as any,checkisUserBlocked,upload.single('profilePicture')  ,(req, res)=>profileController.updateProfile(req,res))


router.post('/forgot-password',(req,res)=>userController.forgotPassword(req,res))
router.put('/update-password',(req,res)=> userController.updatePassword(req,res))
router.post('/google-signin',(req,res)=>userController.googleSinup(req,res))


export default router;