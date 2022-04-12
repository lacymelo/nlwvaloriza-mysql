import {Entity, PrimaryColumn, Column, CreateDateColumn} from "typeorm";
import { v1 as uuid } from 'uuid';

import { Expose } from "class-transformer";

@Entity('tags')
class Tag{
    @PrimaryColumn()
    readonly id: string;

    @Column()
    name: string;

    @CreateDateColumn()
    created_at: Date;

    @CreateDateColumn()
    updated_at: Date;

    @Expose({ name: "nameCustom" })
    nameCustom(): string{
        return `#${this.name}`;
    }

    constructor(){
        /**
         * Será executado sempre que não houver id, significa que uma nova
         * tag está sendo criada, portanto um uuid será gerado.
         */

        if(!this.id){
            this.id = uuid();
        }
    }
}

export { Tag };
