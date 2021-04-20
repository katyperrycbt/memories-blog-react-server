import mongoose from 'mongoose';

const postNoti = mongoose.Schema({
    page: String,
    type: String,
    contentHTML: String
});

const Notification = mongoose.model('Notification', postNoti);

export default Notification;