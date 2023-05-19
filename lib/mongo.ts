import { MongoClient } from "mongodb";

const uri =
  "mongodb+srv://kelechukwuchristwin:Lryx35ymLgczfXJ@michael.fqimwas.mongodb.net/test";
const options = {};
const client = new MongoClient(uri, options);
async function connectToDatabase() {
  await client.connect();
  console.log("Connected Successfully :)");
  return client;
}

export default connectToDatabase;
