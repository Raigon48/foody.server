import express from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import myUserRoute from "./routes/myUserRoutes";
import { v2 as cloudinary } from "cloudinary";
import { myRestaurantRoute } from "./routes/myRestaurantRoute";
import { restaurantRoute } from "./routes/restaurantRoute";
import { orderRoute } from "./routes/orderRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to database");
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
  api_key: process.env.CLOUDINARY_API_KEY as string,
  api_secret: process.env.CLOUDINARY_API_SECRET as string,
});

const app = express();

app.use(cors());

app.use(
  "/api/order/checkout/webhook",
  express.raw({ type: "application/json" })
);

app.use(express.json());

app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", restaurantRoute);
app.use("/api/order", orderRoute);

app.listen(3001, () => {
  console.log("Server is listening on localhost:3001");
});
