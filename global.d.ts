// global.d.ts
import { Mongoose } from 'mongoose';
import { MongoClient } from 'mongodb';

declare global {
  // Mongoose global cache
  var mongoose: {
    conn: Mongoose | null;
    promise: Promise<Mongoose> | null;
  };

  // MongoDB client global cache
  var _mongoClientPromise: Promise<MongoClient>;

  // Node.js environment variables
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production' | 'test';
      MONGODB_URI: string;
      MONGODB_DB?: string;
      NEXTAUTH_URL?: string;
      NEXTAUTH_SECRET?: string;
    }
  }
}

export {};