import { Schema, Types , Document , model} from 'mongoose'


interface userType  extends Document{
    
    email : string;
    password : string;
    qualification ?: [{qualification:string, college:string}];
    address ?: string;
    experiance ?: string;
    job_title ?: string;
    occupation? : string ;
    employer ?: string;
    start_date ?: Date;
    first_name ?: string;
    last_name ?: string;
}

const userSchema = new Schema<userType>({
    email:{
        type: String,
        required: true,
        message:"Email id required",
        unique:true
    },
    password:{
        type: String,
        required:true,
        message:"password is required",
    },
    qualification:[{
        qualification:{
            type:String
        },
        college:{
            type:String
        }
    }],
    address:{
        type:String,
    },
    experiance:{
        type:String
    },
    job_title:{
        type:String
    },
    occupation:{
        type:String
    },
    employer:{
        type:String
    },
    start_date:{
        type:String
    },
    first_name:{
        type:String
    },
    last_name:{
        type: String
    }
})

const user = model<userType>('user',userSchema)
export {user, userType}