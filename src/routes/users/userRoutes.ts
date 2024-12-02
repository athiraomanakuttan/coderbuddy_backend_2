import  {Router,Request,Response}  from 'express'
import { upload } from '../../config/multerConfig';

import UserController from "../../controller/user/userController";
import UserService from '../../services/user/userServices';
import UserRepositoryImplementation from '../../repositories/implementation/user/userRepositoryImplemenatation';
import ProfileController from '../../controller/user/profileController';
import authenticationMiddleware from '../../middleware/authenticationMiddleware';


const userRepositoryImplementation = new UserRepositoryImplementation();
const userService = new UserService(userRepositoryImplementation);
const userController = new UserController(userService)
const profileController = new ProfileController(userService)

const router = Router()

router.post('/signup',(req,res) => userController.signupPost(req,res));
router.post('/verify-otp',(req,res)=> userController.verifyOtp(req,res))
router.post('/login',(req,res)=>userController.loginPost(req,res))

router.get('/get-profile',authenticationMiddleware as any,(req,res)=>profileController.getProfile(req,res))
router.put('/update-profile', authenticationMiddleware as any, upload.single('profilePicture')  ,(req, res)=>profileController.updateProfile(req,res))



export default router;