import { Router } from "express";
import { Products } from '../../models/index.js';

import formatProduct from "../../utils/formatProduct.js";

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
    const product = formatProduct(req.body);

    if (Array.isArray(product)) {
        await Promise.all(product.map(prod => Products.create(prod)));

        return res.status(200).json({ ok: true });
    }

    await Products.create(product);

    res.status(200).json({ ok: true });
});

export default router
