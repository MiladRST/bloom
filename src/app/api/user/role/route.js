import connectToDB from "@/configs/db";
import userModel from "@/models/User";

export async function PUT(req) {
    try{
        const body = await req.json()
        const { id } = body 

        console.log('userID => ', id)

        await connectToDB()

        const user = await userModel.findOne({ _id : id })

        await userModel.findByIdAndUpdate({ _id: id} , {
            $set : {
                role: user.role === "USER" ? "ADMIN" : "USER"
            }
        })

        return Response.json({ message: `user:${user.name} role changed successfully!`})

    }catch(err){
        return Response.json({ message: "Internal server error!"} , { status: 500 })
    }
    
}