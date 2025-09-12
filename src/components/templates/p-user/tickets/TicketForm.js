"use client"
import { useState, useEffect } from 'react'

export default function() {

    const [departments, setDepartments] = useState([])
    const [subDepartment, setSubDepartment ] = useState([])
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



    return(
        <div>
            <div>
                <label htmlFor="">انتخاب دپارتمان</label>
                <select>
                    <option >please select one</option>
                    { departments.map( item => <option key={item._id} value={item.title}>{item.title}</option>)}
                </select>
            </div>

            <div>
                <label htmlFor="">انتخاب ساب دپارتمان</label>
                <select>
                    <option >please select one</option>
                    <option value="option1">option1</option>
                    <option value="option2">option2</option>
                </select>
            </div>

            <div>
                <label htmlFor="">انتخاب سطح اولویت تیکت</label>
                <select>
                    <option >please select one</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">2</option>
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
        </div>
    )
}