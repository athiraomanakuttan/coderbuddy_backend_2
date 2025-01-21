import {Chat,ChatType, ParticipentsType} from '../../model/shared/chat.model'
import {Conversation, ConversationType} from '../../model/shared/message.model'
interface ChatRepository{
    getChatList(id:string):Promise<ChatType[] | null>
    createConversation( chatId:string, senderId:string, receiverId:string, message:string):Promise<ChatType |null>
    createChat(participents:ParticipentsType[]):Promise<ChatType | null>
    getChatDetails(chatId:string):Promise<ChatType | null>
}

export default ChatRepository