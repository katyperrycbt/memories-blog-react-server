import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import Oops from '../models/oops.js';
import User from '../models/user.js';
import Comments from '../models/comments.js';
import Subcribe from '../models/subcribe.js';

import mailgun from 'mailgun-js';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const emailData = {
    from: 'MEmories <no-reply@oopsmemories.site>',
    to: '',
    subject: '',
    html: ''
}

const footer = `
<br/><br/>
Best regards,
<strong>MEmories Team</strong>
<br/><br/><br/>
<img src='https://res.cloudinary.com/katyperrycbt/image/upload/v1615297494/Web_capture_5-3-2021_145319_memories-thuckaty.netlify.app_hrcwg6.jpg' alt='MEmories' />
<p style="font-size: 0.875em; align-items: center; justify-content: center; display: flex; color: gray;">MEmories Team, Quarter-6, Linh Trung Ward, Thu Duc District, Thu Duc City, Vietnam 70000.</p>
<br/>
<p style="font-size: 0.875em; align-items: center; justify-content: center; display: flex; color: gray;">Tired of receiving too many emails? You can completely cancel the notification through the bell button on the home page of MEmories</p>
<br/>
<p style="font-size: 0.875em; align-items: center; justify-content: center; display: flex; color: gray;">Contact: katyperrycbt@gmail.com</p>
`;

const sendMail = async (to, subject, html) => {
    const mg = mailgun({ apiKey: process.env.REACT_APP_MAILGUN, domain: process.env.REACT_APP_MAILGUN_URL });
    let data = {
        ...emailData,
        to,
        subject,
        html
    };
    data.html += footer;
    mg.messages().send(data, function (error, body) {
        // console.log(body);
    });
}

export const getPosts = async (req, res) => {

    if (!req.userId) {
        res.status(404).json({ message: 'Unauthorized access!' });
        return;
    } else {
        const isOops = await Oops.findById(process.env.OOPS);
        let isOOpsGGID;
        if (!mongoose.Types.ObjectId.isValid(req.userId)) {
            isOOpsGGID = await User.find({ ggId: req.userId });
        } else {
            isOOpsGGID = await User.findById(req.userId);
        }
        const isUpxi = isOops['oopsMembers'].indexOf(req.userId) > -1;
        const isGGUpxi = isOops['oopsMembers'].indexOf(isOOpsGGID.ggId) > -1;

        if (isUpxi || isGGUpxi) {
            try {
                const postMessage = await PostMessage.find();

                res.status(200).json(postMessage);
            } catch (error) {
                res.status(404).json({ message: error.message })
            }
        } else {
            try {
                let postMessage = await PostMessage.find({ oops: false });
                if (postMessage.length === 0) {
                    postMessage = [
                        {
                            tags: ['Tag'],
                            likes: [],
                            title: 'Hello, chưa có kỉ niệm nào cho bạn cả :"(',
                            message: 'Hãy thử tạo một kỷ niệm mới ở khung bên phải.',
                            name: 'Chào bạn',
                            creator: 'Login_required',
                            createdAt: '0000-03-07T09:45:48.790+00:00',
                            selectedFile: 'https://res.cloudinary.com/katyperrycbt/image/upload/v1614954793/nz7v6t3vwijhy1z0njka.jpg',
                            modified: false,
                            __v: 0,
                            _id: 'null'
                        }
                    ]
                }
                res.status(200).json(postMessage);
            } catch (error) {
                res.status(404).json({ message: error.message })
            }
        }
    }
}

export const createPosts = async (req, res) => {
    const post = req.body;

    if (!req.userId) {
        res.status(404).json({ message: 'Unauthorized access!' });
        return;
    } else {
        const isOops = await Oops.findById(process.env.OOPS);
        let isGGOop = '';
        if (mongoose.Types.ObjectId.isValid(req.userId)) {
            isGGOop = await User.findById(req.userId);
        }
        const isUpxi = isOops['oopsMembers'].indexOf(req.userId) > -1;
        const isGGUpxi = isOops['oopsMembers'].indexOf(isGGOop.ggId) > -1;

        post.oops = isUpxi || isGGUpxi;

        if (post.selectedFile) {
            await cloudinary.v2.uploader.upload(post.selectedFile)
                .then((result) => {
                    console.log(result.url);
                    post.selectedFile = result.url;
                }).catch((error) => {
                    console.log(error);
                    post.selectedFile = 'https://res.cloudinary.com/katyperrycbt/image/upload/v1615115485/filewastoolarge_kwwpt9.png'
                });
        } else {
            post.selectedFile = '';
        }

        const newPost = new PostMessage({ ...post, creator: req.userId, createdAt: new Date().toISOString() });

        try {

            await newPost.save();

            try {
                const us = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.find({ ggId: req.userId });
                if (us.info.subcribe) {
                    const subcribe = await Subcribe.findById(process.env.SUBCRIBE);
                    const subcribeFilter = subcribe.emailList.filter((email) => email !== us.email);
                    const emailForm = {
                        to: subcribeFilter,
                        subject: `[New MEmory] ${us.name} has just posted a new MEmory!`,
                        html: `
                    <h1> Hi </h1>
                    <br/>
                    <h3 style="color: blue;"> [${new Date(Date.now()).toDateString()} ${new Date(Date.now()).toTimeString()}] Your friend ${isGGOop.name} has just posted a MEmory. <a href="https://www.oopsmemories.site/">Check it out</a> </h3>
                    <h3 style="color: green;"> Details: </h3>
                    <h3 style="color: red;"> [${post.title}] ${post.message.substring(0, 10)}... </h3>
                    `
                    }
                    sendMail(emailForm.to, emailForm.subject, emailForm.html);
                }
            } catch (error) {
                console.log(error);
            }

            res.status(201).json(newPost);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }
    }
}

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    let post = req.body;
    // console.log(post);
    if (post.selectedFile) {
        await cloudinary.v2.uploader.upload(post.selectedFile)
            .then((result) => {
                console.log(result.url);
                post.selectedFile = result.url;
            }).catch((error) => {
                console.log(error);
            });
    } else {
        post.selectedFile = '';
    }
    if (!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send('No post with that id');

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id, modified: true }, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: 'Post delete successfully!' });
}

export const likePost = async (req, res) => {
    const { id } = req.params;

    if (!req.userId) return res.json({ message: 'Unauthenticated' });

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with that id');

    const post = await PostMessage.findById(id);

    const index = post.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId));
    }

    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });

    try {
        const us = mongoose.Types.ObjectId.isValid(post.creator) ? await User.findById(post.creator) : await User.find({ ggId: post.creator });
        const whoHeart = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.find({ ggId: req.userId });
        if (us.info.subcribe) {
            const subcribe = await Subcribe.findById(process.env.SUBCRIBE);
            let subcribeFilter = '';
            if (us.email === 'gokusuperfan@gmail.com') {
                subcribeFilter = 'huuthinh1609@gmail.com'
            } else if (us.email === 'katyperrycbtwap@gmail.com') {
                subcribeFilter = 'katyperrycbt@gmail.com'
            } else if (us.email === 'twitle.1708@gmail.com') {
                subcribeFilter = 'tuyet.le170800@gmail.com'
            } else {
                subcribeFilter = subcribe.emailList.filter((email) => email === us.email);
            }

            const emailForm = {
                to: subcribeFilter,
                subject: `[Heart MEmory] ${whoHeart.name} has just hearted to your MEmory!`,
                html: `
            <h1> Hi </h1>
            <br/>
            <h3 style="color: blue;"> [${new Date(Date.now()).toDateString()} ${new Date(Date.now()).toTimeString()}] A friend has just reacted to your MEmory. <a href="https://www.oopsmemories.site/">Check it out</a> </h3>
            <h3 style="color: green;"> Details: </h3>
            <h3 style="color: red;"> [${post.title}] ${post.message.substring(0, 10)}... </h3>
            `
            }
            sendMail(emailForm.to, emailForm.subject, emailForm.html);
        }
    } catch (error) {
        console.log(error);
    }

    res.status(200).json(updatedPost);
}

export const resetAndGetPosts = async (req, res) => {
    const { userId } = req;
    if (!userId) return res.json({ message: 'Unauthenticated' });
    console.log('GG ID', userId);

    const { name, avt, ggId } = await User.findById(userId);

    let thisUserPost = await PostMessage.find({ creator: (ggId ? ggId : userId) });
    // const thisGGUserPost = await PostMessage.find({ creator: ggId });

    // console.log('NAME AND AVT', name, avt);
    console.log('LENTH', thisUserPost.length);
    if (thisUserPost) {
        for (let i = 0; i < thisUserPost.length; i++) {
            thisUserPost[i].name = name;
            thisUserPost[i].creatorAvt = avt;
            // console.log(temp);
            await PostMessage.findByIdAndUpdate(thisUserPost[i]._id, thisUserPost[i], { new: true });
        }
    }

    const isOops = await Oops.findById(process.env.OOPS);
    let isOOpsGGID;
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
        isOOpsGGID = await User.find({ ggId: req.userId });
    } else {
        isOOpsGGID = await User.findById(req.userId);
    }
    const isUpxi = isOops['oopsMembers'].indexOf(req.userId) > -1;
    const isGGUpxi = isOops['oopsMembers'].indexOf(isOOpsGGID.ggId) > -1;
    if (isUpxi || isGGUpxi) {
        try {
            const postMessage = await PostMessage.find();
            console.log('DONE ROI');
            res.status(200).json(postMessage);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    } else {
        try {
            let postMessage = await PostMessage.find({ oops: false });
            if (postMessage.length === 0) {
                postMessage = [
                    {
                        tags: ['Tag'],
                        likes: [],
                        title: 'Hello, chưa có kỉ niệm nào cho bạn cả :"(',
                        message: 'Hãy thử tạo một kỷ niệm mới ở khung bên phải.',
                        name: 'Chào bạn',
                        creator: 'Login_required',
                        createdAt: '0000-03-07T09:45:48.790+00:00',
                        selectedFile: 'https://res.cloudinary.com/katyperrycbt/image/upload/v1614954793/nz7v6t3vwijhy1z0njka.jpg',
                        modified: false,
                        __v: 0,
                        _id: 'null'
                    }
                ]
            }
            res.status(200).json(postMessage);
        } catch (error) {
            res.status(404).json({ message: error.message })
        }
    }
}

export const getComments = async (req, res) => {
    const { userId } = req;

    if (!userId) return res.json({ message: 'Unauthenticated' });

    const isOops = await Oops.findById(process.env.OOPS);
    let isOOpsGGID;
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
        isOOpsGGID = await User.find({ ggId: req.userId });
    } else {
        isOOpsGGID = await User.findById(req.userId);
    }
    const isUpxi = isOops['oopsMembers'].indexOf(req.userId) > -1;
    const isGGUpxi = isOops['oopsMembers'].indexOf(isOOpsGGID.ggId) > -1;

    if (isUpxi || isGGUpxi) {

        try {

            const getComments = await Comments.find();
            res.status(200).json(getComments);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }

    } else {
        res.status(200).json({ message: 'Not allowed!' });
    }
}

export const postComment = async (req, res) => {
    const { userId } = req;
    const { postId, comment } = req.body;

    if (!userId) return res.json({ message: 'Unauthenticated' });

    const isOops = await Oops.findById(process.env.OOPS);
    let isOOpsGGID;
    if (!mongoose.Types.ObjectId.isValid(req.userId)) {
        isOOpsGGID = await User.find({ ggId: req.userId });
    } else {
        isOOpsGGID = await User.findById(req.userId);
    }
    const isUpxi = isOops['oopsMembers'].indexOf(req.userId) > -1;
    const isGGUpxi = isOops['oopsMembers'].indexOf(isOOpsGGID.ggId) > -1;

    if (isUpxi || isGGUpxi) {

        const newComment = new Comments({ postId, comment, commentId: userId, createdAt: new Date().toISOString() });

        try {

            await newComment.save();

            try {
                const commenter = mongoose.Types.ObjectId.isValid(userId) ? await User.findById(userId) : await User.find({ ggId: userId });
                const postOwnerID = mongoose.Types.ObjectId.isValid(postId) ? await PostMessage.findById(postId) : '';
                let postOwner = mongoose.Types.ObjectId.isValid(postOwnerID.creator) ? await User.findById(postOwnerID.creator) : await User.find({ ggId: postOwnerID.creator });
                if (postOwner.info.subcribe) {
                    const subcribe = await Subcribe.findById(process.env.SUBCRIBE);
                    let subcribeFilter = '';
                    if (postOwner.email === 'gokusuperfan@gmail.com') {
                        subcribeFilter = 'huuthinh1609@gmail.com'
                    } else if (postOwner.email === 'katyperrycbtwap@gmail.com') {
                        subcribeFilter = 'katyperrycbt@gmail.com'
                    } else if (postOwner.email === 'twitle.1708@gmail.com') {
                        subcribeFilter = 'tuyet.le170800@gmail.com'
                    } else {
                        subcribeFilter = subcribe.emailList.filter((email) => email === postOwner.email);
                    }
                    console.log('cmt', subcribeFilter);
                    const emailForm = {
                        to: subcribeFilter,
                        subject: `[Comment MEmory] ${commenter.name} has just commented to your MEmory!`,
                        html: `
                    <h1> Hi </h1>
                    <br/>
                    <h3 style="color: blue;"> [${new Date(Date.now()).toDateString()} ${new Date(Date.now()).toTimeString()}] A friend has just left a comment to your MEmory. <a href="https://www.oopsmemories.site/">Check it out</a> </h3>
                    <h3 style="color: green;"> Details: </h3>
                    <h3 style="color: red;"> [${postOwnerID.title}] ${comment.substring(0, 10)}... </h3>
                    `
                    }
                    sendMail(emailForm.to, emailForm.subject, emailForm.html);
                }
            } catch (error) {
                console.log(error);

            }

            res.status(201).json(newComment);
        } catch (error) {
            res.status(409).json({ message: error.message });
        }

    } else {
        res.status(200).json({ message: 'Not allowed!' });
    }
}

export const editComment = async (req, res) => {
    const { userId } = req;
    const newCmt = req.body;
    const { cmtId } = req.params;

    if (!userId) return res.json({ message: 'Unauthenticated' });

    try {
        const updatedComment = await Comments.findByIdAndUpdate(cmtId, { ...newCmt, modified: true }, { new: true });
        // console.log(updatedComment);
        // console.log(cmtId);
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const delComment = async (req, res) => {
    const { userId } = req;
    const { cmtId } = req.params;

    if (!userId) return res.json({ message: 'Unauthenticated' });

    try {
        await Comments.findByIdAndRemove(cmtId);

        res.status(200).json({ message: 'Comment has been deleted!' });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export const starComment = async (req, res) => {
    const { userId } = req;
    const { cmtId } = req.params;

    if (!userId) return res.json({ message: 'Unauthenticated' });

    try {
        const cmt = await Comments.findById(cmtId);

        const index = cmt.hearts.findIndex((heart) => heart === String(userId));

        if (index === -1) {
            cmt.hearts.push(userId);
        } else {
            cmt.hearts = cmt.hearts.filter((heart) => heart !== String(userId));
        }

        const updatedComment = await Comments.findByIdAndUpdate(cmtId, cmt, { new: true });

        const us = mongoose.Types.ObjectId.isValid(cmt.commentId) ? await User.findById(cmt.commentId) : await User.find({ ggId: cmt.commentId });
        const whoHeart = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.find({ ggId: req.userId });
        if (us.info.subcribe) {
            const subcribe = await Subcribe.findById(process.env.SUBCRIBE);
            let subcribeFilter = '';
            if (us.email === 'gokusuperfan@gmail.com') {
                subcribeFilter = 'huuthinh1609@gmail.com'
            } else if (us.email === 'katyperrycbtwap@gmail.com') {
                subcribeFilter = 'katyperrycbt@gmail.com'
            } else if (us.email === 'twitle.1708@gmail.com') {
                subcribeFilter = 'tuyet.le170800@gmail.com'
            } else {
                subcribeFilter = subcribe.emailList.filter((email) => email === us.email);
            }

            const emailForm = {
                to: subcribeFilter,
                subject: `[Star MEmory] ${whoHeart.name} liked your comment!`,
                html: `
            <h1> Hi </h1>
            <br/>
            <h3 style="color: blue;"> [${new Date(Date.now()).toDateString()} ${new Date(Date.now()).toTimeString()}] A friend has just stared to your MEmory. <a href="https://www.oopsmemories.site/">Check it out</a> </h3>
            <h3 style="color: green;"> Details: </h3>
            <h3 style="color: red;"> [${cmt.comment.substring(0, 10)}...] </h3>
            `
            }
            sendMail(emailForm.to, emailForm.subject, emailForm.html);
        }

        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}