import PaymentService from "../../services/expert/paymentService";
import { Response } from "express";
import {CustomType} from '../../types/type'
class PaymentController{
    private paymentService:PaymentService;
    constructor(paymentService:PaymentService){
        this.paymentService = paymentService
    }

    async createPayment(req:CustomType,res:Response):Promise<void>{
        const expertId = req.id
        const {title , amount , userId} = req.body
        if(!title || !userId || !expertId){
             res.status(400).json({status:false,message:"unable to create meeting link"})
             return 
        }
        if(!amount || Number(amount)>10000 || Number(amount)<=0){
            res.status(400).json({status:false,message:"Amount range should be between 1 - 10000"})
            return
        }
        try {
            const response =  await this.paymentService.createMeetingLink(title,Number(amount),userId,expertId)
            if(!response){
                res.status(400).json({status:false,message:"unable to create meeting link"})
                return
            }
            res.status(200).json({status:true,message:"meeting link created sucessfully", data:response})
        } catch (error) {
            res.status(500).json({status:false,message:"unable to create meeting link"})
        }
    }
}

export default PaymentController