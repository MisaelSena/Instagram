import { Entity } from "typeorm";

@Entity("comments")
export class Comment{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column()
    post_id: number;

    @Column()
    user_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @DeleteDateColumn()
    deleted_at: Date;

    //Falta Incluir os relacionamentos
}