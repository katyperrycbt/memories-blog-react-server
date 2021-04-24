import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    modified: {
        type: Boolean,
        default: false
    },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    oops: {
        type: Boolean,
        default: false
    },
    visibility: {
        type: String,
        default: 'public'
    },
    creatorAvt: {
        type: String,
        default: ''
    }
});

const PostMessage = mongoose.model('PostMessage', postSchema);

export default PostMessage;