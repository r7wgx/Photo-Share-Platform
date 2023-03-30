import mongoose from 'mongoose';

const {Schema} = mongoose;

const photoSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
        trim: true,
      },
    uploadedTime: {
        type: Date,
        default: Date.now
    }
})


const photo = mongoose.model("photoDB", photoSchema);

export default photo;