import express, { json } from "express";

import apiRoutes from "./api/index.js";
import extProductRoutes from "./api/extProducts.js";

const router = express.Router();

router.use(json());

router.use("/api", function (_req, res, next) {
    res.header("Access-Control-Allow-Origin", 'https://lexart-lilac.vercel.app');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
}, apiRoutes);
router.use("/ext", extProductRoutes);

export default router;
