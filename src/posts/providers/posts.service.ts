import {
  BadRequestException,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  public async getListPosts() {
    let posts = undefined;
    try {
      posts = await this.postsRepository.find();
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
    return posts;
  }

  public async createPost(createPostDto: CreatePostDto) {
    let post = await this.postsRepository.create(createPostDto);

    try {
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  public async updatePost(patchPostDto: PatchPostDto) {
    let post = undefined;

    try {
      post = await this.postsRepository.findOneBy({ id: patchPostDto.id });
    } catch (error) {
      throw new RequestTimeoutException();
    }

    console.log('post', post);
    

    if (!post) {
      throw new BadRequestException('The post id not exist');
    }

    // Update post
    post.title = patchPostDto.title ?? post.title;
    post.description = patchPostDto.description ?? post.description;
    post.postTypeId = patchPostDto.postTypeId ?? post.postTypeId;
    post.userName = patchPostDto.userName ?? post.userName;

    try {
      await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    return post;
  }

  public async deletePost(id: number) {
    try {
      await this.postsRepository.delete(id);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
    return { delete: true, id };
  }
}
