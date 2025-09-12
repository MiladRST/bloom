import connectToDB from "@/configs/db";
import subDepartmentsModel from "@/models/SubDepartment"
import { isValidObjectId } from "mongoose";

export async function GET( req , { params }) {
    try{
        const { id } = await params

        if(!isValidObjectId(id)) {
            return Response.json({ message: "Invalid id!" }, { status: 422 })
        }

        await connectToDB()

        const subDepartments = await subDepartmentsModel.find({ department : id })

        return Response.json({ message: "List of sub-departments" , subDepartments })

    }catch(err){
        return Response.json({ message: "Internal Server Error!"} , { status: 500 })
    }
}