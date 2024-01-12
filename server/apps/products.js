import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const allProduct = await collection.find({}).toArray();
    return res.json({
      data: allProduct,
    });
  } catch {
    return res.json({
      message: "Fetching error",
    });
  }
});

productRouter.get("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const id = new ObjectId(req.params.id);
    const product = await collection.findOne({ _id: id });
    return res.json({
      message: "Fetching Data Successfully",
      data: product,
    });
  } catch {
    return res.json({
      message: "Fetching error",
    });
  }
});

productRouter.post("/", async (req, res) => {
  try {
    const collection = db.collection("products");
    const { name, price, image, description, category } = req.body;
    if (!name || !price || !image || !description) {
      return res.status(418).json({
        message: "Missing required field",
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
  try {
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
  } catch {
    return res.json({ message: "Cannot update product" });
  }
});

productRouter.delete("/:id", async (req, res) => {
  try {
    const collection = db.collection("products");
    const id = new ObjectId(req.params.id);
    const product = await collection.deleteOne({ _id: id });
    return res.json({
      message: "Product has been deleted successfully",
    });
  } catch {
    return res.json({
      message: "Cannot Delete Product",
    });
  }
});

export default productRouter;
