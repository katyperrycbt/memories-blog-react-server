import dotenv from 'dotenv';

import User from '../models/user.js';
import mongoose from 'mongoose';
import Subcribe from '../models/subcribe.js';
import ClientIP from '../models/clientIP.js';
import Invitation from '../models/invitation.js';
import PostMessage from '../models/postMessage.js';
import Oops from '../models/oops.js';
import CryptoJS from 'crypto-js';

dotenv.config();

export const wall = async (req, res) => {
    const { userId } = req;
    const { id } = req.params;

    if (!userId) {
        return res.status(404).json({ message: 'Unauthorized access!' });
    }

    try {

        const getInfo = mongoose.Types.ObjectId.isValid(id) ? await User.findById(id) : await User.findOne({ ggId: id });
        if (!getInfo) return res.status(404).json({ message: 'Oops, something went wrong! Please report this problem!' });

        let prepareResult = {
        }

        prepareResult.info = {
            name: getInfo.name,
            avt: getInfo.avt,
            info: getInfo.info ? getInfo.info : 'No Data'
        }

        let posts = [];

        const isOops = await Oops.findById(process.env.OOPS);
        let isOOpsGGID;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            isOOpsGGID = await User.findOne({ ggId: userId });
        } else {
            isOOpsGGID = await User.findById(userId);
        }
        const isUpxi = isOops['oopsMembers'].indexOf(userId) > -1;
        const isGGUpxi = isOops['oopsMembers'].indexOf(isOOpsGGID.ggId) > -1;

        if (isUpxi || isGGUpxi) {
            posts = await PostMessage.find();
        } else {
            posts = await PostMessage.find({ oops: false });
            if (posts.length === 0) {
                posts = []
            }
        }
        prepareResult.posts = posts;

        return res.status(200).json(prepareResult);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }

}

export const toggleFollow = async (req, res) => {
    const { userId } = req;
    const { id } = req.params;

    if (!userId) return res.status(404).json({ message: 'Unauthorized access!' });

    try {
        let getInfo = mongoose.Types.ObjectId.isValid(userId) ? await User.findById(userId) : await User.findOne({ ggId: userId });
        if (!getInfo) return res.status(404).json({ message: 'Oops, something went wrong! Please report this problem!' });

        let follows = getInfo.info?.follow ? getInfo.info.follow : [];

        const followThisUser = (follows.length) ? (follows.indexOf(id) > -1) : false;

        if (followThisUser === false) {
            follows.push(id);
            getInfo.info.follow = follows;
        } else {
            const index = follows.indexOf(id);
            getInfo.info.follow.splice(index, 1);
        }
        const updatedProfile = await User.findByIdAndUpdate(getInfo._id, getInfo, { new: true });

        res.status(200).json(updatedProfile);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const see = async (req, res) => {
    const { userId } = req;
    const { id } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({ message: 'This MEmory is not found!' });

        const getPost = await PostMessage.findById(id);

        const visibility = getPost.visibility ? getPost.visibility : 'public';
  
        switch (visibility) {
            case 'public':
                return res.status(200).json(getPost);
            case 'followers':
                if (!userId) return res.status(404).json({ message: 'Log in and follow this user to see this MEmory!' });
                const getInfo = mongoose.Types.ObjectId.isValid(userId) ? await User.findById(userId) : await User.findOne({ ggId: userId });
                const followings = getInfo ? getInfo?.info?.follow : [];

                if (!followings.length) return res.status(404).json({ message: 'Follow this user first!' });

                if (followings.indexOf(getPost['creator']) < 0) return res.status(404).json({ message: 'Follow this user first!' });

                return res.status(200).json(getPost);
            case 'oops':
                const isOops = await Oops.findById(process.env.OOPS);
                let isOOpsGGID;
                if (!mongoose.Types.ObjectId.isValid(userId)) {
                    isOOpsGGID = await User.findOne({ ggId: userId });
                } else {
                    isOOpsGGID = await User.findById(userId);
                }
                const isUpxi = isOops['oopsMembers'].indexOf(userId) > -1;
                const isGGUpxi = isOops['oopsMembers'].indexOf(isOOpsGGID.ggId) > -1;

                if (isUpxi || isGGUpxi) return res.status(200).json(getPost);

                return res.status(404).json({ message: 'Unauthorized access!' });
            case 'onlyMe':
                if (getPost['creator'] !== userId) return res.status(404).json({ message: 'Nothing!' });
                let prepare = {};
                for (var key of Object.keys(getPost)) {
                    const temp = CryptoJS.AES.decrypt(getPost[key], userId);
                    const original = temp.toString(CryptoJS.enc.Utf8);
                    prepare[key] = original;
                }
                return res.status(200).json(prepare);
            default: 
                return res.status(200).json(getInfo);
        }
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}