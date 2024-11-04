import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: 'exchange_rate'})
export class ExchangeRateEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({nullable: true, name: 'numCode'})
    NumCode: string;

    @Column({nullable: true, name: 'charCode'})
    CharCode: string; 
    
    @Column({nullable: true, name: 'nominal'})
    Nominal: string;
    
    @Column({nullable: true, name: 'name'})
    Name: string;

    @Column({nullable: true, name: 'value'})
    Value: string;

    @Column({nullable: true, name: 'vunitRate'})
    VunitRate: string;   

    @CreateDateColumn()
    createdAt: Date;

}