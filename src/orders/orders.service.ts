import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order, OrderDocument} from './schemas/order.schema';
import { Model } from 'mongoose'

import { ProductsService } from '../products/products.service'

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private productService: ProductsService,
  ){}
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const productResult = await this.productService.findOne(createOrderDto.productId)
    
    if(!productResult){
       throw new NotFoundException("product not found")
    }

    const result = new this.orderModel(createOrderDto)
    return result.save();
  }

  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).populate('productId').exec();
    return order;
  }
}
