
import { Response, Request } from "express";
import IConcernService from "../../services/shared/IConcernService"
import { CustomType } from "../../types/type";
import { ConcernDataType } from "../../model/shared/concern.model";

class ConcernController{
    private _concernService: IConcernService
    constructor(concernService: IConcernService){
        this._concernService = concernService;
    }

    async createConcern(req: CustomType,res: Response):Promise<void>{
        const userId= req.id
        const {data}= req.body
        try {
            if(!userId){
                res.status(400).json({status: false, message:"userId is empty"})
                return
            }
            else if(!data.title || !data.description){
                res.status(400).json({status: false, message:"Title or description is empty"})
                return
            }

            const concernData = {
                "title" : data.title,
                "description":data.description,
                "userId":userId,
                "concernUserId":data.userId,
                "concernMeetingId": data.meetingId
            } as ConcernDataType

            const newConcern =  await this._concernService.createConcern(concernData)
            if(newConcern){
                res.status(200).json({status: false, message:"concer created sucessfully"})
            }
        } catch (error) {
            res.status(500).json({status: false, message:"error while creating concern"})
        }
    }
    
}

export default ConcernController