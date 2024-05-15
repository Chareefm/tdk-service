import { IsString } from 'class-validator';

export class UpdateStudentDto {
    @IsString()
    readonly name: string;
    @IsString()
    readonly lastname: string;
}
