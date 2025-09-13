import connectToDB from "@/configs/db"
import userModel from "@/models/User"

export default async function() {
    await connectToDB()

    const users = await userModel.find({} , "name email phone role")
    
    return(
        <>
            <h1>p-admin/users</h1>

            <table>
                <thead>
                    <tr>
                        <th>Index</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map( (user, index) => {
                            return(
                                <tr key={user._id}>
                                    <td>{index+1}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.role}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>

        </>
    )
}