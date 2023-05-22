import connectToDB from "@/lib/mongo";
import clientPromise from "@/lib/mongo";
import { NextApiRequest, NextApiResponse } from "next";

export default async function getProduct(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const params = req.query;
  console.log("Requested slug:", params.slug);

  try {
    const client = await connectToDB();
    const db = client.db("test");
    const data = await db.collection("products").findOne({ slug: params.slug });

    if (data) {
      // console.log("Retrieved data:", data);
      res.status(200).json(data);
    } else {
      console.log("Product not found");
      res.status(404).json({ error: "Product not found" });
    }
  } catch (e) {
    console.log("Failed to retrieve data:", e);
    res.status(500).json({ error: "An error occurred" });
  }
}
