import { Request, Response } from "express";
import { ListUsersService } from "../service/ListUsersService";

class ListUsersController{
    async handle(req: Request, res: Response){
        const listUserService = new ListUsersService();

        const users = await listUserService.execute();

        return res.status(200).json(users);
    }
}

export { ListUsersController }