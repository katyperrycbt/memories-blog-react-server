import mongoose from 'mongoose';

const postNoti = mongoose.Schema({
    title: String,
    content: String,
    button: String,
    link: String
});

const Notification = mongoose.model('Notification', postNoti);

export default Notification;