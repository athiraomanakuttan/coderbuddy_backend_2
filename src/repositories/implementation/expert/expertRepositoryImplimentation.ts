import Expert, { ExpertDocument } from "../../../model/expert/expertModel";
import { Post, PostType } from "../../../model/user/postModel";
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
    async getPostData(skip: number, limit: number, skillSet: string[] | null): Promise<PostType[] | null> {
        try {
          let postData;
      
          if (!skillSet || skillSet.length === 0) {
            postData = await Post.find({status: 0})
              .skip(skip)
              .limit(limit);
          } else {
            postData = await Post.find({
              technologies: { $in: skillSet }, 
              status: 0
            })
              .skip(skip)
              .limit(limit);
          }
      
          return postData;
        } catch (error) {
          console.error("Error fetching post data:", error);
          return null;
        }
      }
      async getPostCount(condition: object): Promise<number> {
          const postCount = await Post.find(condition).countDocuments()
          return postCount
      }
      
}
export default ExpertRepositoryImplementation;
