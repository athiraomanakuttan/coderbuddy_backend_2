import { ConcernDataType } from "../../model/shared/concern.model"

interface IConcernService{
    createConcern(data:ConcernDataType):Promise<ConcernDataType | null>
}

export default  IConcernService
