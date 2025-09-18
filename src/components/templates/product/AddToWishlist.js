"use client"
import React from 'react';
import { CiHeart } from "react-icons/ci";
import Swal from 'sweetalert2';
import api from "@/services/apiService"

const AddToWishlist = ({productID}) => {

    const handleAddToWishlist = async() => {
        //check auth 
        const authRes = await api.get('/auth/me')
        const { data: user } = authRes

        const wish = {
            user: user._id,
            product: productID
        }

        // if user is available
        const res = await api.post('/wishlist' , { ...wish })
        console.log(res);
        

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
