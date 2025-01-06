import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/mydatabase';

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB successfully.');
  } catch (error: any) {
    console.error('Error connecting to MongoDB:', error.message);
    process.exit(1); // Exit with failure
  }
};

export default connectToDatabase;
