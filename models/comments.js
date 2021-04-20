import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    postId: String,
    commentId: String,
    comment: String,
    hearts: {
        type: [String],
        default: []
    },
    modified: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

const Comments = mongoose.model('Comments', postSchema);

export default Comments;