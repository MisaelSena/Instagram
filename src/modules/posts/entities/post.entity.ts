import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")

export class Post{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image_url: string;

    @Column()
    subtitle: string;

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