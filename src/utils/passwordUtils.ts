import bcrypt from 'bcryptjs'
class PasswordUtils{
    static async passwordHash(password:string):Promise<string>{
        const salt = await bcrypt.genSalt(10)
        const hashpassword = await bcrypt.hash(password,salt);
        return hashpassword;
    }
    static async comparePassword(dbPassword:string,userPassword:string):Promise<boolean>{
        return await bcrypt.compare(dbPassword,userPassword)
       
    }
}

export default PasswordUtils