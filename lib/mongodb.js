import { MongoClient } from 'mongodb';

let client;
let clientPromise;

const uri = process.env.MONGODB_URI;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env.local');
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect()
      .then(() => {
        console.log('✅ MongoDB connected successfully');
        return client;
      })
      .catch((error) => {
        console.error('❌ MongoDB connection error:', error);
        throw error;
      });
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect()
    .then(() => {
      console.log('✅ MongoDB connected successfully');
      return client;
    })
    .catch((error) => {
      console.error('❌ MongoDB connection error:', error);
      throw error;
    });
}

export default clientPromise;
