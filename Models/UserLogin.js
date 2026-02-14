import mongoose from "mongoose";
const Schema = mongoose.Schema
const userSchema = new Schema({
    profile_img:{
        type:String
    },
    quote:{
        type:String
    },
    link:{
        type:String
    },
    
    
    name: {
        type: String
    },
    dob: { type: String },
    email: {
        type: String
    },
    password: { type: String },
   
    user_id:{type:String},
    resetToken:{type:String}

}, {
    timestamps: true
})

const User = mongoose.model("UsersInformation", userSchema)
export default User
