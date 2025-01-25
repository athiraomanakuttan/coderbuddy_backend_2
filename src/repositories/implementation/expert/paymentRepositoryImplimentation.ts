import { Payment, PaymentType } from "../../../model/expert/paymentModel"
import PaymentRepository from "../../expert/paymentRepository"
class PaymentRepositoryImplimentation implements PaymentRepository{
    async createPayment(title: string, amount: number, userId: string, expertId: string): Promise<PaymentType | null> {
        const response =  await Payment.create({title,amount,userId,expertId})
        return response;
    }

    async getPaymentList(userId: string): Promise<PaymentType[] | null> {
        const paymentDetails = await Payment.find({
            $or: [
                { userId: userId },
                { expertId: userId }
            ]
        }).sort({createdAt:-1});
        return paymentDetails;
    }

    async getPaymentById(id: string): Promise<PaymentType | null> {
        return   await Payment.findOne({_id:id})
    }

    async updatePaymentById(id: string, status: number, razorpayId:string | null): Promise<PaymentType | null> {

        console.log("===============", id,status,razorpayId)
        const data = await Payment.findOneAndUpdate(
            { _id: id },
            { 
                status: status,
                paymentDetails: { razorpay_payment_id: razorpayId }
            },
            { new: true } 
        );
        return data;
    }
}

export default PaymentRepositoryImplimentation