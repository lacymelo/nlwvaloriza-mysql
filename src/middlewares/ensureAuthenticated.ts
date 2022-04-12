import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
require('dotenv').config();

interface IEnsureAuthenticated{
    sub: string;
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction){
    //receber  o token
    const authToken = req.headers.authorization;

    //validar se o authToken está preenchido
    if(!authToken){
        return res.status(401).end();
    }

    //validar se token é válido
    const [, token ] = authToken.split(' ');

    try {
        const { sub } = verify(token, process.env.KEY_SECRET) as IEnsureAuthenticated;
        //Recuperar informações do usuário
        req.user_id = sub;
        return next();
    } catch (error) {
        return res.status(401).end();
    }
}