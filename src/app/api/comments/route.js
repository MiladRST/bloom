import connectToDB from "@/configs/db";
import commentModel from "@/models/Comment";
import productModel from "@/models/Product";
export async function POST(req) {
    try{

        await connectToDB()

        const reqBody = await req.json()
        const {username, body, email, score, productID, user } = reqBody

        //validation


        const comment = await commentModel.create({
            username, body, email, score, productID, user
        })

        const updateProduct = await productModel.findOneAndUpdate({
            _id: productID
        }, {
            $push : {
                comments : comment._id
            }
        })

        return Response.json({ message: "Comment created successfully!" , data: comment }, { status: 201 })

    }catch(err) {
        return Response.json({ message: err }, { status: 500 });
    }
}


export async function GET() {
    await connectToDB()
    const comments = await commentModel.find({})
    return Response.json({ message: "" , data : comments })
}