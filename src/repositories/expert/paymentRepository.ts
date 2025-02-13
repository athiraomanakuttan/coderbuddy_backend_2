import { PaymentType } from "../../model/expert/paymentModel"
import { WalletDataType } from "../../model/expert/wallet.model"
import { PaymentListResponseType } from "../implementation/expert/paymentRepositoryImplimentation"
interface PaymentRepository{
    createPayment(title: string, amount: number, userId: string, expertId: string, postId: string): Promise<PaymentType | null>
    getPaymentList(userId:string, status : number, page: number, count: number):Promise<PaymentListResponseType | null>
    getPaymentById(id:string):Promise<PaymentType | null>
    updatePaymentById(id:string, status:number, razorpayId:string | null):Promise<PaymentType | null>
    getWalletByExpertId(expertId: string):Promise<WalletDataType | null >
    createExpertWallet(data:WalletDataType):Promise<WalletDataType | null>
    addAdminProfit(data: WalletDataType):Promise<WalletDataType | null>
    
}

export default PaymentRepository