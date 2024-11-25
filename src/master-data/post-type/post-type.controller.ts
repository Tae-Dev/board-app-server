import { Controller, Get } from '@nestjs/common';
import { PostTypeService } from './providers/post-type.service';

@Controller('post-type')
export class PostTypeController {
  constructor(private readonly postTypeService: PostTypeService) {}

  @Get()
  public async get() {
    return this.postTypeService.getPostType();
  }
}
