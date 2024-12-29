import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization',
        required: true
    },
    members: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    }]
});

// module.exports = mongoose.model('Team', teamSchema);
export default mongoose.model('Team', teamSchema);