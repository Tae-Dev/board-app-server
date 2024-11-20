import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostType } from './posts-type.entity';
import { PostsController } from './posts.controller';
import { Post } from './posts.entity';
import { PostsService } from './providers/posts.service';
import { Comment } from './comments.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  exports: [PostsService],
  imports: [TypeOrmModule.forFeature([Post, PostType, Comment])],
})
export class PostsModule {}
