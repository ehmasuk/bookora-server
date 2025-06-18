import mongoose from "mongoose";

const connectDb = () => {
  return mongoose.connect(process.env.MONGO_CONNECTION_URL, { dbName: process.env.DB_NAME });
};

export default connectDb;
