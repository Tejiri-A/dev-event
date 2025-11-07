import mongoose from 'mongoose';

// Define the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

// Validate that the MONGODB_URI exists
if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections from growing exponentially
 * during API Route usage.
 */
interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

// Extend the global namespace to include our mongoose cache
declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

// Initialize the cached connection object
let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!global.mongoose) {
  global.mongoose = cached;
}

/**
 * Establishes a connection to the MongoDB database.
 * Reuses existing connection if available to prevent connection pool exhaustion.
 * 
 * @returns Promise resolving to the Mongoose instance
 */
async function connectDB(): Promise<typeof mongoose> {
  // Return existing connection if already established
  if (cached.conn) {
    return cached.conn;
  }

  // If no existing connection but a connection attempt is in progress, wait for it
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    // Create a new connection promise
    cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    // Wait for the connection to complete and cache it
    cached.conn = await cached.promise;
  } catch (e) {
    // If connection fails, clear the promise so it can be retried
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
