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
const paymentController =  new PaymentController(paymentService)

router.get('/get-payments', authenticationMiddleware as any, (req,res)=>paymentController.getPaymentsList(req,res))
router.get('/get-payment-details/:id',authenticationMiddleware as any, (req,res)=>paymentController.getPaymentDetails(req,res))
router.post('/create-order', authenticationMiddleware as any, )
router.post('/create-order', authenticationMiddleware as any , (req,res)=>{ paymentController.createRazorpayOrder(req,res)})
router.post('/verify', authenticationMiddleware as any, (req,res)=>paymentController.verifyPayment(req,res))



export default router; 