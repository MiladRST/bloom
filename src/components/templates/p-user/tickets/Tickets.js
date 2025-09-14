//"use client"
import Link from "next/link";

export default function({ tickets }) {

    return(
        <div>
             
            <table>
                <thead>
                    <tr>
                        <th>شناسه</th>
                        <th>موضوع</th>
                        <th>متن</th>
                        <th>اولویت</th>
                        <th>وضعیت</th>
                        <th>دپارتمان</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tickets.map((ticket, index) => {
                            return(
                                <tr key={ticket._id}>
                                    <td>{index+1}</td>
                                    <td>
                                        <Link href={`/p-user/tickets/${ticket._id}`}>{ticket.title}</Link>
                                    </td>
                                    <td style={{maxWidth: '400px'}}>{ticket.body}</td>
                                    <td>{ticket.priority}</td>
                                    <td>{ticket.status}</td>
                                    <td>{ticket.department.title}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
          
        </div>
    )
}