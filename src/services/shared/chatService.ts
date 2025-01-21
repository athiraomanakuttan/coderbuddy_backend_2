import { ChatListResponse, ChatType, ParticipentsType } from "../../model/shared/chat.model"
import { ConversationType } from "../../model/shared/message.model"
import ChatRepository from "../../repositories/shared/chatRepositories"

class ChatService{
    private chatRepository: ChatRepository
    constructor(chatRepository:ChatRepository){
        this.chatRepository = chatRepository
    }

    async getUserChatList(id: string): Promise<ChatListResponse[] | null> {
        const chatList = await this.chatRepository.getChatList(id);
        if (!chatList) return null;
    
        const formattedChatList = chatList.map(chat => {
            const otherParticipant = chat.participents.find(
                participant => participant.id.toString() !== id
            );
    
            if (!otherParticipant) return null;
    
            return {
                chatId: chat._id?.toString() || '',
                participant: otherParticipant,
                lastMessageAt: chat.updatedAt || new Date()
            };
        }).filter((chat): chat is ChatListResponse => chat !== null);
    
        return formattedChatList;
    }

    async createNewChat(participents:ParticipentsType[]):Promise<ChatType | null>{
       const newChat =  await this.chatRepository.createChat(participents)
       return newChat
    }

    async creatConversation(chatId: string, senderId: string, receiverId: string, message: string):Promise<ChatType | null>{
        const newConversation  = await this.chatRepository.createConversation(chatId,senderId,receiverId,message)
        return newConversation;
    }

    async getChatData(chatId:string):Promise<ChatType | null>{
        const chatDetails = await this.chatRepository.getChatDetails(chatId)
        return chatDetails;
    }

    
}

export default ChatService