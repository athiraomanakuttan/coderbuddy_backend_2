import {Request} from 'express'
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