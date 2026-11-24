import mongoose from 'mongoose';

type MongooseCache = {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
};

// Reuse the connection across hot reloads in development and across
// serverless invocations so we never exhaust the Atlas connection pool.
const globalWithMongoose = globalThis as typeof globalThis & {
  mongoose?: MongooseCache;
};

const cached: MongooseCache =
  globalWithMongoose.mongoose ?? { conn: null, promise: null };

globalWithMongoose.mongoose = cached;

/**
 * Connect to MongoDB (cached).
 *
 * The URI is read at call time from the server-only `MONGODB_URI` variable —
 * never a `NEXT_PUBLIC_` variable, which Next.js would inline into the client
 * bundle and leak the database credentials.
 */
async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    const uri = process.env.MONGODB_URI;

    if (!uri) {
      throw new Error('Please define the MONGODB_URI environment variable');
    }

    cached.promise = mongoose
      .connect(uri, { maxPoolSize: 10, serverSelectionTimeoutMS: 5000 })
      .catch((error) => {
        // Do not cache a failed connection: allow the next request to retry.
        cached.promise = null;
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
