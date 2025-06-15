import mongoose from "mongoose";

const subWaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 2,
    maxLength: 100
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  frequency: {
    type: String,
    enum: ['daily', 'weekly', 'monthly', 'yearly'],
    required: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  payment:{
    type:String,
    required:true,
    trim:true
  },
  status:{
    type:String,
    enum:['active','canceled','expired'],
    default:'active'
  },
  start:{
    type:Date,
    required:true,
    validate:{
        validator:(value)=>value<=new Date(),
        message:"date must be in past",
    }
  },
  renewal:{
    type:Date,
    
    validate:{
        validator:function (value){
            return value>this.start;

        },
        message:"renew"
    }
  },
  used:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
    index:true,
  }


}, { timestamps: true });

subWaySchema.pre('save',function(next){
    if(!this.renewal){
        const renewperiod={
            daily:1,
            weeklt:7,
            monthly:30,
            yearly:365,
        };
        this.renewal=new Date(this.start);
        this.renewal.setDate(this.renewal.getDate()+renewperiod[this.frequency]);
    }
    if(this.renewal<new Date()){
        this.status="expired";
    }
    next();
});
export default mongoose.model("SubWay", subWaySchema);
