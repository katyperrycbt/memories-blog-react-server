import mongoose from 'mongoose';

const subcribeSchema = mongoose.Schema({
    emailList: { type: [String] }
});

const Subcribe = mongoose.model("Subcribe", subcribeSchema);

export default Subcribe;