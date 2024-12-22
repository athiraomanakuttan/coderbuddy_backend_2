import { ExpertDocument } from "../../model/expert/expertModel";
import { PostType } from "../../model/user/postModel";
import ExpertRepository from "../../repositories/expert/expertRepository";

class ExpertService {
    private expertRepository: ExpertRepository;

    constructor(expertRepository: ExpertRepository) {
        this.expertRepository = expertRepository;
    }

    async createExpert(data: ExpertDocument): Promise<ExpertDocument | null> {
            const newExpert = await this.expertRepository.createExpert(data);
            return newExpert;
    }
    async getExpertByEmail(email:string):Promise<ExpertDocument | null>{
            const expertData = await this.expertRepository.getExpertByEmail(email);
            return expertData
    }
    async getExpertById(id:string):Promise<ExpertDocument | null>{
            const expertData =  await this.expertRepository.getExpertById(id)
            return expertData
    }
    async updateExpert(id:string , data : ExpertDocument):Promise<ExpertDocument | null>{
        return  await this.expertRepository.updateExpert(id,data)
    }
    async fetchPosts(page : number = 1, limit: number = 5, skillSet : string[] | null):Promise<PostType[] | null>{
        const skip = (page - 1) * limit
        
        const postData = await this.expertRepository.getPostData(skip,limit,skillSet)
        return postData
    }
    async getPostCount(condition:object):Promise<number>{
        const count = await this.expertRepository.getPostCount(condition)
        return count
    }
}

export default ExpertService;
