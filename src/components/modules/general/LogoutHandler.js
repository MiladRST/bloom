"use client"

import styles from "./style.module.css"
import { useRouter } from "next/navigation";
import { MdLogout } from "react-icons/md";
import Swal from "sweetalert2";

export default function() {

    const router = useRouter()
     
    const logoutHandler = () => {
        Swal.fire({
          title: "از پنل کاربری خارج میشوید؟",
          showDenyButton: true,
          confirmButtonText: "بله",
          denyButtonText: "خیر" ,
        }).then( async (result) => {
          
          if (result.isConfirmed) {
            const res = await fetch('/api/auth/signout' , { method: 'POST' })
            if(res.status === 200 ) {
                Swal.fire("خروح از حساب کاربری موفقیت آمیز بود", "", "success");
                return router.replace('/')
            }
          } 
        });
    
      };

    return(
        <div className={styles.logout} onClick={logoutHandler}>
            <MdLogout />
            خروج
        </div>
    ) 
}