import mongoose from "mongoose";

const schema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match:[
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      "Please enter a valid email address",
        ]
    },
    password:{
        type:String,
        required:true,
        unique:true,
        minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
        type: String,
        enum: ["admin", "student","instructor"],
        default: "student", 
      },
      resetPasswordToken: String,
       resetPasswordExpires: Date
});
export default mongoose.model.Users || mongoose.model("User", schema);
