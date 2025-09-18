import { cookies } from "next/headers"

export async function POST () {
    const cookieStore = await cookies()
    cookieStore.delete('token')
    //if using refresh-token
    cookieStore.delete('refresh-token')

    return Response.json({message: 'User logged-out successfully!'} , { 
        status: 200,
    })   
}