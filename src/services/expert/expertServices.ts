import { ExpertDocument } from "../../model/expert/expertModel";
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
    async getExpertById(id:string):Promise<ExpertDocument | null>
    {
      
            const expertData =  await this.expertRepository.getExpertById(id)
            return expertData
        
    }
    async updateExpert(id:string , data : ExpertDocument):Promise<ExpertDocument | null>{
        return  await this.expertRepository.updateExpert(id,data)
    }
}

export default ExpertService;
