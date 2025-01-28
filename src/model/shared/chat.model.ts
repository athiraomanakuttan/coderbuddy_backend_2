// chat.model.ts
import mongoose from "mongoose";

export type ParticipentsType = {
    id: string,
    role: string,
    name: string,
    profile_pic: string
}

export type ChatType = {
    _id?:mongoose.Types.ObjectId,
    participents: ParticipentsType[],
    postId:mongoose.Types.ObjectId | string,
    messages: mongoose.Types.ObjectId[] | string[],
    createdAt?: Date,
    updatedAt?: Date
}
export type ChatListResponse = {
    chatId: string;
    participant: ParticipentsType;
    postId:  string;
    lastMessageAt: Date;
}

const chatSchema = new mongoose.Schema({
    participents: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        role: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        profile_pic: {
            type: String,
            required: true
        }
    }],
    postId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post',
        required: true
    },
    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'message',
        required: true
    }]
}, { timestamps: true })

const Chat = mongoose.model('chats', chatSchema)

export { Chat };