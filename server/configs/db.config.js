import { DB_URI } from "./env.config.js";
import mongoose from "mongoose";

if (!DB_URI) {
  throw new Error("DB_URI is not defined in environment variables");
}

const connectToDatabase = async () => {
  try {
    console.log("🔄 Attempting to connect to MongoDB...");

    await mongoose.connect(DB_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    });

    console.log("✅ MongoDB connected successfully");
    console.log("📊 Database:", mongoose.connection.name);
  } catch (error) {
    console.error("❌ Failed to connect to the database:");
    console.error("Error name:", error.name);
    console.error("Error message:", error.message);

    if (error.message.includes("ECONNREFUSED")) {
      console.error("\n🔍 Troubleshooting steps:");
      console.error("1. Check your internet connection");
      console.error(
        "2. Verify your IP is whitelisted in MongoDB Atlas (0.0.0.0/0)",
      );
      console.error("3. Check if your cluster is active (not paused)");
      console.error("4. Verify your connection string is correct");
    }

    process.exit(1);
  }
};

// Connection events
mongoose.connection.on("disconnected", () => {
  console.log("⚠️  MongoDB disconnected");
});

mongoose.connection.on("error", (err) => {
  console.error("❌ MongoDB connection error:", err);
});

export default connectToDatabase;
