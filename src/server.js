import express from "express";
import dotenv from "dotenv";
import cors from "cors";
// import { sql } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";
import transactionRoute from "./routes/transactionRoute.js";
import { initDB } from "./config/db.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(rateLimiter);

app.use(express.json());
app.use("/api/transactions", transactionRoute);
const PORT = process.env.PORT || 8080;

initDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
