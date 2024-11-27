import  {Router,Request,Response}  from 'express'

import UserController from "../../controller/user/userController";
import UserService from '../../services/user/userServices';
import UserRepositoryImplementation from '../../repositories/implementation/user/userRepositoryImplemenatation';


const userRepositoryImplementation = new UserRepositoryImplementation();
const userService = new UserService(userRepositoryImplementation);
const userController = new UserController(userService)


const router = Router()

router.post('/signup',(req,res) => userController.signupPost(req,res));



export default router;