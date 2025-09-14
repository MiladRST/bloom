import connectToDB from "@/configs/db";
import TicketModel from "@/models/Ticket";
import MessageModel from "@/models/Message"
 
//
import { authUser } from "@/utils/auth";

export async function GET(req) {
    try{

        await connectToDB();

        const user = await authUser()

        if(!user) {
            return Response.json({ message: "Unauthorized" } , { status: 401 })
        }

        const tickets = await TicketModel.find({ user : user._id }).populate('department')

        return Response.json({ message: 'tickets data' , tickets })

    }catch(err) {   

        return Response.json({ message: "Internal server error" } , { status: 500 })

    }
}

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

        const ticket = await TicketModel.create({
            title, 
            body, 
            priority, 
            user: user._id,
            department, 
            subDepartment
        })

        await MessageModel.create({
            message: body, 
            ticket: ticket._id,
            user: user._id
        })

        return Response.json({ message: "Ticket created successfully!"} , { status: 201 })

    }catch(err) {

        return Response.json({ message: "Internal server error" } , { status: 500 })

    }
}

