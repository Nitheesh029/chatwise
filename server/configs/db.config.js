import mongoose from "mongoose";
import { DB_URI } from "./env.config.js";

if (!DB_URI) {
  throw new error("DB_URI is not defined in the env variables");
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("Database connection successful");
  } catch (error) {
    console.error("Database connection unsuccessful:", error);
  }
};

export default connectToDatabase;
