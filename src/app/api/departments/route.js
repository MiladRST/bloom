
import connectToDB from "@/configs/db"
import departmentModel from "@/models/Department"


export async function GET() {
    try{
        await connectToDB()

        const departments = await departmentModel.find({}) 

        return Response.json({ message: "departments sent successfully!" , departments })

    }catch(err) {
        return Response.json({ message: "Internal Server Error!"})
    }
}


export async function POST(req) {
    try {
        await connectToDB();

        const body = await req.json()

        const { title } = body 

        //validation

        await departmentModel.create({ title })

        return Response.json({ message: "Department created successfully!"} , { status: 201 })

    } catch(err) {

        return Response.json({ message: "Internal server error!"}, { status: 500 })

    }
}