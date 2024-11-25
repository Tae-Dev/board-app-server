import { IsOptional, IsInt, IsString } from 'class-validator';

export class GetPostsQueryDto {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsOptional()
  @IsString()
  keyword?: string;

  @IsOptional()
  @IsInt()
  postTypeId?: number;
}