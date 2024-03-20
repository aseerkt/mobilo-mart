import mongoose from 'mongoose';
declare global {
  var mongoose: any; // This must be a `var` and not a `let / const`
}

const MONGODB_URI = process.env.MONGODB_URI!;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(uri?: string) {
  mongoose.set('toJSON', { getters: true });
  mongoose.set('debug', true);
  if (cached.conn) {
    console.log('👌 Using existing DB connection');
    return cached.conn;
  }
  if (!cached.promise) {
    const opts: mongoose.ConnectOptions = {
      bufferCommands: false,
    };
    cached.promise = mongoose
      .connect(uri || MONGODB_URI, opts)
      .then((mongoose) => {
        return mongoose;
      });
  }
  try {
    console.log('🔥 New DB Connection');
    cached.conn = await cached.promise;
  } catch (e) {
    console.error('DB connection failed');
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;
