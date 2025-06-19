import express from "express";
import { askAi } from "../controllers/askAiController.js";

const router = express.Router();

router.post("/", askAi);

export default router;
