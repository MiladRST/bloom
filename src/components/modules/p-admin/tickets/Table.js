"use client"
import Swal from "sweetalert2"
import Link from "next/link";

export default function Table({ tickets }) {

    const showDetails = (ticket) => {
        Swal.fire({
            title: ticket.title,
            text: ticket.body,
        });
    }


    return(
        <table>
            <thead>
                <tr>
                    <th>شناسه</th>
                    <th>کاربر</th>
                    <th>عنوان</th>
                    <th>دپارتمان</th>
                    <th>مشاهده</th>
                    <th>پاسخ</th>
                    <th>بن</th>
            
                </tr>
            </thead>
            <tbody>
                {
                    tickets.map( (ticket, index) => {
                        return(
                            <tr key={ticket._id}>
                                <td>{index+1}</td>
                                <td>{ticket.user.name}</td>
                                <td>
                                    <Link href={`/p-admin/tickets/${ticket._id}`}>
                                    {ticket.title}
                                    </Link>
                                </td>
                                <td>{ticket.department.title }</td>
                                <td>
                                    <button type="button" onClick={() => showDetails(ticket)}>
                                        مشاهده
                                    </button>
                                </td>
                             
                                <td>
                                    <button type="button">
                                        پاسخ
                                    </button>
                                </td>
                                <td>
                                    <button type="button">
                                        بن
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}