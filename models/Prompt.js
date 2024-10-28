import { Schema, model, models } from 'mongoose';
import mongoose from 'mongoose';

const promptSchema = new Schema({
    creator:{
        type:mongoose.Schema.Types.ObjectId, //type of the prompt (e.g. story, poem, etc.)
        ref: 'User' //one to many relationship with the user model i.e one user can have many prompts
    },
    prompt:{
        type: String,
        required: [true, 'Prompt is required!'],
    },
    tag:{
        type: String,
        requried: [true,'Tag is required!']
    }
});

const Prompt = models.Prompt || model("Prompt", promptSchema); //if the model already exists, use it, otherwise create a new model

export default Prompt;
