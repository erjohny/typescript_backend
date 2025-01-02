import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Нет доступа" });
        return;
    }
    const token = authHeader.split(" ")[1];

    try {
        const decoded = verifyToken(token);
        if (!decoded) {
            res.status(401).json({ error: "Нет доступа" });
            return;
        }
        req.user = decoded;

        next();
    } catch (err) {

    }
}