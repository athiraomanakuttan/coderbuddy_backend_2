import { Payment, PaymentType } from "../../../model/expert/paymentModel"
import PaymentRepository from "../../expert/paymentRepository"
class PaymentRepositoryImplimentation implements PaymentRepository{
    async createPayment(title: string, amount: number, userId: string, expertId: string): Promise<PaymentType | null> {
        const response =  await Payment.create({title,amount,userId,expertId})
        return response;
    }
}

export default PaymentRepositoryImplimentation