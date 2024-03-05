import express from "express";
import authRoutes from "./auth.js";
import productRoutes from "./products.js";

import cors from "cors";

const router = express.Router();

const whitelist = ['https://lexart-lilac.vercel.app']

const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}

// router.use(cors(corsOptions));
router.use(cors());

router.use(productRoutes, authRoutes);

export default router;
