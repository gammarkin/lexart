import express from "express";

import authRoutes from "./auth.js";
import productRoutes from "./products.js";

const router = express.Router();

router.use(productRoutes, authRoutes);

export default router;
