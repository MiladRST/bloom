
import connectToDB from "@/configs/db"
import subDepartmentModel from "@/models/SubDepartment"

export async function POST(req) {
    try {
        await connectToDB();

        const body = await req.json()

        const { title, department } = body 

        //validation

        await subDepartmentModel.create({ title , department})

        return Response.json({ message: "SubDepartment created successfully!"} , { status: 201 })

    } catch(err) {

        return Response.json({ message: "Internal server error!"}, { status: 500 })

    }
}