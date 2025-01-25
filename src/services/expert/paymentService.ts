import { PaymentType } from "../../model/expert/paymentModel";
import PaymentRepository from "../../repositories/expert/paymentRepository"

class PaymentService{
    private paymentRepository : PaymentRepository;
    constructor(paymentRepository:PaymentRepository){
        this.paymentRepository = paymentRepository
    }
    async createMeetingLink(title:string, amount:number, userId:string, expertId:string):Promise<PaymentType | null>{
        const response = await this.paymentRepository.createPayment(title,amount,userId,expertId)
        return response
    }

    async getPaymentList(userId:string):Promise<PaymentType[] | null>{
        const paymentDetails =  await this.paymentRepository.getPaymentList(userId)
        return paymentDetails
    }

    async getPaymentById(id:string):Promise<PaymentType | null>{
        return await this.paymentRepository.getPaymentById(id)
    }

    async updatePaymentById(id: string, status: number, razorpayId:string | null): Promise<PaymentType | null>{
        return await this.paymentRepository.updatePaymentById(id,status,razorpayId)
    }
}
export default PaymentService