import { ObjectId } from "mongodb";
import { db } from "../utils/db.js";
import { Router } from "express";

const productRouter = Router();

productRouter.get("/", async (req, res) => {
  const collection = db.collection("products");
  const keywords = req.query.keywords;
  const category = req.query.category;
  const page = Number(req.query.page);
  const limit = Number(req.query.limit) || 5;
  //

  const query = {};
  const skip = page * limit;
  if (keywords) {
    query.name = new RegExp(keywords, "i");
  }
  if (category) {
    query.category = category;
  }

  try {
    const allProduct = await collection
      .find(query)
      .skip(skip)
      .limit(limit)
      .toArray();
    const totalProduct = await collection.find(query).toArray();
    const totalPage = Math.ceil(totalProduct.length / limit);
    return res.json({
      data: allProduct,
      totalPage: totalPage,
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
    if (!name || !price || !image || !description || !category) {
      return res.status(418).json({
        message: "Missing required field",
      });
    }
    const date = new Date();
    const newProduct = {
      name: name,
      price: Number(price),
      image: image,
      description: description,
      category: category,
    };

    const product = await collection.insertOne({
      ...newProduct,
      created_at: new Date(),
    });

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
    category: category,
    updated_time: new Date(),
  };
  try {
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
