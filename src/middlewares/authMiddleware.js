import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // corrigido para split por espaço

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided!" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;   // userId e role estarão aqui, conforme seu token
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" }); 
    }
}