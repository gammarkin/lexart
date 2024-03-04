import express from "express";
import cors from "cors";

import authRoutes from "./auth.js";
import productRoutes from "./products.js";

const corsOptions = {
    origin: [
        'https://lexart-lilac.vercel.app',
        'https://lexart-back.vercel.app',
    ],
    credentials: true,
};

const router = express.Router();

const conditionalCorsMiddleware = (req, res, next) => {
    if (req.path.includes("/api")) {
        cors(corsOptions)(req, res, next);
    } else {
        next();
    }
};

router.use(conditionalCorsMiddleware);
router.use(productRoutes, authRoutes);

export default router;
