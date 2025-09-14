import connectToDB from "@/configs/db";
import UserModel from "@/models/User";
import { authUser } from "@/utils/auth";
import { isValidObjectId } from "mongoose";

export async function POST(req) {
  try {
    await connectToDB();
    const user = await authUser();
    const body = await req.json();
    const { name, email, phone } = body;

    // Validation (You)

    await UserModel.findOneAndUpdate(
      { _id: user._id },
      {
        $set: {
          name,
          email,
          phone,
        },
      }
    );

    return Response.json(
      { message: "User updated successfully :))" },
      { status: 200 }
    );
  } catch (err) {
    return Response.json({ message: err }, { status: 500 });
  }
}


export async function DELETE(req) {
  try{

    const body = await req.json()
    
    const {id} = body 

    if(!isValidObjectId(id)){
      return Response.json({ message: "User id is not valid!"} , { status: 422})
    }

    await connectToDB()

    await UserModel.findByIdAndDelete({ _id : id })

    return Response.json({ message: "user deleted successfully!"})

  }catch(err){

    return Response.json({ message: err }, { status: 500 });

  }
}