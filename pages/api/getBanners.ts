import connectToDB from "@/lib/mongo";
import clientPromise from "@/lib/mongo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getBanners(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await connectToDB();
    const db = client.db("test");
    const data = await db.collection("banners").find({}).toArray();
    res.json(data);
  } catch (e) {
    console.log(e, "Failed to retrieve data");
    throw new Error(String(e)).message;
  }
}
