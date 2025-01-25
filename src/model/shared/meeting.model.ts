import mongoose, {  Document } from 'mongoose'

interface MeetingUserType {
    _id: string;
    title: string;
    meetingDate: Date;
    expertId: string;
    userId: string;
    status: number;
    createdAt: Date;
    updatedAt: Date;
}

const meetingSchema = new mongoose.Schema<MeetingUserType>({
    title: {
        type: String,
        required: true
    },
    meetingDate: {
        type: Date,
        required: true
    },
    expertId: {
        type: String,
        required: true,
        ref: 'expert'
    },
    userId: {
        type: String,
        required: true,
        ref: 'user'
    },
    status: {
        type: Number,
        default: 0,
        enum: [0, 1]
    }
}, { 
    timestamps: true 
});

const MeetingUser = mongoose.model<MeetingUserType>('meeting', meetingSchema);

export { MeetingUser, MeetingUserType}