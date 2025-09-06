import mongoose from "mongoose";

const { Schema } = mongoose

const schema = new Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: false
    },
    company: {
        type: String,
        required: false
    }
})

const model = mongoose.models.Contact || mongoose.model('Contact' , schema)

export default model;