import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './posts.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  comment: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  userNameComment: string;

  @CreateDateColumn()
  createDate: Date;

  @ManyToOne(() => Post, (post) => post.comment, { onDelete: 'CASCADE'})
  @JoinColumn({ name: 'postId' })
  post: Post
}
