import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },    
    uniqueId: {
        type: String, 
        required: true, 
        unique: true 
    },
    team: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Team',
        required:true
    },
    image: { 
        type: String 
    },
    status: {
        type: String, 
        default: 'Image Not Uploaded' 
    }
});

export default mongoose.model('Employee', employeeSchema);