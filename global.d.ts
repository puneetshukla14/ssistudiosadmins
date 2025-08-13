// global.d.ts
// This file might be in your project root or a 'types' folder
import { Mongoose } from 'mongoose'; 

declare global {
  namespace NodeJS {
    interface Global {
      mongoose: {
        conn: Mongoose | null;
        promise: Promise<Mongoose> | null;
      };
    }
  }
}