import mongoose from 'mongoose'


const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/mydatabase', { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Sucesfull connnect with MongoDB !');
    } catch (err) {
        console.error('Error while connecting to MongoDB:', err);
    }

    // Event handle
    mongoose.connection.on('disconnected', () => {
        console.log('The connection to MongoDB has been disconnected.');
    });

    mongoose.connection.on('reconnected', () => {
        console.log('The connection to MongoDB has been re-established.');
    });
};

export default connectToDatabase;
