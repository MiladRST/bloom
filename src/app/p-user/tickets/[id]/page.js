import TicketMessage from "@/components/modules/general/TicketMessage"
import connectToDB from "@/configs/db"
import TicketModel from "@/models/Ticket"
import MessageModel from "@/models/Message"
import { isValidObjectId } from "mongoose"
import { redirect } from "next/navigation"

export default async function ({ params }) {

    const { id } = await params 
    
    if(!isValidObjectId(id)) {
        //can redirect to not-found or list of tickets 
        redirect('/not-found')
    }

    connectToDB()
    const ticket = await TicketModel.findOne({ _id : id }).populate("user")

     const messages = await MessageModel.find({ ticket : id })
    .populate("user" , "name email role")
    .sort({ createdAt: 1 })

    
    return(
        <>
            <h1>{ticket.title}</h1>
            <p>{ticket.body}</p>

            
             <div>
                <h2>پیام ها</h2>
                {
                    messages.map(item => {
                        return(
                            <p key={item._id}>{item.user.name}: <span> </span>{item.message}</p>
                        )
                    })
                }
            </div>
            <hr />
            <TicketMessage ticketID={id} ticket={JSON.parse(JSON.stringify(ticket))} />
        </>
    )
}