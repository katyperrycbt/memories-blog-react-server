import express from 'express';
// import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import postRoutes from './routes/posts.route.js';
import userRoutes from './routes/users.route.js';
import notiRoutes from './routes/noti.route.js';
import inviteRoutes from './routes/invite.route.js';
import emailRoutes from './routes/email.route.js';

const app = express();


dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

app.use(express.json({limit: "150mb", extended: true}));
app.use(express.urlencoded({limit: "150mb", extended: true}));
app.use(cors());

app.use('/posts', postRoutes);
app.use('/user', userRoutes);
app.use('/noti', notiRoutes);
app.use('/invite', inviteRoutes);
app.use('/email', emailRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to Memories API OOPSSSSSSSSSSS');
})

// const CONNECTION_URL = 'mongodb+srv://katyperrycbt-pj1:lykVnIh071AXoVTu@cluster0.rlj6w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
    .catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false);