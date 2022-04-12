import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

async function ensureAdmin(request: Request, response: Response, next: NextFunction){
    //recuperar o id do usuário logado
    const { user_id } = request;

    const userRepository = getCustomRepository(UsersRepositories)

    if(!user_id){
        throw new Error("User does not authenticated.")
    }

    const { admin } = await userRepository.findOne(user_id)

    if(admin){
        return next()
    }

    return response.status(401).json({
        error: "Unauthorized"
    })
}

export { ensureAdmin }