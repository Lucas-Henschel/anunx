import { MongoClient } from 'mongodb';
import url from 'url';

const MONGODB_URI = process.env.MONGODB_URI;

let cacheDb = null;

async function dbConnect() {
  if (cacheDb) {
    return cacheDb;
  }

  const client = await MongoClient.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = url.parse(MONGODB_URI).pathname.substr(1);
  const db = client.db(dbName);
  
  cacheDb = db;
  return db;
}

export default dbConnect