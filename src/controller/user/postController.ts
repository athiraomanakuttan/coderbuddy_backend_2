import UserService from "../../services/user/userServices";
import { Request, Response } from "express";
import { uploadImageToCloudinary } from "../../utils/uploadImageToCloudinary ";


class PostController{
    private postService : UserService;
    constructor(postService :UserService ){
        this.postService = postService;
    }

   async createPost(req: Request, res: Response): Promise<void> {
    try {
        const data = req.body;
        const file = req.file;
        if (!data.userId) {
            res.status(401).json({ 
                status: false, 
                message: "Unauthorized user. Please login" 
            });
            return;
        }
        let uploadedFileUrl = data.uploads;
        if (file) {
            try {
                uploadedFileUrl = await uploadImageToCloudinary(file.buffer);
            } catch (uploadError) {
                res.status(500).json({ 
                    status: false, 
                    message: "Failed to upload image" 
                });
                return;
            }
        }
        const postData = {
            ...data,
            uploads: uploadedFileUrl
        };
        const uploadPost = await this.postService.uploadPost(postData);
        if (uploadPost) {
            res.status(201).json({ 
                status: true, 
                message: "Post created successfully", 
                data: uploadPost 
            });
        } else {
            res.status(500).json({ 
                status: false, 
                message: "Failed to create post" 
            });
        }

    } catch (error) {
        console.error("Post creation error:", error);
        res.status(500).json({ 
            status: false, 
            message: "Unable to upload the post. Try again" 
        });
    }
}
}
export default  PostController