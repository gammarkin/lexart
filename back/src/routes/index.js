import express from "express";
import { json } from "express";
import apiRoutes from "./api/index.js";

const router = express.Router();

router.use(json());
router.use("/api", apiRoutes);

export default router;
