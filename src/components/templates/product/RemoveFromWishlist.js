"use client"

import Swal from "sweetalert2"

const RemoveFromWishlist = ({ productID, userID, title}) => {
    const handleRemove = async () => {
        console.log('removal')
        const res = await fetch(`/api/wishlist/${productID}` , {
            method: "DELETE"
        })
        
        console.log(res)

        if(res.status === 200 ) {
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
