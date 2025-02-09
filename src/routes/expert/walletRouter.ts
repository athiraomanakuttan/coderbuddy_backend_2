import { Router } from "express";
import PaymentRepositoryImplimentation from "../../repositories/implementation/expert/paymentRepositoryImplimentation";
import PaymentService from "../../services/expert/Implimentation/paymentService";
import PaymentController from "../../controller/expert/paymentController";
import authenticationMiddleware from "../../middleware/authenticationMiddleware";
const router = Router()

// Repository 
const paymentRepositoryImplimentation = new PaymentRepositoryImplimentation()

// Service
const paymentService =  new PaymentService(paymentRepositoryImplimentation)

// controller
const walletController =  new PaymentController(paymentService)

router.get('/get-wallet', authenticationMiddleware as any , (req,res)=> walletController.getExpertWallet(req,res))

export default router