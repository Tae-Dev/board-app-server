import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../posts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDto } from '../dtos/create-post.dto';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { Comment } from '../comments.entity';
import { PatchCommentDto } from '../dtos/patch-comment.dto';
import { DeleteCommentDto } from '../dtos/delete-comment.dto';
import { DeletePostDto } from '../dtos/delete-post.dto';
import { GetPostDto } from '../dtos/get-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,

    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
  ) {}

  public async getListPosts() {
    let posts = undefined;
    try {
       posts = await this.postsRepository
      .createQueryBuilder('post')
      .leftJoin('post.comment', 'comment')
      .leftJoin('post.postType', 'postType')
      .loadRelationCountAndMap('post.commentCount', 'post.comment')
      .select([
        'post.id',
        'post.title',
        'post.description',
        'post.userName',
        'post.createDate',
        'post.updateDate',
        'postType.id',
        'postType.title',
      ])
      .orderBy('post.updateDate', 'DESC')
      .getMany();
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
    return posts;
  }

  public async searchPostsByKeyword(keyword: string) {
    const posts = await this.postsRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.postType', 'postType')
      .where('post.title LIKE :keyword', { keyword: `%${keyword}%` })
      .select([
        'post.id',
        'post.title',
        'post.description',
        'post.userName',
        'post.createDate',
        'post.updateDate',
        'postType.id',
        'postType.title',
      ])
      .orderBy('post.updateDate', 'DESC')
      .getMany();
  
    return posts;
  }

  public async getPostById(id: number) {
    const post = await this.postsRepository
    .createQueryBuilder('post')
    .leftJoinAndSelect('post.postType', 'postType')
    .leftJoinAndSelect('post.comment', 'comment')
    .where('post.id = :id', { id })
    .orderBy('comment.updateDate', 'DESC')
    .select([
      'post.id',
      'post.title',
      'post.description',
      'post.userName',
      'post.createDate',
      'post.updateDate',
      'postType.id',
      'postType.title',
      'comment.id',
      'comment.comment',
      'comment.userNameComment',
      'comment.createDate',
      'comment.updateDate',
    ])
    .getOne();
  
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
  
    return post;
  }

  public async getPostsById(id: number) {
    let posts = undefined;
    try {
       posts = await this.postsRepository.findOne({
        where: {id: id},
        relations: ['postType']
       })

    } catch (error) {
      throw new RequestTimeoutException(error);
    }
    return posts;
  }

  public async createPost(createPostDto: CreatePostDto) {
    const post = await this.postsRepository.create(createPostDto);

    try {
      return await this.postsRepository.save(post);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  public async updatePost(patchPostDto: PatchPostDto) {
    let post = undefined;
    let isEdit = undefined;

    try {
      post = await this.postsRepository.findOneBy({ id: patchPostDto.id });
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    if (!post) {
      throw new BadRequestException('The post id not exist');
    }

    try {
      isEdit = await this.postsRepository.findOneBy({
        userName: patchPostDto.userName,
      });
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    if (!isEdit) {
      throw new BadRequestException('Unable to edit post');
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

  public async deletePost(id: number, deletePostDto: DeletePostDto) {
    let isDelete = undefined;

    try {
      isDelete = await this.postsRepository.findOneBy({
        userName: deletePostDto.userName,
      });
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    if (!isDelete) {
      throw new BadRequestException('Unable to delete post');
    }

    try {
      await this.postsRepository.delete(id);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
    return { delete: true, id };
  }

  public async createCommentPost(createCommentDto: CreateCommentDto) {
    let post = undefined;
    try {
      // Find Post
      post = await this.postsRepository.findOneBy({
        id: createCommentDto.postId,
      });
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    const comment = new Comment();
    comment.comment = createCommentDto.comment;
    comment.userNameComment = createCommentDto.userName;
    comment.post = post;

    try {
      return this.commentRepository.save(comment);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }

  public async updateComment(patchCommentDto: PatchCommentDto) {
    let comment = undefined;
    let isEdit = undefined;

    try {
      comment = await this.commentRepository.findOneBy({
        id: patchCommentDto.id,
      });
    } catch (error) {
      throw new RequestTimeoutException();
    }

    if (!comment) {
      throw new BadRequestException('The comment id not exist');
    }

    try {
      isEdit = await this.commentRepository.findOneBy({
        userNameComment: patchCommentDto.userName,
      });
    } catch (error) {
      throw new RequestTimeoutException();
    }

    if (!isEdit) {
      throw new BadRequestException('Unable to edit comments');
    }

    // Update comment
    comment.comment = patchCommentDto.comment ?? comment.comment;

    try {
      await this.commentRepository.save(comment);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    return comment;
  }

  public async deleteComment(id: number, deleteCommentDto: DeleteCommentDto) {
    let isDelete = undefined;
    try {
      isDelete = await this.commentRepository.findOneBy({
        userNameComment: deleteCommentDto.userName,
      });
    } catch (error) {
      throw new RequestTimeoutException(error);
    }

    if (!isDelete) {
      throw new BadRequestException('Unable to delete comments');
    }

    try {
      await this.commentRepository.delete(id);
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
    return { delete: true, id };
  }
}
