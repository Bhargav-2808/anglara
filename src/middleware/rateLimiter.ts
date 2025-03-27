import rateLimit from "express-rate-limit";
import { Request, Response } from "express";

export const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 100, 
    standardHeaders: 'draft-7', 
    legacyHeaders: false,
    handler: (req: Request, res: Response) => {
        return res.status(429).json({
            error: {
                code: 429,
                message: "Too Many Requests: You have exceeded your request limit."
            }
        });
    }
});
