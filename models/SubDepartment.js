import mongoose from "mongoose";
import "./Department"

const {Schema} = mongoose;

const schema = new Schema({
    title : {
        type: String,
        required: true
    },
    department : {
        type: mongoose.Types.ObjectId,
        ref: "Department",
        required: true
    }
})

const model = mongoose.models.SubDepartment || mongoose.model("SubDepartment", schema)

export default model;