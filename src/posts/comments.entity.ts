import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { Post } from './posts.entity';
import * as moment from 'moment-timezone';

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

  @CreateDateColumn({
    type: 'timestamptz',
    // transformer: {
    //   to: (value: Date) => value,
    //   from: (value: string) => moment.tz(value, 'Asia/Bangkok').toDate(),
    // },
  })
  createDate: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    // transformer: {
    //   to: (value: Date) => value,
    //   from: (value: string) => moment.tz(value, 'Asia/Bangkok').toDate(),
    // },
  })
  updateDate: Date;

  @ManyToOne(() => Post, (post) => post.comment, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'postId' })
  post: Post;
}
