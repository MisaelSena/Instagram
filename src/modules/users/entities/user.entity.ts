import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({unique:true})
    email: string;

    @Column({ select: false })
    password_hash: string;

    @Column({nullable:true})
    bio: string;

    @Column({ default: 0 })
    count_seguidores: number;

    @Column({ default: 0 })
    count_seguindo: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    //Falta Incluir os relacionamentos

}