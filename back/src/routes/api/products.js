import { Router } from "express";
import { Products } from '../../models/index.js';

const router = Router();

router.get("/products", async (req, res) => {
    const products = await Products.findAll();

    res.status(200).json({ products });
});

router.get("/products/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await Products.findByPk(productId);

    res.status(200).json({ product });
});

router.post("/products", async (req, res) => {
    await Products.create(req.body);

    res.status(200).json({ ok: true });
});

router.put("/products/:id", async (req, res) => {
    await Products.update(req.body, {
        where: {
            id: req.params.id,
        },
    });

    res.status(200).json({ ok: true });
});

router.delete("/products/:id", async (req, res) => {
    await Products.destroy({
        where: {
            id: req.params.id,
        },
    });

    res.status(200).json({ ok: true });
});

export default router