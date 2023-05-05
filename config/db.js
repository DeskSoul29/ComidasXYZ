import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";

try {
  const db = await mongoose.connect(MONGODB_URI);
  console.log("Connected to MongoDB 👋 BD Name: ", db.connection.name);
} catch (error) {
  console.error(error);
}

mongoose.connection.on("Connected", () => {
  console.log("Mongoose is connected");
});

mongoose.connection.on("Disconnected", () => {
  console.log("Mongoose is Disconnected");
});