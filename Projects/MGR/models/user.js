import { Schema, model } from 'mongoose';


//tworzenie schemy
const userSchema = new Schema({
    fisrtName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true,
        min: 0
    },
    email: {
        type: String,
        required: true,
    }
});

//Kompilowanie modelu


export default model('User', userSchema)