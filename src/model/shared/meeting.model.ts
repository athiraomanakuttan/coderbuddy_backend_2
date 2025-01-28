import mongoose from 'mongoose'

interface MeetingUserType {
    _id: string;
    title: string;
    meetingDate: Date;
    expertId: string;
    userId: string;
    postId: mongoose.Types.ObjectId;
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
    postId:{
        type : mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true
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