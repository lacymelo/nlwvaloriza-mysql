import { getCustomRepository } from "typeorm";
import { ComplementsRepositories } from "../repositories/ComplementsRepositories";
import { UsersRepositories } from "../repositories/UsersRepositories";

interface IComplimentRequest{
    tag_id: string;
    user_sender: string;
    user_receiver: string;
    message: string;
}

class CreateComplimentService{
    async execute({tag_id, user_sender, user_receiver, message}: IComplimentRequest){
        const complimentRepository = getCustomRepository(ComplementsRepositories);
        const userRepository = getCustomRepository(UsersRepositories);

        if(user_sender == user_receiver){
            throw new Error("Incorrect user receiver");
        }

        //o usuário par quem vai o elogia precisa ser válido
        const userReceiverExists = await userRepository.findOne(user_receiver);

        if(!userReceiverExists){
            throw new Error("User receiver does not exists.");
        }

        const compliment = complimentRepository.create({
            tag_id,
            user_sender,
            user_receiver,
            message
        });

        await complimentRepository.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService }