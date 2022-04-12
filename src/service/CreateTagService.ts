import { getCustomRepository, getRepository } from "typeorm";
import { TagsRepositories } from "../repositories/TagsRepositories";

class CreateTagService{
    async execute(name: string) {
        const tagRepository = getCustomRepository(TagsRepositories);

        //verifica se o campo tag está vazio
        if(!name){
            throw new Error('Tag incorrect.');
        }

        //verifica se a teg existe na base de dados
        const tagAlreadyExists = await tagRepository.findOne({
            name
        });

        if(tagAlreadyExists){
            throw new Error('Tag already exists.');
        }

        const tag = tagRepository.create({
            name
        });

        await tagRepository.save(tag);

        return tag;
    }
}

export { CreateTagService };