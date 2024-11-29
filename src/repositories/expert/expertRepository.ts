import { ExpertDocument } from "../../model/expert/expertModel";

interface ExpertRepository{
    createExpert(data:ExpertDocument):Promise<ExpertDocument | null>;
    getExpertByEmail(email:string):Promise<ExpertDocument | null>;
    getExpertById(id:string):Promise<ExpertDocument | null>
    updateExpertByEmail(email:string, data:ExpertDocument):Promise<ExpertDocument | null>
    updateExpert(id:string,data:ExpertDocument):Promise<ExpertDocument | null>
}
export default ExpertRepository;