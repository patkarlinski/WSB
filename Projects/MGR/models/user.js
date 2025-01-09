import { Schema, model } from 'mongoose';
import mongoose from 'mongoose';

userSchema.statics.generateNextId = async function () {
    const users = await this.find({}, { id: 1 }).sort({ id: 1 });
    const existingIds = users.map(user => user.id);

    for (let i = 1; i <= existingIds.length + 1; i++) {
        if (!existingIds.includes(i)) {
            return i;
        }
    }
};

//create schema
const userSchema = new Schema({
    id: { 
        type: Number,
        required: true,
        unique: true
    },
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
const User = mongoose.model('User', userSchema);

export default User;