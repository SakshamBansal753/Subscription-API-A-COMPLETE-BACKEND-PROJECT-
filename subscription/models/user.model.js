import mongoose from "mongoose";
const user_way=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"User not defined"],
        trim:true,
        minLength:2,
        maxLength:55,
    },
     email:{
        type:String,
        required:[true,"User Emailnot defined"],
        unique:true,
        lowercase:true,
        trim:true,
        match:[/\S+@\S+\.\S+/,'Please Fill valid'],
        minLength:2,
        maxLength:255,
    },
    password:{
        type:String,
        required:true,
        minLength:6,

    }
},{timestamps:true});
const User=mongoose.model('User',user_way);
export default User;

//USer Attribute is Defined with the help of mongoo ndb