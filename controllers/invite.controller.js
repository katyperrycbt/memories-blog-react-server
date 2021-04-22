import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import Invitation from '../models/invitation.js';
import User from '../models/user.js';

dotenv.config();

const newInvitationCode = () => {
    return uuidv4();
}

export const invite = async (req, res) => {
    const { userId } = req;
    try {
        const invitor = mongoose.Types.ObjectId.isValid(userId) ? await User.findById(userId) : await User.find({ ggId: userId });
        const invitationCode = newInvitationCode();
        const prepareObject = {
            invitor: invitor.email,
            invitationCode
        }

        const newInvitation = new Invitation({...prepareObject, createdAt: new Date().toISOString()});
        await newInvitation.save();
        
        res.status(200).json({invitationCode});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}