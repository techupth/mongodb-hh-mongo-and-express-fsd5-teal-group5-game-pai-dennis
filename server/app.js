import { client } from "./utils/db.js";
import express from "express";
import cors from "cors";
import productRouter from "./apps/products.js";

// `cors` เป็น Middleware ที่ทำให้ Client ใดๆ ตามที่กำหนด
// สามารถสร้าง Request มาหา Server เราได้
// ในโค้ดบรรทัดล่างนี้คือให้ Client ไหนก็ได้สามารถสร้าง Request มาหา Server ได้
async function init() {
  try {
    // เชื่อมต่อ database
    await client.connect();
  } catch {
    console.log("cannot connect to the server");
  }

  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  const port = 4001;

  app.use("/products", productRouter);

  app.get("/", (req, res) => {
    res.send("Hello World! eieiza ");
  });

  app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
  });
}
init();
