import mongoose from "mongoose";

interface TransactionType {
    paymentId: string,
    dateTime : string | Date
}
interface WalletDataType {
    expertId: string,
    amount: number,
    transaction:TransactionType[]
}


const walletSchema = new mongoose.Schema<WalletDataType>({
    expertId: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        default: 0,
    },
    transaction: [{
        paymentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "payment",
            required: true
        },
        dateTime: {
            type: Date,
            default: Date.now()
        }
    }]
}, { timestamps: true });

const Wallet = mongoose.model<WalletDataType>("wallet", walletSchema);


export { WalletDataType , Wallet}