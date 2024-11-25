import { Module } from '@nestjs/common';
import { PostTypeService } from './providers/post-type.service';
import { PostTypeController } from './post-type.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from 'src/posts/posts.entity';
import { PostType } from './posts-type.entity';

@Module({
  controllers: [PostTypeController],
  providers: [PostTypeService],
  exports: [PostTypeService],
  imports: [TypeOrmModule.forFeature([Post, PostType])],
})
export class PostTypeModule {}
