import {
  Body,
  Controller,
  Delete,
  Get,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { PatchCommentDto } from './dtos/patch-comment.dto';
import { DeleteCommentDto } from './dtos/delete-comment.dto';
import { DeletePostDto } from './dtos/delete-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public async getList() {
    return this.postsService.getListPosts();
  }

  @Post()
  public async create(@Body() createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Patch()
  public async edit(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.updatePost(patchPostDto);
  }

  @Delete()
  public async deletePost(@Query('id', ParseIntPipe) id: number, @Body() deletePostDto: DeletePostDto) {
    return this.postsService.deletePost(id, deletePostDto);
  }

  @Post('/comment')
  public async createComment(@Body() createCommentDto: CreateCommentDto) {
    return this.postsService.createCommentPost(createCommentDto);
  }

  @Patch('/comment')
  public async editComment(@Body() patchCommentDto: PatchCommentDto) {
    return this.postsService.updateComment(patchCommentDto);
  }

  @Delete('/comment')
  public async deleteComment(@Query('id', ParseIntPipe) id: number, @Body() deleteCommentDto: DeleteCommentDto) {
    return this.postsService.deleteComment(id, deleteCommentDto)
  }
}