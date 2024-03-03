import express, { json } from "express";
import cors from "cors";

import apiRoutes from "./api/index.js";
import extProductRoutes from "./api/extProducts.js";

const router = express.Router();

router.use(json());
router.use(cors());

router.use("/api", apiRoutes);
router.use("/ext", extProductRoutes);

export default router;
