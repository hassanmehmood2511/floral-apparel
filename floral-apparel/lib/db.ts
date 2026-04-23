/**
 * Purpose: MongoDB database connection utility with global caching
 * Author: [Author Placeholder]
 * Date: [Date Placeholder]
 */
import mongoose from 'mongoose';

/**
 * Connects to the MongoDB database using Mongoose.
 * Uses a global cache to prevent multiple connections during hot reloading in development.
 * Logs the connection success or error explicitly.
 *
 * @returns {Promise<typeof mongoose>} A promise that resolves to the connected Mongoose instance.
 */
export async function connectDB(): Promise<typeof mongoose> {
  const MONGODB_URI = process.env.MONGODB_URI;

  if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
  }

  // Use a global variable to cache the Mongoose connection in development
  // This avoids creating multiple connections during hot reloading
  let cached = (global as any).mongoose;

  if (!cached) {
    cached = (global as any).mongoose = { connection: null, promise: null };
  }

  if (cached.connection) {
    return cached.connection;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongooseInstance) => {
        console.log('Successfully connected to MongoDB.');
        return mongooseInstance;
      })
      .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
        throw error;
      });
  }

  try {
    cached.connection = await cached.promise;
  } catch (error) {
    cached.promise = null;
    throw error;
  }

  return cached.connection;
}
