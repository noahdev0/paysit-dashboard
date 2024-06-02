import mongoose, { connection } from "mongoose";

const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is not set");
    process.exit(1);
  }
  if (connection.readyState)
    return console.log("Already connected to database");
  try {
    await mongoose.connect(process.env.MONGO_URL!, {
      dbName: process.env.MONGO_DB,
      ignoreUndefined: true,
    });
    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
};

export default connectDB;
