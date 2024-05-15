import { IsString } from 'class-validator';

export class CreateStudentDto {
    @IsString()
    readonly name: string;
    @IsString()
    readonly lastname: string;
}
