import mongoose from "mongoose";
import "./Ticket"
import "./User"

const { Schema } = mongoose 

const schema = new Schema({
    message: {
        type: String,
        required: true
    },
    ticket: {
        type: mongoose.Types.ObjectId,
        ref: "Ticket",
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
}, {
    timestamps: true
})

const model = mongoose.models.Message || mongoose.model("Message", schema)

export default model;