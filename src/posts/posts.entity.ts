import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Comment } from './comments.entity';
import { PostType } from 'src/master-data/post-type/posts-type.entity';
import * as moment from 'moment-timezone';

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
  userName: string;

  @CreateDateColumn({
    type: 'timestamptz',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => moment.tz(value, 'Asia/Bangkok').toDate(),
    },
  })
  createDate: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    transformer: {
      to: (value: Date) => value,
      from: (value: string) => moment.tz(value, 'Asia/Bangkok').toDate(),
    },
  })
  updateDate: Date;

  @Column({
    type: 'int',
    nullable: false,
  })
  postTypeId: number

  @ManyToOne(() => PostType, (postType) => postType.posts, { nullable: false })
  postType: PostType;

  @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
  comment: Comment[];
}
