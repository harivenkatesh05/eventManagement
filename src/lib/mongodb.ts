/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseCache {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
}

let cached: MongooseCache = (globalThis as any).mongoose;

if (!cached) {
	cached = (globalThis as any).mongoose = { conn: null, promise: null };
}

export const connectDatabase = async () => {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
			maxPoolSize: 10,
			minPoolSize: 5,
			socketTimeoutMS: 45000,
			serverSelectionTimeoutMS: 5000,
		};

		console.log("Creating Mongoose connection")
		cached.promise = mongoose.connect(MONGODB_URI!, opts).then((mongoose) => {
			return mongoose;
		});
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
};

export default connectDatabase;
