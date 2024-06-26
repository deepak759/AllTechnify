import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  blogs:{type:Number,default:0},
  products:{type:Number,default:0},
  // followers: { type: [String], default: [],unique:true },
  // followings: { type: [String], default: [],unique:true },
  avatar:{
    type:String,
    default:"https://i.pinimg.com/564x/81/8a/1b/818a1b89a57c2ee0fb7619b95e11aebd.jpg"
  }
},
{timestamps:true}
);

const User = mongoose.model("User", userSchema);

export default User;
