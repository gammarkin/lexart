import express from "express";
import cors from "cors";

import authRoutes from "./auth.js";
import productRoutes from "./products.js";

const corsOptions = {
    origin: ["http://localhost:3001", "http://127.0.0.1:3001", 'https://lexart-lilac.vercel.app/'],
    credentials: true,
};

const router = express.Router();

const corsMiddleware = cors(corsOptions);

router.use(corsMiddleware); // protect routes from outside requests
router.use(productRoutes, authRoutes);

export default router;
