import { Router } from "express";
import { Products } from '../../models/index.js';


import checkAuth from "../../middlewares/checkAuth.js";
import cors from "cors";

const router = Router();
router.use(cors());

router.get("/products", checkAuth, async (req, res) => {
    const products = await Products.findAll();

    res.status(200).json({ products });
});

router.get("/products/:id", checkAuth, async (req, res) => {
    const productId = req.params.id;
    const product = await Products.findByPk(productId);

    res.status(200).json({ product });
});

router.post("/products", checkAuth, async (req, res) => {
    await Products.create(req.body);

    res.status(200).json({ ok: true });
});

export default router
