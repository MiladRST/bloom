import Table from "@/components/modules/p-admin/tickets/Table"
import connectToDB from "@/configs/db"
import TicketModel from "@/models/Ticket"

export default async function() {

    await connectToDB()

    const tickets = await TicketModel.find({ isAnswer : false }).sort({ _id : -1 }).populate("department").populate("user")

    return(
        <>
            <h1>p-admin/tickets</h1>
            { tickets?.length === 0 ? (
                <p>no available tickets!</p>
            ) : (
                <Table tickets={JSON.parse(JSON.stringify(tickets))} />
            ) }
        </>

    )
}