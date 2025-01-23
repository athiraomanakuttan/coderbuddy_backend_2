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
}
export default PaymentService