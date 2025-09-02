import mongoose from "mongoose";

const { Schema } = mongoose

const schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false        
    },
    role: {
        type: String,
        default: 'USER'
    },
    refreshToken: String
})

const model = mongoose.models.User || mongoose.model('User' , schema);

export default model;
