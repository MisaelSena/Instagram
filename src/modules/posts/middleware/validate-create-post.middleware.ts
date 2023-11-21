import { NextFunction, Request, Response } from "express";

export const validateCreatePost = (req: Request, res: Response, next: NextFunction)=>{
    const {image_url,subtitle} = req.body;

    if (!image_url) {
        return res.status(400).json({ ok: false, message: "Imagem não fornecida!" });
    }

    if (!subtitle) {
        return res.status(400).json({ ok: false, message: "Legenda não fornecida!" });
    }

    next();
}