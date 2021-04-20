import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true },
    id: { type: String },
    ggId: { type: String},
    avt: { type: String, default: ''},
    info: {
        type: Object,
        default: {}
    }
});

const User = mongoose.model("User", userSchema);
export default User;