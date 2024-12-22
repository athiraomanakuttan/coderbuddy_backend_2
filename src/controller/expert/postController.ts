import { Response, Request } from "express";
import ExpertService from "../../services/expert/expertServices";

export interface CustomRequest extends Request {
    id ?: string;  
}


class PostController {
  private postService: ExpertService;

  constructor(postService: ExpertService) {
    this.postService = postService;
  }

  async getPost(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { page = 1, limit = 10 } = req.query;
      const id = req.id
      if(!id){
      res.status(400).json({ success: false, message: 'User is not autherized' });
        return
      }
    const expertDetails = await this.postService.getExpertById(id)
    if(!expertDetails){
        res.status(400).json({ success: false, message: 'User is not autherized' });
        return
    }
    console.log("expert details", expertDetails.skills)
      const posts = await this.postService.fetchPosts(Number(page), Number(limit) , expertDetails.skills ?expertDetails.skills : null );
      const totalPost = await this.postService.getPostCount({status:0,technologies: { $in: expertDetails.skills }})
      const pageCount = Math.ceil(totalPost / Number(limit))
        if(posts){
            res.status(200).json({ success: true, message :"post data fetched successfully",data: posts, pagination:{currentPage:page,totalPages:pageCount} });
            return
        }
    } catch (error) {
      res.status(500).json({ success: false, message: 'Error fetching posts' });
    }
  }
}

export default PostController;
