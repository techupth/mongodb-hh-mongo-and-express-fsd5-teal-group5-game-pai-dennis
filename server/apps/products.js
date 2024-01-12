import { Router } from "express";
import { db } from "../utils/db.js";
import { ObjectId } from "mongodb";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("Products");

  const productData = await collection
    .find({ })
    .limit(10)
    .toArray();

  return res.json({ data: productData });
});

productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("Products");

  const productId = new ObjectId(req.params.id);

  const productData = await collection
    .find({ _id: productId })
    .toArray();



  return res.json({ data: productData[0] });
});

productRouter.post("/", async (req, res) => {
  const collection = db.collection("Products");

  const productData = { ...req.body };

  const products = await collection.insertOne(productData);

  console.log(products);

  return res.json({
    message: `Product record (${products.insertedId}) has been created successfully`,
  });
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("Products");
  const inputData = { ...req.body };
  const productId = new ObjectId(req.params.id);

  await collection.updateOne(
    {
      _id: productId,
    },
    {
      $set: inputData,
    }
  );

  return res.json({
    message: `Product record (${productId}) has been updated successfully`,
  });
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("Products");
  const productId = new ObjectId(req.params.id);

  await collection.deleteOne({ _id: productId });

  return res.json({
    message: `Product record (${productId}) has been deleted successfully`,
  });
});

export default productRouter;
