import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostType } from '../posts-type.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostTypeService {
   
    constructor(
        @InjectRepository(PostType)
        private readonly postTypeRepository: Repository<PostType>
    ) {}

    public async getPostType () {
        let postType = undefined;
        try {
            postType = await this.postTypeRepository.find()
        } catch (error) {
            throw new RequestTimeoutException(error);
        }

        return postType
    }
}
