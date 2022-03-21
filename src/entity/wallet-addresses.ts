import { Entity, Column, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(["UserId"])
@Unique(["WalletAddress"])
export class WalletAddress {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        length: 100
    })
    UserId: string;

    @Column({
        length: 100
    })
    WalletAddress: string;

    @Column()
    isGroupJoined: boolean;
}