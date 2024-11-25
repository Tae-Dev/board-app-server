import { IsInt, IsNotEmpty } from "class-validator";
import { CreateCommentDto } from "./create-comment.dto";

export class PatchCommentDto extends CreateCommentDto {
    @IsInt()
    @IsNotEmpty()
    id: number;
}