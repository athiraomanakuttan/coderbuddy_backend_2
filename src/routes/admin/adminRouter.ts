import Router from 'express'
import authenticationMiddleware from '../../middleware/authenticationMiddleware';

const router = Router();


import AdminService from '../../services/admin/adminService';
import AdminController from '../../controller/admin/adminController';
import AdminRepositoryImplimentation from '../../repositories/implementation/admin/adminRepositoryImplimentation';

const adminRepositoryImplimentation = new AdminRepositoryImplimentation()
const adminService  = new AdminService(adminRepositoryImplimentation);
const adminController =  new AdminController(adminService)

router.post('/login',(req,res)=>adminController.signupPost(req,res)) 
router.get('/user-details', authenticationMiddleware  as any, (req,res)=> adminController.getUserData(req,res) )
router.put('/changeUserStatus',authenticationMiddleware  as any,(req,res)=> adminController.changeUserStatus(req,res))

router.get('/expert-details', authenticationMiddleware  as any, (req,res)=> adminController.getExpertData(req,res) )
router.get('/get-expert/:id',authenticationMiddleware  as any, (req,res)=> adminController.getExpertDetails(req,res))
router.put('/reject-expert',authenticationMiddleware  as any, (req,res)=> adminController.changeExpertStatus(req,res))


export default router;