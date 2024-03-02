import jwt from 'jsonwebtoken';

const secret = 'secret';

export const createNewToken = (data) => {
    return jwt.sign({ data }, secret, { expiresIn: "1h" });
}

export const verifyToken = (token) => {
    return jwt.verify(token, secret);
}

const checkAuth = (req, res, next) => {
    try {
        if (!req.headers.authorization || typeof req.headers.authorization !== 'string') {
            return res.status(401).json({ message: "Unauthorized" });
        }

        if (typeof verifyToken(req.headers.authorization) !== 'object') {
            return res.status(401).json({ message: "Unauthorized", token: req.headers.authorization });
        }

        next();
    }

    catch (error) {
        return res.status(401).json({ message: error.message });
    }
}

export default checkAuth;
