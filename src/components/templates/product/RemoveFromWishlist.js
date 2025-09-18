"use client"

import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import api from "@/services/apiService"

const RemoveFromWishlist = ({ productID, userID, title}) => {
    const router = useRouter()

    const handleRemove = async () => {
        console.log('removal')
        const res = await api.delete(`/wishlist/${productID}`)
        

        if(res.status === 200 ) {
            router.refresh()

            Swal.fire(
                {
                    title: "آیتم با موفقیت از لیست علاقع مندی ها حذف شد",
                    icon: "success"
                }
            )
        }
    }
    return (
        <button onClick={handleRemove}>
            حذف
            {title}
            از علاقه مندی ها
        </button>
    );
}

export default RemoveFromWishlist;
