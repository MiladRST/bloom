import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { generateAccessToken, generateRefreshToken, validateEmail, validatePassword, verifyPassword } from "@/utils/auth";

export async function POST(req) {
    try{
        const body = await req.json()
        
        const { email, password } = body 

        const isValidEmail = validateEmail(email)

        const isValidPassword = true //validatePassword(password)

        if(!isValidEmail || !isValidPassword) {
            return Response.json({ message: "Email or password is not valid!" } , { status: 419 })
        }
        
        await connectToDB()

        const user = await UserModel.findOne({ email })

        if(!user) {
            return Response.json({ message: "User is not available!"} , {status: 422})
        }
        
        const isCorrectPassword = await verifyPassword(password, user.password)

        if(!isCorrectPassword) {
            return Response.json({ message: "Email or password is not correct!"} , { status: 401 })
        }

        const accessToken = generateAccessToken({email})
        const refreshToken = generateRefreshToken({email})

        //set refresh-token
        await UserModel.findOneAndUpdate({ email } , {
            $set : { refreshToken } 
        })

        const headers = new Headers()

        headers.append("Set-Cookie", `token=${accessToken};path=/;httpOnly=true;max-age=${60*15}`)
        //headers.append("Set-Cookie", `refresh-token=${refreshToken};path=/;httpOnly=true;max-age=${60*60*24*10}`)

        return Response.json({ message: "User logged-in successfully!"} , {
            status: 200,
            headers
        })

    }catch(err) {
        console.log('signin err ->' , err)
        return Response.json({ message: "Internal server error!"} , { status: 500 })
    }
}