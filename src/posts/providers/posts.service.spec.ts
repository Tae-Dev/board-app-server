import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../posts.entity';
import { Comment } from '../comments.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { RequestTimeoutException } from '@nestjs/common';
import { PatchPostDto } from '../dtos/patch-post.dto';

describe('PostsService', () => {
  let service: PostsService;
  let postRepository: Repository<Post>;
  let commentRepository: Repository<Comment>;

  const mockPostRepository = {
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    findOneBy: jest.fn(),
    delete: jest.fn(),
  };

  const mockCommentRepository = {
    findOneBy: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useValue: mockPostRepository,
        },
        {
          provide: getRepositoryToken(Comment),
          useValue: mockCommentRepository,
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    postRepository = module.get<Repository<Post>>(getRepositoryToken(Post));
    commentRepository = module.get<Repository<Comment>>(
      getRepositoryToken(Comment),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createPost', () => {
    it('should create and save a post', async () => {
      const dto: CreatePostDto = {
        title: 'Valid Title',
        description: 'Optional Description',
        postTypeId: 1,
        userName: 'testuser',
      };
      const createdPost = { id: 1, ...dto };

      mockPostRepository.create.mockReturnValue(createdPost);
      mockPostRepository.save.mockResolvedValue(createdPost);

      const result = await service.createPost(dto);

      expect(postRepository.create).toHaveBeenCalledWith(dto);
      expect(postRepository.save).toHaveBeenCalledWith(createdPost);
      expect(result).toEqual(createdPost);
    });
  });

  describe('updatePost', () => {
    it('should update an existing post', async () => {
      const dto: PatchPostDto = {
        id: 1,
        title: 'Updated Title',
        description: 'Optional Description',
        postTypeId: 1,
        userName: 'testuser',
      };
      const existingPost = {
        id: 1,
        title: 'Old Title',
        description: 'Optional Description',
        postTypeId: 1,
        userName: 'testuser',
      };

      mockPostRepository.findOneBy
        .mockResolvedValueOnce(existingPost)
        .mockResolvedValueOnce(existingPost);

      mockPostRepository.save.mockResolvedValue({ ...existingPost, ...dto });

      const result = await service.updatePost(dto);

      expect(postRepository.findOneBy).toHaveBeenCalledTimes(2);
      expect(postRepository.save).toHaveBeenCalledWith({
        ...existingPost,
        ...dto,
      });
      expect(result).toEqual({ ...existingPost, ...dto });
    });
  });
});
