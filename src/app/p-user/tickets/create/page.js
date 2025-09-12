import TicketForm from "@/components/templates/p-user/tickets/TicketForm";
import Link from "next/link";

export default async function() {
    return (
        <main>
            <h1>
                <span>ارسال تیکت</span>
            </h1>

            <Link href="/p-user/tickets"> همه تیکت ها</Link>

            <TicketForm />            

        </main>
    );
    
}


