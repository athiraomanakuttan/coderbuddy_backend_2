import { ConcernDataType } from "../../model/shared/concern.model"

interface IConcernRepository{
    createConcern(data: ConcernDataType):Promise<ConcernDataType | null>
}

export default IConcernRepository