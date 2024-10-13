import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import regRouter from "./router/regRouter.js";
import prodRouter from "./router/prodRouter.js";
import orderRouter from "./router/orderRouter.js";
import categoriesRouter from "./router/categoriesRouter.js";
import orderPostRouter from "./router/orderPostRouter.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Connected..."));
app.get("/", (req, res) => {
  res.json("hello");
});
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"], // Add your frontend's URL here
    methods: ["GET", "POST", "PUT", "DELETE"], // Allow the necessary HTTP methods
    credentials: true, // If you are using cookies or sessions
  })
);
app.use(express.json());
app.use(orderRouter);
app.use(regRouter);
app.use(prodRouter);
app.use(categoriesRouter);
app.use(orderPostRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server up and running on port ${PORT}...`));
