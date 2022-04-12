import { getCustomRepository } from "typeorm"
import { ComplementsRepositories } from "../repositories/ComplementsRepositories";

class ListUserSendComplimentsService{
    async execute(user_id: string){
        const complimentsRepository = getCustomRepository(ComplementsRepositories);

        const compliments = await complimentsRepository.find({
            where: {
                user_sender: user_id
            },
            relations: [
                "userSender", "userReceiver", "tag"
            ]
        });

        return compliments;
    }
}

export { ListUserSendComplimentsService }