import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './schemas/student.schema';
import { Model } from 'mongoose';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>
  ) { }
  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const result = new this.studentModel(createStudentDto)
    return result.save();
  }

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async findOne(id: string): Promise<Student> {
    return this.studentModel.findById(id).exec();
  }

  async update(id: string, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const result = this.studentModel.findByIdAndUpdate(
      id, updateStudentDto, { new: true }
    ).exec();
    return result;
  }

  async remove(id: string) {
    const result = await this.studentModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('id not found')
    }
    return { message: 'delete successful' };
  }
}
