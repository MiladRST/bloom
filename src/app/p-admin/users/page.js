import connectToDB from "@/configs/db"
import userModel from "@/models/User"
import Table from "@/components/modules/p-admin/users/Table"

export default async function() {
    await connectToDB()

    const users = await userModel.find({} , "name email phone role")
    
    return(
        <>
            <h1>p-admin/users</h1>

            { users?.length === 0 ? (
                <p>No user available</p>
            ) : (
                <Table users={JSON.parse(JSON.stringify(users))} />
            )}

        </>
    )
}