import express from "express";
import { type Request, type Response } from "express";
import cors from "cors";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello" });
});

app.listen(3001, () => {
  console.log("Server is listening on localhost:3001");
});
