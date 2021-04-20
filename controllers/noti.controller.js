import mongoose from 'mongoose';
import Notification from '../models/noti.js';

export const createNoti = async (req, res) => {
    const {userId} = req; 
    const notiBody = req.body;

    if (!userId) {
        res.status(404).json({ message: 'Unauthorized access!' });
        return;
    }

    try {
        const newNoti = new Notification({...notiBody, creator: userId});
        await newNoti.save();

        return res.status(201).json(newNoti);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const deleteNoti = async (req, res) => {
    const {userId} = req; 
    const {id} = req.params;
    if (!userId) {
        res.status(404).json({ message: 'Unauthorized access!' });
        return;
    }
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No noti with that id');

    try {
        await Notification.findByIdAndRemove(id);
        res.status(204).json({ message: 'Noti delete successfully!' });
    } catch (error) {
        res.status(409).json({ message: error.message });   
    }
}

export const getNoti = async (req, res) => {
    try {
        const noti = await Notification.find();

        res.status(200).json(noti);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}