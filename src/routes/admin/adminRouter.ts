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
router.get('/user-details', authenticationMiddleware, (req,res)=> adminController.getUserData(req,res) )
router.get('/expert-details', authenticationMiddleware, (req,res)=> adminController.getExpertData(req,res) )



export default router;