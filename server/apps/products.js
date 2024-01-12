import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");
  const allProduct = await collection.find({}).toArray();
  return res.json({
    data: allProduct,
  });
});

productRouter.get("/:id", async (req, res) => {
  const collection = db.collection("products");
  const id = new ObjectId(req.params.id);
  const product = await collection.findOne({ _id: id });
  return res.json({
    message: "Fetching Data Successfully",
    data: product,
  });
});

productRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const { name, price, image, description, category } = req.body;
    if (!name || !price || !image || !description) {
      return res.status(418).json({
        message: "Server cannot brew a coffee.",
      });
    }
    const newProduct = {
      name: name,
      price: price,
      image: image,
      description: description,
      category: category,
    };

    const product = await collection.insertOne(newProduct);

    return res.json({
      message: "Product has been created successfully",
      data: newProduct,
    });
  } catch {
    return res.json({
      message: "Cannot create new object",
    });
  }
});

productRouter.put("/:id", async (req, res) => {
  const collection = db.collection("products");
  const id = new ObjectId(req.params.id);
  const { name, price, image, description, category } = req.body;
  const updatedProduct = {
    name: name,
    price: price,
    image: image,
    description: description,
    category: "it",
  };
  const product = await collection.updateOne(
    { _id: id },
    { $set: updatedProduct }
  );

  return res.json({ message: "Product has been updated successfully" });
});

productRouter.delete("/:id", async (req, res) => {
  const collection = db.collection("products");
  const id = new ObjectId(req.params.id);
  const product = await collection.deleteOne({ _id: id });
  return res.json({
    message: "Product has been deleted successfully",
  });
});

export default productRouter;
