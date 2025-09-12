import connectToDB from "@/configs/db";
import ticketModel from "@/models/Ticket";
//
import { authUser } from "@/utils/auth";

export async function POST(req) {
    try{

        await connectToDB()
        
        const user = await authUser()

        if(!user) {
            return Response.json({ message: "Unauthorized" } , { status: 401 })
        }

        const reqBody = await req.json()
        const { title, body, priority, department, subDepartment } = reqBody

        //validation

        await ticketModel.create({
            title, 
            body, 
            priority, 
            user: user._id,
            department, 
            subDepartment
        })

        return Response.json({ message: "Ticket created successfully!"} , { status: 201 })

    }catch(err) {
        return Response.json({ message: "" } , { status: 500 })
    }
}

