import { ExpertDocument } from "../../model/expert/expertModel"
import { CommentType, PostType } from "../../model/user/postModel"

interface IExpertService {
createExpert(data: ExpertDocument): Promise<ExpertDocument | null>
getExpertByEmail(email:string):Promise<ExpertDocument | null>
getExpertById(id:string):Promise<ExpertDocument | null>
updateExpert(id:string , data : ExpertDocument):Promise<ExpertDocument | null>
fetchPosts(page : number, limit: number, skillSet : string[] | null):Promise<PostType[] | null>
getPostCount(condition:object):Promise<number>
addComment(id: string, data : CommentType):Promise<PostType | null >
commentDelete(commentId: string, expertId: string, postId : string):Promise<PostType | null>
}

export default IExpertService