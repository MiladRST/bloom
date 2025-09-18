"use client"
import { useState } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import api from "@/services/apiService"

export default function({ ticketID, ticket }) {

    const router = useRouter()
    
    const [message, setMessage] = useState("")

    const handleMessage = async(e) => {
        e.preventDefault()

        const res = await api.post(`/tickets/${ticketID}` , { message })

        if(res.status === 201 ) {
            Swal.fire({
                title: "پیام با موفقیت ارسال شد",
                icon: "success"
            }).then(() => {
                setMessage("")
                router.refresh()
            })
        }
    }

    return(
        <form onSubmit={handleMessage} style={{ display: "flex", flexDirection: "column", gap: "16px"}}>
            <label htmlFor="">type your message here</label>
            <textarea name="" rows={20} id="" value={message} onChange={e => setMessage(e.target.value)}></textarea>
            <br /> <br />
            <button type="submit">send message</button>
        </form>
    )
}