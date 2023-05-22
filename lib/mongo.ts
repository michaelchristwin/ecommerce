import { MongoClient, MongoClientOptions } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.ATLAS_URL;
const options: MongoClientOptions = {
  maxPoolSize: 10,
};
async function connectToDB() {
  if (!uri) {
    throw new Error("MongoDB connection string is not defined");
  }
  const client = new MongoClient(uri, options);
  let clientPromise: Promise<MongoClient>;

  if (process.env.NODE_ENV !== "production") {
    if (!(global as any)._mongoClientPromise) {
      (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
  } else {
    clientPromise = client.connect();
  }
  return await clientPromise;
}

export default connectToDB;
