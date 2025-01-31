import mongoose, { ObjectId, Schema, Document, Model } from "mongoose";

interface ConcernDataType {
    _id?: string | ObjectId;
    title: string;
    description: string;
    concernMeetingId?: string;
    concernUserId?: string;
    userId: string;
    status: number;
    createdAt?: Date,
    updatedAt?:Date
}

const concernSchema = new mongoose.Schema<ConcernDataType>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    userId: { type: String, required: true },
    concernMeetingId: { type: mongoose.Schema.Types.ObjectId, ref: "meeting" },
    concernUserId: { type: String },
    status: { type: Number, enum: [0, 1, 2], default: 0 }
},{timestamps: true});


const Concern = mongoose.model("concern",concernSchema)


export {ConcernDataType, Concern}