import { Chat, ChatType, ParticipentsType } from "../../../model/shared/chat.model";
import { Conversation, ConversationType } from "../../../model/shared/message.model";
import ChatRepository from "../../shared/chatRepositories";

class ChatRepositoryImplimenation implements ChatRepository{

    
    async getChatList(id: string): Promise<ChatType[] | null> {
        const chatData = await Chat.find({'participents.id': id})
            .sort({ updatedAt: -1 })
            .lean(); // Using lean() for better performance since we don't need the full mongoose document
        return chatData;
    }
async createConversation(chatId: string, senderId: string, receiverId: string, message: string): Promise<ChatType | null> {
    const newConversation = await Conversation.create({
        senderId,
        receverId: receiverId,
        message,
        isRead: 0
      });

      const chat = await Chat.findByIdAndUpdate(
        chatId,
        {
            $push: { messages: newConversation._id },
            $set: { updatedAt: new Date() }
        }
    );
      return chat;
}

async createChat(participents: ParticipentsType[]): Promise<ChatType | null> {
    const newChat = new Chat({
        participents: participents,
        messages: [] 
    });

    const savedChat = await newChat.save();
    return savedChat
}

async getChatDetails(chatId: string): Promise<ChatType | null> {
    const chatDetails = await Chat.findById({_id:chatId}).populate('messages').lean();
    if (!chatDetails) return null;
    return chatDetails
}


}
export default ChatRepositoryImplimenation