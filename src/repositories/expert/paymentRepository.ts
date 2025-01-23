import { PaymentType } from "../../model/expert/paymentModel"
interface PaymentRepository{
    createPayment(title: string, amount: number, userId: string, expertId: string): Promise<PaymentType | null>
}
export default PaymentRepository