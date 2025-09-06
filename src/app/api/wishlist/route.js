import connectToDB from "@/configs/db";
import wishlistModel from "@/models/Wishlist";
import userModel from "@/models/User";
import productModel from "@/models/Product";
import { isValidObjectId } from "mongoose";

export async function POST(req) {
    try{
        const body = await req.json()
        const { user, product} = body
        await connectToDB()
        //validation
        if(!isValidObjectId(user)) {
            return Response.json({ message: "User id is not valid!"} , { status: 422})
        }

        const searchedUser = await userModel.findOne({ _id : user })

        if(!searchedUser) {
            return Response.json({ message: "User not found!"} , {status: 404})
        }

        if(!isValidObjectId(product)) {
            return Response.json({ message: "Product id is not valid!"} , { status: 422})
        }

        const isProductExist = await wishlistModel.findOne({ product })

        if(isProductExist) {
            return Response.json({ message: 'Product already exist in the wishlist!'} , { status: 422})
        }

        const searchedProduct = await productModel.findOne({ _id: product })

        if(!searchedProduct) {
            return Response.json({ message: "Product not found!"} , {status: 404})
        }

        await wishlistModel.create({ user , product})

        return Response.json({ message: "Product added to wishlist successfully!" } , { status: 201})

    }catch(err){
        return Response.json({ message: "Internal Server Error!"} , { status: 500 })
    }
}

