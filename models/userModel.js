import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: [true, "please enter email "],
    },
    userName: {
        type: String,
        required: [true, "please enter user name "],
    },
    password: {
        type: String,
        required: [true, "please enter password"],
    },
    userRole:{
        type:String,
        required: [false]
    },
    projectBudget: {
        type: Number,
        required: [true]
    },
    totalSpent: {
        type: Number,
        default: 0
    },
    maxSpent: {
        type: Number,
        required: [true]
    }
})
export default mongoose.model("User",userSchema);