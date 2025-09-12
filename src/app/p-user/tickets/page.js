import Link from "next/link";
import Tickets from "@/components/templates/p-user/tickets/Tickets";
//
import connectToDB from "@/configs/db";
import ticketModel from "@/models/Ticket";
import { authUser } from "@/utils/auth";


export default async function() {

    await connectToDB();

    const user = await authUser()

    const tickets = await ticketModel.find({ user : user._id }).populate('department')

    return (
        <main>
            
            <h1 >
                <span>تیکت ها</span>
            </h1>

            <Link href="/p-user/tickets/create">ساخت تیکت جدید</Link>
            
            <hr />

            <Tickets tickets={JSON.parse(JSON.stringify(tickets))} />

        </main>
    );
}

