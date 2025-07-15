import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsNumber, IsString } from "class-validator";

export class CreateGraphDto{
    @IsString()
    title: String;

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, {each: true})
    @Type(() => Number)
    X_Values: [Number]

    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, {each: true})
    @Type(() => Number)
    Y_Values: [Number]

}