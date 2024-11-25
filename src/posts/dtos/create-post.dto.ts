import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(512)
    title: string;

    @IsOptional()
    @IsString()
    @MaxLength(512)
    description?: string;

    @IsNotEmpty()
    @IsNumber()
    postTypeId: number;

    @IsNotEmpty()
    @IsString()
    userName: string
}