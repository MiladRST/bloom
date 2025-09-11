import connectToDB from "@/configs/db";
import { authUser } from "@/utils/auth";
import commentModel from "@/models/Comment";

const Page = async () => {
    let comments = []      
    await connectToDB()

    const user = await authUser()

    if(user) {
        comments = await commentModel.find({ user: user._id}).populate('productID')        
    }

    return (
        <>
            <main>
                 <h1>
                    <span>نظرات</span>
                    <ul>
                        { comments.map( cm => <li key={cm._id}>{cm.username} - {cm.body} - {cm.score} </li>)}
                    </ul>
                </h1>
                
            </main>
        </>
    );
}

export default Page;
