import { getCustomRepository } from "typeorm"
import { ComplementsRepositories } from "../repositories/ComplementsRepositories";

class ListUserReceiveComplimentsService{
    async execute(user_id: string){
        const complimentsRepository = getCustomRepository(ComplementsRepositories);

        const compliments = await complimentsRepository.find({
            where: {
                user_receiver: user_id
            },
            relations: [
                "userSender", "userReceiver", "tag"
            ]
        });

        return compliments;
    }
}

export { ListUserReceiveComplimentsService }