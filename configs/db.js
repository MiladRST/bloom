import mongoose from "mongoose";

const connectToDB = async () => {
    try{
        if(mongoose.connections[0].readyState) {

        } else {
            await mongoose.connect(process.env.MONGO_URL)
            console.log('Connected to DB successfully!')
        }
    }catch(err) {
        console.log("DB connextion has error ->" , err)
    }
}

export default connectToDB;