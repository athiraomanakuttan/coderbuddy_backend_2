import { PaymentType } from "../../model/expert/paymentModel"
interface PaymentRepository{
    createPayment(title: string, amount: number, userId: string, expertId: string): Promise<PaymentType | null>
    getPaymentList(userId:string):Promise<PaymentType[] | null>
    getPaymentById(id:string):Promise<PaymentType | null>
    updatePaymentById(id:string, status:number, razorpayId:string | null):Promise<PaymentType | null>
}

export default PaymentRepository