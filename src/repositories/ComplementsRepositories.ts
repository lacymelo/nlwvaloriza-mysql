import { EntityRepository, Repository } from "typeorm";
import { Compliment } from "../entities/Compliment";

@EntityRepository(Compliment)
class ComplementsRepositories extends Repository<Compliment>{}

export { ComplementsRepositories }