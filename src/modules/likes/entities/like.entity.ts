import { Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("likes")
export class Like{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    post_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;    
}