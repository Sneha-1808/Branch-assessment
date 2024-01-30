import mongoose from 'mongoose';

async function connectDB() {
  try {
    await mongoose.connect('mongodb://localhost:27017/customermessages', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
}

export default connectDB;
