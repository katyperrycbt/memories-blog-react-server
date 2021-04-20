import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import mailgun from 'mailgun-js';
import Subcribe from '../models/subcribe.js';
import ClientIP from '../models/clientIP.js';

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

export const signin = async (req, res) => {
    const { email, password, ip, when } = req.body;

    try {

        const getIPObject = await ClientIP.findById(process.env.CLIENTIPS);

        let ips = getIPObject['ips'];

        let wasRecordedBefore = false;

        for (let i = 0; i < ips.length; i++) {
            if (ips[i].ip === ip) {
                ips[i].loginCount = parseInt(ips[i].loginCount) + 1;
                ips[i].latestVisitAt = when;
                wasRecordedBefore = true;
                break;
            }
        }

        if (!wasRecordedBefore) {
            let newRecord = {
                email: email,
                ip: ip,
                loginCount: 1,
                latestVisitAt: when
            }

            ips.push(newRecord);
        }

        getIPObject['ips'] = ips;

        await ClientIP.findByIdAndUpdate(process.env.CLIENTIPS, getIPObject, { new: true });

        const existingUser = await User.findOne({ email });

        if (!existingUser) return res.status(404).json({ message: "User does not exist." });

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials." });

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'MEmemories', { expiresIn: "1h" });

        res.status(200).json({ result: existingUser, token });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName, avt, ggId } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) return res.status(400).json({ message: 'User already exist.' });

        if (password !== confirmPassword) return res.status.json({ message: 'Passwords do not match.' });

        const hasedPassword = await bcrypt.hash(password, 12);
        let avtLink = '';
        await cloudinary.v2.uploader.upload(avt)
            .then((result) => {
                console.log(result.url);
                avtLink = result.url;
            }).catch((error) => {
                console.log(error);
            });

        const result = await User.create({ email, password: hasedPassword, name: `${firstName} ${lastName}`, avt: avtLink, ggId: (ggId || '') });

        const token = jwt.sign({ email: result.email, id: result._id }, 'MEmemories', { expiresIn: "1h" });

        res.status(200).json({ result, token });
    } catch (error) {

        res.status(500).json({ message: 'Something went wrong.' })

    }
}

export const getInfo = async (req, res) => {
    const { userId } = req;
    if (!userId) {
        res.status(404).json({ message: 'Unauthorized access!' });
        return;
    } else {
        try {
            let isUserExist;

            if (mongoose.Types.ObjectId.isValid(userId)) {
                isUserExist = await User.findById(userId);
            }

            const isUserGGExit = await User.findOne({ ggId: userId });

            if (isUserGGExit || isUserExist) {
                const whichReturn = isUserGGExit ? isUserGGExit : isUserExist;
                res.status(200).json(whichReturn);
                return;
            } else {
                res.status(200).json({ message: 'Google Account detected! Please create an account linked with this account to edit your information!' })
                return;
            }

        } catch (error) {
            console.log(error.message);
            res.status(500).json({ message: error.message });
        }
    }
}

export const updateInfo = async (req, res) => {
    const { userId } = req;
    const { email, oldPassword, newPassword, firstName, lastName, avt } = req.body;

    if (!userId) {
        res.status(404).json({ message: 'Unauthorized access!' });
        return;
    } else {
        try {
            let oldProfile
            if (mongoose.Types.ObjectId.isValid(userId)) {
                oldProfile = await User.findById(userId);
            } else {
                oldProfile = await User.findOne({ ggId: userId });
            }

            if (newPassword) {
                const isPasswordCorrect = await bcrypt.compare(oldPassword, oldProfile.password);

                if (!isPasswordCorrect) {
                    console.log('reach here');
                    return res.status(400).json({ message: "Old password incorrect!" })
                };

                const hashedPassword = await bcrypt.hash(newPassword, 12);
                oldProfile.password = hashedPassword;

            } else if (email) {
                const existingUser = await User.findOne({ email });

                if (existingUser && email !== oldProfile.email) {
                    console.log('reach email');
                    return res.status(400).json({ message: 'User already exist.' })
                };

                oldProfile.name = `${firstName} ${lastName}`;
                
                try {
                    const us = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.find({ ggId: req.userId });
                    if (us.info.subcribe) {
                        const subcribe = await Subcribe.findById(process.env.SUBCRIBE);
                        console.log(subcribe);
                        const subcribeFilter = subcribe.emailList.filter((email) => email !== us.email);
                        const emailForm = {
                            to: subcribeFilter,
                            subject: `[Notification] ${us.name} has just updated their profile!`,
                            html: `
                            <h1> Hi </h1>
                            <br/>
                            <h3 style="color: green;"> Details: </h3>
                            <h3 style="color: red;"> Your friend ${us.name} has just changed their information [name/email...] </h3>
                            `
                        }
                        sendMail(emailForm.to, emailForm.subject, emailForm.html);
                    }
                } catch (error) {
                    console.log(error);
                }

            } else if (avt) {
                // console.log('avt',avt);
                let avtLink = '';
                await cloudinary.v2.uploader.upload(avt)
                    .then((result) => {
                        console.log(result.url);
                        avtLink = result.url;
                    }).catch((error) => {
                        console.log(error);
                        return res.status(400).json({ message: 'Some errors with the image!' })
                    });

                oldProfile.avt = avtLink;
                try {
                    const us = mongoose.Types.ObjectId.isValid(req.userId) ? await User.findById(req.userId) : await User.find({ ggId: req.userId });
                    if (us.info.subcribe) {
                        const subcribe = await Subcribe.findById(process.env.SUBCRIBE);
                        console.log(subcribe);
                        const subcribeFilter = subcribe.emailList.filter((email) => email !== us.email);
                        const emailForm = {
                            to: subcribeFilter,
                            subject: `[Notification] ${us.name} has just updated their avatar!`,
                            html: `
                            <h1> Hi </h1>
                            <br/>
                            <h3 style="color: green;"> Details: </h3>
                            <h3 style="color: red;"> Your friend ${us.name} has just changed their avatar </h3>
                            `
                        }
                        sendMail(emailForm.to, emailForm.subject, emailForm.html);
                    }
                } catch (error) {
                    console.log(error);
                }
            }

            const updatedInfo = await User.findByIdAndUpdate(userId, oldProfile, { new: true });

            res.status(200).json(updatedInfo);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

}

export const getAVTs = async (req, res) => {
    const { userId } = req;
    if (!userId) {
        res.status(404).json({ message: 'Unauthorized access!' });
        return;
    } else {
        try {
            const userNames = await User.find();
            let setOfAVT = [];

            for (let i = 0; i < userNames.length; i++) {
                if (userNames[i].ggId?.length > 0) {
                    setOfAVT.push({ id: userNames[i].ggId, name: userNames[i].name, avt: userNames[i].avt, email: userNames[i].email });
                }
                setOfAVT.push({ id: userNames[i]._id, name: userNames[i].name, avt: userNames[i].avt, email: userNames[i].email });
            }

            return res.status(200).json(setOfAVT);

        } catch (error) {
            res.send(404).json({ message: 'NO AVTs!' });
        }
    }
}

export const toggleSubcribe = async (req, res) => {
    const { userId } = req;

    if (!userId) return res.json({ message: 'Unauthenticated' });

    try {
        let oldProfile
        if (mongoose.Types.ObjectId.isValid(userId)) {
            oldProfile = await User.findById(userId);
        } else {
            oldProfile = await User.findOne({ ggId: userId });
        }

        const subcribe = oldProfile?.info?.subcribe ? oldProfile.info.subcribe : false;

        if (subcribe === false) {
            oldProfile.info.subcribe = true;
        } else {
            oldProfile.info.subcribe = false;
        }

        const updatedProfile = await User.findByIdAndUpdate(userId, oldProfile, { new: true });

        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}