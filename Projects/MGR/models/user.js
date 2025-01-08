import { Schema, model } from 'mongoose';


//create schema
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    }
});

//Compiling the model
export default model('User', userSchema)