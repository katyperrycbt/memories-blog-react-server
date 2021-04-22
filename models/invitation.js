import mongoose from 'mongoose';

const invitationSchema = mongoose.Schema({
    invitor: String,
    invitationCode: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Invitation = mongoose.model('Invitation', invitationSchema);

export default Invitation;