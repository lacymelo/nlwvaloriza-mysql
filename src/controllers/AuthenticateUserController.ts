import { Request, Response } from "express";
import { AuthenticateUserService } from "../service/AuthenticateUserService";

class AuthenticateUserController {
    async handle(req: Request, res: Response){
        const { email, password } = req.body;

        const authenticateUserService = new AuthenticateUserService();

        const user = await authenticateUserService.execute({email, password});

        return res.status(201).json(user);
    }
}

export { AuthenticateUserController };