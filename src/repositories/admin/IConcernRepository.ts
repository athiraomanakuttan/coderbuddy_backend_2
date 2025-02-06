import { ConcernDataType } from "../../model/shared/concern.model"
import { ConcernResponseDataType } from "../../types/type"

interface IConcernRepository{
    getConcenByStatus(status: number, page: number, limit: number):Promise<ConcernResponseDataType| null>
}

export default IConcernRepository