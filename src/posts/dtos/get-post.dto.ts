import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { CreateCommentDto } from "./create-comment.dto";

export class GetPostDto  {
    @IsOptional()
    @IsString()
    keyword?: string;
}