import IConcernService from "../../services/admin/IConcernService"
import { Request,Response } from "express"
class ConcernController{
    private _concernService: IConcernService
    constructor(concernService: IConcernService){
        this._concernService = concernService
    }

    async getConcernDataByStatus(req:Request , res: Response):Promise<void>{
        const {status, page,limit} = req.query
        try {
            const concernData = await this._concernService.getConcernData(Number(status),Number(page),Number(limit))
            if(concernData)
                res.status(200).json({status: true, message:"fetched concern data", data:concernData})
        } catch (error) {
            res.status(500).json({status:false, message:"Error while getting concern data"})
        }
    }
}

export default ConcernController