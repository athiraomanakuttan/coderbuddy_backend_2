import { Concern, ConcernDataType } from "../../../model/shared/concern.model";
import IConcernRepository from "../../admin/IConcernRepository";
import {ConcernResponseDataType} from "../../../types/type"

class ConcernRepository implements IConcernRepository{
    async getConcenByStatus(status: number, page:number = 1 , limit:number = 10): Promise<ConcernResponseDataType | null> {
        const skip = (page-1) * limit
        const concernData =  await Concern.find({status: status}).sort({createdAt: -1}).skip(skip).limit(limit)
        const totalRecord = await Concern.countDocuments({status})
        return {concernData,totalRecord} 
    }
}

export default ConcernRepository;