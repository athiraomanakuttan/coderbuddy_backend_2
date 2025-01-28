import { PaymentType } from "../../model/expert/paymentModel"

interface IPaymentService {
    createMeetingLink(title:string, amount:number, userId:string, expertId:string,postId: string):Promise<PaymentType | null>
    getPaymentList(userId:string):Promise<PaymentType[] | null>
    getPaymentById(id:string):Promise<PaymentType | null>
    updatePaymentById(id: string, status: number, razorpayId:string | null): Promise<PaymentType | null>
}

export default IPaymentService