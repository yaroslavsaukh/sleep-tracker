import mongoose, { Connection } from 'mongoose';

const connectDB = async (): Promise<Connection | void> => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI!, {
      dbName: process.env.DB_NAME!,
    });

    console.log('Database was successfully connected.');
  } catch (error) {
    console.error(error);
  }
};

export = connectDB;
