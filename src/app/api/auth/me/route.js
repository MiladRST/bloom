import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import { cookies } from "next/headers";
import UserModel from "@/models/User";

export async function GET(req) {
  try {
    await connectToDB();
    const token = await cookies().get("token");
    let user = null;

    if (token) {
      const tokenPayload = verifyToken(token.value);
      if (tokenPayload) {
        user = await UserModel.findOne(
          { email: tokenPayload.email },
          "-password -refreshToken -__v"
        );
      }

      return Response.json(user);
    } else {
      return Response.json(
        {
          data: null,
          message: "Not access !!",
        },
        { status: 401 }
      );
    }
  }catch(err) {
    return Response.json({ message: "Internal Server Error!"} , { status: 500 })
  }
  
}
