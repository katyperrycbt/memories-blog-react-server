import mongoose from 'mongoose';

const oopsSchema = mongoose.Schema({
    oopsMembers: { type: [String] }
});

const Oops = mongoose.model("Oops", oopsSchema);
export default Oops;