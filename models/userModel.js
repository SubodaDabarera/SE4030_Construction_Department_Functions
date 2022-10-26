import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    email: {
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
    }
})
export default mongoose.model("User",userSchema);