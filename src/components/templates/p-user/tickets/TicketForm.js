"use client"
import { useState, useEffect } from 'react'
import Swal from 'sweetalert2'

export default function() {

    const [departments, setDepartments] = useState([])
    const [departmentID, setDepartmentID] = useState(-1)

    const [subDepartments, setSubDepartments ] = useState([])
    const [subDepartmentID, setSubDepartmentID ] = useState(-1)

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [priority, setPriority] = useState(1)


    useEffect(()=> {
        const getDepartments = async() => {
            const res = await fetch('/api/departments')
            const data = await res.json()

            if(res.status === 200 ) {
                const { departments } = data 
                setDepartments([...departments])
            }
            
        }
        getDepartments()
    } , [])

    useEffect(() => {
        const getSubDepartments = async() => {
            const res = await fetch(`/api/departments/sub/${departmentID}`)
            const data = await res.json()
            console.log('res status -> ', res.status);
            
            if(res.status === 200 ) {
                const { subDepartments } = data                 
                setSubDepartments([...subDepartments])
            }  
        }
        getSubDepartments()
    }, [departmentID]);

    const createTicket = async(e) => {
        e.preventDefault()

        const newTicket = {
            title, 
            body, 
            priority, 
            department : departmentID, 
            subDepartment : subDepartmentID
        }

        const res = await fetch('/api/tickets' , {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newTicket)
        })

        if(res.status === 201 ) {
            const data = await res.json()
            Swal.fire({
                title: data.message
            })
        }
    }

    return(
        <form onSubmit={createTicket}>
            <div>
                <label htmlFor="">انتخاب دپارتمان</label>
                <select onChange={(e) => setDepartmentID(e.target.value)}>
                    <option value={-1}>please select one</option>
                    { departments.map( item => <option key={item._id} value={item._id}>{item.title}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="">انتخاب ساب دپارتمان</label>
                <select onChange={(e) => setSubDepartmentID(e.target.value)}>
                    <option value={-1}>please select one</option>
                    { subDepartments.map( item => <option key={item._id} value={item._id}>{item.title}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="">انتخاب سطح اولویت تیکت</label>
                <select onChange={e => setPriority(e.target.value)}>
                    <option >please select one</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
            </div>

            <div>
                <label htmlFor="">عنوان</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>

            <div>
                <label htmlFor="">متن</label>
                <textarea value={body} onChange={(e) => setBody(e.target.value)} />
            </div>

            <button type="submit">create ticket</button>
        </form>
    )
}