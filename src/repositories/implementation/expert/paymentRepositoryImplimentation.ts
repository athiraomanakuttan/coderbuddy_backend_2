import { Payment, PaymentType } from "../../../model/expert/paymentModel"
import { Wallet, WalletDataType } from "../../../model/expert/wallet.model";
import PaymentRepository from "../../expert/paymentRepository"
export interface PaymentListResponseType{
    paymentDetails: PaymentType[],
    totalRecord: number
}
class PaymentRepositoryImplimentation implements PaymentRepository{
    async createPayment(title: string, amount: number, userId: string, expertId: string, postId: string): Promise<PaymentType | null> {
        const response =  await Payment.create({title,amount,userId,expertId, postId})
        return response;
    }

    async getPaymentList(userId: string, status: number = 0, page: number = 1, count :number = 5): Promise<PaymentListResponseType | null> {
        const skip = (page - 1) * count
        console.log("status",status)
        const paymentDetails = await Payment.find({
            status: status,
            $or: [
                { userId: userId },
                { expertId: userId },
            ]
        }).sort({createdAt:-1}).skip(skip).limit(count);

        const totalRecord = await Payment.countDocuments({
            $or: [
                { userId: userId },
                { expertId: userId }
            ]
        })

        return {paymentDetails, totalRecord};
    }

    async getPaymentById(id: string): Promise<PaymentType | null> {
        return   await Payment.findOne({_id:id})
    }

    async updatePaymentById(id: string, status: number, razorpayId:string | null): Promise<PaymentType | null> {

        
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
    async getWalletByExpertId(expertId: string): Promise<WalletDataType | null> {
        const walletDetails =  await Wallet.findOne({expertId : expertId})
        return walletDetails
    }

    async createExpertWallet(data: WalletDataType): Promise<WalletDataType | null> {
        const updatedWallet = await Wallet.findOneAndUpdate(
            { expertId: data.expertId },  
            { 
                $inc: { amount: data.amount },  
                $push: { transaction: { paymentId: data.transaction[0].paymentId,amount: data.amount , dateTime: new Date() } }  
            },
            { upsert: true, new: true } 
        );
        return updatedWallet;
    }

    
}

export default PaymentRepositoryImplimentation