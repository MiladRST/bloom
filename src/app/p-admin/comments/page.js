import connectToDB from "@/configs/db"
import commentModel from "@/models/Comment"

export default async function() {
        await connectToDB()
    
        const comments = await commentModel.find({}).populate("productID").populate("user")

        console.log(comments);
        
    return(
        <>
            <h1>p-admin/comments</h1>
        </>
    )
}