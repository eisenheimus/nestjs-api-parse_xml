import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class UsersEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: false})
    login: string;

    @Column({nullable: false})
    password: string;

    @Column({nullable: true})
    email: string;
}