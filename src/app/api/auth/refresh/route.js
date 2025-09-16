import connectToDB from "@/configs/db";
import { cookies } from "next/headers";
import UserModel from "@/models/User";
import { verify } from "jsonwebtoken";
import { generateAccessToken } from "@/utils/auth";

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
        { status: 401 }
      );
    }

    const user = await UserModel.findOne({ refreshToken });

    if (!user) {
      return Response.json(
        { message: "Unauthorized!" },
        { status: 401 }
      );
    }

    verify(refreshToken, process.env.REFRESH_TOKEN_SECRET_KEY);
    const newAccessToken = generateAccessToken({ email: user.email });

    return Response.json(
      { message: "new access token generated successfully :))" },
      {
        status: 200,
        headers: {
          "Set-Cookie": `token=${newAccessToken};path=/;httpOnly=true;max-age=${60*15}`,
        },
      }
    );
  } catch (err) {
    console.log(err);
    
    return Response.json({ message: err.message }, { status: 500 });
  }
}
