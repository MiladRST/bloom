import connectToDB from "@/configs/db";
import { cookies } from "next/headers";
import UserModel from "@/models/User";
import { verify } from "jsonwebtoken";
import { generateAccessToken, generateRefreshToken } from "@/utils/auth";

// Use (You)

// Tickets -> Status 401 -> Req /auth/Refresh -> 200, 401 -> /login-register

export async function POST(req) {
    
  try {
    await connectToDB();
    const cookieStore = await cookies();
    
    const refreshToken = cookieStore.get("refresh-token")?.value
    console.log("refreshToken => ",refreshToken);
    
    if (!refreshToken) {
      return Response.json(
        { message: "Unauthorized!" },
        { 
          status: 401, 
          headers:{
            "Set-Cookie": `refresh-token=${refreshToken};path=/;httpOnly=true;max-age=${0}`
          } 
        }
      );
    }
    console.log("route:refresh => " , "refresh token is available")

    const user = await UserModel.findOne({ refreshToken });

    console.log("route:refresh => user: ", user);
    

    if (!user) {
      return Response.json(
        { message: "Unauthorized!" },
        { 
          status: 401, 
          headers: {
            "Set-Cookie": `refresh-token=${refreshToken};path=/;httpOnly=true;max-age=${0}`
          }
        }
      );
    }

    console.log("route:refresh => " , "user is available")

    verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);

     console.log("route:refresh => " , "refresh token verified!")

    const newAccessToken = generateAccessToken({ email: user.email });
    const newRefreshToken= generateRefreshToken({ email: user.email })

    //set refresh-token
    await UserModel.findOneAndUpdate({ email: user.email } , {
        $set : { refreshToken : newRefreshToken } 
    })

    const headers = new Headers()
    headers.append("Set-Cookie", `token=${newAccessToken};path=/;httpOnly=true;max-age=${60*15}`) // access-token 15 mins
    headers.append("Set-Cookie", `refresh-token=${newRefreshToken};path=/;httpOnly=true;max-age=${60*60*24*10}`) // refresh-token 10 days


    return Response.json(
      { message: "new access token generated successfully :))" },
      {
        status: 200,
        headers
      }
    );
  } catch (err) {
    console.log(err);
    
    return Response.json({ message: err.message }, { status: 500 });
  }
}
