import { MongoClient, MongoClientOptions } from "mongodb";
// import dotenv from "dotenv";

// dotenv.config();

const uri =
  "mongodb+srv://kelechukwuchristwin:Lryx35ymLgczfXJ@michael.fqimwas.mongodb.net/test";
const options: MongoClientOptions = {};

let clientPromise: Promise<MongoClient> | null = null; // Store the client promise

async function connectToDB() {
  if (!uri) {
    throw new Error("MongoDB connection string is not defined");
  }

  if (!clientPromise) {
    const client = new MongoClient(uri, options);
    clientPromise = client.connect(); // Cache the client promise
  }

  return await clientPromise;
}

export default connectToDB;
