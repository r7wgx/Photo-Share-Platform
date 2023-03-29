import mongoose from 'mongoose';

const {Schema} = mongoose;

const photoSchema = new Schema({
    name: String,
    description: String,
    uploadedTime: {
        type: Date,
        default: Date.now
    }
})


const photo = mongoose.model("photoDB", photoSchema);

export default photo;