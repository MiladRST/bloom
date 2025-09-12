import mongoose from "mongoose";
import "./User"
import "./Department"
import "./SubDepartment"

const {Schema} = mongoose;

const schema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    priority: {
        type: Number,
        default: 1,
        enum: [1, 2, 3]
    },
    user: {
        type:mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    department: {
        type: mongoose.Types.ObjectId,
        ref: "Department",
        required: true
    },
    subDepartment: {
        type: mongoose.Types.ObjectId,
        ref: "SubDepartment",
        required: true
    }
})

const model = mongoose.models.Ticket || mongoose.model("Ticket", schema)

export default model;