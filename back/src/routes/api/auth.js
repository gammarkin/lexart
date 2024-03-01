import { Router } from "express";
import { Auth } from '../../models/index.js';
import { hashPassword, comparePassword } from "../../utils/hash.js";


const router = Router();

router.post("/register", async (req, res) => {
    const body = req.body || {}

    await Auth.create({ ...body, password: hashPassword(body.password) });

    res.status(200).json({ ok: true });
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    const user = await Auth.findOne({ where: { email } });
    const hashedPassword = user.password;

    const isPasswordValid = await comparePassword(password, hashedPassword);

    if (!isPasswordValid) {
        return res.status(401).json({
            message: "Invalid email or password",
        });
    }

    res.status(200).json({
        ok: true,
    });
});

export default router