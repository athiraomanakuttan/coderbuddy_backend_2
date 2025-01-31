import { Concern, ConcernDataType } from "../../../model/shared/concern.model";
import IConcernRepository from "../../shared/IConcernRepository";

class ConcernRepository implements IConcernRepository{
    async createConcern(data: ConcernDataType): Promise<ConcernDataType | null> {
       const concernData = await Concern.create(data)
       return concernData
    }
}

export default ConcernRepository