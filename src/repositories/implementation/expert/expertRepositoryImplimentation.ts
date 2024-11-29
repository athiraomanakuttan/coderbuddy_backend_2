import Expert, { ExpertDocument } from "../../../model/expert/expertModel";
import ExpertRepository from "../../expert/expertRepository";

class ExpertRepositoryImplementation implements ExpertRepository {
    async createExpert(data: Partial<ExpertDocument>): Promise<ExpertDocument | null> {
        return await Expert.create(data);
    }
    

    async getExpertByEmail(email: string): Promise<ExpertDocument | null> {
        try {
            return await Expert.findOne({ email });
        } catch (error) {
            console.error("Error fetching expert by email:", error);
            return null;
        }
    }

    async getExpertById(id: string): Promise<ExpertDocument | null> {
        try {
            return await Expert.findOne({ _id: id });
        } catch (error) {
            console.error("Error fetching expert by ID:", error);
            return null;
        }
    }
    async updateExpertByEmail(email: string, data: Partial<ExpertDocument>): Promise<ExpertDocument | null> {
        try {
            const updatedExpert = await Expert.findOneAndUpdate(
                { email },          
                { $set: data },     
                { new: true }        
            );
            return updatedExpert;
        } catch (error) {
            console.error("Error updating expert by email:", error);
            return null;            
        }
    }
    async updateExpert(id: string, data: ExpertDocument): Promise<ExpertDocument | null> {
            const updatedExpert = await Expert.findOneAndUpdate(
                { _id: id },          
                { $set: data },     
                { new: true }        
            );
            return updatedExpert;
    }
    
}
export default ExpertRepositoryImplementation;
