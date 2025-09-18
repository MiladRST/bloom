
"use client"

import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import api from "@/services/apiService"

export default function Table({ users }) {

    const router = useRouter()

    const changeRole = async (userID) => { 

        const res = await api.put('/user/role' , { id: userID })

        const {data} = res
        
        if(res.status === 200 ) {
            Swal.fire({
                title: data.message,
                icon: "success"
            }).then(() => {
                router.refresh()
            })
        }

    }

    const deleteUser = async (userID) => {
        Swal.fire({
            title: "Are you sure want to delete user?",
            showConfirmButton: true,
            showDenyButton: true,
            icon: "info"
        }).then( async (result) => {
            console.log(result);
            if(result.isConfirmed){

                const res = await api.delete('/user' , { id: userID })

                const {data} = res

                if(res.status ===200) {
                    Swal.fire({
                        title: data.message,
                        icon: "success"
                    }).then(() => {
                        router.refresh()
                    })
                }
            }
        })
    }


    const banUser = async (email, phone) => {
    // Confirm ✅
    // Validation (You) ✅

    Swal.fire({
        title: "آیا از بن کاربر اطمینان دارین؟",
        showConfirmButton: true,
        showDenyButton: true,
        icon: "warning"
    }).then(async (result) => {
      if (result) {
        const res = await api.post("/user/ban", { email, phone } );

        if (res.status === 200) {
          Swal.fire({
            title: "کاربر مورد نظر با موفقیت بن شد",
            icon: "success",
          }).then(() => {
            router.refresh();
          });
        }
      }
    });
  };

    return (
        <table>
            <thead>
                <tr>
                    <th>Index</th>
                    <th>Name</th>
                    <th>Email/Phone</th>
                    <th>Role</th>

                    <th>Change User role</th>
                    <th>Delete User</th>
                    <th>Ban User</th>
            
                </tr>
            </thead>
            <tbody>
                {
                    users.map( (user, index) => {
                        return(
                            <tr key={user._id}>
                                <td>{index+1}</td>
                                <td>{user.name}</td>
                                <td>{user.email ? user.email : user.phone }</td>
                                <td>{user.role}</td>
                                <td>
                                    <button 
                                    type="button" 
                                    onClick={() => changeRole(user._id)}>
                                        change role
                                    </button>
                                </td>
                                <td>
                                    <button 
                                    type="button" 
                                    onClick={() => deleteUser(user._id)}>
                                        delete
                                    </button>
                                </td>
                                <td>
                                     <button
                                    type="button"
                                    onClick={() => banUser(user.email, user.phone)}
                                    >
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