import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IUserRequest {
    name: string;
    email: string;
    password: string;
    admin?: boolean;
}

class CreateUserService{
    async execute({ name, email, admin = false, password }: IUserRequest) {
        const userRepository = getCustomRepository(UsersRepositories);

        //verifica se om campo email foi preenchido
        if(!email){
            throw new Error('Email incorrect.');
        }

        //verifica se o email já existe na base de dados
        const userAlreadyExists = await userRepository.findOne({
            email,
        });

        if(userAlreadyExists){
            throw new Error('User already exists.');
        }

        const passwordHash = await hash(password, 8);

        // cria o objeto com as informações do usuário
        const user = userRepository.create({
            name,
            email,
            admin,
            password: passwordHash
        });

        // salva a requisição na base de dados
        await userRepository.save(user);

        return user;
    }
}

export { CreateUserService }