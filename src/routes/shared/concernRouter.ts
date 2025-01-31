import { Router } from "express";
import ConcernRepository from '../../repositories/implementation/shared/concernRepository'
import ConcernService from "../../services/shared/Implementation/concernService";
import ConcernController from "../../controller/shared/concernController";
import authenticationMiddleware from "../../middleware/authenticationMiddleware";
const router = Router()

const concernRepository = new ConcernRepository()
const concernService = new ConcernService(concernRepository)
const concernController = new ConcernController(concernService)


router.post('/create-concern', authenticationMiddleware as any, (req,res)=>concernController.createConcern(req,res))
router.get('/get-user-concern', authenticationMiddleware as any, (req,res)=>concernController.getConcernData(req,res))

export default router;