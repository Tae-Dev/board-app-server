import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { PostType } from './posts-type.entity';
import { Comment } from './comments.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: true,
  })
  description?: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  userName: string

  @CreateDateColumn()
  createDate: Date;

  @UpdateDateColumn()
  updateDate: Date;

  @Column({
    type: 'int',
    nullable: false
  })
  postTypeId: number;

  @OneToMany(() => Comment, (comment) => comment.post, {cascade: true})
  comment: Comment[]
}
