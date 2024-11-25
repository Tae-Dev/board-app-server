import { Test, TestingModule } from '@nestjs/testing';
import { PostsController } from './posts.controller';
import { PostsService } from './providers/posts.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;

  const mockPostsService = {
    getListPosts: jest.fn(),
    createPost: jest.fn(),
    updatePost: jest.fn(),
    deletePost: jest.fn(),
    createCommentPost: jest.fn(),
    updateComment: jest.fn(),
    deleteComment: jest.fn(),
  };


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
      ],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get(PostsService) as jest.Mocked<PostsService>;
  });

  it('should be defined', () => {
    expect(postsController).toBeDefined();
  });

  describe('getList', () => {
    it('should return a list of posts', async () => {
      const postsList = [{ id: 1, title: 'Post 1' }];
      mockPostsService.getListPosts.mockResolvedValue(postsList);

      expect(await postsController.getList()).toEqual(postsList);
      expect(mockPostsService.getListPosts).toHaveBeenCalled();
    });
  });

  describe('create', () => {
    it('should create a new post with valid data', async () => {
      const dto: CreatePostDto = {
        title: 'Valid Title',
        description: 'Optional Description',
        postTypeId: 1,
        userName: 'testuser',
      };

      const createdPost = { id: 1, ...dto };
      mockPostsService.createPost.mockResolvedValue(createdPost);

      const result = await postsController.create(dto);

      expect(result).toEqual(createdPost);
      expect(mockPostsService.createPost).toHaveBeenCalledWith(dto);
    })
  })

});