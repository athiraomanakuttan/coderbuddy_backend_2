import {Request} from 'express'
export type basicType={
    email:string;
    password : string;
}

export interface CustomType extends Request{
    id?:string
}