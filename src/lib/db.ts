import mongoose from "mongoose";
let isConnected = false;
const connectDB = async () => {
  if (isConnected) {
    console.log("Database is already connected");
    return;
  }
  try {
    const dbConnection = await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "Job-application-portal",
    });
    console.log(
      "Database successfully connected to:",
      dbConnection?.connection?.db?.databaseName
    );
    isConnected = true;
  } catch (error) {
    console.log("Error connecting to Database:", error);
  }
};
export default connectDB;
