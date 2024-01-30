// util/mongodb.js
import { MongoClient } from 'mongodb';

const mongoUri = process.env.MONGODB_URI;
const dbName = 'test';

async function connectToMongo() {
  const client = await MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db(dbName);
  return { client, db };
}

export { connectToMongo };
