import { Router } from "express";
import { Auth } from '../../models/index.js';
import { hashPassword, comparePassword } from "../../utils/hash.js";
import { createNewToken, verifyToken } from '../../middlewares/checkAuth.js'


const router = Router();

router.post("/get/token", async (req, res) => {
    return res.status(200).json({ token: createNewToken(req.body) });
});

router.post("/check/token", async (req, res) => {
    try {
        const token = req.body.token;

        const isTokenValid = typeof verifyToken(token) === "object";

        if (!isTokenValid) {
            return res.status(401).json({
                message: "Invalid token",
            });
        }

        return res.status(200).json({ message: "Token is valid" });
    } catch {
        return res.status(401).json({
            message: "Invalid token",
        });
    }
});

router.post("/register", async (req, res) => {
    const body = req.body || {}

    await Auth.create({ ...body, password: await hashPassword(body.password) });

    res.status(200).json({ token: createNewToken(body) });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await Auth.findOne({ where: { email } });

    if (!user) {
        Auth.create({ email, password: await hashPassword(password) });

        return res.status(200).json({
            token: createNewToken({ email, password }),
            created: true,
        });
    }

    const hashedPassword = user.password;

    const isPasswordValid = await comparePassword(password, hashedPassword);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }

    res.status(200).json({
        token: createNewToken({ email, password }),
        created: false,
    });
});

export default router