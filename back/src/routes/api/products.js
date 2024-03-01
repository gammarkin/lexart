import { Router } from "express";

router.get("/products", (req, res) => {
    res.status(200).json({
        message: "Products",
    });
});

router.get("/products/:id", (req, res) => {
    res.status(200).json({
        message: "Product",
    });
});

router.post("/products", (req, res) => {
    res.status(200).json({
        message: "Create product",
    });
});

router.put("/products/:id", (req, res) => {
    res.status(200).json({
        message: "Update product",
    });
});

router.delete("/products/:id", (req, res) => {
    res.status(200).json({
        message: "Delete product",
    });
});

const router = Router();

export default router