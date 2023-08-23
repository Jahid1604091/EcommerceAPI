import mongoose from "mongoose";

const StoreSchema = mongoose.Schema({
    vendor_id:{
        type:String,
        required:true
    },
    business_email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        required:true
    },
    pin:{
        type:String,
        required:true
    },
    location:{
        type:{type:String},
        coordinates:[Number]
    }

})

StoreSchema.index({location:'2dsphere'})
export default mongoose.model("Store",StoreSchema)