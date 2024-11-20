import { IsInt, IsNotEmpty } from 'class-validator';
import { CreatePostDto } from './create-post.dto';

export class PatchPostDto extends CreatePostDto {
  @IsInt()
  @IsNotEmpty()
  id: number;
}
