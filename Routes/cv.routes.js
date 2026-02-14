import express from "express";
import { generateCVFromShortDetails } from "../Controllers/cvmaker.controller.js";

const router = express.Router();

router.post("/cv_generate", generateCVFromShortDetails);
// router.post("/generate",authMiddleware, generateMCQs);

export default router;
