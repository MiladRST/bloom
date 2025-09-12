import mongoose from "mongoose";

const {Schema} = mongoose;

const schema = new Schema({
    title : {
        type: String,
        required: true
    }
})

const model = mongoose.models.Department || mongoose.model("Department", schema)

export default model;