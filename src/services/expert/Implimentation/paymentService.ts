import { PaymentType } from "../../../model/expert/paymentModel";
import { WalletDataType } from "../../../model/expert/wallet.model";
import PaymentRepository from "../../../repositories/expert/paymentRepository"
import { PaymentListResponseType } from "../../../repositories/implementation/expert/paymentRepositoryImplimentation";
import IPaymentService from "../IPaymentService";

class PaymentService implements IPaymentService{
    private paymentRepository : PaymentRepository;
    constructor(paymentRepository:PaymentRepository){
        this.paymentRepository = paymentRepository
    }
    async createMeetingLink(title:string, amount:number, userId:string, expertId:string, postId : string):Promise<PaymentType | null>{
        const response = await this.paymentRepository.createPayment(title,amount,userId,expertId,postId)
        return response
    } 

    async getPaymentList(userId:string, page : number = 1 , count: number = 5 ):Promise<PaymentListResponseType | null>{
        
        const paymentDetails =  await this.paymentRepository.getPaymentList(userId, page, count)
        return paymentDetails
    }

    async getPaymentById(id:string):Promise<PaymentType | null>{
        return await this.paymentRepository.getPaymentById(id)
    }

    async updatePaymentById(id: string, status: number, razorpayId:string | null): Promise<PaymentType | null>{
        return await this.paymentRepository.updatePaymentById(id,status,razorpayId)
    }

    async getWalletByExpertId(expertId: string): Promise<WalletDataType | null> {
        return await this.paymentRepository.getWalletByExpertId(expertId)
    }
    async createWallet(data:WalletDataType): Promise<WalletDataType | null> {
        return await this.paymentRepository.createExpertWallet(data)
    }
}
export default PaymentService