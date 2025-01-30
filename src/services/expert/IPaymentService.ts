import { PaymentType } from "../../model/expert/paymentModel"
import { PaymentListResponseType } from "../../repositories/implementation/expert/paymentRepositoryImplimentation"

interface IPaymentService {
    createMeetingLink(title:string, amount:number, userId:string, expertId:string,postId: string):Promise<PaymentType | null>
    getPaymentList(userId:string, page: number, count: number):Promise<PaymentListResponseType | null>
    getPaymentById(id:string):Promise<PaymentType | null>
    updatePaymentById(id: string, status: number, razorpayId:string | null): Promise<PaymentType | null>
}

export default IPaymentService