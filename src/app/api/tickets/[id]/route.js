import connectToDB from "@/configs/db";
import MessageModel from "@/models/Message";
import TicketModel from "@/models/Ticket";
import { isValidObjectId } from "mongoose";
import { authUser } from "@/utils/auth";

export async function POST(req, { params }){
    try {
        await connectToDB()

        const { id } = await params 
        if(!isValidObjectId(id)) {
            return Response.json({ message: "Invalid ticket id "} , { status: 422 })
        }

        const body = await req.json()
        const { message } = body 

        const user = await authUser()

        if(!user) {
            return Response.json({ message: "Unauthorized"} , { status: 401})
        }

        if(user.role === "ADMIN") {
            await TicketModel.findByIdAndUpdate({ _id : id } , {
                $set: {
                    status : "answered"
                }
            })
        } else {
            await TicketModel.findByIdAndUpdate({ _id : id } , {
                $set: {
                    status : "pending"
                }
            })
        }

        const createdMessage = await MessageModel.create({
            message,
            ticket: id,
            user: user._id
        })

        return Response.json({ message: "message created successfully", createdMessage} , { status: 201})

    }catch(err) {
        return Response.json({ message: "Internal server error"} , { status: 500 })
    }
}