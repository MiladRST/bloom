import connectToDB from "@/configs/db"
import wishlistModel from "@/models/Wishlist"
import { authUser } from "@/utils/auth"


export async function DELETE (req, { params }) {
    try{
        const user = await authUser();
        const { id } = await params
        console.log('userID => ', user._id);
        
        await connectToDB()

        const deletedWish = await wishlistModel.findOneAndDelete({
            user: user._id,
            product: id
        })

        return Response.json({ message : 'wish deleted successfully'})

    }catch(err){

        return Response.json({ message: "Internal Server Error!"})

    }
}