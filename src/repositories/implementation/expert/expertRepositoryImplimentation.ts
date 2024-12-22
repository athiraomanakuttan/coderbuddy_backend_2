import Expert, { ExpertDocument } from "../../../model/expert/expertModel";
import { CommentType, Post, PostType } from "../../../model/user/postModel";
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
    async getPostData(skip: number, limit: number, skillSet: string[] | null): Promise<any[] | null> {
        try {
          let postData;
      
          const matchCondition = !skillSet || skillSet.length === 0
            ? { status: 0 }
            : { technologies: { $in: skillSet }, status: 0 };
      
          postData = await Post.aggregate([
            { $match: matchCondition },
            { $skip: skip },
            { $limit: limit },
            {
              $unwind: {
                path: "$comments",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $lookup: {
                from: "experts", // Replace "experts" with the actual collection name for expert data.
                localField: "comments.expertId",
                foreignField: "_id",
                as: "expertDetails"
              }
            },
            {
              $unwind: {
                path: "$expertDetails",
                preserveNullAndEmptyArrays: true
              }
            },
            {
              $group: {
                _id: "$_id",
                title: { $first: "$title" },
                description: { $first: "$description" },
                userId: { $first: "$userId" },
                technologies: { $first: "$technologies" },
                uploads: { $first: "$uploads" },
                status: { $first: "$status" },
                comments: {
                  $push: {
                    comment: "$comments.comment",
                    status: "$comments.status",
                    date: "$comments.date",
                    expertId: "$comments.expertId",
                    expertName: "$expertDetails.name" // Include the expert name.
                  }
                }
              }
            }
          ]);
      
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
      
      async addComment(id: string, data: CommentType): Promise<PostType | null> {
         const comment = await Post.findOneAndUpdate({_id: id},{$push :{comments:data} },{ new: true })
         return comment
      }
}
export default ExpertRepositoryImplementation;
