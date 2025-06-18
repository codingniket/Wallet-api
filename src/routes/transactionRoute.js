import express from "express";
// import { sql } from "../config/db.js";

import {
  getTransactionByUserId,
  deleteTransactionById,
  getTransactionSummaryByUserId,
  createTransaction,
} from "../controllers/transactionControllers.js";

const router = express.Router();

router.get("/:userId", getTransactionByUserId);

router.delete("/:id", deleteTransactionById);

router.post("/", createTransaction);

router.get("/summary/:userId", getTransactionSummaryByUserId);

export default router;
