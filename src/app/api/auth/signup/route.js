
import connectToDB from "@/configs/db"
import UserModel from "@/models/User"
import { hashPassword, generateAccessToken } from "@/utils/auth"
import { roles } from "@/utils/constants"

export async function POST(req) {
    try {
        await connectToDB()
        
        const body = await req.json()
        
        const { name, phone, email, password } = body 

        //validation
        
        //check if is user exist ?
        const isUserExist = await UserModel.findOne({
            $or : [{name} , {phone}, {email}]
        })

        if(isUserExist) {
            return Response.json({ message: "User already exists!"} , { status: 422 })
        }

        //hash password
        const hashedPassword = await hashPassword(password)

        //generate access token
        const accessToken = generateAccessToken({ name })

        //create user
        const users = await UserModel.find({})

        await UserModel.create({
            name,
            phone,
            email,
            password: hashedPassword,
            role: users.length > 0 ? roles.USER : roles.ADMIN
        })

        return Response.json({ message : "User Created Successfully!" } , { 
            status: 201,
            headers: { "Set-Cookie" : `token=${accessToken};path=/;httpOnly=true`}
        })
    }catch(err){
        console.log('signup post err -> ' , err)
        return Response.json({ message:"Unknown Server Error!" }, { status: 500 })
    }
  
}