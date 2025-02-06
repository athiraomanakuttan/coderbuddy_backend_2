import {Request} from 'express'
import { ConcernDataType } from '../model/shared/concern.model';
export type basicType={
    email:string;
    password : string;
}

export interface CustomType extends Request{
    id?:string
}

export interface CustomMeetingDataType{
    title: string,
    _id: string
}

export interface ConcernResponseDataType{
    concernData: ConcernDataType[],
    totalRecord : number
}