import express from "express";
// import { sql } from "../config/db.js";

import {
  getTransactionByUserId,
  deleteTransactionById,
  getTransactionSummaryByUserId,
  createTransaction,
  getLast10TransactionsByUserId,
} from "../controllers/transactionControllers.js";

const router = express.Router();

router.get("/:userId", getTransactionByUserId);

router.delete("/:id", deleteTransactionById);

router.post("/", createTransaction);

router.get("/summary/:userId", getTransactionSummaryByUserId);

router.get("/last10/:userId", getLast10TransactionsByUserId);

export default router;
