import mongoose from "mongoose";

const organizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    teams: [
        {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Team'
        }
    ]
});

export default mongoose.model('Organization', organizationSchema);