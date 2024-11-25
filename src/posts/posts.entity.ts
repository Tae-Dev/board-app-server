import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import * as moment from 'moment-timezone';
import { PostType } from 'src/master-data/post-type/posts-type.entity';
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
  userName: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  createDate: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
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
