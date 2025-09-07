"use client"
import React from 'react';
import { CiHeart } from "react-icons/ci";
import Swal from 'sweetalert2';


const AddToWishlist = ({productID}) => {

    const handleAddToWishlist = async() => {
        //check auth 
        const authRes = await fetch('/api/auth/me')
        const user = await authRes.json()

        const wish = {
            user: user._id,
            product: productID
        }

        // if user is available
        const res = await fetch('/api/wishlist' , {
            method: 'POST',
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify(wish)
        })

        if(res.status === 201 ) {
            Swal.fire({
                title: "محصول به علاقه مندی ها اضافه شد",
                icon: "success"
            })
        }
    }

    return (
        <div onClick={handleAddToWishlist}>
            <CiHeart />
            <button>افزودن به علاقه مندی ها</button>
        </div>
    );
}

export default AddToWishlist;
